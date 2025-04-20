import type { SeasonString } from '~/types/f1.types';
import type { Route } from './+types/constructors.page';
import { FormulaData } from '~/server/static-data/static.data';
import { redirect, useNavigate } from 'react-router';

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const meetingId = searchParams.get('meetingId');

  const seasonYear = params.seasonYear as SeasonString;
  const season = !meetingId ? FormulaData.season(seasonYear) : FormulaData.fromMeeting(seasonYear, meetingId);
  if (!season) {
    throw new Response('Season not found', { status: 404 });
  }

  return {
    constructors: season.constructors,
    meetings: season.meetings,
  };
};

export default function ConstructorsPage(props: Route.ComponentProps) {
  const navigate = useNavigate();
  const { constructors, meetings } = props.loaderData;

  const onSelectMeeting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMeetingId = event.target.value;
    navigate({
      pathname: window.location.pathname,
      search: 'meetingId=' + selectedMeetingId,
    });
  };

  return (
    <div className="flex-1 p-8" id="admin-content">
      <div className="bg-[#1A1D23] rounded-xl p-6" id="constructors-table">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Constructors List</h2>
          <div className="flex gap-4">
            <div>
              <select
                onChange={onSelectMeeting}
                className="bg-[#262931] text-white rounded-lg p-3 border border-gray-700 focus:border-red-500 focus:outline-none"
              >
                {meetings.map((meeting) => (
                  <option key={meeting.id} value={meeting.id}>
                    {meeting.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              // onChange={onSearch}
              className="bg-[#262931] text-white rounded-lg p-3 border border-gray-700 focus:border-red-500 focus:outline-none"
              placeholder="Search constructors..."
            />
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-400 bg-background/20">
              <tr>
                <th scope="col" className="px-6 py-3 max-w-10">
                  Constructor name
                </th>
                <th scope="col" className="px-6 py-3">
                  Base
                </th>
                <th scope="col" className="px-6 py-3">
                  Principal
                </th>
                <th scope="col" className="px-6 py-3">
                  Drivers
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {constructors.map((constructor) => (
                <tr key={constructor.id} className="bg-[#262931] dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white gap-10 flex flex-row">
                    <div className="w-3 flex -mx-6 -my-4" style={{ backgroundColor: constructor.hexColor }} />
                    <div className="flex flex-col gap-1">
                      {constructor.name}
                      <div className="text-xs font-normal">{constructor.fullName}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {constructor.location}, {constructor.country.name}
                  </td>
                  <td className="px-6 py-4">{constructor.principal}</td>
                  <td className="px-6 py-4">{constructor.drivers.map((driver) => `${driver.firstName} ${driver.lastName}`).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
