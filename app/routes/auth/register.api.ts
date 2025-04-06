import type { ActionFunctionArgs } from 'react-router';
import { z } from 'zod';
import { registerUser } from '~/lib/cognito.server';

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});

export type RegisterUserData = z.infer<typeof registerUserSchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const json = await request.json();

  const { data: registerUserData, success } = registerUserSchema.safeParse(json);
  if (!success) {
    return new Response('Invalid', { status: 400 });
  }

  const result = await registerUser(registerUserData);

  if (!result.success) {
    return new Response(result.error, { status: 400 });
  }

  return new Response('User registered successfully', { status: 200 });
};
