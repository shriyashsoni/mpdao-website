export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Take Control?
        </h3>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of users managing their assets with confidence and transparency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
            Launch App Now
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-blue-600 transition font-semibold">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}
