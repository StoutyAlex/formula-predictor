import { redirect, type ActionFunctionArgs } from 'react-router';
import { z } from 'zod';
import { loginUser, registerUser } from '~/lib/cognito.server';
import { FormErrorResponse } from '~/lib/errors/form-error.response';
import { FormFieldErrorResponse } from '~/lib/errors/form-field-error.response';
import { commitSession, getSession } from '~/services/session.service.server';

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .pipe(
      z
        .string()
        .regex(
          /(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
          'Password must be minimum length of 8 and contain at least one special character'
        )
    ),
  username: z.string().min(3),
});

export type RegisterUserData = z.infer<typeof registerUserSchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const json = await request.json();

  const { data: registerUserData, success, error } = registerUserSchema.safeParse(json);
  if (!success) {
    console.error('Error parsing register user data:', error);
    return FormFieldErrorResponse.fromZodError(error);
  }

  const registerUserResponse = await registerUser(registerUserData);
  if (!registerUserResponse.success && registerUserResponse.error) {
    return new FormErrorResponse({ message: registerUserResponse.error }, 500);
  }

  const loginUserResponse = await loginUser({
    email: registerUserData.email,
    password: registerUserData.password,
  });

  if (!loginUserResponse.success) {
    return new FormErrorResponse({ message: 'Server error, try again later.' }, 500);
  }

  const session = await getSession(request.headers.get('Cookie'));
  session.set('id_token', loginUserResponse.tokens.idToken);

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
