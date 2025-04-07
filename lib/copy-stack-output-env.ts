import { DescribeStacksCommand, CloudFormation } from '@aws-sdk/client-cloudformation';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// TODO: get these from env variables
export const stackName = 'formula-predictor';
export const region = 'eu-west-1';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const desribeStacksCommand = new DescribeStacksCommand({
  StackName: stackName,
});

const cloudFormationClient = new CloudFormation({
  region,
});

const retry = (fn: Function, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: StackOutputError) => {
        if (error.identifier === 'DescribeStacksError') {
          reject(error);
          return;
        }

        if (error.identifier === 'StackNotFoundError') {
          reject(error);
          return;
        }
        if (error.identifier === 'NoOutputsError') {
          reject(error);
          return;
        }

        console.error(`Attempt: ${error.message} - Retries left: ${retriesLeft} - Interval: ${interval}ms`);

        if (retriesLeft === 1) {
          reject(error);
          return;
        }
        setTimeout(() => {
          retry(fn, retriesLeft - 1, Math.ceil(interval * 1.05))
            .then(resolve)
            .catch(reject);
        }, interval);
      });
  });
};

class StackOutputError extends Error {
  public identifier: string;

  constructor(message: string, identifier: string) {
    super(message);
    this.identifier = identifier;
  }
}

const camelToSnakeCase = (str?: string) => str?.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).toLocaleUpperCase();

const run = async () => {
  const response = await cloudFormationClient.send(desribeStacksCommand).catch(() => {
    throw new StackOutputError('Stack not found', 'DescribeStacksError');
  });

  const stack = response.Stacks?.[0];
  if (!stack) {
    throw new StackOutputError('Stack not found', 'StackNotFoundError');
  }

  if (!stack.StackStatus) {
    throw new StackOutputError('Stack status not found', 'StackStatusNotFoundError');
  }

  const acceptedStatuses = ['CREATE_COMPLETE', 'UPDATE_COMPLETE', 'UPDATE_ROLLBACK_COMPLETE'];

  if (!acceptedStatuses.includes(stack.StackStatus)) {
    throw new StackOutputError(`Stack is not in CREATE_COMPLETE state: ${stack.StackStatus}`, 'NotCreateCompleteError');
  }

  if (!stack.Outputs || !stack.Outputs.length) {
    throw new StackOutputError('No outputs found in stack', 'NoOutputsError');
  }

  const viteEnv = stack.Outputs.filter((output) => output.ExportName?.startsWith('Vite'));
  if (!viteEnv.length) {
    throw new StackOutputError('No Vite outputs found in stack', 'NoViteOutputsError');
  }

  const outputs = viteEnv
    .map((output) => `${camelToSnakeCase(output.ExportName)?.replace('_', '')}=${output.OutputValue}`)
    .join('\n');

  const fileName = path.join(__dirname, '../.env');
  writeFileSync(fileName, outputs, {
    encoding: 'utf-8',
  });

  console.log(`Environment variables written to ${fileName}`);
};

retry(run, 10, 5000).catch((error: Error) => {
  if (error instanceof StackOutputError) {
    console.log(`Error: ${error.message} - Identifier: ${error.identifier}`);
    return;
  }

  console.error(`Error: ${error?.message}`);
  return;
});
