import { Footer } from '~/components/footer/footer.component';
import { Header } from '../components/header/header.component';
import { Outlet } from 'react-router';

export default function SiteLayout() {
  return (
    <div>
      <Header className="fixed w-full h-16 z-50" />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
