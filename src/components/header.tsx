'use client';

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700" />
            <span className="text-xl font-bold text-slate-900">MPDAO</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Docs
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden gap-3 md:flex">
            <button className="px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Launch App
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-slate-200 pt-4">
            <Link
              href="#features"
              className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
            >
              How it Works
            </Link>
            <Link
              href="#"
              className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
            >
              Docs
            </Link>
            <div className="flex gap-3 pt-2">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                Sign In
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Launch App
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
