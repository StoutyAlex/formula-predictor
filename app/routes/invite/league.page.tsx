import { redirect, useFetcher, useNavigate } from 'react-router';
import { LeagueCollection } from '~/server/database/collections/league.collection';
import type { Route } from './+types/league.page';
import { UserCollection } from '~/server/database/collections/user.collection';
import { Button } from '~/components/button.component';
import moment from 'moment';
import { SessionService } from '~/server/services/session.service';

const url = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2509bb5eca-f792921744e1e3e79484.png';

export const meta = (params: Route.MetaArgs) => {
  const { data } = params;
  return [
    { title: 'Formula Predictor - Join League' },
    {
      property: 'og:title',
      content: "You've been invited to join a league!",
    },
    {
      name: 'description',
      content: `Join ${data.league.name} by ${data.owner.name}.`,
    },
  ];
};

export const loader = async (params: Route.LoaderArgs) => {
  const { request, params: parameters } = params;
  const leagueId = parameters.leagueId;
  if (!leagueId) {
    return redirect('/404');
  }

  const league = await LeagueCollection.findById(leagueId);
  if (!league) {
    return redirect('/404');
  }

  const owner = await UserCollection.findById(league.owner);
  if (!owner) {
    return redirect('/404');
  }

  const createdAt = moment(league.createdAt).format('MMMM, YYYY');

  const userSession = await SessionService.isValid(request);
  if (userSession && league.members.includes(userSession?.id)) {
    return redirect(`/league/${leagueId}`);
  }

  return {
    league: {
      id: league.id,
      name: league.name,
      description: league.description,
      members: league.members.length,
      createdAt,
    },
    owner: {
      name: owner.username,
    },
  };
};

export const action = async (params: Route.ActionArgs) => {
  const { request, params: parameters } = params;
  const leagueId = parameters.leagueId;
  if (!leagueId) {
    return redirect('/404');
  }

  const userSession = await SessionService.isValid(request);
  if (!userSession) {
    // TODO: Add redirect
    return redirect('/login');
  }

  const league = await LeagueCollection.findById(leagueId);
  if (!league) {
    return redirect('/404');
  }

  if (league.members.includes(userSession.id)) {
    return redirect(`/league/${leagueId}`);
  }

  league.members.push(userSession.id);

  const result = await LeagueCollection.update(leagueId, league);

  console.log('League updated', league, result);

  return redirect(`/league/${leagueId}`);
};

export default function LeagueInvitePage({ loaderData }: Route.ComponentProps) {
  const { league, owner } = loaderData;

  const { submit: joinLeague, data } = useFetcher();

  const handleJoinLeague = () => {
    console.log('Joining league', league.id);
    joinLeague({
      method: 'POST',
    });
  };

  return (
    <div className="min-h-screen bg-[#0E1015] flex items-center justify-center p-4" id="login-container">
      <div className="w-full max-w-[500px] lg:max-w-[1200px] flex rounded-2xl overflow-hidden shadow-2xl" id="login-wrapper">
        {/* Left Panel */}
        <div className="hidden lg:block w-1/2 relative" id="login-hero">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={url}
            alt="formula one racing car on track at night with dramatic lighting, motion blur, professional photography"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-black/50"></div>
          <div className="relative z-10 p-12 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-flag-checkered text-3xl text-white"></i>
              <span className="text-2xl font-bold text-white">Formula Predictor</span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white">You've Been Invited</h1>
            </div>
          </div>
        </div>
        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-[#1A1D23] p-6 sm:p-12" id="login-form-container">
          <div className="h-full">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl text-white mb-2">League Overview</h2>
              <p className="text-neutral-400 mb-8">You've been invited to join</p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#262931] p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=123"
                    alt="League Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-white text-xl">{league.name}</h3>
                    <p className="text-neutral-400">Created by {owner.name}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-neutral-300">
                    <i className="fa-solid fa-users"></i>
                    <span>{league.members} active members</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <i className="fa-solid fa-calendar"></i>
                    <span>Created {league.createdAt}</span>
                  </div>
                </div>
              </div>

              <form method="POST" onSubmit={handleJoinLeague} className="space-y-4">
                <Button value="Join League Now" type="submit" variant="submit" className="w-full py-3 justify-center" />
                {data && JSON.stringify(data, null, 2)}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
