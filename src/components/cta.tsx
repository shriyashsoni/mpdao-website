export default function CTA() {
  return (
    <section className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-blue-50 to-slate-50 p-12 text-center border border-blue-200">
        <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Ready to Get Started?
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          Join thousands of communities already using MPDAO to manage assets collectively.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <button className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Launch App Now
          </button>
          <button className="px-8 py-4 text-lg font-semibold text-blue-600 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-colors">
            View Documentation
          </button>
        </div>
      </div>
    </section>
  );
}
