import { FaDashcube, FaHome } from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router';
import { Button } from '~/components/button.component';
import useAuth from '~/contexts/auth/auth.hook';

// TODO: Add icon
const links = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Leagues', path: '/leagues' },
] as const;

export default function HomeDashboardLayout() {
  // const { user } = useAuth();

  const location = useLocation();

  return (
    <div className="min-h-screen flex" id="home-container">
      <div className="container mx-auto -px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside className="col-span-1 md:col-span-4 lg:col-span-3" id="sidebar">
            <div className="bg-[#1A1D23] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-neutral-800">
                <img
                  src={'https://via.placeholder.com/150'}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-white">{'Alex'}</h3>
                  <p className="text-neutral-400">Pro Predictor</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {links.map((link) => {
                  const isActive = location.pathname.startsWith(link.path);

                  return (
                    <Button
                      linkTo={link.path}
                      key={link.name}
                      icon={FaHome}
                      variant={isActive ? 'listActive' : 'list'}
                      value={link.name}
                      className="p-3 w-full"
                    />
                  );
                })}
              </div>
            </div>
          </aside>

          <main
            className="col-start-1 row-start-2 col-span-1 md:col-start-5  md:row-start-1 md:col-span-full lg:col-start-4 space-y-6"
            id="main-content"
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
