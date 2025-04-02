import admin from 'firebase-admin';

import serviceAccount from '../firebase/service-account.json';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const firestore = admin.firestore();
export const auth = admin.auth();