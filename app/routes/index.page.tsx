import { redirect, type LoaderFunctionArgs } from 'react-router';
import { Button } from '~/components/button.component';
import { SessionService } from '~/services/session.service.server';

export const meta = () => {
  return [{ title: 'Formula Predictor' }, { name: 'description', content: 'Welcome to Formula Predictor!' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isValid = await SessionService.isValid(request);
  // if (isValid.success) return redirect('/dashboard');
  return null;
};

const heroImage = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/1acd26638c-c7f129efebd377c5739f.png';

export default function IndexPage() {
  return (
    <div>
      <section className="relative h-[calc(100vh-64px)] w-full" id="hero-section">
        <div className="absolute w-full h-full">
          <img src={heroImage} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E1015]/80 via-[#0E1015]/50 to-[#0E1015]"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full">
          <div className="flex flex-col justify-center h-full max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">Predict Your Way to Victory</h1>
            <p className="text-xl text-gray-300 mb-8">
              Join the ultimate Formula 1 prediction challenge. Compete with fans worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="accent"
                value="Start Predicting Now"
                className="font-medium text-lg px-8 py-4 justify-center"
                linkTo="/login"
              />
              <Button variant="secondary" value="How It Works" className="font-medium text-lg px-8 py-4 justify-center" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
