import { writeFileSync } from 'fs';

const run = async () => {
  const environment = process.env.ENVIRONMENT || 'development';
  const appConfig = (await import(`../app.config.${environment}.json`))

  const mapping = {
    VITE_APP_CONFIG: JSON.stringify(appConfig),
  };

  const mappingString = Object.entries(mapping)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  writeFileSync('.env', mappingString, { encoding: 'utf-8' });
  console.log('Environment variables set successfully', mappingString);
};

run();
