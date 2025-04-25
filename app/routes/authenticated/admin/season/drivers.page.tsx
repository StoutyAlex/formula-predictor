import { getCountryCode } from 'countries-list';
import { useState, type ChangeEvent } from 'react';
import { FaPlus } from 'react-icons/fa';
import type { LoaderFunctionArgs } from 'react-router';
import { useFetcher, useLoaderData } from 'react-router';
import { SeasonService } from '~/server/services/season.service.server';
import type { Driver } from '~/server/static-data/static.types';
import type { SeasonString } from '~/types/f1.types';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const seasonYear = params.seasonYear as SeasonString;
  const season = SeasonService.year(seasonYear);

  if (!season) {
    throw new Response('Season not found', { status: 404 });
  }

  return {
    constructors: season.constructors,
    drivers: season.drivers,
  };
};

export default function ConstructorsPage() {
  const { constructors, drivers } = useLoaderData<typeof loader>();
  const { submit } = useFetcher();

  const [addDriverModalOpen, setAddDriverModalOpen] = useState(false);

  const [editDriver, setEditDriver] = useState<Driver>();
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>();

  const onOpen = () => {
    setEditDriver(undefined);
    setAddDriverModalOpen(true);
  };

  const editHandler = (driver: Driver) => {
    setEditDriver(driver);
    setAddDriverModalOpen(true);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm) {
      setFilteredDrivers(undefined);
      return;
    }

    // const filteredConstructors = constructors.filter(
    //   (constructor) =>
    //     constructor.name.toLowerCase().includes(searchTerm) ||
    //     constructor.fullName.toLowerCase().includes(searchTerm) ||
    //     constructor.location.toLowerCase().includes(searchTerm) ||
    //     constructor.country.toLowerCase().includes(searchTerm) ||
    //     constructor.principal.toLowerCase().includes(searchTerm) ||
    //     constructor.drivers?.some((driver) => driver.toLowerCase().includes(searchTerm))
    // );

    // setFilteredConstructors(filteredConstructors);
  };

  return (
    <div className="flex-1 p-8" id="admin-content">
      <div className="bg-[#1A1D23] rounded-xl p-6" id="drivers-table">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Drivers List</h2>
          <div className="flex gap-4">
            <input
              type="text"
              onChange={onSearch}
              className="bg-[#262931] text-white rounded-lg p-3 border border-gray-700 focus:border-red-500 focus:outline-none"
              placeholder="Search drivers..."
            />
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={onOpen}
            >
              <FaPlus />
              <span>Add Driver</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-400 bg-background/20">
              <tr>
                <th scope="col" className="w-35">
                  <span className="sr-only">number and country</span>
                </th>
                <th scope="col" className="px-6 py-3 max-w-10">
                  Driver name
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Team
                </th>
              </tr>
            </thead>
            <tbody>
              {(filteredDrivers || drivers).map((driver) => {
                const constructor = constructors.find((constructor) => constructor.drivers.some((d) => d.id === driver.id));

                const country = driver.country.name.toLowerCase();
                const flagCode = getCountryCode(country) || null;

                return (
                  <tr className="bg-[#262931] dark:border-gray-700 h-15">
                    <td className="h-15 flex flex-row">
                      <div
                        className="flex align-middle items-center justify-center text-center font-formula1 text-sm font-bold text-white w-15 text-[1.5rem]"
                        style={{ backgroundColor: constructor?.hexColor }}
                      >
                        {driver.number}
                      </div>
                      {country && (
                        <div className={`hidden sm:block ${!country && 'sm:hidden'}`}>
                          <div className={`w-20 object-cover h-full fi-${flagCode?.toLowerCase()} flag-icon-squared`} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 h-full text-gray-900 whitespace-nowrap dark:text-white gap-10">
                      <div className="flex flex-col gap-1">
                        {driver.firstName} {driver.lastName}
                        <div className="text-xs font-normal">{driver.abbreviation}</div>
                      </div>
                    </td>
                    <td className="px-6">{driver.country.name}</td>
                    <td className="px-6">{constructor?.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
