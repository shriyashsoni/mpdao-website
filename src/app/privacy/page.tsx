'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden pt-24 sm:pt-32">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors text-xs font-medium">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0C0C0C] mb-6">
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-300 font-medium">Legal Policy</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">Privacy Policy</h1>
          <p className="text-neutral-500 text-xs font-light">Last updated: February 10, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-12 text-neutral-300"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Introduction</h2>
              <p className="text-sm font-light leading-relaxed">
                MP DAO (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our website and services.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Information We Collect</h2>
              <p className="mb-4 text-sm font-light">We may collect information you provide directly, including:</p>
              <ul className="list-disc list-inside space-y-2 text-sm font-light text-neutral-400 ml-2">
                <li>Name and email address when you sign up for events or newsletters</li>
                <li>Communication preferences and interests</li>
                <li>Information provided through contact forms</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="mb-4 text-sm font-light">We use collected information to:</p>
              <ul className="list-disc list-inside space-y-2 text-sm font-light text-neutral-400 ml-2">
                <li>Provide and improve our services</li>
                <li>Send event updates and community announcements</li>
                <li>Respond to your inquiries</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Data Security</h2>
              <p className="text-sm font-light leading-relaxed">
                We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Third-Party Links</h2>
              <p className="text-sm font-light leading-relaxed">
                Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-sm font-light leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:mpdaoofficial@gmail.com" className="text-white underline hover:text-neutral-300 transition-colors">
                  mpdaoofficial@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
