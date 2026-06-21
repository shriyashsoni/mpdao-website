'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Sparkles, Eye, Users, User } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';

export default function EventsPage() {
  const dbEvents = useQuery(api.events.getEvents);
  const searchParams = useSearchParams();
  const [filterTab, setFilterTab] = useState<'upcoming' | 'past'>('upcoming');

  // Sync tab from URL param (?tab=past or ?tab=upcoming)
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'past' || tab === 'upcoming') {
      setFilterTab(tab);
    }
  }, [searchParams]);

  const getEventHref = (event: any) => {
    if (event.slug) {
      return `/events/${event.slug}`;
    }
    if (event._id) {
      return `/events/${event._id}`;
    }
    return event.eventLink || '#';
  };

  // Robust date parser: handles both YYYY-MM-DD (new ISO) and free-text (legacy)
  const parseEventDate = (dateStr: string): Date => {
    if (!dateStr) return new Date(0);
    // ISO format YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Date(dateStr + 'T00:00:00');
    }
    // Legacy free text e.g. "August 15, 2026" or "June 21st, 2026"
    const cleaned = dateStr.replace(/(st|nd|rd|th),/g, ',');
    const d = new Date(cleaned);
    return isNaN(d.getTime()) ? new Date(0) : d;
  };

  const upcomingList = dbEvents
    ? dbEvents
        .filter(e => !e.isPast)
        .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())
    : [];

  const pastList = dbEvents
    ? dbEvents
        .filter(e => e.isPast)
        .sort((a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime())
    : [];

  const activeList = filterTab === 'upcoming' ? upcomingList : pastList;

  // Format date helper to match the clean timeline text in screenshot
  const formatTimelineDate = (dateStr: string) => {
    try {
      const d = parseEventDate(dateStr);
      if (isNaN(d.getTime())) return { dayStr: dateStr, weekdayStr: 'Event Day' };

      const today = new Date();
      const isToday =
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear();

      if (isToday) {
        return { dayStr: 'Today', weekdayStr: d.toLocaleDateString('en-US', { weekday: 'long' }) };
      }

      const dayStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      const weekdayStr = d.toLocaleDateString('en-US', { weekday: 'long' });
      return { dayStr, weekdayStr };
    } catch (e) {}
    return { dayStr: dateStr, weekdayStr: 'Event Day' };
  };

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden pt-24 sm:pt-32 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header with Timeline Toggle (as shown in screenshot) */}
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            <span>Events</span>
          </h1>

          {/* Segmented control toggle pill */}
          <div className="flex bg-[#0C0C0C] border border-white/10 rounded-full p-1">
            <button
              onClick={() => setFilterTab('upcoming')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                filterTab === 'upcoming'
                  ? 'bg-white/10 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilterTab('past')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                filterTab === 'past'
                  ? 'bg-white/10 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Past
            </button>
          </div>
        </div>

        {/* Timeline Feed Container */}
        {dbEvents === undefined ? (
          <div className="py-12 text-center">
            <div className="w-8 h-8 rounded-full border-t border-white animate-spin mx-auto mb-4" />
            <p className="text-neutral-500 text-xs font-light">Loading events schedule...</p>
          </div>
        ) : activeList.length === 0 ? (
          <div className="bg-[#0C0C0C] border border-white/5 rounded-[2.5rem] p-12 text-center text-neutral-500 text-sm font-light">
            No events found in this category. organizng soon!
          </div>
        ) : (
          <div className="relative">
            
            {/* Timeline Vertical dashed line running down center (only on larger screens) */}
            <div className="absolute left-[140px] top-6 bottom-6 w-[1px] border-l border-dashed border-white/15 hidden md:block" />

            <div className="space-y-8">
              {activeList.map((event) => {
                const { dayStr, weekdayStr } = formatTimelineDate(event.date);
                return (
                  <div key={event._id} className="relative flex flex-col md:flex-row gap-4 md:gap-12 items-stretch">
                    
                    {/* Left Column: Date & Day of Week */}
                    <div className="w-full md:w-[110px] flex-shrink-0 text-left md:text-right pt-2 md:pt-4">
                      <span className="block text-sm sm:text-base font-bold text-white tracking-wide">{dayStr}</span>
                      <span className="block text-xs text-neutral-500 font-light mt-0.5">{weekdayStr}</span>
                    </div>

                    {/* Timeline Connector Dot Node */}
                    <div className="absolute left-[140px] top-[24px] -translate-x-1/2 w-2 h-2 rounded-full bg-white/20 border border-black z-10 hidden md:block" />

                    {/* Right Column: Event Card */}
                    <Link
                      href={getEventHref(event)}
                      className="flex-1 group bg-white/[0.02] backdrop-blur-xl border border-white/20 hover:border-white/40 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 flex flex-row justify-between gap-4 shadow-2xl relative overflow-hidden"
                    >
                      {/* Left content within card */}
                      <div className="flex-1 flex flex-col justify-between space-y-4 min-w-0">
                        <div>
                          {/* Live / Upcoming Time indicator banner */}
                          {(() => {
                            const d = parseEventDate(event.date);
                            const today = new Date();
                            const isEventToday =
                              d.getDate() === today.getDate() &&
                              d.getMonth() === today.getMonth() &&
                              d.getFullYear() === today.getFullYear();
                            const color = isEventToday
                              ? 'text-amber-500'
                              : filterTab === 'upcoming'
                              ? 'text-emerald-400'
                              : 'text-neutral-500';
                            const dot = isEventToday
                              ? 'bg-amber-500'
                              : filterTab === 'upcoming'
                              ? 'bg-emerald-400'
                              : 'bg-neutral-500';
                            const prefix = isEventToday ? 'LIVE' : filterTab === 'upcoming' ? 'UPCOMING' : 'PAST';
                            const displayDate = isNaN(d.getTime())
                              ? event.date
                              : d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                            const timeStr = event.startTime || '12:00 am';
                            return (
                              <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-medium tracking-wide ${color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0 ${dot}`} />
                                <span className="truncate">
                                  {prefix} • {displayDate} • {timeStr}
                                  {event.endTime && ` - ${event.endTime}`}
                                </span>
                              </div>
                            );
                          })()}

                          {/* Event Title */}
                          <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-neutral-200 transition-colors mt-2 leading-snug">
                            {event.title}
                          </h3>

                          {/* Host metadata */}
                          <div className="flex items-center gap-2 text-xs text-neutral-400 font-light mt-3">
                            <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center text-[10px] font-medium text-white shadow-md">
                              {event.coHosts?.[0]?.image ? (
                                <img src={event.coHosts[0].image} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span>M</span>
                              )}
                            </div>
                            <span className="font-medium text-neutral-300 truncate">By {event.coHosts?.[0]?.name || 'MP DAO Admin'}</span>
                          </div>

                          {/* Location metadata */}
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-light mt-1.5">
                            <MapPin size={14} className="text-neutral-500 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>

                        {/* Card bottom bar badges */}
                        <div className="flex items-center pt-2">
                          <div className="flex -space-x-1.5 items-center">
                            <div className="w-6 h-6 rounded-full bg-neutral-800 border border-[#0C0C0C] shadow-sm overflow-hidden flex items-center justify-center text-neutral-400">
                              <User size={12} />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-neutral-700 border border-[#0C0C0C] shadow-sm overflow-hidden flex items-center justify-center text-neutral-400">
                              <User size={12} />
                            </div>
                            <span className="text-[10px] text-neutral-500 ml-2 font-medium">
                              +{(event.views ?? 18) + 120} views
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Poster thumbnail — always on the right, always shows full poster */}
                      {event.image && (
                        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 bg-black flex-shrink-0 flex items-center justify-center self-center">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}
