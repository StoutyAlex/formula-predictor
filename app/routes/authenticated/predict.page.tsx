import { SeasonService } from '~/server/services/season.service.server';
import type { Route } from './+types/predict.page';
import { s } from 'motion/react-m';
import { useEffect, useMemo, useState } from 'react';
import moment, { type Moment } from 'moment-timezone';
import { MeetingType, type Driver } from '~/server/static-data/static.types';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { DriverSelectList } from '~/components/driver-select-list.component';
import { FaListOl, FaMedal, FaTrophy } from 'react-icons/fa';
import { FaStopwatch } from 'react-icons/fa6';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface PositionPrediction {
  1: Driver;
  2: Driver;
  3: Driver;
  4: Driver;
  5: Driver;
  6: Driver;
  7: Driver;
  8: Driver;
  9: Driver;
  10: Driver;
  fastestLap: Driver;
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { year, meetingId } = params;

  if (!year || !meetingId) {
    // TODO: Handle error
    throw new Error('Year and meetingId are required');
  }

  const seasonService = SeasonService.year(year);
  if (!seasonService) {
    throw new Error(`No season service found for year ${year}`);
  }

  const meeting = seasonService.meetings.find((meeting) => meeting.id === meetingId);
  if (!meeting) {
    throw new Error(`No meeting found for id ${meetingId}`);
  }

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
  };
};

export default function PredictPage(params: Route.ComponentProps) {
  const { staticData } = params.loaderData;
  const { meeting, constructors, drivers, sessions } = staticData;

  const [time, setTime] = useState<Moment>();
  const [countdown, setCountdown] = useState<Countdown>();

  const [positionedDrivers, setPositionedDrivers] = useState<Partial<PositionPrediction>>();

  const formattedTime = time?.format('DD MMMM');
  const formattedTimeWithZone = time?.format('hh:mm a z');

  useEffect(() => {
    const timeToUse = sessions.sprintQualifying ? sessions.sprintQualifying.time : sessions.qualifying.time;
    const time = moment(timeToUse);
    const userTime = time.tz(Intl.DateTimeFormat().resolvedOptions().timeZone);

    setTime(userTime);
  }, [meeting.startDate]);

  useEffect(() => {
    if (!time) return;
    const timer = setInterval(() => {
      const diff = time.diff(moment(), 'seconds');

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const onPositionChange = (driver: Driver | undefined, position: keyof PositionPrediction) => {
    setPositionedDrivers((prev) => ({
      ...prev,
      [position]: driver,
    }));
  };

  const unPositionedDrivers = useMemo(() => {
    const unPositionedDrivers = drivers.filter((driver) => {
      const positionedExceptFastestLap = { ...positionedDrivers };
      delete positionedExceptFastestLap?.fastestLap;
      const positioned = Object.values(positionedExceptFastestLap || []);
      return !positioned.some((positionedDriver) => positionedDriver?.id === driver.id);
    });

    return unPositionedDrivers;
  }, [positionedDrivers, drivers]);

  // TODO: Only 1 col in predictions section on small screens
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
                selected={positionedDrivers?.fastestLap}
                placeholder="Fastest Lap - Select Driver"
                values={drivers}
                onChange={(driver) => onPositionChange(driver, 'fastestLap')}
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
          <button className="bg-[#262931] text-white px-8 py-4 rounded-xl border border-white/5 hover:bg-[#2d3039] transition-all duration-300">
            Save Draft
          </button>
          <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl shadow-lg shadow-red-500/20">
            Submit Predictions
          </button>
        </div>
      </div>
    </div>
  );
}
