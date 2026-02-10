export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connect Wallet',
      description: 'Link your Web3 wallet securely. We support MetaMask, WalletConnect, and more.',
    },
    {
      number: '02',
      title: 'Deposit Assets',
      description: 'Transfer your crypto assets to your MPDAO portfolio with zero fees.',
    },
    {
      number: '03',
      title: 'Manage & Govern',
      description: 'Control your portfolio, vote on decisions, and participate in the community.',
    },
    {
      number: '04',
      title: 'Earn & Grow',
      description: 'Benefit from platform rewards, staking incentives, and community dividends.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-5xl font-bold text-blue-100 mb-4">
                {step.number}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h4>
              <p className="text-gray-600">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 w-full h-1 bg-blue-200 -mr-8">
                  <div className="absolute right-full top-1/2 transform translate-y-1/2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
