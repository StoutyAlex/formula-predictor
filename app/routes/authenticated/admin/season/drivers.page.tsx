import { getCountryCode } from 'countries-list';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { useFetcher, useLoaderData } from 'react-router';
import { UpdateDriverModal } from '~/components/modals/update-driver.modal';
import { DriverCollection } from '~/database/driver.collection.server';
import type { DriverEntity } from '~/database/entities/driver.entity';
import { DriverSchema, type CreateDriverData, type UpdateDriverData } from '~/lib/schemas/driver-schema';
import { SeasonService } from '~/services/season.service.server';
import type { SeasonString } from '~/types/f1.types';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const seasonYear = params.seasonYear as SeasonString;
  const json = await request.json();

  const season = SeasonService.year(seasonYear);

  if (request.method === 'PUT') {
    const { valid, data, errors } = DriverSchema.validateUpdate(json);
    if (errors) {
      console.error('Validation errors:', JSON.stringify(errors, null, 2));
    }
    if (!valid) {
      return new Response('Invalid data', { status: 400, statusText: 'Bad Request' });
    }
    return await DriverCollection.season('2025').update(data.id, data);
  }

  if (request.method === 'DELETE') {
    const { valid, data, errors } = DriverSchema.validateDelete(json);
    if (errors) {
      console.error('Validation errors:', JSON.stringify(errors, null, 2));
    }
    if (!valid) {
      return new Response('Invalid data', { status: 400, statusText: 'Bad Request' });
    }
    return await season.teams.delete(data.id);
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, statusText: 'Method Not Allowed' });
  }

  const { valid, data, errors } = DriverSchema.validateCreate(json);
  if (errors) {
    console.error('Validation errors:', JSON.stringify(errors, null, 2));
  }

  if (!valid) {
    return new Response('Invalid data', { status: 400, statusText: 'Bad Request' });
  }

  return await season.drivers.create(data);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const seasonYear = params.seasonYear as SeasonString;
  const season = SeasonService.year(seasonYear);

  const [constructors, drivers] = await Promise.all([season.teams.getAll(), season.drivers.getAll()]);

  const orderedDrivers = drivers.sort((a, b) => {
    if (a.constructorId === b.constructorId) {
      return a.number - (b.number);
    }
    return a.constructorId.localeCompare(b.constructorId);
  });

  return {
    constructors,
    drivers: orderedDrivers
  };
};

export default function ConstructorsPage() {
  const { constructors, drivers } = useLoaderData<typeof loader>();
  const { submit } = useFetcher();

  const [addDriverModalOpen, setAddDriverModalOpen] = useState(false);

  const [editDriver, setEditDriver] = useState<DriverEntity>();
  const [filteredDrivers, setFilteredDrivers] = useState<DriverEntity[]>();

  const onOpen = () => {
    setEditDriver(undefined);
    setAddDriverModalOpen(true);
  };

  const editHandler = (driver: DriverEntity) => {
    setEditDriver(driver);
    setAddDriverModalOpen(true);
  };

  const onDelete = async (id: string) => {
    console.log('Deleting driver with ID:', id);
    await submit({ id }, { method: 'delete', encType: 'application/json' });
  };

  const onCreate = async (data: CreateDriverData) => {
    await submit({ ...data }, { method: 'post', encType: 'application/json' });
    setAddDriverModalOpen(false);
    setEditDriver(undefined);
  };

  const onUpdate = async (data: UpdateDriverData) => {
    await submit({ ...data }, { method: 'put', encType: 'application/json' });
    setAddDriverModalOpen(false);
    setEditDriver(undefined);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {(filteredDrivers || drivers).map((driver) => {
                const constructor = constructors.find((constructor) => constructor.id === driver.constructorId);

                const country = driver.country.toLowerCase();
                const flagCode = getCountryCode(country);

                return (
                  <tr className="bg-[#262931] dark:border-gray-700 h-15">
                    <td className="h-15 flex flex-row">
                      <div
                        className="flex align-middle items-center justify-center text-center font-formula1 text-sm font-bold text-white w-15 text-[1.5rem]"
                        style={{ backgroundColor: constructor?.colour }}
                      >
                        {driver.number}
                      </div>
                      {country && (
                        <div className={`hidden sm:block ${!country && 'sm:hidden'}`}>
                          <div className={`w-20 object-cover h-full fi-${country?.toLowerCase()} flag-icon-squared`} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 h-full text-gray-900 whitespace-nowrap dark:text-white gap-10">
                      <div className="flex flex-col gap-1">
                        {driver.firstName} {driver.lastName}
                        <div className="text-xs font-normal">{driver.abbreviation}</div>
                      </div>
                    </td>
                    <td className="px-6">{driver.country}</td>
                    <td className="px-6">{constructor?.name}</td>
                    <td className="px-6">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:text-blue-600" onClick={() => editHandler(driver)}>
                          <FaPenToSquare />
                        </button>
                        <button className="text-red-500 hover:text-red-600" onClick={() => onDelete(driver.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateDriverModal
        driver={editDriver}
        constructors={constructors}
        open={addDriverModalOpen}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onClose={() => {
          setAddDriverModalOpen(false);
          setEditDriver(undefined);
        }}
      />
    </div>
  );
}
