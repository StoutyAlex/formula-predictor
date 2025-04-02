import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithEmailLink,
  sendSignInLinkToEmail,
} from 'firebase/auth';
import { useCallback, useState, type EventHandler, type FormEvent, type FormEventHandler, type SyntheticEvent } from 'react';
import { FaEnvelope, FaFlagCheckered, FaGoogle, FaLock, FaUser } from 'react-icons/fa';
import type { LoaderFunctionArgs } from 'react-router';
import type { ActionFunctionArgs } from 'react-router';
import { redirect, useFetcher } from 'react-router';
import { Button } from '~/components/button.component';
import { fbAuth } from '~/firebase/firebase-config';
import { SessionService } from '~/services/session.service.server';

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
  if (session.success) {
    return redirect('/home');
  }
};

const url = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2509bb5eca-f792921744e1e3e79484.png';

export default function LoginPage() {
  const fetcher = useFetcher();

  const signInWithGoogle = async () => {
    await signOut(fbAuth);
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(fbAuth, provider);

    const idToken = await response.user.getIdToken();
    fetcher.submit({ idToken: idToken }, { method: 'post' });
  };

  return (
    <div className="min-h-screen bg-[#0E1015] flex items-center justify-center p-4" id="login-container">
      <div
        className="max-w-[1200px] flex rounded-2xl overflow-hidden shadow-2xl min-h-72 flex-col lg:flex-row"
        id="login-wrapper"
      >
        <div className="flex lg:w-full relative h-80" id="login-hero">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={url}
            alt="formula one racing car on track at night with dramatic lighting, motion blur, professional photography"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-black/50"></div>
          <div className="relative z-10 p-6 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3">
              <FaFlagCheckered className="text-4xl text-white" />
              <span className="text-2xl font-bold text-white">F1 Predictor</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">Predict. Compete. Win.</h1>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-[#1A1D23] p-4 md:p-8" id="login-form-container">
          <div className="max-w-md mx-auto h-full flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome</h2>
              <p className="text-gray-400 mb-8">Sign in to access your predictions</p>
            </div>
            <div className="w-full flex items-center justify-center">
              <Button onClick={signInWithGoogle} icon={FaGoogle} value="Sign in with Google" center/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
