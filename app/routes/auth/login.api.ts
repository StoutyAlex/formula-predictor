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

  const loginResponse = await loginUser(loginUserData);
  if (!loginResponse) {
    return new FormErrorResponse({ message: 'Server error, try again later.' }, 500);
  }

  const session = await getSession(request.headers.get('Cookie'));
  session.set('id_token', loginResponse.idToken);

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
