'use client';

import { motion } from 'framer-motion';
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Events() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 mb-6">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">Upcoming Events</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Join Our Events
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Meetups, workshops, hackathons, and more. Connect with the Web3 community in Madhya Pradesh.
          </p>

          {/* Submit Event Button */}
          <a
            href="https://luma.com/mpdao?k=c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 mb-12"
          >
            <ExternalLink size={18} />
            Submit Your Event
          </a>
        </motion.div>

        {/* Luma Calendar Embed */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="luma-embed-container bg-gray-900/30 rounded-2xl overflow-hidden"
        >
          <iframe
            src="https://luma.com/embed/calendar/cal-oMBfnE1N2HZ8RdJ/events"
            width="100%"
            height="600"
            frameBorder="0"
            style={{ 
              border: '1px solid #1a1a1a', 
              borderRadius: '12px',
              background: '#0a0a0a'
            }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          />
        </motion.div>

        {/* View All Events Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            View All Events
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
