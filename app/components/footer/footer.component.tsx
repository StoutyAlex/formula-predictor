import { FaFlagCheckered } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-[#1A1D23] py-12" id="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className='col-span-2'>
            <div className="flex items-center gap-3 mb-6">
              <FaFlagCheckered className="text-2xl text-white" />
              <span className="text-xl font-bold text-white">Formula Predictor</span>
            </div>
            <p className="text-gray-400">The ultimate Formula 1 prediction platform for true fans.</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Formula Predictor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
