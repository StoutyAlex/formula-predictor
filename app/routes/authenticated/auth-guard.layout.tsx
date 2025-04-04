import React from 'react';
import type { LoaderFunctionArgs } from 'react-router';
import { Outlet, redirect } from 'react-router';
import { SessionService } from '~/services/session.service.server';

export const loader = async (params: LoaderFunctionArgs) => {
  const isSessionValid = await SessionService.isValid(params.request);
  // if (isSessionValid.success) return;
  return redirect('/login');
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Outlet />;
}
