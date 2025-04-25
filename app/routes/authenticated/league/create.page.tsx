import { FaArrowLeft } from 'react-icons/fa';
import { redirect, useFetcher, useNavigate } from 'react-router';
import { z } from 'zod';
import { Button } from '~/components/button.component';
import { FormFieldErrorResponse } from '~/lib/errors/form-field-error.response';
import { SessionService } from '~/server/services/session.service';
import type { Route } from './+types/create.page';
import { useEffect, useState, type FormEvent } from 'react';
import { LeagueCollection } from '~/server/database/collections/league.collection';
import { LeaguePrivacy } from '~/server/database/schemas/league.schema';
import { customAlphabet } from 'nanoid';

export const createLeagueSchema = z.object({
  name: z.string().min(1, { message: 'League name is required' }),
  description: z.string().min(1, { message: 'League description is required' }),
  privacy: z.enum([LeaguePrivacy.Private, LeaguePrivacy.Public], { errorMap: () => ({ message: 'League type is required' }) }),
  allowInvite: z.boolean().optional(),
  showLeaderboard: z.boolean().optional(),
});

const codePart = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 4);

export const action = async ({ request }: Route.ActionArgs) => {
  const userSession = await SessionService.isValid(request);
  if (!userSession) {
    return redirect('/login');
  }

  const json = await request.json();

  const { success, data, error } = createLeagueSchema.safeParse(json);
  if (!success && error) {
    return FormFieldErrorResponse.fromZodError(error);
  }

  const slug = data.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const existingLeague = await LeagueCollection.exists({ slug, year: '2025' });
  if (existingLeague) {
    return new FormFieldErrorResponse({
      fields: {
        name: 'League with this name already exists',
      },
      message: 'Error creating league',
    });
  }

  const code = `${codePart()}-${codePart()}`.toUpperCase();

  const league = await LeagueCollection.create({
    name: data.name,
    description: data.description,
    owner: userSession.id,
    privacy: data.privacy,
    year: '2025',
    code,
    slug,
    members: [userSession.id],
    options: {
      allowInvite: data.allowInvite ?? false,
    },
  });

  return {
    success: true,
    league,
  };
};

export default function CreateLeaguePage() {
  const navigate = useNavigate();
  const { submit, data } = useFetcher();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!data) return;
    if (FormFieldErrorResponse.isError(data)) {
      setFieldErrors(data.error.fields);
      console.error('League creation failed:', data.error.fields);
      return;
    }

    if (data.success) {
      console.log('League created successfully:', data.league);
      navigate(`/leagues/${data.league.slug}`);
      return;
    }
  }, [data]);

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const allowInvite = data.allowInvite === 'on' ? true : false;
    const showLeaderboard = data.showLeaderboard === 'on' ? true : false;

    const payload = {
      name: data.name,
      description: data.description,
      privacy: data.privacy,
      allowInvite,
      showLeaderboard,
    };

    submit(JSON.stringify(payload), { method: 'POST', action: '/league/create', encType: 'application/json' });
  };

  return (
    <main className="col-span-9" id="main-content">
      <div className="bg-[#1A1D23] rounded-xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <FaArrowLeft className="text-white text-xl cursor-pointer" onClick={handleBack} />
          <h1 className="text-2xl text-white font-medium">Create New League</h1>
        </div>

        <form id="create-league-form" className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">League Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter league name"
                className="w-full bg-[#262931] text-white border border-neutral-700 rounded-lg p-3"
              />
              {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>}
            </div>

            <div>
              <label className="block text-white mb-2">League Description</label>
              <textarea
                placeholder="Describe your league"
                name="description"
                className="w-full bg-[#262931] text-white border border-neutral-700 rounded-lg p-3 h-32"
              ></textarea>
              {fieldErrors.description && <p className="text-red-500 text-sm mt-1">{fieldErrors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">League Type</label>
                <select name="privacy" className="w-full bg-[#262931] text-white border border-neutral-700 rounded-lg p-3">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">League Rules</label>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-[#262931] p-4 rounded-lg">
                  <input name="allowInvite" type="checkbox" className="w-5 h-5 rounded bg-neutral-700" />
                  <span className="text-white">Allow members to invite others</span>
                </div>
                <div className="flex items-center gap-3 bg-[#262931] p-4 rounded-lg">
                  <input name="showLeaderboard" type="checkbox" className="w-5 h-5 rounded bg-neutral-700" />
                  <span className="text-white">Show leaderboard to non-members</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button value="Cancel" linkTo="/league" onClick={handleBack} />
            <Button variant="submit" type="submit" value="Create League" />
          </div>
        </form>
      </div>
    </main>
  );
}
