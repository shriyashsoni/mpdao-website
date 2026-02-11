'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const communities = [
  {
    name: 'MP DAO Bhopal',
    city: 'Bhopal',
    members: '50+',
    description: 'The capital city chapter leading Web3 adoption in central India.',
    active: true,
  },
  {
    name: 'MP DAO Indore',
    city: 'Indore',
    members: '30+',
    description: 'Commercial hub chapter driving blockchain innovation.',
    active: true,
  },
  {
    name: 'MP DAO Jabalpur',
    city: 'Jabalpur',
    members: '20+',
    description: 'Growing community of builders and enthusiasts.',
    active: true,
  },
  {
    name: 'MP DAO Gwalior',
    city: 'Gwalior',
    members: '15+',
    description: 'Historic city embracing the future of technology.',
    active: true,
  },
  {
    name: 'MP DAO Vidisha',
    city: 'Vidisha',
    members: '10+',
    description: 'Emerging chapter with passionate Web3 learners.',
    active: true,
  },
  {
    name: 'Coming Soon',
    city: 'Your City',
    members: '∞',
    description: 'Want to start a chapter in your city? Reach out to us!',
    active: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function CommunitiesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 mb-6">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">Local Chapters</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our Communities
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join your local MP DAO chapter and connect with Web3 enthusiasts in your city
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            We have retired the dedicated communities pages — join the conversation on Farcaster or check upcoming events.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://farcaster.xyz/~/group/5MdpDf9A3g5b94lsnQaukA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-600 transition-all duration-200"
            >
              Join on Farcaster
              <ExternalLink size={16} />
            </a>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 border border-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:border-gray-700 transition-all duration-200"
            >
              View Events
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
