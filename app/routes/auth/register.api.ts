import { redirect, type ActionFunctionArgs } from 'react-router';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { commitSession, SessionService } from '~/server/services/session.service';
import { FormFieldErrorResponse } from '~/lib/errors/form-field-error.response';
import { FormErrorResponse } from '~/lib/errors/form-error.response';
import { connect } from '~/server/db.server';
import { UserCollection } from '~/server/database/collections/user.collection';

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be minimum length of 8')
    .pipe(z.string().regex(/(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, 'Password mustcontain at least one special character')),
  username: z.string().min(3),
  redirectTo: z.string().or(z.null()).optional(),
});

export type RegisterUserData = z.infer<typeof registerUserSchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log('Register action called');
  await connect();
  const json = await request.json();

  const { data: registerUserData, success, error } = registerUserSchema.safeParse(json);
  if (!success) {
    return FormFieldErrorResponse.fromZodError(error);
  }

  const { email, username, password, redirectTo } = registerUserData;

  const [existsEmail, existsUsername] = await Promise.all([
    UserCollection.exists({ email: registerUserData.email }),
    UserCollection.exists({ username: registerUserData.username }),
  ]);

  if (existsEmail) {
    return new FormErrorResponse({ message: 'Account already with this email' }, 400);
  }

  if (existsUsername) {
    return new FormErrorResponse({ message: 'Account already with this username' }, 400);
  }

  const hashedPassword = await hash(password, 10);

  const user = await new UserCollection.model({
    password: hashedPassword,
    username,
    email,
    profile: {},
  }).save();

  const session = await SessionService.create(request, user);

  if (redirectTo) {
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
