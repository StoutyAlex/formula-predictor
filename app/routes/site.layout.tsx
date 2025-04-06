import { Footer } from '~/components/footer/footer.component';
import { Header } from '../components/header/header.component';
import { Outlet, useLoaderData, useRouteLoaderData } from 'react-router';
import type { loader } from './authenticated/auth-guard.layout';

export default function SiteLayout() {
  const data = useRouteLoaderData<typeof loader>('routes/authenticated/auth-guard.layout');

  return (
    <div>
      <Header className="fixed w-full h-16 z-50" userSession={data?.userSession}/>
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
