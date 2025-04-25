import { redirect } from 'react-router';

export const redirectToLogin = (afterUrl: string) => {
  return redirect(`/login?redirectTo=${afterUrl}`);
};
