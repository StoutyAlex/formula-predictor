import { createCookieSessionStorage, redirect } from 'react-router';
import { auth } from '~/firebase/firebase-config.server';

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'fb:token',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 5,
    path: '/',
    sameSite: 'lax',
    secrets: ['f3cr@z7'],
    secure: true,
  },
});

export class SessionService {
  static addAdmin = async (uid: string) => {
    await auth.setCustomUserClaims(uid, { admin: true });
  };

  static isValid = async (request: Request) => {
    const session = await getSession(request.headers.get('cookie'));
    try {
      const decodedClaims = await auth.verifySessionCookie(session.get('idToken'), true);
      return { success: true, decodedClaims };
    } catch (error: unknown) {
      return { success: false, error: error instanceof Error ? error.message : 'Session is invalid' };
    }
  };

  static login = async (request: Request, idToken: string, redirectTo: string) => {
    await auth.verifyIdToken(idToken);

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    });

    return SessionService.setCookieAndRedirect(request, sessionCookie, redirectTo);
  };

  static logout = async (request: Request) => {
    const session = await getSession(request.headers.get('cookie'));

    const idToken = session.get('idToken');
    console.log('idToken', idToken);

    const decodedClaims = await auth.verifySessionCookie(session.get('idToken'), true);
    if (!decodedClaims) {
      throw new Error('Session is invalid');
    }

    await auth.revokeRefreshTokens(decodedClaims?.sub);

    return redirect('/login', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    });
  };

  private static setCookieAndRedirect = async (request: Request, sessionCookie: string, redirectTo = '/') => {
    console.log('idToken', sessionCookie);
    const session = await getSession(request.headers.get('cookie'));
    session.set('idToken', sessionCookie);
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  };
}
