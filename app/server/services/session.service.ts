import { createCookieSessionStorage } from 'react-router';
import * as jose from 'jose';
import { createPrivateKey, createPublicKey } from 'crypto';
import { applicationConfig } from '~/lib/config.server';
import { UserCollection } from '../database/collections/user.collection';
import type { User, UserProfile } from '../database/schemas/user.schema';

const privateKey = createPrivateKey({
  key: applicationConfig.jwt.privateKey,
});

const publicKey = createPublicKey({
  key: applicationConfig.jwt.publicKey,
});

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'fp:session',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 5,
    path: '/',
    sameSite: 'lax',
    secrets: ['f3cr@z7'],
    secure: true,
  },
});

export interface SessionPayload extends jose.JWTPayload {
  sub: string;
  email: string;
  username: string;
  profile?: UserProfile;
}

export interface UserSession {
  id: string;
  email: string;
  username: string;
  profile: UserProfile;
}

export class SessionService {
  private static async generateIdToken(user: User) {
    const payload: SessionPayload = {
      sub: user._id.toString(),
      email: user.email,
      username: user.username,
      profile: user.profile,
    };

    const token = new jose.SignJWT(payload);

    token.setProtectedHeader({ alg: 'RS256' });
    token.setIssuer('formula-predictor.com');
    token.setIssuedAt(new Date());
    token.setExpirationTime('14d');

    return token.sign(privateKey);
  }

  static async create(request: Request, user: User) {
    const session = await getSession(request.headers.get('Cookie'));

    const idToken = await this.generateIdToken(user);
    session.set('idToken', idToken);
    return session;
  }

  static async isValid(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));
    const idToken = session.get('idToken');
    if (!idToken) return;

    try {
      const { payload } = await jose.jwtVerify<SessionPayload>(idToken, publicKey);

      const userSession: UserSession = {
        id: payload.sub,
        email: payload.email,
        username: payload.username,
        profile: payload.profile || {},
      };

      return userSession;
    } catch (error) {
      console.error('Error verifying user session:', error);
    }
  }
}
