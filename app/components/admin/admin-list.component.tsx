import { FaCar, FaFlagCheckered, FaUsers } from 'react-icons/fa';
import { Button } from '../button.component';
import type { IconType } from 'react-icons';
import { useLocation } from 'react-router';

export interface AdminListLink {
  name: string;
  icon: IconType;
  path: string;
}

interface AdminListProps {
  className?: string;
}

export const AdminList = (props: AdminListProps) => {
  const location = useLocation();
  const seasonYear = location.pathname.split('/')[2];

  const user = {
    displayName: 'John Doe',
    photoURL: 'https://placeholder.com/photo',
  };
  const links = [
    { name: 'Constructors', icon: FaCar, path: `/admin/${seasonYear}/constructors` },
    { name: 'Drivers', icon: FaUsers, path: `/admin/${seasonYear}/drivers` },
    { name: 'Circuits', icon: FaUsers, path: `/admin/${seasonYear}/circuits` },
  ] as AdminListLink[];

  const buttons = links.map((link) => {
    return (
      <Button
        key={link.name}
        value={link.name}
        linkTo={link.path}
        active={location.pathname.includes(link.path)}
        icon={link.icon}
        variant="list"
      />
    );
  });

  return (
    <div className={`${props.className} w-64 bg-[#1A1D23] min-h-screen" id="admin-sidebar`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <FaFlagCheckered className="text-2xl text-white" />
          <span className="text-xl font-bold text-white">Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-3">{buttons}</nav>
        <div>
          <div className="flex items-center gap-4 absolute bottom-6 left-6">
            <div className="flex items-center gap-3">
              <img src={user?.photoURL || 'https://placeholder.com/photo'} className="w-10 h-10 rounded-full" />
              <span className="text-white">{user?.displayName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
