import { FaFlagCheckered } from 'react-icons/fa';
import { Button } from '../button.component';
import { twMerge } from 'flowbite-react/helpers/tailwind-merge';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, useLocation, useRouteLoaderData } from 'react-router';
import type { UserSession } from '~/server/services/session.service';

interface HeaderProps {
  className?: string;
  userSession?: UserSession;
}

export const HEADER_HEIGHT = 'h-16';
export const HEADER_PX = '64px';

export const Header = (props: HeaderProps) => {
  const { userSession } = props;

  const { pathname } = useLocation();
  const showPages = pathname === '/';

  return (
    <header className={twMerge('bg-background-light h-16', props.className)} id="header">
      <div className="px-4 container mx-auto h-full">
        <nav className="flex items-center justify-between mx-auto h-full w-full">
          <div className="flex items-center gap-3">
            <FaFlagCheckered className="text-2xl text-white" />
            <span className="text-xl font-bold text-white">Formula Predictor</span>
          </div>
          <div className="hidden sm:flex items-center space-x-8" style={{ display: !showPages ? 'none' : undefined }}>
            <span className="text-white hover:text-red-500 transition cursor-pointer">Home</span>
            <span className="text-gray-400 hover:text-white transition cursor-pointer">Leaderboard</span>
            <span className="text-gray-400 hover:text-white transition cursor-pointer">Rules</span>
          </div>
          <div className="tems-center gap-4 hidden sm:flex min-w-40 float-right">
            <>
              {!userSession && <Button className="px-6 justify-end" value="Sign In" variant="accent" linkTo="/login" />}
              {userSession && (
                <div className="flex justify-end gap-2 w-full z-[100] ">
                  <Menu>
                    <MenuButton>
                      <img
                        src={`https://ui-avatars.com/api/?name=${userSession.username}&rounded=true`}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-xl"
                      />
                    </MenuButton>
                    <MenuItems
                      anchor="bottom"
                      className={
                        'absolute z-[100] shadow-lg rounded-sm p-2 bg-btn-primary-hover hover:bg-btn-primary w-42 mt-1 border-2 border-btn-primary'
                      }
                    >
                      <MenuItem>
                        <Link to={'/auth/logout'} className="block text-white pl-1">
                          Sign Out
                        </Link>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              )}
            </>
          </div>
        </nav>
      </div>
    </header>
  );
};
