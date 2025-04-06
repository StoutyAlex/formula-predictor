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

    // const taskRole = new iam.Role(this, getId('application-role'), {
    //   assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    // });

    // // Main application role
    // const taskPolicy = new iam.PolicyStatement({
    //   effect: iam.Effect.ALLOW,
    //   actions: [
    //     'cognito-idp:InitiateAuth',
    //     'cognito-idp:AdminCreateUser',
    //     'cognito-idp:AdminConfirmSignUp',
    //     'cognito-idp:AdminSetUserPassword',
    //     'cognito-idp:ListUsers',
    //     'cognito-idp:DescribeUserPool',
    //   ],
    //   resources: ['*'],
    // });

    // taskRole.addToPolicy(taskPolicy);

    const vpc = new ec2.Vpc(this, getId('vpc'), {
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, getId('cluster'), { vpc });

    const dockerAsset = new erc.DockerImageAsset(this, getId('docker-asset'), {
      directory: path.join(__dirname, '../'),
      file: 'Dockerfile',
      platform: erc.Platform.LINUX_AMD64,
      buildArgs: {
        PORT: '3000',
        TEST_VARIABLE: 'test variable here :D',
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
        containerPort: 3000,
      },
      publicLoadBalancer: true,
    });

    const zone = route53.HostedZone.fromLookup(this, getId('hosted-zone'), {
      domainName: 'formula-predictor.co.uk',
    });

    new route53.ARecord(this, getId('alias'), {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.LoadBalancerTarget(fargateService.loadBalancer)),
    });

    new cdk.CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId,
      description: 'User Pool ID',
    });

    new cdk.CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'User Pool Client ID',
    });

    new cdk.CfnOutput(this, 'identityPoolId', {
      value: identityPool.identityPoolId,
      description: 'Identity Pool ID',
    });
  }
}
