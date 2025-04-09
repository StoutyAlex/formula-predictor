import { redirect, type ActionFunctionArgs } from 'react-router';
import { z } from 'zod';
import { compare } from 'bcryptjs';
import { commitSession, SessionService } from '~/server/services/session.service';
import { FormFieldErrorResponse } from '~/lib/errors/form-field-error.response';
import { FormErrorResponse } from '~/lib/errors/form-error.response';
import { connect } from '~/server/db.server';
import { UserCollection } from '~/server/database/collections/user.collection';
import { MeetingCollection } from '~/server/database/collections/meeting.collection';
import { SessionType } from '~/server/database/schemas/meeting.schema';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  await connect();
  const json = await request.json();

  const { data: loginUserData, success, error } = loginUserSchema.safeParse(json);
  if (!success && error) {
    return FormFieldErrorResponse.fromZodError(error);
  }

  const { email, password } = loginUserData;

  const user = await UserCollection.findByEmail(email);
  if (!user) {
    return new FormErrorResponse({ message: 'Incorrect email or password' }, 400);
  }

  const meeting = await MeetingCollection.season('2025').create({
    name: 'Test Meeting',
    longName: 'Test Meeting Long Name',
    country: {
      name: 'Test Country',
      code: 'TC',
    },
    startDate: new Date(),
    endDate: new Date(),
    trackId: 'test-track-id',
    sessions: [
      {
        type: SessionType.PRACTICE_1,
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
  });

  try {
    await compare(password, user.password);
  } catch (error) {
    console.error(error);
    return new FormErrorResponse({ message: 'Incorrect email or password' }, 400);
  }

  const session = await SessionService.create(request, user);

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
