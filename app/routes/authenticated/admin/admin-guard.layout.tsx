import type { LoaderFunctionArgs } from 'react-router';
import { Outlet, redirect } from 'react-router';
import { SessionService } from '~/services/session.service.server';

export const loader = async (params: LoaderFunctionArgs) => {
  const { decodedClaims } = await SessionService.isValid(params.request);
  if (!decodedClaims?.admin) return redirect('/');
};

export default function AuthLayout() {
  return <Outlet />;
}
