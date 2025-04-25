import { redirect } from 'react-router';
import type { Route } from './+types/id.page';
import { SessionService } from '~/server/services/session.service';
import { LeagueCollection } from '~/server/database/collections/league.collection';
import { UserCollection } from '~/server/database/collections/user.collection';
import { useCallback } from 'react';
import { FaCrown, FaUsers } from 'react-icons/fa6';
import { Button } from '~/components/button.component';

export const loader = async (params: Route.LoaderArgs) => {
  const userId = await SessionService.getUserId(params.request);
  if (!userId) {
    return redirect('/login');
  }

  const leagueId = params.params.leagueId;
  if (!leagueId) {
    console.error('No League ID provided');
    return redirect('/dashboard');
  }

  const league = await LeagueCollection.findById(leagueId);
  if (!league) {
    console.error('Could not find league with id:', leagueId);
    return redirect('/dashboard');
  }

  const leagueJson = league.toJSON();
  if (!leagueJson.members.includes(userId)) {
    console.error('You are not a member of this league');
    return redirect('/leagues');
  }

  const members = await Promise.all(
    leagueJson.members.map(async (memberId) => {
      const member = await UserCollection.findById(memberId);
      if (!member) {
        return null;
      }
      return {
        id: member._id,
        username: member.username,
        profile: member.profile,
      };
    })
  );

  if (members.some((member) => member === null)) {
    console.error('One or more members not found');
    return redirect('/dashboard');
  }

  const owner = members.find((member) => member?.id === league.owner);
  if (!owner) {
    return redirect('/dashboard');
  }

  return {
    league: leagueJson,
    owner,
    members,
  };
};

export default function LeaguePage(params: Route.ComponentProps) {
  const { league, owner } = params.loaderData;

  const generateInviteLink = useCallback(async () => {
    const url = new URL(window.location.protocol + '//' + window.location.host);
    url.pathname = `/invite/league/${league._id}`;
    await navigator.clipboard.writeText(url.href);
    alert('Invite link copied to clipboard!');
  }, []);

  return (
    <main className="col-span-9 space-y-6" id="main-content">
      <section id="league-header" className="bg-[#1A1D23] rounded-2xl p-6 border border-white/5">
        <div className="flex justify-between lg:items-center sm:flex-row flex-col">
          <div>
            <h2 className="text-3xl text-white font-bold flex items-center gap-3">{league.name}</h2>
            <p className="text-neutral-400 mt-2">Created by {owner.username}</p>
            <p className='text-neutral-400'>Est: April 28, 2025</p>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0 max-h-10">
            {/* <button className="bg-[#262931] text-white px-6 py-3 rounded-xl border border-white/5 hover:bg-[#2d3039] transition-all duration-300">
              <i className="fa-solid fa-share-nodes mr-2"></i>
              Share
            </button> */}
            <Button type="submit" variant="submit" value="Invite Members" icon={FaUsers} onClick={generateInviteLink} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section id="league-stats" className="bg-[#1A1D23] rounded-2xl p-6 border border-white/5">
          <h3 className="text-xl text-white font-bold mb-6">League Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#262931] p-4 rounded-xl border border-white/5">
              <p className="text-neutral-400 text-sm">Total Members</p>
              <p className="text-white text-2xl font-bold">{league.members.length}</p>
            </div>
            <div className="bg-[#262931] p-4 rounded-xl border border-white/5">
              <p className="text-neutral-400 text-sm">Your Position</p>
              <p className="text-white text-2xl font-bold">#3</p>
            </div>
            <div className="bg-[#262931] p-4 rounded-xl border border-white/5">
              <p className="text-neutral-400 text-sm">Your Points</p>
              <p className="text-red-500 text-2xl font-bold">850</p>
            </div>
            <div className="bg-[#262931] p-4 rounded-xl border border-white/5">
              <p className="text-neutral-400 text-sm">Points to 1st</p>
              <p className="text-white text-2xl font-bold">70</p>
            </div>
          </div>
        </section>

        <section id="achievement" className="bg-[#1A1D23] rounded-2xl p-6 border border-white/5">
          <h3 className="text-xl text-white font-bold mb-6">Latest Achievement</h3>
          <div className="bg-[#262931] p-6 rounded-xl border border-white/5 flex items-center gap-6">
            <div className="bg-yellow-500/20 p-4 rounded-xl">
              <FaCrown className="text-yellow-500 text-4xl" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">New Race Winner</h4>
              <p className="text-neutral-400">Correctly predicted Charles Leclerc's first win of the season</p>
              <p className="text-yellow-500 mt-2">+200 bonus points</p>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section id="top-members" className="bg-[#1A1D23] rounded-2xl p-6 border border-white/5">
          <h3 className="text-xl text-white font-bold mb-6">Top Members</h3>
          <div className="space-y-4">
            <div className="bg-[#262931] p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-yellow-500 font-bold">#1</span>
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  alt="Member"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-white">Michael Shoemaker</span>
              </div>
              <span className="text-red-500 font-bold">920 pts</span>
            </div>
            <div className="bg-[#262931] p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-neutral-400 font-bold">#2</span>
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                  alt="Member"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-white">Max Verstrapon</span>
              </div>
              <span className="text-red-500 font-bold">875 pts</span>
            </div>
            <div className="bg-[#262931] p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-amber-800 font-bold">#3</span>
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  alt="Member"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-white">John Hamilton</span>
              </div>
              <span className="text-red-500 font-bold">850 pts</span>
            </div>
          </div>
        </section>

        <section id="popular-picks" className="bg-[#1A1D23] rounded-2xl p-6 border border-white/5">
          <h3 className="text-xl text-white font-bold mb-6">Most Popular Picks</h3>
          <div className="space-y-6">
            <div>
              <p className="text-neutral-400 mb-2">Top Drivers</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="bg-[#262931] p-3 rounded-xl border border-white/5 flex-1 text-center">
                  <p className="text-white font-bold">Verstappen</p>
                  <p className="text-neutral-400 text-sm">65%</p>
                </div>
                <div className="bg-[#262931] p-3 rounded-xl border border-white/5 flex-1 text-center">
                  <p className="text-white font-bold">Hamilton</p>
                  <p className="text-neutral-400 text-sm">20%</p>
                </div>
                <div className="bg-[#262931] p-3 rounded-xl border border-white/5 flex-1 text-center">
                  <p className="text-white font-bold">Leclerc</p>
                  <p className="text-neutral-400 text-sm">15%</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-neutral-400 mb-2">Top Constructors</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="bg-[#262931] p-3 rounded-xl border border-white/5 flex-1 text-center">
                  <p className="text-white font-bold">Red Bull</p>
                  <p className="text-neutral-400 text-sm">70%</p>
                </div>
                <div className="bg-[#262931] p-3 rounded-xl border border-white/5 flex-1 text-center">
                  <p className="text-white font-bold">Ferrari</p>
                  <p className="text-neutral-400 text-sm">20%</p>
                </div>
                <div className="bg-[#262931] p-3 rounded-xl border border-white/5 flex-1 text-center">
                  <p className="text-white font-bold">Mercedes</p>
                  <p className="text-neutral-400 text-sm">10%</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
