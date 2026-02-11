'use client';

import Link from 'next/link';
import { Twitter, Github, MessageCircle, Send, Heart, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  community: [
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Submit Event', href: 'https://luma.com/mpdao?k=c', external: true },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Code of Conduct', href: '/code-of-conduct' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/MPdao_' },
  { name: 'Farcaster', icon: MessageCircle, href: 'https://farcaster.xyz/~/group/5MdpDf9A3g5b94lsnQaukA' },
  { name: 'Telegram', icon: Send, href: 'https://t.me/MP_dao' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/mpdao' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black via-black to-gray-950 border-t border-gray-900">
      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-8">
            <Link href="/" className="inline-block text-white font-bold text-2xl tracking-tight hover:text-indigo-300 transition-colors mb-4">
              MP DAO
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing Web3 to the Heart of India. A decentralized community empowering Madhya Pradesh and beyond.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 rounded-lg bg-gray-900/50 hover:bg-indigo-500/20 border border-gray-800 hover:border-indigo-500/50 flex items-center justify-center text-gray-400 hover:text-indigo-300 transition-all duration-300"
                  aria-label={social.name}
                  title={social.name}
                >
                  <social.icon size={18} />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {social.name}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Community</h3>
            <ul className="space-y-4">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-300 transition-colors duration-300 text-sm group"
                    >
                      {link.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-300 transition-colors duration-300 text-sm group"
                    >
                      {link.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Legal</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-300 transition-colors duration-300 text-sm group"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Contact</h3>
            <div className="space-y-4">
              <a
                href="mailto:mpdaoofficial@gmail.com"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-300 transition-colors duration-300 text-sm group break-all"
              >
                mpdaoofficial@gmail.com
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-gray-400 text-xs">
            <p>© {new Date().getFullYear()} MP DAO. All rights reserved.</p>
            <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
            <p className="flex items-center gap-1">
              Made with <Heart size={12} className="text-red-500" /> in Madhya Pradesh
            </p>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-900/50 border border-gray-800 rounded-full">
            <span className="relative inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-gray-400 text-xs">Building the Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
