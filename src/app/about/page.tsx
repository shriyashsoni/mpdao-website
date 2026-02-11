'use client';

import { motion } from 'framer-motion';
import { Heart, Target, Lightbulb, Users, Globe, Shield, Eye, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Globe,
    title: 'Decentralized',
    description: 'No single point of control. Power distributed across the community, ensuring resilience and fairness.',
  },
  {
    icon: Users,
    title: 'Open Access',
    description: 'Anyone can participate, learn, and contribute. We believe Web3 should be accessible to everyone.',
  },
  {
    icon: Shield,
    title: 'Community-Owned',
    description: 'Built by the community, for the community. Every member has a voice in shaping our future.',
  },
  {
    icon: Eye,
    title: 'Privacy-Oriented',
    description: 'Your data belongs to you. We respect and protect individual privacy at every level.',
  },
  {
    icon: Lock,
    title: 'Censorship Resistant',
    description: 'Free expression without fear. No central authority to silence voices or control information.',
  },
  {
    icon: Heart,
    title: 'Inclusive',
    description: 'Welcoming builders from all backgrounds. Diversity strengthens our ecosystem.',
  },
];

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'completed',
    items: ['Launch MP DAO community', 'Establish local chapters in 5 cities', 'Host initial meetups and workshops'],
  },
  {
    phase: 'Phase 2',
    title: 'Growth',
    status: 'current',
    items: ['Expand to 10+ cities', 'Launch education programs', 'Partner with universities', 'Host hackathons'],
  },
  {
    phase: 'Phase 3',
    title: 'Scale',
    status: 'upcoming',
    items: ['DAO governance implementation', 'Token-gated communities', 'NFT contributor badges', 'Pan-India expansion'],
  },
  {
    phase: 'Phase 4',
    title: 'Ecosystem',
    status: 'upcoming',
    items: ['Support Web3 startups', 'Developer grants program', 'On-chain governance', 'Global partnerships'],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 grid-pattern">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 mb-6">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-300">About MP DAO</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bringing Web3 to the
              <br />
              <span className="gradient-text">Heart of India</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              MP DAO is a decentralized, community-driven initiative with a bold mission: empowering Madhya Pradesh and India with Web3 technology, blockchain education, and decentralized culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400">
                To democratize Web3 education and adoption across India, starting from Madhya Pradesh. We believe blockchain technology can transform communities, and we&apos;re committed to making it accessible to students, developers, creators, and entrepreneurs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400">
                A future where every Indian has the knowledge and tools to participate in the decentralized economy. We envision MP DAO as the catalyst for India&apos;s Web3 revolution, creating a network of empowered communities across the nation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at MP DAO
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Roadmap
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The journey from a regional community to a national Web3 ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gray-900/30 border rounded-xl p-6 ${
                  phase.status === 'current'
                    ? 'border-indigo-500/50 ring-1 ring-indigo-500/20'
                    : phase.status === 'completed'
                    ? 'border-green-500/30'
                    : 'border-gray-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    phase.status === 'current'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : phase.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {phase.phase}
                  </span>
                  {phase.status === 'current' && (
                    <span className="text-xs text-indigo-400">Current</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        phase.status === 'completed' ? 'bg-green-500' : 'bg-gray-600'
                      }`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Movement
            </h2>
            <p className="text-gray-400 mb-8">
              Be part of India&apos;s Web3 revolution. Whether you&apos;re a student, developer, creator, or entrepreneur, there&apos;s a place for you in MP DAO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Find Events
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://luma.com/mpdao?k=c"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:border-white transition-all duration-200"
              >
                <ExternalLink size={18} />
                Attend an Event
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
