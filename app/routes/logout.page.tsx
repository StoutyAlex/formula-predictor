import { useEffect } from 'react';
import { type ActionFunctionArgs } from 'react-router';
import useAuth from '~/contexts/auth/auth.hook';
import { SessionService } from '~/services/session.service.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  return await SessionService.logout(request);
};

export const loader = async ({ request }: ActionFunctionArgs) => {
  return await SessionService.logout(request);
};

export default function LogoutPage() {
  const { setUser } = useAuth();

  useEffect(() => {
    // fbAuth.signOut().then(() => {
    //   setUser(null);
    // });
    setUser(null);
    //
  }, [setUser]);

  return <div>Logging out...</div>;
}
