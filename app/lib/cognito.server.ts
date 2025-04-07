import type { LoginUserData } from '~/routes/auth/login.api';
import type { RegisterUserData } from '~/routes/auth/register.api';
import * as jose from 'jose';

import { createPrivateKey } from 'crypto';
import { applicationConfig } from './config.server';

const key = createPrivateKey({
  key: applicationConfig.jwt.privateKey,
});

export const loginUser = async (data: LoginUserData) => {
  try {
    const token = new jose.SignJWT({
      email: 'alexstout009@hotmial.com',
      username: 'StoutyAlex',
    });

    token.setProtectedHeader({ alg: 'RS256', });
    token.setIssuer('formula-predictor.com');
    token.setIssuedAt(new Date());
    token.setExpirationTime('14d');

    const idToken = await token.sign(key);

    return {
      idToken,
    };
  } catch (err: any) {
    console.error('Error logging in user:', err);
    // Handle error appropriately
  }
};

export async function registerUser(data: RegisterUserData) {
  try {
    return;
  } catch (err: any) {
    console.error('Error creating user:', err);
  }
}
