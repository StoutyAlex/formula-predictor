import { Outlet, redirect } from 'react-router';
import { SessionService } from '~/server/services/session.service';
import type { Route } from './+types/auth-guard.layout';
import type { ReactNode } from 'react';

export const loader = async (params: Route.LoaderArgs) => {
  const userSession = await SessionService.isValid(params.request);
  if (!userSession) throw redirect('/login');
  return userSession;
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  // set context for user session here :)
  return <Outlet />;
}
