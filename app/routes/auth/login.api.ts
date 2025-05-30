import { redirect, type ActionFunctionArgs } from 'react-router';
import { z } from 'zod';
import { compare } from 'bcryptjs';
import { commitSession, SessionService } from '~/server/services/session.service';
import { FormFieldErrorResponse } from '~/lib/errors/form-field-error.response';
import { FormErrorResponse } from '~/lib/errors/form-error.response';
import { connect } from '~/server/db.server';
import { UserCollection } from '~/server/database/collections/user.collection';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  redirectTo: z.string().or(z.null()).optional(),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  await connect();
  const json = await request.json();

  const { data: loginUserData, success, error } = loginUserSchema.safeParse(json);
  if (!success && error) {
    return FormFieldErrorResponse.fromZodError(error);
  }

  const { email, password, redirectTo } = loginUserData;

  const user = await UserCollection.findByEmail(email);
  if (!user) {
    return new FormErrorResponse({ message: 'Incorrect email or password' }, 400);
  }

  try {
    await compare(password, user.password);
  } catch (error) {
    console.error(error);
    return new FormErrorResponse({ message: 'Incorrect email or password' }, 400);
  }

  const session = await SessionService.create(request, user);

  if (redirectTo) {
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
