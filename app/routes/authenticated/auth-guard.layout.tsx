import React from 'react';
import { type LoaderFunctionArgs } from 'react-router';
import { Outlet, redirect } from 'react-router';
import { SessionService } from '~/server/services/session.service';
import type { Route } from './+types/auth-guard.layout';

export const loader = async (params: Route.LoaderArgs) => {
  const userSession = await SessionService.isValid(params.request);
  if (!userSession) throw redirect('/login');
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Outlet />;
}
