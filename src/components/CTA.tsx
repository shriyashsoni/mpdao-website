'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Send, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'Farcaster', icon: MessageCircle, href: 'https://farcaster.xyz/~/group/5MdpDf9A3g5b94lsnQaukA', color: 'bg-indigo-500/10 hover:bg-indigo-500/20' },
  { name: 'Telegram', icon: Send, href: 'https://t.me/mpdao', color: 'bg-blue-500/10 hover:bg-blue-500/20' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/mpdao', color: 'bg-sky-500/10 hover:bg-sky-500/20' },
];

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Join the MP DAO Community
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Connect with Web3 enthusiasts, attend events, learn blockchain technology, and be part of India&apos;s decentralized future.
          </p>

          {/* Social Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group flex items-center justify-center gap-3 p-6 rounded-2xl border border-gray-800 ${social.color} transition-all duration-300`}
              >
                <social.icon className="w-6 h-6 text-white" />
                <span className="text-white font-medium">{social.name}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            ))}
          </div>

          {/* Main CTA - Removed external "Get Started" button, keeping social links as primary engagement */}
        </motion.div>
      </div>
    </section>
  );
}
