'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConnectModal } from '@/context/ConnectModalContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useConnectModal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/brand/mpdao-logo-white.svg" alt="MP DAO Logo" className="h-5 sm:h-7 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              Missions
            </Link>
            <Link href="/about" className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              Manifesto
            </Link>
            <Link href="/partnership" className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              Alliances
            </Link>
            <Link href="/team" className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              Core Team
            </Link>
          </div>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={openModal}
              className="bg-white text-black px-5 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Connect
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/95 border-b border-white/5"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              <Link
                href="/events"
                className="text-sm text-gray-400 hover:text-white font-medium py-1 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Missions
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-400 hover:text-white font-medium py-1 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Manifesto
              </Link>
              <Link
                href="/partnership"
                className="text-sm text-gray-400 hover:text-white font-medium py-1 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Alliances
              </Link>
              <Link
                href="/team"
                className="text-sm text-gray-400 hover:text-white font-medium py-1 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Core Team
              </Link>

              <div className="border-t border-white/5 pt-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openModal();
                  }}
                  className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors text-center w-full block"
                >
                  Connect
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
