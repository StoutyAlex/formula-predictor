import { Footer } from '~/components/footer/footer.component';
import { Header } from '../components/header/header.component';
import { Outlet } from 'react-router';
import type { Route } from './+types/site.layout';
import { SessionService } from '~/server/services/session.service';

export const loader = async (params: Route.LoaderArgs) => {
  const userSession = await SessionService.isValid(params.request);
  return userSession;
};

export default function SiteLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Header className="fixed w-full h-16 z-50" userSession={loaderData} />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
