import type { LoaderFunctionArgs, ShouldRevalidateFunction } from 'react-router';
import { Outlet } from 'react-router';
import { AdminList } from '~/components/admin/admin-list.component';
import type { SeasonString } from '~/types/f1.types';

export const loader = async ({ params }: LoaderFunctionArgs) => {

};

export const shouldRevalidate: ShouldRevalidateFunction = (args) => {
  const { currentParams, nextParams } = args;
  const currentSeason = currentParams.seasonYear as SeasonString;
  const nextSeason = nextParams.seasonYear as SeasonString;

  if (currentSeason === nextSeason) {
    return false;
  }

  return false;
};

export default function SeasonLayout() {
  return (
    <div className="bg-[#0E1015] min-h-screen" id="admin-container">
      <div className="flex">
        <AdminList className="fixed h-screen w-64" />
        <div className="ml-64 w-full">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
