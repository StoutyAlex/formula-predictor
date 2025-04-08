import type { LoaderFunctionArgs } from 'react-router';
import { Outlet, redirect } from 'react-router';
import { SessionService } from '~/server/services/session.service';

export const loader = async (params: LoaderFunctionArgs) => {
  const userSession = await SessionService.isValid(params.request);
  if (!userSession) {
    return redirect('/auth/logout');
  }

  if (!userSession.profile.isAdmin) {
    return redirect('/dashboard');
  }
};

export default function AuthLayout() {
  return <Outlet />;
}
