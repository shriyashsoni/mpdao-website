export default function Features() {
  const features = [
    {
      title: 'Full Decentralization',
      description: 'No central authority. Your assets, your rules. Complete control over your portfolio decisions.',
    },
    {
      title: 'Advanced Security',
      description: 'Multi-signature wallets, audit-verified smart contracts, and institutional-grade security protocols.',
    },
    {
      title: 'Real-Time Analytics',
      description: 'Track performance, analyze trends, and make data-driven decisions with powerful dashboards.',
    },
    {
      title: 'Community Governance',
      description: 'Vote on platform decisions, propose changes, and shape the future of MPDAO.',
    },
    {
      title: 'Lightning Fast',
      description: 'Built on optimized infrastructure for instant transactions and seamless user experience.',
    },
    {
      title: 'Cross-Chain Support',
      description: 'Manage assets across multiple blockchains in one unified interface.',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for professional asset management and decentralized governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition hover:border-blue-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
