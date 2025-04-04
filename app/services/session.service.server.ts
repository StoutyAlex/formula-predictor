import { createCookieSessionStorage, redirect } from 'react-router';

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
  static isValid = async (request: Request) => {
    // const session = await getSession(request.headers.get('cookie'));
    // try {
    //   const decodedClaims = await auth.verifySessionCookie(session.get('idToken'), true);
    //   return { success: true, decodedClaims };
    // } catch (error: unknown) {
    //   return { success: false, error: error instanceof Error ? error.message : 'Session is invalid' };
    // }
  };

  static login = async (request: Request, idToken: string, redirectTo: string) => {
    // await auth.verifyIdToken(idToken);
    return SessionService.setCookieAndRedirect(request);
  };

  static logout = async (request: Request) => {
    const session = await getSession(request.headers.get('cookie'));

    // const idToken = session.get('idToken');
    // console.log('idToken', idToken);

    // const decodedClaims = await auth.verifySessionCookie(session.get('idToken'), true);
    // if (!decodedClaims) {
    //   throw new Error('Session is invalid');
    // }

    // await auth.revokeRefreshTokens(decodedClaims?.sub);

    return redirect('/login', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    });
  };

  private static setCookieAndRedirect = async (request: Request, redirectTo = '/') => {
    const session = await getSession(request.headers.get('cookie'));
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  };
}
