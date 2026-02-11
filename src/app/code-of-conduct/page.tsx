'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-900">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Code of Conduct</h1>
          <p className="text-gray-400">Last updated: February 10, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-8 text-gray-300">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Pledge</h2>
                <p>
                  In the interest of fostering an open and welcoming environment, we as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Standards</h2>
                <p className="mb-4">Examples of behavior that contributes to creating a positive environment include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Using welcoming and inclusive language</li>
                  <li>Being respectful of differing opinions, viewpoints, and experiences</li>
                  <li>Gracefully accepting constructive criticism</li>
                  <li>Focusing on what is best for the community</li>
                  <li>Showing empathy towards other community members</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Unacceptable Behavior</h2>
                <p className="mb-4">Examples of unacceptable behavior by participants include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The use of sexualized language or imagery and unwelcome sexual attention or advances</li>
                  <li>Trolling, insulting/derogatory comments, and personal or political attacks</li>
                  <li>Public or private harassment</li>
                  <li>Publishing others' private information, such as a physical or email address, without explicit permission</li>
                  <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Enforcement</h2>
                <p>
                  Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the community leaders at{' '}
                  <a href="mailto:mpdaoofficial@gmail.com" className="text-indigo-400 hover:text-indigo-300">
                    mpdaoofficial@gmail.com
                  </a>
                  . All complaints will be reviewed and investigated promptly and fairly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Consequences</h2>
                <p>
                  Community leaders who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the community leadership.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Scope</h2>
                <p>
                  This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official email address, posting via an official social media account, or acting as an appointed representative at an online or offline event.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Contact & Reporting</h2>
                <p>
                  If you experience or witness a violation of this Code of Conduct, please report it to our team at{' '}
                  <a href="mailto:mpdaoofficial@gmail.com" className="text-indigo-400 hover:text-indigo-300">
                    mpdaoofficial@gmail.com
                  </a>
                  . All reports will be treated confidentially and with appropriate action taken.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
