import { SeasonService } from '~/server/services/season.service.server';
import type { Route } from './+types/predict.page';
import { useCallback, useEffect, useMemo, useState } from 'react';
import moment, { type Moment } from 'moment-timezone';
import { MeetingType, type Driver } from '~/server/static-data/static.types';
import { DriverSelectList } from '~/components/driver-select-list.component';
import { FaListOl, FaMedal, FaTrophy } from 'react-icons/fa';
import { FaStopwatch } from 'react-icons/fa6';
import { redirect, useFetcher, useNavigate, type ShouldRevalidateFunctionArgs } from 'react-router';
import type { Positions, Predictions } from '~/server/database/schemas/prediction.schema';
import { z } from 'zod';
import { SessionService } from '~/server/services/session.service';
import { FormErrorResponse } from '~/lib/errors/form-error.response';
import { PredictionCollection } from '~/server/database/collections/prediction.schema';
import { Button } from '~/components/button.component';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type PositionedDrivers = Positions<Driver>;

export const createPredictionSchema = z.object({
  predictions: z.object({
    fastestLap: z.string(),
    positions: z.object({
      1: z.string(),
      2: z.string(),
      3: z.string(),
      4: z.string(),
      5: z.string(),
      6: z.string(),
      7: z.string(),
      8: z.string(),
      9: z.string(),
      10: z.string(),
    }),
  }),
});

export const updatePredictionSchema = createPredictionSchema.extend({
  id: z.string(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const userId = await SessionService.getUserId(request);
  if (!userId) {
    return redirect('/login');
  }

  const { year, meetingId } = params;
  if (!year || !meetingId) {
    throw new Error('Unexpected error: year and meetingId are required');
  }

  const json = await request.json();

  if (request.method === 'PUT') {
    const { success, data, error } = updatePredictionSchema.safeParse(json);
    if (!success && error) {
      return new FormErrorResponse({
        message: 'Error updating prediction',
      });
    }

    const existingPrediction = await PredictionCollection.findById(data.id);
    if (!existingPrediction) {
      return new FormErrorResponse({
        message: 'Error updating prediction',
      });
    }

    const newPrediction = {
      ...existingPrediction.toJSON(),
      predictions: data.predictions,
    };

    const updatedPrediction = await PredictionCollection.update(data.id, newPrediction);

    return {
      success: true,
      prediction: updatedPrediction,
    };
  }

  const { success, data, error } = createPredictionSchema.safeParse(json);
  if (!success && error) {
    return new FormErrorResponse({
      message: 'Error creating prediction',
    });
  }

  const prediction = await PredictionCollection.create({
    year,
    meetingId,
    owner: userId,
    predictions: data.predictions,
  });

  if (!prediction) {
    return new FormErrorResponse({
      message: 'Error creating prediction',
    });
  }

  return {
    success: true,
    prediction,
  };
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { year, meetingId } = params;

  const userId = await SessionService.getUserId(request);
  if (!userId) {
    return redirect('/login');
  }

  if (!year || !meetingId) {
    throw new Error('Unexpected error: year and meetingId are required');
  }

  const seasonService = SeasonService.year(year);
  if (!seasonService) {
    throw new Error(`No season service found for year ${year}`);
  }

  const meeting = seasonService.meetings.find((meeting) => meeting.id === meetingId);
  if (!meeting) {
    throw new Error(`No meeting found for id ${meetingId}`);
  }

  const existingPrediction = await PredictionCollection.findOne(year, meetingId, userId);

  const constructors = seasonService.constructors;
  const drivers = seasonService.drivers;

  const raceSession = meeting.sessions.find((session) => session.type === MeetingType.RACE);
  const qualifyingSession = meeting.sessions.find((session) => session.type === MeetingType.QUALIFYING);
  const sprintQualifyingSession = meeting.sessions.find((session) => session.type === MeetingType.SPRINT_QUALIFYING);
  const sprintSession = meeting.sessions.find((session) => session.type === MeetingType.SPRINT);

  const staticData = {
    meeting,
    constructors,
    drivers,
    sessions: {
      race: raceSession!,
      qualifying: qualifyingSession!,
      sprintQualifying: sprintQualifyingSession,
      sprint: sprintSession,
    },
  };

  return {
    staticData,
    existingPrediction: existingPrediction?.toJSON(),
  };
};

export const shouldRevalidate = (params: ShouldRevalidateFunctionArgs) => {
  if (params.currentUrl === params.nextUrl) {
    return true;
  }

  return false;
};

export default function PredictPage(params: Route.ComponentProps) {
  const { staticData, existingPrediction } = params.loaderData;
  const { meeting, constructors, drivers } = staticData;

  const navigate = useNavigate();

  const { submit: createPrediction, state, data: actionResponse } = useFetcher<typeof action>();

  if (actionResponse?.success) {
    navigate('/dashboard');
  }

  const [time, setTime] = useState<Moment>();
  const [countdown, setCountdown] = useState<Countdown>();

  const getDriverById = useMemo(() => {
    return (id?: string) => {
      if (!id) return undefined;
      const driver = drivers.find((driver) => driver.id === id);
      return driver;
    };
  }, [drivers]);

  const initialPositionedDrivers: Partial<PositionedDrivers> | undefined = existingPrediction?.predictions && {
    1: getDriverById(existingPrediction?.predictions.positions[1]),
    2: getDriverById(existingPrediction?.predictions.positions[2]),
    3: getDriverById(existingPrediction?.predictions.positions[3]),
    4: getDriverById(existingPrediction?.predictions.positions[4]),
    5: getDriverById(existingPrediction?.predictions.positions[5]),
    6: getDriverById(existingPrediction?.predictions.positions[6]),
    7: getDriverById(existingPrediction?.predictions.positions[7]),
    8: getDriverById(existingPrediction?.predictions.positions[8]),
    9: getDriverById(existingPrediction?.predictions.positions[9]),
    10: getDriverById(existingPrediction?.predictions.positions[10]),
  };

  const [fastestLap, setFastestLap] = useState<Driver | undefined>(getDriverById(existingPrediction?.predictions.fastestLap));
  const [positionedDrivers, setPositionedDrivers] = useState<Partial<PositionedDrivers | undefined>>(initialPositionedDrivers);

  const formattedTime = time?.format('DD MMMM');
  const formattedTimeWithZone = time?.format('hh:mm a z');

  const handleSubmit = useCallback(() => {
    if (!fastestLap) {
      console.error('No fastest lap driver');
      return;
    }

    const drivers = Object.values(positionedDrivers || {}).filter((driver) => driver !== undefined) as Driver[];
    if (drivers.length < 10) {
      console.error('Not enough drivers selected');
      return;
    }

    const predictions: Predictions = {
      fastestLap: fastestLap.id,
      positions: {
        1: drivers[0].id,
        2: drivers[1].id,
        3: drivers[2].id,
        4: drivers[3].id,
        5: drivers[4].id,
        6: drivers[5].id,
        7: drivers[6].id,
        8: drivers[7].id,
        9: drivers[8].id,
        10: drivers[9].id,
      },
    };

    if (existingPrediction) {
      createPrediction(JSON.stringify({ id: existingPrediction._id, predictions }), {
        method: 'put',
        encType: 'application/json',
      });
      return;
    }

    createPrediction(JSON.stringify({ predictions }), { method: 'post', encType: 'application/json' });
  }, [fastestLap, positionedDrivers, existingPrediction]);

  // useEffect(() => {
  //   const timeToUse = sessions.sprintQualifying ? sessions.sprintQualifying.time : sessions.qualifying.time;
  //   const time = moment(timeToUse);
  //   const userTime = time.tz(Intl.DateTimeFormat().resolvedOptions().timeZone);

  //   setTime(userTime);
  // }, [meeting.startDate]);

  // useEffect(() => {
  //   if (!time) return;
  //   const timer = setInterval(() => {
  //     const diff = time.diff(moment(), 'seconds');

  //     const days = Math.floor(diff / 86400);
  //     const hours = Math.floor((diff % 86400) / 3600);
  //     const minutes = Math.floor((diff % 3600) / 60);
  //     const seconds = diff % 60;

  //     setCountdown({
  //       days,
  //       hours,
  //       minutes,
  //       seconds,
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [time]);

  const onFastestLapChange = (driver: Driver | undefined) => {
    setFastestLap(driver);
  };

  const onPositionChange = (driver: Driver | undefined, position: keyof PositionedDrivers) => {
    setPositionedDrivers((prev) => ({
      ...prev,
      [position]: driver,
    }));
  };

  const unPositionedDrivers = useMemo(() => {
    const unPositionedDrivers = drivers.filter((driver) => {
      const positioned = Object.values(positionedDrivers || []);
      return !positioned.some((positionedDriver) => positionedDriver?.id === driver.id);
    });

    return unPositionedDrivers;
  }, [positionedDrivers, drivers]);

  return (
    <div className="container">
      <div className="bg-[#1A1D23] rounded-2xl p-8 border border-white/5" id="prediction-form">
        <div className="flex items-center justify-between mb-8 lg:flex-row flex-col gap-4">
          <div className="flex flex-col w-full lg:w-auto">
            <h1 className="text-3xl text-white font-bold w-full">{meeting.name}</h1>
            <p className="text-neutral-400 w-full">
              Make your predictions before {formattedTime} {formattedTimeWithZone}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#262931] px-4 py-2 rounded-xl">
            <i className="fa-solid fa-clock text-yellow-500"></i>
            <span className="text-white font-bold">
              {countdown?.days}D : {countdown?.hours}H : {countdown?.minutes}M : {countdown?.seconds}S
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8" id="main-predictions">
            <div className="bg-[#262931] p-6 rounded-xl border border-white/5" id="race-winner">
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-4">
                <FaTrophy className="text-yellow-500" /> <span>Race Winner</span>
              </h3>
              <DriverSelectList
                constructors={constructors}
                selected={positionedDrivers?.[1]}
                placeholder="Race Winner - Select Driver"
                values={unPositionedDrivers}
                onChange={(driver) => onPositionChange(driver, 1)}
              />
            </div>

            <div className="bg-[#262931] p-6 rounded-xl border border-white/5" id="podium-prediction">
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-4">
                <FaMedal className="text-red-500" /> <span>Podium Prediction</span>
              </h3>
              <div className="space-y-4">
                <DriverSelectList
                  constructors={constructors}
                  selected={positionedDrivers?.[1]}
                  placeholder="P1 - Select Driver"
                  values={unPositionedDrivers}
                  onChange={(driver) => onPositionChange(driver, 1)}
                />
                <DriverSelectList
                  constructors={constructors}
                  selected={positionedDrivers?.[2]}
                  placeholder="P2 - Select Driver"
                  values={unPositionedDrivers}
                  onChange={(driver) => onPositionChange(driver, 2)}
                />
                <DriverSelectList
                  constructors={constructors}
                  selected={positionedDrivers?.[3]}
                  placeholder="P3 - Select Driver"
                  values={unPositionedDrivers}
                  onChange={(driver) => onPositionChange(driver, 3)}
                />
              </div>
            </div>

            <div className="bg-[#262931] p-6 rounded-xl border border-white/5" id="constructor-points">
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-4">
                <FaStopwatch className="text-purple-500" /> <span>Fastest Lap</span>
              </h3>
              <DriverSelectList
                constructors={constructors}
                selected={fastestLap}
                placeholder="Fastest Lap - Select Driver"
                values={drivers}
                onChange={onFastestLapChange}
              />
            </div>
          </div>

          <div className="space-y-8" id="additional-predictions">
            <div className="bg-[#262931] p-6 rounded-xl border border-white/5" id="top-10">
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-4">
                <FaListOl className="text-green-500" /> <span>Points Prediction</span>
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <DriverSelectList
                    constructors={constructors}
                    selected={positionedDrivers?.[4]}
                    placeholder="P4 - Select Driver"
                    values={unPositionedDrivers}
                    onChange={(driver) => onPositionChange(driver, 4)}
                  />
                  <DriverSelectList
                    constructors={constructors}
                    selected={positionedDrivers?.[5]}
                    placeholder="P5 - Select Driver"
                    values={unPositionedDrivers}
                    onChange={(driver) => onPositionChange(driver, 5)}
                  />
                  <DriverSelectList
                    constructors={constructors}
                    selected={positionedDrivers?.[6]}
                    placeholder="P6 - Select Driver"
                    values={unPositionedDrivers}
                    onChange={(driver) => onPositionChange(driver, 6)}
                  />
                  <DriverSelectList
                    constructors={constructors}
                    selected={positionedDrivers?.[7]}
                    placeholder="P7 - Select Driver"
                    values={unPositionedDrivers}
                    onChange={(driver) => onPositionChange(driver, 7)}
                  />
                  <DriverSelectList
                    constructors={constructors}
                    selected={positionedDrivers?.[8]}
                    placeholder="P8 - Select Driver"
                    values={unPositionedDrivers}
                    onChange={(driver) => onPositionChange(driver, 8)}
                  />
                  <DriverSelectList
                    constructors={constructors}
                    selected={positionedDrivers?.[9]}
                    placeholder="P9 - Select Driver"
                    values={unPositionedDrivers}
                    onChange={(driver) => onPositionChange(driver, 9)}
                  />
                  <DriverSelectList
                    constructors={constructors}
                    selected={positionedDrivers?.[10]}
                    placeholder="P10 - Select Driver"
                    values={unPositionedDrivers}
                    onChange={(driver) => onPositionChange(driver, 10)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8 gap-4" id="submission-buttons">
          <Button value="Cancel" linkTo="/dashboard" className='py-4' />
          <Button
            loading={state !== 'idle'}
            onClick={handleSubmit}
            className="py-4"
            value={existingPrediction ? 'Update Prediction' : 'Submit Prediction'}
            variant="submit"
          />
        </div>
      </div>
    </div>
  );
}
