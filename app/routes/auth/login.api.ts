import { loginUser } from '~/lib/cognito.server';
import { redirect, type ActionFunctionArgs } from 'react-router';
import { z } from 'zod';
import { commitSession, getSession } from '~/services/session.service.server';

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const json = await request.json();

  const { data: loginUserData, success } = loginUserSchema.safeParse(json);
  if (!success) {
    return new Response('Invalid', { status: 400 });
  }

  const result = await loginUser(loginUserData);
  if (!result.success) {
    return new Response(result.error, { status: 401 });
  }

  const session = await getSession(request.headers.get('Cookie'));
  session.set('id_token', result.tokens.idToken);

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
