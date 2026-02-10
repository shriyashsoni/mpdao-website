export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-2">
          <span className="text-sm font-semibold text-blue-700">
            Decentralized Portfolio Management
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
          Manage Assets{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Decentralized
          </span>
        </h1>

        <p className="mb-8 text-lg leading-8 text-slate-600 md:text-xl">
          MPDAO empowers communities to collectively manage and govern digital assets
          with transparency, security, and efficiency. Take control of your financial future.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row items-center justify-center">
          <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg hover:shadow-xl">
            Launch App
          </button>
          <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-slate-900 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg transition-colors">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 border-t border-slate-200 pt-12">
          <div>
            <div className="text-3xl font-bold text-slate-900">10K+</div>
            <p className="text-sm text-slate-600">Active Members</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">$500M+</div>
            <p className="text-sm text-slate-600">Assets Under Management</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-slate-900">99.9%</div>
            <p className="text-sm text-slate-600">Uptime SLA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
