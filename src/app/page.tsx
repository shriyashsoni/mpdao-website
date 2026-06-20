'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, Menu, X, ChevronDown, Users, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const row1Images = [
  '/photos/IMG-20260621-WA00091.jpg',
  '/photos/1772438878470.jpg',
  '/photos/1777651437533.jpg',
  '/photos/IMG-20250302-WA00162.jpg',
];

const row2Images = [
  '/photos/IMG-20260228-WA0050.jpg',
  '/photos/IMG-20260621-WA0028.jpg',
  '/photos/IMG-20260617-WA0014.jpg',
  '/photos/IMG-20260621-WA0019.jpg',
];

const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

const sponsors = ["Polygon", "Solana", "Ethereum", "Arbitrum", "Optimism"];
const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors];



export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  // Fetch from Convex
  const dbSponsors = useQuery(api.sponsors.getSponsors);
  const dbPartners = useQuery(api.partners.getPartners);
  const dbEvents = useQuery(api.events.getEvents);

  const sponsorsList = dbSponsors && dbSponsors.length > 0 ? dbSponsors : null;
  const repeatedSponsors = sponsorsList 
    ? [...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList]
    : null;

  const mediaPartnersList = dbPartners && dbPartners.filter(p => p.type === 'media').length > 0
    ? dbPartners.filter(p => p.type === 'media')
    : null;

  const communityPartnersList = dbPartners && dbPartners.filter(p => p.type === 'community').length > 0
    ? dbPartners.filter(p => p.type === 'community')
    : null;

  const upcomingList = dbEvents ? dbEvents.filter(e => !e.isPast) : [];
  const pastList = dbEvents ? dbEvents.filter(e => e.isPast) : [];

  const getEventHref = (event: any) => {
    if (event._id) {
      return `/events/${event._id}`;
    }
    return event.eventLink || '#';
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(currentOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to establish initial positions
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white font-sans overflow-x-hidden">
      
      {/* SECTION 1: HERO (Full screen viewport) */}
      <div className="relative h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Video Fade-Out Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-black/40" /> {/* General darkening to ensure text is readable */}
          <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-[#06080E] to-transparent" />
          <div className="absolute left-0 right-0 bottom-0 h-64 bg-gradient-to-t from-[#06080E] via-[#06080E]/80 to-transparent" />
        </div>

        {/* Navbar */}
        <header 
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between animate-fade-in-up"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          {/* Left: Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/brand/mpdao-logo-white.svg" alt="MP DAO Logo" className="h-5 sm:h-7 w-auto object-contain" />
          </Link>

          {/* Center Nav (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/events" className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              Missions
            </Link>
            <Link href="/about" className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              Manifesto
            </Link>
            <Link href="/partnership" className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              Alliances
            </Link>
          </nav>

          {/* Right Nav (Desktop) */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/team" className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              Core Team
            </Link>
            <a 
              href="https://luma.com/mpdao?k=c" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Deploy Event
            </a>
          </div>

          {/* Hamburger (Mobile) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="sm:hidden p-2 text-white hover:bg-gray-900 rounded-full transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-[60px] left-0 right-0 z-30 bg-black/95 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex flex-col gap-4 animate-fade-in-overlay">
            <Link href="/events" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-400 hover:text-white font-medium py-1">
              Missions
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-400 hover:text-white font-medium py-1">
              Manifesto
            </Link>
            <Link href="/partnership" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-400 hover:text-white font-medium py-1">
              Alliances
            </Link>
            
            <div className="border-t border-gray-800 pt-4 flex flex-col gap-3">
              <Link href="/team" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-400 hover:text-white font-medium py-1">
                Core Team
              </Link>
              <a 
                href="https://luma.com/mpdao?k=c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors text-center w-full block"
                onClick={() => setIsMenuOpen(false)}
              >
                Deploy Event
              </a>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <main 
          className="relative z-20 px-4 sm:px-6 pt-6 sm:pt-12 pb-16 sm:pb-32 max-w-7xl mx-auto text-center flex-1 flex flex-col justify-center items-center"
        >
          {/* Heading */}
          <h1 
            className="text-[38px] sm:text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.1] tracking-tight mb-4 sm:mb-5 text-white animate-fade-in-up drop-shadow-lg"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-bold">
              MP DAO
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 animate-fade-in-up drop-shadow-md font-light"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            Madhya Pradesh&apos;s premier decentralized community bringing Web3 to the Heart of India ❤️
          </p>

          {/* CTA Button */}
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            <Link 
              href="/events"
              className="bg-white text-black px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium hover:bg-gray-200 transition-colors inline-block"
            >
              Explore Events
            </Link>
          </div>
        </main>

      </div>

      {/* SECTION 1.5: CONTINUOUS SPONSOR TICKER */}
      <div className="relative bg-black border-y border-white/5 py-10 overflow-hidden mt-6 sm:mt-8">
        {/* Header */}
        <div className="text-center text-[10px] sm:text-xs font-semibold tracking-widest text-gray-500 uppercase mb-6 px-4">
          Empowering Central India in collaboration with top protocols
        </div>
        
        {/* Infinite Ticker Container */}
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          {/* Ticker Row */}
          <div className="flex gap-16 whitespace-nowrap animate-ticker items-center">
            {repeatedSponsors ? (
              repeatedSponsors.map((sponsor, i) => (
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`sponsor-${i}`}
                  className="inline-flex items-center hover:scale-105 transition-all duration-200"
                >
                  {sponsor.logoUrl ? (
                    <img 
                      src={sponsor.logoUrl} 
                      alt={sponsor.name} 
                      className="h-16 sm:h-20 w-auto max-w-[180px] sm:max-w-[240px] object-contain opacity-60 hover:opacity-100 transition-all" 
                    />
                  ) : (
                    <span className="text-2xl sm:text-3xl md:text-4xl italic text-gray-300 hover:text-white transition-colors tracking-tight font-serif select-none">
                      {sponsor.name}
                    </span>
                  )}
                </a>
              ))
            ) : (
              <span className="text-sm text-neutral-500 font-light mx-auto py-2">
                MP DAO Ecosystem Partners & Sponsors
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: MARQUEE SECTION */}
      <div 
        ref={sectionRef}
        className="relative bg-black pt-8 sm:pt-12 pb-10 overflow-hidden flex flex-col gap-3"
      >
        {/* Row 1: Moves RIGHT on scroll */}
        <div className="flex w-full overflow-hidden">
          <div 
            className="flex gap-3 transition-transform duration-75 ease-out"
            style={{ 
              transform: `translateX(${offset - 200}px)`,
              willChange: 'transform'
            }}
          >
            {row1Tripled.map((src, i) => (
              <img
                key={`row1-${i}`}
                src={src}
                alt="MP DAO Event"
                className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div className="flex w-full overflow-hidden">
          <div 
            className="flex gap-3 transition-transform duration-75 ease-out"
            style={{ 
              transform: `translateX(${-(offset - 200)}px)`,
              willChange: 'transform'
            }}
          >
            {row2Tripled.map((src, i) => (
              <img
                key={`row2-${i}`}
                src={src}
                alt="MP DAO Event"
                className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: EVENTS SECTION */}
      <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-white mb-4">
              Events
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-light">
              Connecting builders, creators, and enthusiasts to power up the Web3 ecosystem in Central India.
            </p>
          </motion.div>

          {/* Upcoming Events Row */}
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-8 border-b border-white/5 pb-4"
            >
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white/90">
                Upcoming Events
              </h3>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Stay Tuned</span>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {dbEvents === undefined ? (
                <div className="col-span-full py-12 text-center">
                  <div className="w-8 h-8 rounded-full border-t border-white animate-spin mx-auto mb-4" />
                  <p className="text-neutral-500 text-xs font-light">Loading events schedule...</p>
                </div>
              ) : upcomingList.length === 0 ? (
                <div className="col-span-full bg-[#0C0C0C] border border-white/5 rounded-[2.5rem] p-12 text-center text-neutral-500 text-sm font-light">
                  No upcoming events scheduled at the moment. Stay tuned!
                </div>
              ) : (
                upcomingList.map((event, idx) => (
                  <Link
                    href={getEventHref(event)}
                    key={`upcoming-${idx}`}
                    className="group relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 bg-[#121212] flex flex-col justify-end p-6 hover:border-white/30 transition-all duration-300 cursor-pointer text-left block"
                  >
                    {/* Background Image */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-75"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                    {/* Top Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white tracking-widest uppercase px-3 py-1 rounded-full font-medium">
                        {event.tag}
                      </span>
                    </div>
                    {/* Bottom Text Overlay */}
                    <div className="relative z-20 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-gray-300 font-medium mb-1.5">
                        <span>{event.date}</span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                        <span>{event.location}</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
                        {event.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 font-light line-clamp-2 font-sans">
                        {event.slogan}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Past Events Row */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-8 border-b border-white/5 pb-4"
            >
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white/50">
                Past Events
              </h3>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Completed</span>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {dbEvents === undefined ? (
                <div className="col-span-full py-12 text-center">
                  <div className="w-8 h-8 rounded-full border-t border-white animate-spin mx-auto mb-4" />
                  <p className="text-neutral-500 text-xs font-light">Loading events schedule...</p>
                </div>
              ) : pastList.length === 0 ? (
                <div className="col-span-full bg-[#0C0C0C] border border-white/5 rounded-[2.5rem] p-12 text-center text-neutral-500 text-sm font-light">
                  No past events listed yet.
                </div>
              ) : (
                pastList.map((event, idx) => (
                  <Link
                    href={getEventHref(event)}
                    key={`past-${idx}`}
                    className="group relative w-full aspect-square rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a] flex flex-col justify-end p-6 grayscale hover:grayscale-0 hover:border-white/20 transition-all duration-500 cursor-pointer text-left block"
                  >
                    {/* Background Image */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-40 group-hover:opacity-60"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                    {/* Top Badge */}
                    <div className="absolute top-6 left-6 z-20 opacity-60">
                      <span className="bg-white/5 backdrop-blur-md border border-white/10 text-[10px] text-white tracking-widest uppercase px-3 py-1 rounded-full font-medium">
                        {event.tag}
                      </span>
                    </div>
                    {/* Bottom Text Overlay */}
                    <div className="relative z-20 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-1.5">
                        <span>{event.date}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        <span>{event.location}</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-semibold text-white/80 tracking-tight mb-2 group-hover:text-white transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 font-light line-clamp-2 font-sans">
                        {event.slogan}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>


        </div>
      </section>

      {/* SECTION 4: PARTNERS SECTION */}
      <section className="bg-black pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Box 1: Media Partners */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0C] p-8 sm:p-10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[420px]">
              {/* Radial gradient background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Our Voice</span>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1 mb-3">
                  Media Partners
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md">
                  Amplifying our mission and sharing stories of builders shaping Web3 across central India and beyond.
                </p>
              </div>

              {/* Grid of Partners */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 relative z-10">
                {mediaPartnersList && mediaPartnersList.length > 0 ? (
                  mediaPartnersList.map((partner) => (
                    <a 
                      key={partner._id}
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left font-medium text-sm sm:text-base text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200 relative z-10"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-black/40 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                        {partner.logoUrl ? (
                          <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-contain p-1.5" />
                        ) : (
                          <Star size={16} className="text-neutral-500" />
                        )}
                      </div>
                      <span className="truncate">{partner.name}</span>
                    </a>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-neutral-500 text-xs font-light">
                    Partners to be announced soon!
                  </div>
                )}
              </div>
            </div>

            {/* Box 2: Community Partners */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0C] p-8 sm:p-10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[420px]">
              {/* Radial gradient background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Our Strength</span>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1 mb-3">
                  Community Partners
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md">
                  Building side-by-side with India's premier developer clubs, local DAOs, and national ecosystems.
                </p>
              </div>

              {/* Grid of Partners */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 relative z-10">
                {communityPartnersList && communityPartnersList.length > 0 ? (
                  communityPartnersList.map((partner) => (
                    <a 
                      key={partner._id}
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left font-medium text-sm sm:text-base text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200 relative z-10"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-black/40 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                        {partner.logoUrl ? (
                          <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-contain p-1.5" />
                        ) : (
                          <Users size={16} className="text-neutral-500" />
                        )}
                      </div>
                      <span className="truncate">{partner.name}</span>
                    </a>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-neutral-500 text-xs font-light">
                    Partners to be announced soon!
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: JOIN THE COMMUNITY BANNER */}
      <section className="bg-black pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0C0C0C] px-8 py-10 sm:px-16 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-8 hover:border-white/20 transition-all duration-300">
            {/* Radial gradient background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
            
            {/* Left side text */}
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4.5xl font-semibold tracking-tight leading-[1.1] text-center sm:text-left bg-gradient-to-r from-white via-white to-neutral-500 bg-clip-text text-transparent">
                Connect with<br />the collective
              </h2>
            </div>

            {/* Right side social links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 relative z-10">
              {/* Twitter / X */}
              <a 
                href="https://x.com/mp_dao" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Telegram */}
              <a 
                href="https://t.me/mpdao" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-current translate-x-[-1px] translate-y-[1px]" viewBox="0 0 24 24">
                  <path d="M21.9 2.19a1 1 0 0 0-1.09-.22l-19 7a1 1 0 0 0-.08 1.83l7.08 3.03 3.03 7.08a1 1 0 0 0 1.83-.08l7-19a1 1 0 0 0-.27-1.06zm-11 12.06l-4.83-2.07 13.56-5-8.73 7.07z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/company/mpdao" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8h2.8v-4.87c0-.26.05-.52.13-.7a1.11 1.11 0 0 1 1-.72c.73 0 1 .56 1 1.39v4.9h2.8M6.5 8.37a1.37 1.37 0 1 0-1.37-1.37 1.37 1.37 0 0 0 1.37 1.37M8 18.5V10.5H5.2v8H8z" />
                </svg>
              </a>

              {/* Discord */}
              <a 
                href="https://discord.gg/mMvPvpcJs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011 13.983 13.983 0 0 0 10.149 0 .075.075 0 0 1 .078.012c.12.097.246.194.373.287a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107 14.36 14.36 0 0 0 1.226 1.99.076.076 0 0 0 .084.03 19.86 19.86 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
              </a>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
