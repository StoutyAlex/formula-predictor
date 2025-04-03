import type { ServiceAccount } from 'firebase-admin';

export interface AppConfig {
  application: {
    databaseUrl: string;
    sessionSecret: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    serviceAccount: ServiceAccount;
  };
}

const appConfigString = import.meta.env.VITE_APP_CONFIG as string;

export const appConfig = JSON.parse(appConfigString) as AppConfig;
