'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { useFetcher } from 'react-router';
import { SessionService } from '~/services/session.service.server';
import { loginUserSchema } from './auth/login.api';
import { FormFieldErrorResponse } from '~/lib/errors/form-field-error.response';
import { FormErrorResponse } from '~/lib/errors/form-error.response';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { registerUserSchema } from './auth/register.api';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const idToken = formData.get('idToken');

  if (!idToken) {
    return new Response('Missing token', { status: 400 });
  }

  try {
    return await SessionService.login(request, idToken.toString(), '/home');
  } catch (error) {
    console.log('Error logging in:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await SessionService.isValid(request);
  // if (session.success) {
  //   return redirect('/home');
  // }
};

const url = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2509bb5eca-f792921744e1e3e79484.png';

export enum LoginType {
  Login = 'login',
  Register = 'register',
}

interface PageText {
  title: string;
  subtitle: string;
  alternateText: string;
  alternateButton: string;
}

const pageTextMapping: Record<LoginType, PageText> = {
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to access your predictions',
    alternateText: "Don't have an account?",
    alternateButton: 'Sign Up',
  },
  register: {
    title: 'Create an account',
    subtitle: 'Join us to start predicting',
    alternateText: 'Already have an account?',
    alternateButton: 'Sign In',
  },
} as const;

export default function LoginPage() {
  const { data, submit } = useFetcher();

  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<LoginType>(LoginType.Login);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | undefined>();

  const handleLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const { data, success, error } = loginUserSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!success && error) {
      const fieldError = FormFieldErrorResponse.fromZodError(error);
      setFieldErrors(fieldError.error.fields);
      return;
    }

    submit(data, {
      method: 'post',
      action: '/auth/login',
      encType: 'application/json',
    });
  }, []);

  const handleRegister = useCallback((event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const { data, success, error } = registerUserSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      username: formData.get('username'),
    });

    if (!success && error) {
      const fieldError = FormFieldErrorResponse.fromZodError(error);
      setFieldErrors(fieldError.error.fields);
      return;
    }

    submit(data, {
      method: 'post',
      action: '/auth/register',
      encType: 'application/json',
    });
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      loginType === LoginType.Login && handleLogin(event);
      loginType === LoginType.Register && handleRegister(event);
    },
    [loginType, handleLogin]
  );

  const handleToggleLoginType = useCallback(() => {
    setFieldErrors({});
    setFormError(undefined);
    setLoginType((prev) => (prev === LoginType.Login ? LoginType.Register : LoginType.Login));
  }, []);

  useEffect(() => {
    if (!data) {
      setFieldErrors({});
      setFormError(undefined);
      return;
    }

    if (FormErrorResponse.isError(data)) {
      setFormError(data.error.message);
    }

    if (FormFieldErrorResponse.isError(data)) {
      setFieldErrors(data.error.fields);
    }

    setIsLoading(false);
  }, [data]);

  const text = pageTextMapping[loginType];

  return (
    <div className="min-h-screen bg-[#0E1015] flex items-center justify-center p-4" id="login-container">
      <div className="w-full max-w-[1200px] md:min-h-[600px] flex rounded-2xl overflow-hidden shadow-2xl" id="login-wrapper">
        {/* Left Panel */}
        <div className="hidden lg:block w-1/2 relative" id="login-hero">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2509bb5eca-f792921744e1e3e79484.png"
            alt="formula one racing car on track at night with dramatic lighting, motion blur, professional photography"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-black/50"></div>
          <div className="relative z-10 p-12 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-flag-checkered text-3xl text-white"></i>
              <span className="text-2xl font-bold text-white">Formula Predictor</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">Predict. Compete. Win.</h1>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-[#1A1D23] p-4 md:p-6" id="login-form-container">
          <div className="max-w-md mx-auto h-full">
            <form className="space-y-6 flex flex-col h-full justify-between" id="login-form" onSubmit={handleSubmit}>
              <div id="input-container" className="flex flex-col gap-3">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">{text.title}</h2>
                  <p className="text-gray-400 mb-3">{text.subtitle}</p>
                  {formError ? (
                    <span className="flex items-center gap-2  mb-3">
                      <FaTriangleExclamation className="text-red-600 inline" />
                      <p className="text-red-600">{formError}</p>
                    </span>
                  ) : (
                    <div className="mb-3 h-6" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-300" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      id="email"
                      className="w-full bg-[#262931] text-white rounded-lg py-3 px-11 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {loginType === LoginType.Register && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-300" htmlFor="username">
                      Username
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        name="username"
                        type="text"
                        id="username"
                        className="w-full bg-[#262931] text-white rounded-lg py-3 px-11 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-300" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="password"
                      type="password"
                      id="password"
                      className="w-full bg-[#262931] text-white rounded-lg py-3 px-11 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-end">
                  <span className="text-sm text-red-500 hover:text-red-400 transition cursor-pointer">Forgot Password?</span>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 font-medium transition">
                  Sign In
                </button>

                <p className="text-center text-gray-400 text-sm">
                  {text.alternateText}{' '}
                  <span className="text-red-500 hover:text-red-400 transition cursor-pointer" onClick={handleToggleLoginType}>
                    {text.alternateButton}
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
