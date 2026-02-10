export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create DAO",
      description: "Set up your decentralized autonomous organization with custom governance rules.",
    },
    {
      number: "02",
      title: "Invite Members",
      description: "Bring in community members and assign roles and permissions.",
    },
    {
      number: "03",
      title: "Deposit Assets",
      description: "Transfer digital assets to the DAO's secure multi-signature wallet.",
    },
    {
      number: "04",
      title: "Vote & Govern",
      description: "Make collective decisions through transparent and secure voting.",
    },
  ];

  return (
    <section id="how-it-works" className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            Get started in four simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="mb-4">
                <div className="inline-block text-4xl font-bold text-blue-600">
                  {step.number}
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-slate-600">{step.description}</p>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
