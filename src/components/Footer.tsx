'use client';

import Link from 'next/link';
import { useConnectModal } from '@/context/ConnectModalContext';

export default function Footer() {
  const { openModal } = useConnectModal();
  return (
    <section 
      className="relative w-full overflow-hidden bg-black pt-10 pb-0 px-6 font-sans"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Grid container with relative z-10 to stay on top of the watermark */}
      <div className="mx-auto max-w-[1150px] grid grid-cols-1 md:grid-cols-[350px_1fr] gap-4 items-stretch relative z-10">
        
        {/* Left Card (Video Background) */}
        <div className="relative min-h-[260px] md:h-auto rounded-[24px] p-6 overflow-hidden shadow-[0_12px_40px_rgba(21,76,189,0.25)] bg-[#1e4fc0] flex flex-col justify-between">
          {/* Video Background */}
          <video 
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
          </video>

          {/* Logo Mark & Name */}
          <div className="flex items-center relative z-10">
            <img src="/brand/mpdao-logo-white.svg" alt="MP DAO Logo" className="h-10 sm:h-14 w-auto object-contain" />
          </div>

          {/* Tagline */}
          <div className="mt-auto mb-4 relative z-10">
            <p className="font-sans font-normal text-[16px] text-white leading-[1.4]">
              Bringing Web3 to the Heart of India,<br />
              <span className="text-white/65">empowering builders.</span>
            </p>
          </div>

          {/* Social Row */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            <span className="font-['Caveat',cursive] font-semibold text-[15px] text-white/90 tracking-[0.3px]">
              Stay in touch!
            </span>
            <div className="flex gap-[6px]">
              {/* Discord */}
              <a 
                href="https://discord.gg/mMvPvpcJs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-[8px] bg-[#0e1014] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-black hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Discord"
              >
                <svg className="w-[13px] h-[13px] fill-white" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011 13.983 13.983 0 0 0 10.149 0 .075.075 0 0 1 .078.012c.12.097.246.194.373.287a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107 14.36 14.36 0 0 0 1.226 1.99.076.076 0 0 0 .084.03 19.86 19.86 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a 
                href="https://x.com/mpdao_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-[8px] bg-[#0e1014] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-black hover:-translate-y-0.5 transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <svg className="w-[13px] h-[13px] fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/company/mp-dao" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-[8px] bg-[#0e1014] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-black hover:-translate-y-0.5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-[13px] h-[13px] fill-white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* GitHub */}
              <a 
                href="https://github.com/Mp-Dao" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-[8px] bg-[#0e1014] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-black hover:-translate-y-0.5 transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-[13px] h-[13px] fill-white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Card (Light Theme - White Background) */}
        <div className="relative rounded-[24px] p-8 bg-[#ffffff] shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          
          {/* Navigation Columns */}
          <div>
            <div className="flex gap-[72px] max-sm:gap-10">
              {/* Column 1 */}
              <div className="flex flex-col">
                <h3 className="font-['Caveat',cursive] font-semibold italic text-[22px] text-neutral-400 mb-[12px]">
                  Protocol
                </h3>
                <Link href="/about" className="font-sans font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Manifesto
                </Link>
                <Link href="/events" className="font-sans font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Missions
                </Link>
                <Link href="/team" className="font-sans font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Core Team
                </Link>
                <Link href="/partnership" className="font-sans font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Alliances
                </Link>
                <button onClick={openModal} className="font-sans text-left font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Connect
                </button>
              </div>
              
              {/* Column 2 */}
              <div className="flex flex-col">
                <h3 className="font-['Caveat',cursive] font-semibold italic text-[22px] text-neutral-400 mb-[12px]">
                  Ecosystem
                </h3>
                <Link href="/about" className="font-sans font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Manifesto
                </Link>
                <Link href="/terms" className="font-sans font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Terms and Condition
                </Link>
                <Link href="/privacy" className="font-sans font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link href="/code-of-conduct" className="font-sans font-semibold text-[13px] text-[#111827] mb-2 hover:text-[#1f65d6] transition-colors duration-200">
                  Code of Conduct
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-end justify-between mt-8 max-sm:flex-col max-sm:items-start max-sm:gap-6">
            <span className="font-sans font-medium text-[11.5px] text-neutral-400">
              © {new Date().getFullYear()} MP DAO. All rights reserved.
            </span>
            
            {/* CTA and Subscribe */}
            <div className="flex flex-col gap-2 max-sm:w-full">
              <h4 className="font-sans font-normal text-[14px] text-neutral-500 leading-[1.35]">
                Web3 moves fast.<br />
                <strong className="block text-[17px] font-bold text-[#111827] mt-0.5">Stay ahead with MP DAO.</strong>
              </h4>
              <div className="flex w-[290px] max-sm:w-full bg-[#ffffff] border border-[#e5e7eb] rounded-xl p-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="flex-1 px-3 py-2 bg-transparent border-none outline-none font-sans text-[12.5px] text-[#111827] placeholder-neutral-400"
                />
                <button 
                  type="button"
                  className="px-4 py-2 bg-[#111214] text-white font-sans text-[12.5px] font-semibold rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:bg-black hover:-translate-y-[0.5px] transition-all duration-200 cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Watermark (Solid White, Clipped exactly fifty-fifty horizontally, and separated with positive margin-top) */}
      <div className="max-w-[1150px] mx-auto pointer-events-none select-none relative z-0 leading-none mt-8 sm:mt-12 md:mt-16" aria-hidden="true">
        <svg viewBox="0 0 1000 110" className="block w-full h-auto overflow-hidden">
          <text 
            x="500" 
            y="200" 
            textAnchor="middle" 
            fontSize="260"
            className="font-sans font-bold tracking-tight fill-[#ffffff] opacity-100"
          >
            MP DAO
          </text>
        </svg>
      </div>
    </section>
  );
}
