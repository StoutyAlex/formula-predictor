import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecrdeploy from 'cdk-ecr-deployment';
import * as erc from 'aws-cdk-lib/aws-ecr-assets';
import * as ecr from 'aws-cdk-lib/aws-ecr';

import path from 'path';
import { fileURLToPath } from 'url';
import { code } from 'motion/react-m';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

interface FormulaPredictorStackProps extends cdk.StackProps {
  environment: 'staging' | 'production';
}

export class FormulaPredictorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FormulaPredictorStackProps) {
    super(scope, id, props);

    const getId = (name: string) => `fp-${name}-${props.environment}`;

    new cdk.aws_apprunner.CfnService(this, getId('apprunner'), {
      serviceName: getId('service'),
      sourceConfiguration: {
        autoDeploymentsEnabled: true,
        authenticationConfiguration: {
          connectionArn: 'arn:aws:apprunner:eu-west-1:148819724023:connection/personal-github/3052db7617ae4fb4a5385f20abff250e',
        },
        codeRepository: {
          repositoryUrl: 'https://github.com/StoutyAlex/formula-predictor',
          sourceCodeVersion: {
            type: 'BRANCH',
            value: 'main',
          },
          codeConfiguration: {
            configurationSource: 'REPOSITORY',
          }
        },
      },
    });
  }
}
