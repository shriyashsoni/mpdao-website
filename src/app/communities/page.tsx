'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, ArrowRight, ExternalLink, MessageCircle, Send, Twitter } from 'lucide-react';

const communities = [
  {
    name: 'MP DAO Bhopal',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    members: '50+',
    description: 'The capital city chapter leading Web3 adoption in central India. Regular meetups, workshops, and hackathons.',
    telegram: 'https://t.me/mpdaobhopal',
    active: true,
    featured: true,
  },
  {
    name: 'MP DAO Indore',
    city: 'Indore',
    state: 'Madhya Pradesh',
    members: '30+',
    description: 'Commercial hub chapter driving blockchain innovation with a focus on DeFi and Web3 startups.',
    telegram: 'https://t.me/mpdaoindore',
    active: true,
    featured: true,
  },
  {
    name: 'MP DAO Jabalpur',
    city: 'Jabalpur',
    state: 'Madhya Pradesh',
    members: '20+',
    description: 'Growing community of builders, developers, and blockchain enthusiasts in the marble city.',
    telegram: 'https://t.me/mpdaojabalpur',
    active: true,
    featured: false,
  },
  {
    name: 'MP DAO Gwalior',
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    members: '15+',
    description: 'Historic city embracing the future of technology with Web3 education and community events.',
    telegram: 'https://t.me/mpdaogwalior',
    active: true,
    featured: false,
  },
  {
    name: 'MP DAO Vidisha',
    city: 'Vidisha',
    state: 'Madhya Pradesh',
    members: '10+',
    description: 'Emerging chapter with passionate Web3 learners exploring blockchain technology.',
    telegram: 'https://t.me/mpdaovidisha',
    active: true,
    featured: false,
  },
];

const socialLinks = [
  { name: 'Farcaster', icon: MessageCircle, href: 'https://farcaster.xyz/~/group/5MdpDf9A3g5b94lsnQaukA' },
  { name: 'Telegram', icon: Send, href: 'https://t.me/mpdao' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/mpdao' },
];

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 grid-pattern">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 mb-6">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Local Chapters</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Communities
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Join your local MP DAO chapter and connect with Web3 enthusiasts in your city. Together, we&apos;re building India&apos;s decentralized future.
            </p>

            {/* Global Social Links */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all duration-200"
                >
                  <social.icon size={18} />
                  <span className="text-sm font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Chapters', value: '5' },
              { label: 'Total Members', value: '125+' },
              { label: 'Cities', value: '5' },
              { label: 'Events Hosted', value: '10+' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-gray-900/50 border rounded-2xl p-6 transition-all duration-300 ${
                  community.featured
                    ? 'border-indigo-500/50 ring-1 ring-indigo-500/20'
                    : 'border-gray-800 hover:border-indigo-500/50'
                }`}
              >
                {community.featured && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-indigo-500 text-white text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {community.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin size={14} />
                      {community.city}, {community.state}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-400 text-sm">
                    <Users size={14} />
                    {community.members}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6">
                  {community.description}
                </p>

                <a
                  href={community.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white text-sm font-medium group-hover:text-indigo-400 transition-colors"
                >
                  <Send size={14} />
                  Join Telegram
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}

            {/* Start Your Chapter Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: communities.length * 0.1 }}
              className="group relative bg-gray-900/30 border border-dashed border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[240px] hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Start a Chapter
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Want to bring MP DAO to your city? We&apos;d love to help you start!
              </p>
              <a
                href="https://luma.com/mpdao?k=c"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors"
              >
                <ExternalLink size={14} />
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Growing Across India
            </h2>
            <p className="text-gray-400">
              Starting from Madhya Pradesh, expanding nationwide
            </p>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-gray-400">
              Interactive map coming soon. Currently active in 5 cities across Madhya Pradesh.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
