import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { appConfig } from '../lib/config';

const firebaseConfig = {
  apiKey: appConfig.firebase.apiKey,
  authDomain: appConfig.firebase.authDomain,
  projectId: appConfig.firebase.projectId,
  storageBucket: appConfig.firebase.storageBucket,
  messagingSenderId: appConfig.firebase.messagingSenderId,
  appId: appConfig.firebase.appId,
  measurementId: 'G-3G9Z2ZP39T',
};

const app = initializeApp(firebaseConfig);

export const fbAuth = getAuth(app);
