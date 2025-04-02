'use client';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { useFetcher, useLoaderData } from 'react-router';
import { UpdateConstructorModal } from '~/components/modals/update-constructor.modal';
import type { ConstructorEntity } from '~/database/entities/constructor.entity';
import { ConstructorSchema, type CreateConstructorData, type UpdateConstructorData } from '~/lib/schemas/constructor-schema';
import { SeasonService } from '~/services/season.service.server';
import type { SeasonString } from '~/types/f1.types';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const seasonYear = params.seasonYear as SeasonString;
  const json = await request.json();

  const season = SeasonService.year(seasonYear);

  if (request.method === 'PUT') {
    const { valid, data, errors } = ConstructorSchema.validateUpdate(json);
    if (errors) {
      console.error('Validation errors:', JSON.stringify(errors, null, 2));
    }
    if (!valid) {
      return new Response('Invalid data', { status: 400, statusText: 'Bad Request' });
    }
    return await season.teams.update(data.id, data);
  }

  if (request.method === 'DELETE') {
    const { valid, data, errors } = ConstructorSchema.validateDelete(json);
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

  const { valid, data, errors } = ConstructorSchema.validateCreate(json);

  if (errors) {
    console.error('Validation errors:', JSON.stringify(errors, null, 2));
  }

  if (!valid) {
    return new Response('Invalid data', { status: 400, statusText: 'Bad Request' });
  }

  return await season.teams.create(data);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const seasonYear = params.seasonYear as SeasonString;
  const season = SeasonService.year(seasonYear);
  const constructors = await season.teams.getAll();
  return constructors;
};

export default function ConstructorsPage() {
  const { submit } = useFetcher();
  const constructors = useLoaderData<typeof loader>();
  const [addConstructorModalOpen, setAddConstructorModalOpen] = useState(false);

  const [editConstructor, setEditConstructor] = useState<ConstructorEntity>();
  const [filteredConstructors, setFilteredConstructors] = useState<ConstructorEntity[]>();

  const onOpen = () => {
    console.log('open');
    setEditConstructor(undefined);
    setAddConstructorModalOpen(true);
  };

  const editConstructorHandler = (constructor: ConstructorEntity) => {
    setEditConstructor(constructor);
    setAddConstructorModalOpen(true);
  };

  const deleteConstructor = async (id: string) => {
    // TODO: change this so its /admin/season/constructors/:id
    await submit({ id }, { method: 'delete', encType: 'application/json' });
  };

  const onCreateConstructor = async (data: CreateConstructorData) => {
    await submit({ ...data }, { method: 'post', encType: 'application/json' });
    setAddConstructorModalOpen(false);
    setEditConstructor(undefined);
  };

  const onUpdateConstructor = async (data: UpdateConstructorData) => {
    await submit({ ...data }, { method: 'put', encType: 'application/json' });
    setAddConstructorModalOpen(false);
    setEditConstructor(undefined);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm) {
      setFilteredConstructors(undefined);
      return;
    }

    const filteredConstructors = constructors.filter(
      (constructor) =>
        constructor.name.toLowerCase().includes(searchTerm) ||
        constructor.fullName.toLowerCase().includes(searchTerm) ||
        constructor.location.toLowerCase().includes(searchTerm) ||
        constructor.country.toLowerCase().includes(searchTerm) ||
        constructor.principal.toLowerCase().includes(searchTerm) ||
        constructor.drivers?.some((driver) => driver.toLowerCase().includes(searchTerm))
    );

    setFilteredConstructors(filteredConstructors);
  };

  return (
    <div className="flex-1 p-8" id="admin-content">
      <div className="bg-[#1A1D23] rounded-xl p-6" id="constructors-table">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Constructors List</h2>
          <div className="flex gap-4">
            <input
              type="text"
              onChange={onSearch}
              className="bg-[#262931] text-white rounded-lg p-3 border border-gray-700 focus:border-red-500 focus:outline-none"
              placeholder="Search constructors..."
            />
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={onOpen}
            >
              <FaPlus />
              <span>Add Constructor</span>
            </button>
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
              {(filteredConstructors || constructors).map((constructor) => (
                <tr key={constructor.id} className="bg-[#262931] dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white gap-10 flex flex-row">
                    <div className="w-3 flex -mx-6 -my-4" style={{ backgroundColor: constructor.colour }} />
                    <div className="flex flex-col gap-1">
                      {constructor.name}
                      <div className="text-xs font-normal">{constructor.fullName}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {constructor.location}, {constructor.country}
                  </td>
                  <td className="px-6 py-4">{constructor.principal}</td>
                  <td className="px-6 py-4">{constructor.drivers}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-600" onClick={() => editConstructorHandler(constructor)}>
                        <FaPenToSquare />
                      </button>
                      <button className="text-red-500 hover:text-red-600" onClick={() => deleteConstructor(constructor.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateConstructorModal
        constructor={editConstructor}
        open={addConstructorModalOpen}
        onCreate={onCreateConstructor}
        onUpdate={onUpdateConstructor}
        onClose={() => {
          setAddConstructorModalOpen(false);
          setEditConstructor(undefined);
        }}
      />
    </div>
  );
}
