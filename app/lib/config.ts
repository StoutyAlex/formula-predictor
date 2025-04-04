
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
  };
}

// const appConfigString = import.meta.env.VITE_APP_CONFIG || process.env.VITE_APP_CONFIG;
// try {
//   JSON.parse(appConfigString);
// } catch (error) {
//   console.error('Error parsing app config:', error);
// }

// export const appConfig = JSON.parse(appConfigString) as AppConfig;
