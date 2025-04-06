import type { LoaderFunctionArgs } from 'react-router';
import { Outlet, redirect } from 'react-router';
import { SessionService } from '~/services/session.service.server';

export const loader = async (params: LoaderFunctionArgs) => {
  const userSession = await SessionService.isValid(params.request);
  if (!userSession) {
    return redirect('/auth/logout');
  }

  if (!userSession.groups.includes('admins')) {
    return redirect('/dashboard');
  }
};

export default function AuthLayout() {
  return <Outlet />;
}
