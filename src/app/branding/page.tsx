'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Download, Palette, Type, Image as ImageIcon } from 'lucide-react';

export default function BrandingKitPage() {
  const logos = [
    { name: 'White Logo', file: 'mpdao-logo-white.svg', type: 'SVG', bg: 'bg-[#111111]' },
    { name: 'Black Logo', file: 'mpdao-logo-black.svg', type: 'SVG', bg: 'bg-[#f0f0f0]' },
    { name: 'Green Logo', file: 'mpdao-logo-green.svg', type: 'SVG', bg: 'bg-[#111111]' },
    { name: 'Purple Logo', file: 'mpdao-logo-purple.svg', type: 'SVG', bg: 'bg-[#111111]' },
    { name: 'Red Logo', file: 'mpdao-logo-red.svg', type: 'SVG', bg: 'bg-[#111111]' },
    { name: 'Yellow Logo', file: 'mpdao-logo-yellow.svg', type: 'SVG', bg: 'bg-[#111111]' },
    { name: 'White on Black', file: 'mpdao-logo-white-on-black.svg', type: 'SVG', bg: 'bg-black' },
    { name: 'Black on White', file: 'mpdao-logo-black-on-white.svg', type: 'SVG', bg: 'bg-white' },
    { name: 'Outline PNG', file: 'mpdao-logo-outline.png', type: 'PNG', bg: 'bg-[#111111]' },
    { name: 'Dark PNG', file: 'mpdao-logo-dark.png', type: 'PNG', bg: 'bg-[#f0f0f0]' },
    { name: 'Light PNG', file: 'mpdao-logo-light.png', type: 'PNG', bg: 'bg-[#111111]' }
  ];

  const colors = [
    { name: 'Primary Black', hex: '#000000', text: 'text-white' },
    { name: 'Supporting White', hex: '#FFFFFF', text: 'text-black', border: 'border-neutral-200' },
    { name: 'Accent Blue', hex: '#3B82F6', text: 'text-white' },
    { name: 'Accent Purple', hex: '#8B5CF6', text: 'text-white' }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden pt-24 sm:pt-32 pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 text-center">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors text-xs font-medium">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0C0C0C] mb-6">
            <Palette className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-300 font-medium">Official Brand Assets</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">Branding Kit</h1>
          <p className="text-neutral-500 text-sm max-w-2xl mx-auto">
            Everything you need to integrate MP DAO's visual identity. 
            Download official logos, colors, and typography guidelines to maintain our brand consistently.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Logos Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <ImageIcon className="w-6 h-6 text-[#3B82F6]" />
                <h2 className="text-2xl font-semibold text-white tracking-tight">Logo Assets</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {logos.map((logo, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C] transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <div className={`h-48 w-full flex items-center justify-center p-8 ${logo.bg}`}>
                      <img 
                        src={`/brand/${logo.file}`} 
                        alt={logo.name} 
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white text-sm">{logo.name}</h3>
                        <p className="text-neutral-500 text-xs mt-0.5">{logo.type}</p>
                      </div>
                      <a 
                        href={`/brand/${logo.file}`} 
                        download
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                        aria-label={`Download ${logo.name}`}
                      >
                        <Download size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Palette className="w-6 h-6 text-[#8B5CF6]" />
                <h2 className="text-2xl font-semibold text-white tracking-tight">Color Palette</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {colors.map((color, index) => (
                  <div key={index} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C]">
                    <div 
                      className={`h-32 w-full ${color.border || ''}`} 
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="p-5">
                      <h3 className="font-medium text-white text-sm">{color.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-neutral-500 text-xs font-mono">{color.hex}</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(color.hex)}
                          className="text-xs text-[#3B82F6] hover:text-white transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Type className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-semibold text-white tracking-tight">Typography</h2>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C] p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-neutral-400 text-sm mb-4">Primary Font — Geist</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-5xl font-bold text-white mb-2 tracking-tight">Aa</p>
                        <p className="text-xs text-neutral-500">Geist Bold / 700 / Headings</p>
                      </div>
                      <div>
                        <p className="text-4xl font-semibold text-white mb-2 tracking-tight">Aa</p>
                        <p className="text-xs text-neutral-500">Geist Semibold / 600 / Subheadings</p>
                      </div>
                      <div>
                        <p className="text-2xl font-normal text-white mb-2">Aa</p>
                        <p className="text-xs text-neutral-500">Geist Regular / 400 / Body</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-neutral-400 text-sm mb-4">Monospace — Geist Mono</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-3xl font-mono text-white mb-2">Aa</p>
                        <p className="text-xs text-neutral-500">Geist Mono / 400 / Code & Details</p>
                      </div>
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <h4 className="text-white font-medium mb-3">Usage Guidelines</h4>
                        <ul className="space-y-2 text-sm text-neutral-400">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Maintain minimum clear space around logos
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Use high-contrast versions based on background
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Do not distort, stretch, or alter the logo marks
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>
    </div>
  );
}
