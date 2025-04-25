import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { FaFlagCheckered } from 'react-icons/fa';
import { FaCircleCheck, FaClock } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { tv } from 'tailwind-variants';
import type { Prediction } from '~/server/database/schemas/prediction.schema';
import type { Meeting } from '~/server/static-data/static.types';

interface NextRaceComponentProps {
  meeting: Meeting;
  prediction?: Prediction;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
}

const ctaVariants = tv({
  base: 'bg-gradient-to-r p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-200',
  variants: {
    variant: {
      create: 'from-green-500/50 to-green-600/70 hover:to-green-700/90 shadow-green-500/20',
      edit: 'from-blue-500/50 to-blue-600/70 hover:to-blue-700/90 shadow-blue-500/20',
      locked: 'from-red-500/50 to-red-600/70 hover:to-red-700/90 shadow-red-500/20',
    },
  },
});

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

  console.log('prediction:', props.prediction);

  const handlePredict = () => {
    navigate(`/predict/${meeting.year}/${meeting.id}`);
  };

  const ctaClassName = ctaVariants({
    variant: props.prediction ? 'edit' : 'create',
  });

  const ctaButton = (
    <div onClick={handlePredict} role="button" className={ctaClassName}>
      <button className="text-white w-full text-lg font-bold cursor-pointer">
        {props.prediction ? 'Edit Prediction' : 'Make Prediction'}
      </button>
    </div>
  );

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
            {props.prediction ? (
              <div className="flex items-center gap-2">
                <FaCircleCheck className="text-green-500" />
                <p className="text-green-500 text-lg font-bold">Submitted</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaClock className="text-yellow-500" />
                <p className="text-yellow-500 text-lg font-bold">Pending</p>
              </div>
            )}
          </div>
          {ctaButton}
        </div>
      </div>
    </section>
  );
};
