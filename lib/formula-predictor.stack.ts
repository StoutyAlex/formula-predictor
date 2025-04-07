import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as erc from 'aws-cdk-lib/aws-ecr-assets';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import path from 'path';
import { fileURLToPath } from 'url';
import type { AuthContext } from 'cdk.context';
import { IdentityPool, UserPoolAuthenticationProvider } from 'aws-cdk-lib/aws-cognito-identitypool';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
interface FormulaPredictorStackProps extends cdk.StackProps {
  environment: 'staging' | 'production';
}

export class FormulaPredictorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FormulaPredictorStackProps) {
    super(scope, id, props);

    const getId = (name: string) => `fp-${name}-${props.environment}`;
    const getName = (name: string) => `formula-predictor-${name}-${props.environment}`;

    const authContext: AuthContext = this.node.tryGetContext('auth');

    const userPool = new cognito.UserPool(this, getId('user-pool'), {
      userPoolName: getName('user-pool'),
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      autoVerify: {
        email: false,
      },
      customAttributes: {
        role: new cognito.StringAttribute({ mutable: true }),
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: false,
        },
      },
    });

    const userPoolClient = new cognito.UserPoolClient(this, getId('user-pool-client'), {
      userPoolClientName: getName('user-pool-client'),
      userPool,
      authFlows: {
        userPassword: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        callbackUrls: authContext.callbackUrls,
        logoutUrls: authContext.logoutUrls,
      },
    });

    const identityPool = new IdentityPool(this, getId('identity-pool'), {
      identityPoolName: getName('identity-pool'),
      allowUnauthenticatedIdentities: true,
      authenticationProviders: {
        userPools: [
          new UserPoolAuthenticationProvider({
            userPool,
            userPoolClient,
          }),
        ],
      },
    });

    const vpc = new ec2.Vpc(this, getId('vpc'), {
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, getId('cluster'), { vpc });

    const constructorsTable = new dynamodb.Table(this, getId('constructors'), {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'year',
        type: dynamodb.AttributeType.STRING,
      },
      tableName: getName('constructors'),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const taskImageEnvironment = {
      VITE_NODE_ENV: 'production',
      VITE_AWS_REGION: this.region,
      VITE_USER_POOL_ID: userPool.userPoolId,
      VITE_USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
      VITE_IDENTITY_POOL_ID: identityPool.identityPoolId,
      VITE_CONSTRUCTORS_TABLE_NAME: constructorsTable.tableName,
      VITE_TEST_URL: 'https://test.formula-predictor.co.uk',
      TEST_URL: 'https://test.formula-predictor.co.uk',
    };

    const dockerAsset = new erc.DockerImageAsset(this, getId('docker-asset'), {
      directory: path.join(__dirname, '../'),
      file: 'Dockerfile',
      platform: erc.Platform.LINUX_AMD64,
      buildArgs: {
        PORT: '3000',
      },
    });

    // 3. Fargate Service with Load Balancer (Docker image from local directory)
    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, getId('fargate'), {
      cluster,
      memoryLimitMiB: 1024,
      cpu: 512,
      desiredCount: 1,
      listenerPort: 80,
      taskImageOptions: {
        image: ecs.ContainerImage.fromDockerImageAsset(dockerAsset),
        environment: taskImageEnvironment,
        containerPort: 3000,
      },
      publicLoadBalancer: true,
    });

    constructorsTable.grantFullAccess(fargateService.taskDefinition.taskRole);
    fargateService.taskDefinition.taskRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['cognito-idp:AdminCreateUser', 'cognito-idp:InitiateAuth', 'cognito-idp:AdminSetUserPassword'],
        resources: [userPool.userPoolArn],
      })
    );

    const zone = route53.HostedZone.fromLookup(this, getId('hosted-zone'), {
      domainName: 'formula-predictor.co.uk',
    });

    new route53.ARecord(this, getId('alias'), {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.LoadBalancerTarget(fargateService.loadBalancer)),
    });

    new cdk.CfnOutput(this, 'VITE_NODE_ENV', {
      exportName: 'ViteNodeEnv',
      value: props.environment === 'production' ? 'production' : 'development',
    });

    new cdk.CfnOutput(this, 'VITE_REGION', {
      exportName: 'ViteRegion',
      value: this.region,
    });

    new cdk.CfnOutput(this, 'VITE_USER_POOL_ID', {
      exportName: 'ViteUserPoolId',
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'VITE_USER_POOL_CLIENT_ID', {
      exportName: 'ViteUserPoolClientId',
      value: userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, 'VITE_CONSTRUCTORS_TABLE_NAME', {
      exportName: 'ViteConstructorsTableName',
      value: constructorsTable.tableName,
    });
  }
}
