'use client';

import { motion } from 'framer-motion';

const mpCities = [
  'Bhopal',
  'Indore',
  'Jabalpur',
  'Gwalior',
  'Ujjain',
  'Sagar',
  'Ratlam',
  'Rewa',
  'Satna',
  'Dewas',
  'Chhindwara',
  'Khandwa',
  'Burhanpur',
  'Katni',
  'Vidisha',
  'Hoshangabad',
  'Sehore',
  'Neemuch',
  'Mandsaur',
  'Shivpuri',
  'Datia',
  'Morena',
  'Bhind',
  'Sheopur',
  'Guna',
  'Ashoknagar',
  'Betul',
  'Balaghat',
  'Seoni',
  'Mandla',
  'Narsinghpur',
  'Shahdol',
  'Umaria',
  'Anuppur',
  'Singrauli',
  'Sidhi',
  'Tikamgarh',
  'Chhatarpur',
  'Panna',
  'Damoh',
  'Raisen',
  'Rajgarh',
  'Harda',
  'Alirajpur',
  'Jhabua',
  'Barwani',
  'Dhar',
  'Khargone',
  'Agar Malwa',
  'Niwari',
];

export default function Ecosystem() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 mb-6">
            <span className="text-xs font-semibold text-indigo-400 tracking-wider">
              MP DAO ECOSYSTEM
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Growing Across Madhya Pradesh
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Empowering builders, communities, and innovators in every city. MP DAO is present in 50+ cities.
          </p>
        </motion.div>

        {/* Animated City Scroll - Row 1 (Left) */}
        <div className="mb-8 overflow-hidden">
          <motion.div
            className="flex gap-3"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...mpCities, ...mpCities].map((city, index) => (
              <motion.div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-300 flex-shrink-0"
                  whileHover={{ scale: 1.05, borderColor: 'rgb(129, 140, 248)' }}
                >
                  <span className="text-sm font-medium text-gray-200 whitespace-nowrap">
                    {city}
                  </span>
                </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated City Scroll - Row 2 (Right) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-3"
            animate={{ x: [-1000, 0] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...mpCities, ...mpCities].map((city, index) => (
              <motion.div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 flex-shrink-0"
                  whileHover={{ scale: 1.05, borderColor: 'rgb(168, 85, 247)' }}
                >
                  <span className="text-sm font-medium text-gray-200 whitespace-nowrap">
                    {city}
                  </span>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
