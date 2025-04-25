import { FaArrowLeft } from 'react-icons/fa';
import { redirect, useFetcher, useNavigate } from 'react-router';
import { Button } from '~/components/button.component';
import type { Route } from './+types/join.page';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FormErrorResponse } from '~/lib/errors/form-error.response';
import { LeagueCollection } from '~/server/database/collections/league.collection';
import { SessionService } from '~/server/services/session.service';

export const action = async ({ request }: Route.ActionArgs) => {
  const userSession = await SessionService.isValid(request);
  if (!userSession) {
    return redirect('/login');
  }

  const userId = userSession.id;

  const json = await request.json();
  const { leagueCode } = json;

  console.log('League code:', leagueCode);

  if (!leagueCode) {
    return new FormErrorResponse({
      message: 'No league found',
    });
  }

  const league = await LeagueCollection.findByCode(leagueCode);
  if (!league) {
    return new FormErrorResponse({
      message: 'League not found',
    });
  }
  if (league.members.includes(userId)) {
    // do this in the loader - redirect to league page
    return new FormErrorResponse({
      message: 'You are already a member of this league',
    });
  }

  league.members.push(userId);

  const updatedLeague = await LeagueCollection.update(league._id, league);
  if (!updatedLeague) {
    return new FormErrorResponse({
      message: 'Error joining league',
    });
  }

  return redirect(`/league/${league._id}`);
};

export default function JoinLeaguePage() {
  const navigate = useNavigate();

  const { submit: joinLeague } = useFetcher();

  const [codePart1, setCodePart1] = useState<string>();
  const [codePart2, setCodePart2] = useState<string>();

  const handleCodePart1Change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCodePart1(value);
  };

  const handleCodePart2Change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCodePart2(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      leagueCode: `${codePart1}-${codePart2}`,
    };

    joinLeague(JSON.stringify(payload), { method: 'POST', action: '/league/join', encType: 'application/json' });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main className="col-span-9" id="main-content">
      <div className="bg-[#1A1D23] rounded-xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <FaArrowLeft className="text-white text-xl cursor-pointer" onClick={handleBack} />
          <h1 className="text-2xl text-white font-medium">Join League</h1>
        </div>

        <form id="join-league-form" className="max-w-lg mx-auto space-y-8" onSubmit={handleSubmit}>
          <div className="text-center space-y-4">
            <i className="fa-solid fa-users-rectangle text-4xl text-white"></i>
            <h2 className="text-xl text-white">Enter League Code</h2>
            <p className="text-neutral-400">Enter the 8-digit code provided by the league admin</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white mb-2">League Code</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="XXXX"
                  onChange={handleCodePart1Change}
                  value={codePart1}
                  className="w-1/2 bg-[#262931] text-white border border-neutral-700 rounded-lg p-3 text-center text-xl tracking-widest"
                />
                <span className="flex items-center text-white text-xl">-</span>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="XXXX"
                  onChange={handleCodePart2Change}
                  value={codePart2}
                  className="w-1/2 bg-[#262931] text-white border border-neutral-700 rounded-lg p-3 text-center text-xl tracking-widest"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" variant="submit" value="Join League" className="w-full px-6 py-3 justify-center" />
              {/* <button type="button" className="text-neutral-400 hover:text-white">
                Don't have a code? Create your own league
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
