export default function Stats() {
  const stats = [
    { label: "Active DAOs", value: "2,500+" },
    { label: "Total Members", value: "50K+" },
    { label: "Assets Managed", value: "$1.2B+" },
    { label: "Transactions", value: "5M+" },
  ];

  return (
    <section className="px-6 py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white md:text-5xl">
                {stat.value}
              </div>
              <p className="mt-2 text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
