'use client';

import { motion } from 'framer-motion';
import { Calendar, ExternalLink, MapPin, Clock } from 'lucide-react';

export default function EventsPage() {
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
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Events Calendar</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              MP DAO Events
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Join our Web3 meetups, workshops, hackathons, and community events across Madhya Pradesh and beyond.
            </p>

            {/* Submit Event Button */}
            <a
              href="https://luma.com/mpdao?k=c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 text-lg"
            >
              <ExternalLink size={20} />
              Submit Your Event
            </a>
          </motion.div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Meetups', icon: MapPin, description: 'Local gatherings' },
              { name: 'Workshops', icon: Clock, description: 'Hands-on learning' },
              { name: 'Hackathons', icon: Calendar, description: 'Build together' },
              { name: 'Online', icon: ExternalLink, description: 'Virtual events' },
            ].map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center hover:border-indigo-500/50 transition-all duration-300"
              >
                <type.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <h3 className="text-white font-medium">{type.name}</h3>
                <p className="text-gray-500 text-sm">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luma Calendar Embed */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/30 rounded-2xl overflow-hidden border border-gray-800"
          >
            <iframe
              src="https://luma.com/embed/calendar/cal-oMBfnE1N2HZ8RdJ/events"
              width="100%"
              height="700"
              frameBorder="0"
              style={{
                border: 'none',
                borderRadius: '12px',
                background: '#0a0a0a',
              }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to host an event?
          </h2>
          <p className="text-gray-400 mb-8">
            We welcome community members to organize Web3 events. Submit your event and reach our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://luma.com/mpdao?k=c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
            >
              <ExternalLink size={18} />
              Submit Event on Luma
            </a>
            <a
              href="https://t.me/mpdao"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:border-white transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
