import { createCookieSessionStorage } from 'react-router';
import * as jose from 'jose';
import { createPublicKey } from 'crypto';
import { applicationConfig } from '~/lib/config.server';

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'fp:token',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 5,
    path: '/',
    sameSite: 'lax',
    secrets: ['f3cr@z7'],
    secure: true,
  },
});

export interface UserSession {
  userId: string;
  email: string;
  username: string;
  groups: string[];
}

interface JWKs {
  keys: (Omit<jose.JWK, 'kid'> & { kid: string })[];
}

const publicKey = createPublicKey({
  key: applicationConfig.jwt.publicKey,
});

export class SessionService {
  static isValid = async (request: Request) => {
    const session = await getSession(request.headers.get('Cookie'));
    const idToken = session.get('id_token');

    if (!idToken) {
      return null;
    }

    try {
      const { payload } = await jose.jwtVerify(idToken, publicKey);
      console.log('JWT payload:', payload);
      return payload;
    } catch (error) {
      console.error('Error verifying JWT:', error);
      return null;
    }
  };
}
