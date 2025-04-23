import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { FaFlagCheckered } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import type { Meeting } from '~/server/static-data/static.types';

interface NextRaceComponentProps {
  meeting: Meeting;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
}

export const NextRaceComponent = (props: NextRaceComponentProps) => {
  const { meeting } = props;

  const navigate = useNavigate();

  const [countdown, setCountdown] = useState<Countdown>();

  const date = moment(meeting.startDate);
  const formattedDate = date.format('MMMM D, YYYY');

  useEffect(() => {
    const calculateAndSetCountdown = () => {
      const now = moment();
      const meetingDate = moment(meeting.startDate);
      const duration = moment.duration(meetingDate.diff(now));
      const days = Math.floor(duration.asDays());
      const hours = Math.floor(duration.asHours()) % 24;
      const minutes = Math.floor(duration.asMinutes()) % 60;

      setCountdown({
        days,
        hours,
        minutes,
      });
    };

    const timer = setInterval(calculateAndSetCountdown, 60000);
    calculateAndSetCountdown();
    return () => clearInterval(timer);
  }, [meeting.startDate]);

  const handlePredict = () => {
    navigate(`/predict/${meeting.year}/${meeting.id}`);
  };

  return (
    <section id="upcoming-race" className="bg-[#1A1D23] rounded-2xl p-8 border border-white/5 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-2/3 h-full opacity-10 z-10">
        <img
          className="w-full h-full object-cover pointer-events-none"
          src={meeting.circuit.imageUrl}
          alt="monaco grand prix track aerial view, dramatic lighting"
        />
      </div>
      <div className="z-20 relative">
        <h2 className="text-3xl text-white font-bold mb-8 flex items-center gap-3">
          <FaFlagCheckered className="text-red-500" />
          {meeting.name}
        </h2>
        <div className="grid grid-cols-4 gap-6 z-20">
          <div className="bg-[#262931] p-6 rounded-xl border border-white/5">
            <p className="text-neutral-400 mb-2 text-sm">Date</p>
            <p className="text-white text-lg font-bold">{formattedDate}</p>
          </div>
          <div className="bg-[#262931] p-6 rounded-xl border border-white/5">
            <p className="text-neutral-400 mb-2 text-sm">Time Until</p>
            <p className="text-white text-lg font-bold">
              {countdown?.days}D : {countdown?.hours}H : {countdown?.minutes}M
            </p>
          </div>
          <div className="bg-[#262931] p-6 rounded-xl border border-white/5">
            <p className="text-neutral-400 mb-2 text-sm">Your Prediction Status</p>
            <p className="text-yellow-500 text-lg font-bold flex items-center gap-2">
              <i className="fa-solid fa-clock"></i>
              Pending
            </p>
          </div>
          <div
            onClick={handlePredict}
            role="button"
            className="bg-gradient-to-r from-red-500/50 to-red-600/70 p-6 rounded-xl shadow-lg shadow-red-500/20 cursor-pointer hover:to-red-700/90 transition-all duration-200"
          >
            <button className="text-white w-full text-lg font-bold cursor-pointer">Make Prediction</button>
          </div>
        </div>
      </div>
    </section>
  );
};
