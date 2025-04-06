import { createCookieSessionStorage, redirect } from 'react-router';
import type { Result } from '~/types/util.type';
import { CacheService } from './cache.service.server';
import * as jose from 'jose';

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

interface CognitoIDToken {
  sub: string;
  email: string;
  preferred_username: string;
  'cognito:groups'?: string[];
}

export interface UserSession {
  userId: string;
  email: string;
  username: string;
  groups: string[];
}

interface JWKs {
  keys: (Omit<jose.JWK, 'kid'> & { kid: string })[];
}

export class SessionService {
  private static transformIdTokenToSessionUser = (tokenPayload: CognitoIDToken): UserSession => {
    const { sub, email, preferred_username } = tokenPayload;

    if (!sub || !email || !preferred_username) {
      throw redirect('/auth/logout');
    }

    return {
      userId: sub,
      email,
      username: preferred_username,
      groups: tokenPayload['cognito:groups'] || [],
    };
  };

  private static getJWKs = async (): Promise<Result<JWKs>> => {
    const jwkResponse = await fetch('https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_B3YCBlIA8/.well-known/jwks.json');
    if (!jwkResponse.ok) {
      return { success: false, error: new Error('Failed to fetch JWKs') };
    }

    const jwks = (await jwkResponse.json()) as JWKs;
    if (!jwks.keys || jwks.keys.length === 0) {
      return { success: false, error: new Error('No keys found in JWKs') };
    }

    jwks.keys.forEach((key) => {
      CacheService.set(key.kid, key, { expiration: 60 * 60 * 12 });
    });

    return { success: true, data: jwks };
  };

  static verify = async (token: string) => {
    const decoded = jose.decodeProtectedHeader(token);
    if (!decoded.kid) {
      throw redirect('/auth/logout');
    }

    const getFreshKeys = async () => {
      const keys = await SessionService.getJWKs();
      const key = keys.data?.keys.find((key) => key.kid === decoded.kid);
      if (!key) throw redirect('/auth/logout');

      return key;
    };

    const key = CacheService.get<jose.JWK>(decoded.kid) || (await getFreshKeys());

    try {
      const { payload } = await jose.compactVerify(token, key, { algorithms: ['RS256'] });
      const jsonPayload = JSON.parse(new TextDecoder().decode(payload));
      return { payload: jsonPayload };
    } catch (error) {
      throw redirect('/auth/logout');
    }
  };

  // TODO: Cache the JWKs in memory for a while to avoid fetching them every time
  // TODO: Check the key id that is used to sign the token
  static isValid = async (request: Request, redirectTo?: string) => {
    const session = await getSession(request.headers.get('cookie'));
    const idToken = session.get('id_token');
    if (!idToken) return null;

    const { payload } = await SessionService.verify(idToken);

    const userSession = SessionService.transformIdTokenToSessionUser(payload);
    return userSession;
  };
}
