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
    <div className="min-h-screen text-white font-sans overflow-x-hidden pt-24 sm:pt-32">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Radial gradient background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0C0C0C] mb-6">
              <Heart className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-xs text-neutral-300 font-medium">About MP DAO</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white mb-6">
              Bringing Web3 to the<br />
              <span className="bg-gradient-to-r from-white via-white to-neutral-500 bg-clip-text text-transparent">
                Heart of India
              </span>
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
              MP DAO is a decentralized, community-driven initiative with a bold mission: empowering Madhya Pradesh and India with Web3 technology, blockchain education, and decentralized culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 sm:p-10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-4">Our Mission</h2>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  To democratize Web3 education and adoption across India, starting from Madhya Pradesh. We believe blockchain technology can transform communities, and we&apos;re committed to making it accessible to students, developers, creators, and entrepreneurs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 sm:p-10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-4">Our Vision</h2>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  A future where every Indian has the knowledge and tools to participate in the decentralized economy. We envision MP DAO as the catalyst for India&apos;s Web3 revolution, creating a network of empowered communities across the nation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm font-light">
              The principles that guide everything we do at MP DAO.
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
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0C] p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Our Roadmap
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm font-light">
              The journey from a regional community to a national Web3 ecosystem.
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
                className={`relative rounded-3xl p-6 border ${
                  phase.status === 'current'
                    ? 'border-white bg-[#111111]'
                    : phase.status === 'completed'
                    ? 'border-white/20 bg-[#0C0C0C]'
                    : 'border-white/10 bg-[#0C0C0C]'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                    phase.status === 'current'
                      ? 'bg-white text-black border-white'
                      : phase.status === 'completed'
                      ? 'bg-white/10 text-white border-white/10'
                      : 'bg-transparent text-neutral-500 border-white/5'
                  }`}>
                    {phase.phase}
                  </span>
                  {phase.status === 'current' && (
                    <span className="text-[10px] text-white font-medium">Current</span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">{phase.title}</h3>
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-400 font-light leading-relaxed">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        phase.status === 'completed' ? 'bg-white' : 'bg-neutral-600'
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Join the Movement
            </h2>
            <p className="text-neutral-400 text-sm font-light mb-8 max-w-lg mx-auto">
              Be part of India&apos;s Web3 revolution. Whether you&apos;re a student, developer, creator, or entrepreneur, there&apos;s a place for you in MP DAO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors w-full sm:w-auto"
              >
                Find Events
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://luma.com/mpdao?k=c"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 text-white px-6 py-3 rounded-full font-medium transition-colors w-full sm:w-auto"
              >
                <ExternalLink size={16} />
                Attend an Event
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
