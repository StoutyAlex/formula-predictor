import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  NotAuthorizedException,
  UsernameExistsException,
  InvalidPasswordException,
} from '@aws-sdk/client-cognito-identity-provider';
import type { LoginUserData } from '~/routes/auth/login.api';
import type { RegisterUserData } from '~/routes/auth/register.api';

const client = new CognitoIdentityProviderClient({
  region: 'eu-west-1',
});

interface LoginResponseSuccess {
  success: true;
  tokens: {
    idToken: string;
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginResponseError {
  success: false;
  error: string;
}

type LoginResponse = LoginResponseSuccess | LoginResponseError;

const USER_POOL_ID = 'eu-west-1_B3YCBlIA8';

export const loginUser = async (data: LoginUserData): Promise<LoginResponse> => {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: '4ptgvsddk6g12ittm99dqqlc64',
    AuthParameters: {
      USERNAME: data.email,
      PASSWORD: data.password,
    },
  });

  try {
    const response = await client.send(command);
    const { IdToken, AccessToken, RefreshToken } = response.AuthenticationResult || {};

    if (!IdToken || !AccessToken || !RefreshToken) {
      throw new Error('Authentication failed');
    }

    return {
      success: true,
      tokens: {
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
      },
    };
  } catch (err: any) {
    if (err instanceof NotAuthorizedException) {
      return { success: false, error: 'Invalid credentials' };
    }

    return { success: false, error: err.message };
  }
};

export async function registerUser(data: RegisterUserData) {
  const { email, password, username } = data;

  const createUserCommand = new AdminCreateUserCommand({
    UserPoolId: USER_POOL_ID,
    Username: email,
    MessageAction: 'SUPPRESS',
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'email_verified', Value: 'true' },
      { Name: 'preferred_username', Value: username },
    ],
  });

  const setPasswordCommand = new AdminSetUserPasswordCommand({
    UserPoolId: USER_POOL_ID,
    Username: email,
    Password: password,
    Permanent: true,
  });

  try {
    await client.send(createUserCommand);
    await client.send(setPasswordCommand);

    return { success: true };
  } catch (err: any) {
    console.error('Error creating user:', err);
    if (err instanceof UsernameExistsException) {
      return { success: false, error: 'User already exists' };
    }

    if (err instanceof InvalidPasswordException) {
      return { success: false, error: 'Password' };
    }

    return { success: false, error: 'Unknown Error Occured' };
  }
}
