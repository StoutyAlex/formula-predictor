import { loginUser } from '~/lib/cognito.server';
import { redirect, type ActionFunctionArgs } from 'react-router';
import { z } from 'zod';
import { commitSession, getSession } from '~/services/session.service.server';
import { FormFieldErrorResponse } from '~/lib/errors/form-field-error.response';
import { FormErrorResponse } from '~/lib/errors/form-error.response';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const json = await request.json();

  const { data: loginUserData, success, error } = loginUserSchema.safeParse(json);
  if (!success && error) {
    return FormFieldErrorResponse.fromZodError(error);
  }

  const result = await loginUser(loginUserData);
  if (!result.success) {
    console.log('Error logging in:', result.error);
    return new FormErrorResponse({ message: 'Incorrect Login' }, 401);
  }

  const session = await getSession(request.headers.get('Cookie'));
  session.set('id_token', result.tokens.idToken);

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
