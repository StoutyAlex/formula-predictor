import { redirect, type ActionFunctionArgs } from 'react-router';
import { destroySession, getSession } from '~/server/services/session.service';

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get('cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};
