'use client';

import { motion } from 'framer-motion';
import { Shield, Globe, Users, Eye, Lock } from 'lucide-react';

const values = [
  {
    icon: Globe,
    title: 'Decentralized',
    description: 'No single point of control. Power distributed across the community.',
  },
  {
    icon: Users,
    title: 'Open Access',
    description: 'Anyone can participate, learn, and contribute to the ecosystem.',
  },
  {
    icon: Shield,
    title: 'Community-Owned',
    description: 'Built by the community, for the community. Your voice matters.',
  },
  {
    icon: Eye,
    title: 'Privacy-Oriented',
    description: 'Your data belongs to you. We respect and protect privacy.',
  },
  {
    icon: Lock,
    title: 'Censorship Resistant',
    description: 'Free expression without fear. No central authority to silence you.',
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Values() {
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
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do at MP DAO
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                  <value.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
