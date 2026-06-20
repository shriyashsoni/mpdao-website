'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function TermsPage() {
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
            <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-300 font-medium">Terms of Use</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">Terms of Service</h1>
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
              <h2 className="text-xl font-semibold text-white mb-4">Acceptance of Terms</h2>
              <p className="text-sm font-light leading-relaxed">
                By accessing and using the MP DAO website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Use License</h2>
              <p className="mb-4 text-sm font-light">Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.</p>
              <p className="text-sm font-light mb-4">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside space-y-2 text-sm font-light text-neutral-400 ml-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
                <h2 className="text-xl font-semibold text-white mb-4">Disclaimer</h2>
                <p className="text-sm font-light leading-relaxed">
                  The materials on our website are provided on an &apos;as is&apos; basis. MP DAO makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
                <h2 className="text-xl font-semibold text-white mb-4">Limitations</h2>
                <p className="text-sm font-light leading-relaxed">
                  In no event shall MP DAO or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if MP DAO or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Accuracy of Materials</h2>
              <p className="text-sm font-light leading-relaxed">
                The materials appearing on our website could include technical, typographical, or photographic errors. MP DAO does not warrant that any of the materials on our website are accurate, complete, or current.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Modifications</h2>
              <p className="text-sm font-light leading-relaxed">
                MP DAO may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Governing Law</h2>
              <p className="text-sm font-light leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-sm font-light leading-relaxed">
                If you have questions about our Terms of Service, please contact us at{' '}
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
