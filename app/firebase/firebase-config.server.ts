import admin from 'firebase-admin';

import { appConfig } from '../lib/config';

const serviceAccount = appConfig.firebase.serviceAccount;
if (!serviceAccount) {
  throw new Error('Firebase service account not found');
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();
export const auth = admin.auth();
