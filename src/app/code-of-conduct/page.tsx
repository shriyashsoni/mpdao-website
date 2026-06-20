'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function CodeOfConductPage() {
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
            <Shield className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-300 font-medium">Community Rules</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">Code of Conduct</h1>
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
              <h2 className="text-xl font-semibold text-white mb-4">Our Pledge</h2>
              <p className="text-sm font-light leading-relaxed">
                In the interest of fostering an open and welcoming environment, we as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Our Standards</h2>
              <p className="mb-4 text-sm font-light">Examples of behavior that contributes to creating a positive environment include:</p>
              <ul className="list-disc list-inside space-y-2 text-sm font-light text-neutral-400 ml-2">
                <li>Using welcoming and inclusive language</li>
                <li>Being respectful of differing opinions, viewpoints, and experiences</li>
                <li>Gracefully accepting constructive criticism</li>
                <li>Focusing on what is best for the community</li>
                <li>Showing empathy towards other community members</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Unacceptable Behavior</h2>
              <p className="mb-4 text-sm font-light">Examples of unacceptable behavior by participants include:</p>
              <ul className="list-disc list-inside space-y-2 text-sm font-light text-neutral-400 ml-2">
                <li>The use of sexualized language or imagery and unwelcome sexual attention or advances</li>
                <li>Trolling, insulting/derogatory comments, and personal or political attacks</li>
                <li>Public or private harassment</li>
                <li>Publishing others&apos; private information, such as a physical or email address, without explicit permission</li>
                <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
                <h2 className="text-xl font-semibold text-white mb-4">Enforcement</h2>
                <p className="text-sm font-light leading-relaxed">
                  Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the community leaders at{' '}
                  <a href="mailto:mpdaoofficial@gmail.com" className="text-white underline hover:text-neutral-300 transition-colors">
                    mpdaoofficial@gmail.com
                  </a>
                  . All complaints will be reviewed and investigated promptly and fairly.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
                <h2 className="text-xl font-semibold text-white mb-4">Consequences</h2>
                <p className="text-sm font-light leading-relaxed">
                  Community leaders who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the community leadership.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4">Scope</h2>
              <p className="text-sm font-light leading-relaxed">
                This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official email address, posting via an official social media account, or acting as an appointed representative at an online or offline event.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
