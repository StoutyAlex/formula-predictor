import { Button } from '~/components/button.component';
import type { Route } from './+types/dashboard.page';
import { SessionService } from '~/server/services/session.service';
import { Link, redirect } from 'react-router';
import { LeagueCollection } from '~/server/database/collections/league.collection';
import { NextRaceComponent } from '~/components/dashboard/next-race.component';
import { SeasonService } from '~/server/services/season.service.server';
import moment from 'moment';
import { PredictionCollection } from '~/server/database/collections/prediction.schema';

export function meta() {
  return [{ title: 'Formula Predictor - Home' }, { name: 'description', content: 'Formula Predictor Home page' }];
}

export const loader = async (params: Route.LoaderArgs) => {
  const userId = await SessionService.getUserId(params.request);
  if (!userId) throw redirect('/login');

  const leagues = await LeagueCollection.getAllForUser(userId);

  const now = moment();
  const year = now.year().toString();

  const seasonService = SeasonService.year(year);
  if (!seasonService) {
    throw new Error(`No season service found for year ${year}`);
  }

  // find meeting that falls is after current time now
  const meeting = seasonService.meetings.find((meeting) => {
    const meetingDate = moment(meeting.endDate);
    return meetingDate.isAfter(now);
  });

  if (!meeting) {
    throw new Error(`No meeting found for year ${year}`);
  }

  const predictions = await PredictionCollection.getAllForUserWithYear(userId, year);

  return {
    leagues,
    meeting,
    predictions,
  };
};

export default function DashboardPage(params: Route.ComponentProps) {
  const { leagues, meeting, predictions } = params.loaderData;

  const nextPrediction = predictions.find((prediction) => {
    return prediction.meetingId === meeting.id;
  });

  return (
    <>
      <NextRaceComponent meeting={meeting} prediction={nextPrediction} />

      <section id="my-leagues" className="bg-[#1A1D23] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white">My Leagues</h2>
          <div className="flex gap-4">
            <Button linkTo="/league/join" value="Join League" />
            <Button linkTo="/league/create" value="Create League" />
          </div>
        </div>
        <div className="space-y-4">
          {leagues.map((league) => (
            <div key={league._id} className="bg-[#262931] p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-users text-2xl text-neutral-500"></i>
                <div>
                  <Link to={`/league/${league._id}`}>
                    <h3 className="text-white">{league.name}</h3>
                  </Link>
                  <p className="text-neutral-400">{league.members.length} Members</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white">Rank: #1</p>
                <p className="text-neutral-400">123 Points</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
