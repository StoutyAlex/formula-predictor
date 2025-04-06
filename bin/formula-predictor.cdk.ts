#!/usr/bin/env node
import 'dotenv/config';
import * as cdk from 'aws-cdk-lib';

import { FormulaPredictorStack } from '../lib/formula-predictor.stack';

const app = new cdk.App();

new FormulaPredictorStack(app, 'FormuaPredictorStack', {
  environment: 'staging',
  stackName: 'formula-predictor',
  description: 'Formula Predictor Stack',
  env: {
    account: '148819724023',
    region: 'eu-west-1',
  },
});
