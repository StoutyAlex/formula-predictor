export function meta() {
  return [{ title: 'Formula Predictor - Home' }, { name: 'description', content: 'Formula Predictor Home page' }];
}

export default function DashboardPage() {
  return (
    <>
      <section id="upcoming-race" className="bg-[#1A1D23] rounded-xl p-6 @container/next">
        <h2 className="text-2xl text-white mb-6">Next Race: Monaco Grand Prix</h2>
        <div className="grid col-span-full grid-cols-1 @[450px]:grid-cols-3! gap-6">
          <div className="bg-[#262931] p-4 rounded-lg">
            <p className="text-neutral-400 mb-2">Date</p>
            <p className="text-white">May 26, 2025</p>
          </div>
          <div className="bg-[#262931] p-4 rounded-lg">
            <p className="text-neutral-400 mb-2">Time Until</p>
            <p className="text-white">2D : 15H : 30M</p>
          </div>
          <div className="bg-[#262931] p-4 rounded-lg">
            <p className="text-neutral-400 mb-2">Your Prediction Status</p>
            <p className="text-neutral-500">Pending</p>
          </div>
        </div>
      </section>

      <section id="my-leagues" className="bg-[#1A1D23] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white">My Leagues</h2>
          <div className="flex gap-4">
            <button className="bg-[#262931] text-white px-4 py-2 rounded-lg">Join League</button>
            <button className="bg-[#262931] text-white px-4 py-2 rounded-lg">Create League</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#262931] p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-trophy text-2xl text-neutral-500"></i>
              <div>
                <h3 className="text-white">Pro Predictors League</h3>
                <p className="text-neutral-400">32 Members</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white">Rank: #3</p>
              <p className="text-neutral-400">850 Points</p>
            </div>
          </div>
          <div className="bg-[#262931] p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-users text-2xl text-neutral-500"></i>
              <div>
                <h3 className="text-white">Friends & Family</h3>
                <p className="text-neutral-400">12 Members</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white">Rank: #1</p>
              <p className="text-neutral-400">920 Points</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
