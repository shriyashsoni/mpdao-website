export default function Features() {
  const features = [
    {
      icon: "🔒",
      title: "Security First",
      description: "Multi-signature wallets and advanced security protocols protect your assets.",
    },
    {
      icon: "🌐",
      title: "Decentralized",
      description: "No single point of failure. Complete control through smart contracts.",
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Real-time portfolio tracking and comprehensive reporting tools.",
    },
    {
      icon: "⚡",
      title: "Fast & Efficient",
      description: "Lightning-fast transactions with minimal fees and maximum throughput.",
    },
    {
      icon: "🤝",
      title: "Community Governed",
      description: "Democratic decision-making with transparent voting mechanisms.",
    },
    {
      icon: "🔄",
      title: "Interoperable",
      description: "Works seamlessly across multiple blockchains and protocols.",
    },
  ];

  return (
    <section id="features" className="px-6 py-20 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to manage assets collectively and securely.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-8 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
