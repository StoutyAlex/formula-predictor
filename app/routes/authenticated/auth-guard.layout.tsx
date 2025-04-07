import React from 'react';
import { type LoaderFunctionArgs } from 'react-router';
import { Outlet, redirect } from 'react-router';
import { SessionService } from '~/services/session.service.server';

export const loader = async (params: LoaderFunctionArgs) => {
  const userSession = await SessionService.isValid(params.request);
  if (!userSession) throw redirect('/login');
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Outlet />;
}
