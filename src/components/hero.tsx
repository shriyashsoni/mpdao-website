export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Manage Assets
          <span className="block text-blue-600">Decentralized</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The leading platform for decentralized portfolio management and asset governance. Take control of your investments with transparency and security.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Launch App
          </button>
          <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
            Learn More
          </button>
        </div>

        {/* Hero Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <p className="text-3xl font-bold text-blue-600">50K+</p>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">$2.5B+</p>
            <p className="text-gray-600">Assets Under Management</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">99.9%</p>
            <p className="text-gray-600">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
