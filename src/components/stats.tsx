export default function Stats() {
  const stats = [
    { label: 'Active Users', value: '50,000+' },
    { label: 'Assets Under Management', value: '$2.5B+' },
    { label: 'Daily Transactions', value: '500K+' },
    { label: 'Member Countries', value: '150+' },
  ];

  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl sm:text-5xl font-bold mb-2">
                {stat.value}
              </p>
              <p className="text-blue-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
