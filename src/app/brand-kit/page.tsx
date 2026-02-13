'use client';

import Image from 'next/image';
import { Copy, Download } from 'lucide-react';
import { useState } from 'react';

export default function BrandKitPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const logos = [
    {
      name: 'Black Solid Logo',
      src: '/brand/mpdao-logo-black.png',
      description: 'Use this logo on light backgrounds',
      usage: 'Websites, presentations, documents',
    },
    {
      name: 'Outline Logo',
      src: '/brand/mpdao-logo-outline.png',
      description: 'Transparent background outline version',
      usage: 'Dark backgrounds, overlays',
    },
    {
      name: 'Light Logo',
      src: '/brand/mpdao-logo-light.png',
      description: 'Outline version on light background',
      usage: 'Social media, web graphics',
    },
    {
      name: 'Dark Logo',
      src: '/brand/mpdao-logo-dark.png',
      description: 'Bold black logo on white background',
      usage: 'Print materials, banners',
    },
  ];

  const colors = [
    { name: 'Primary Black', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
    { name: 'Primary White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
    { name: 'Accent Blue', hex: '#3B82F6', rgb: 'rgb(59, 130, 246)' },
    { name: 'Accent Purple', hex: '#8B5CF6', rgb: 'rgb(139, 92, 246)' },
  ];

  const typography = [
    { name: 'Heading Font', family: 'Geist', weights: '700, 600, 500' },
    { name: 'Body Font', family: 'Geist', weights: '400, 500' },
    { name: 'Monospace Font', family: 'Geist Mono', weights: '400' },
  ];

  return (
    <main className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 text-white">Brand Kit</h1>
          <p className="text-xl text-gray-400">
            Official MP DAO branding guidelines and assets. Use these resources to maintain consistency across all communications.
          </p>
        </div>

        {/* Logo Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-white">Logo Variations</h2>
          <p className="text-gray-400 mb-8">Choose the appropriate logo variation for your use case</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {logos.map((logo, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col">
                <div className="mb-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 flex items-center justify-center min-h-48">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={100}
                    className="max-w-full h-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{logo.name}</h3>
                <p className="text-gray-400 mb-3">{logo.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-semibold">Usage:</span> {logo.usage}
                </p>
                <a
                  href={logo.src}
                  download
                  className="mt-auto inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-white">Color Palette</h2>
          <p className="text-gray-400 mb-8">Official MP DAO color scheme</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colors.map((color, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <div
                  className="h-32 w-full cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyToClipboard(color.hex, color.name)}
                  title="Click to copy hex code"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{color.name}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p className="font-mono">{color.hex}</p>
                    <p className="font-mono">{color.rgb}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(color.hex, color.name)}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    {copied === color.name ? 'Copied!' : 'Copy Hex'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-white">Typography</h2>
          <p className="text-gray-400 mb-8">Font families and weights used across MP DAO branding</p>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <div className="space-y-8">
              {typography.map((font, index) => (
                <div key={index} className="border-b border-slate-800 last:border-b-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{font.name}</h3>
                  <p className="text-gray-400 mb-3">
                    <span className="font-semibold">Font Family:</span> {font.family}
                  </p>
                  <p className="text-gray-400 mb-4">
                    <span className="font-semibold">Available Weights:</span> {font.weights}
                  </p>
                  <div className="space-y-2">
                    {font.family === 'Geist' && (
                      <>
                        <p style={{ fontFamily: font.family, fontWeight: 700 }} className="text-2xl">
                          Heading Text - Bold (700)
                        </p>
                        <p style={{ fontFamily: font.family, fontWeight: 600 }} className="text-lg">
                          Subheading Text - Semibold (600)
                        </p>
                        <p style={{ fontFamily: font.family, fontWeight: 400 }}>
                          Body text - Regular (400)
                        </p>
                      </>
                    )}
                    {font.family === 'Geist Mono' && (
                      <p style={{ fontFamily: font.family, fontWeight: 400 }} className="font-mono">
                        Monospace text - Regular (400)
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-white">Brand Guidelines</h2>
          <p className="text-gray-400 mb-8">Best practices for using MP DAO branding</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-green-900/50 rounded-lg p-6">
              <h3 className="font-semibold text-green-400 mb-3">Do's</h3>
              <ul className="space-y-2 text-green-300 text-sm">
                <li>✓ Use logos with appropriate spacing</li>
                <li>✓ Maintain aspect ratio when resizing</li>
                <li>✓ Use black logo on light backgrounds</li>
                <li>✓ Use white/outline logo on dark backgrounds</li>
                <li>✓ Apply consistent branding across all materials</li>
              </ul>
            </div>
            
            <div className="bg-slate-900 border border-red-900/50 rounded-lg p-6">
              <h3 className="font-semibold text-red-400 mb-3">Don'ts</h3>
              <ul className="space-y-2 text-red-300 text-sm">
                <li>✗ Don't distort or skew the logo</li>
                <li>✗ Don't use colors outside the palette</li>
                <li>✗ Don't rotate or flip the logo</li>
                <li>✗ Don't place logo on conflicting backgrounds</li>
                <li>✗ Don't modify the logo shape or proportions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Download All */}
        <section className="text-center">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-3 text-white">Download All Assets</h2>
            <p className="mb-6 text-gray-400">Get all brand kit files including logos, guidelines, and more</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all">
              <Download className="w-5 h-5" />
              Download Brand Kit (ZIP)
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
