'use client';

import { use, useEffect, useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';
import { MapPin, ArrowLeft, ExternalLink, Users, FileText, Clock, Sparkles, Globe, Twitter, Instagram, Eye, Share2 } from 'lucide-react';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = use(params);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Fetch event details & increment views
  const event = useQuery(api.events.getEventBySlug, { slug: id });
  const sponsors = useQuery(api.sponsors.getSponsors);
  const partners = useQuery(api.partners.getPartners);
  
  const incrementViews = useMutation(api.events.incrementEventViews);

  useEffect(() => {
    if (event?._id) {
      incrementViews({ id: event._id }).catch(err => console.error("Error incrementing views:", err));
    }
  }, [event?._id, incrementViews]);

  if (event === undefined || partners === undefined || sponsors === undefined) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-t border-white animate-spin mx-auto mb-4" />
          <p className="text-neutral-500 text-sm font-light">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (event === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Event Not Found</h1>
          <p className="text-neutral-500 text-sm font-light mb-6">The event you are looking for does not exist or has been removed.</p>
          <Link href="/events" className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  // Filter associated sponsors (Supported Ecosystems)
  const associatedSponsors = sponsors.filter((s: any) => 
    event.supportedEcosystems?.includes(s.name) || event.supportedEcosystems?.includes(s._id)
  );

  // Filter associated partners
  const associatedCommunityPartners = partners.filter((p: any) => 
    p.type === 'community' && (event.communityPartners?.includes(p.name) || event.communityPartners?.includes(p._id))
  );

  const associatedMediaPartners = partners.filter((p: any) => 
    p.type === 'media' && (event.mediaPartners?.includes(p.name) || event.mediaPartners?.includes(p._id))
  );

  // Helper to safely convert plain text URLs into clickable links without breaking HTML tags
  const linkifyHtml = (html: string) => {
    if (!html) return '';
    const parts = html.split(/(<[^>]+>)/g);
    let insideAnchor = false;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('<')) {
        if (part.match(/^<a\b/i)) insideAnchor = true;
        if (part.match(/^<\/a>/i)) insideAnchor = false;
        continue;
      }
      if (!insideAnchor) {
        parts[i] = part.replace(
          /(https?:\/\/[^\s<]+)/g, 
          '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline hover:text-blue-300 break-all">$1</a>'
        );
      }
    }
    return parts.join('');
  };

  // Parse date helper for the calendar badge box (like JUN 27 in screenshot)
  const getCalendarDateParts = (dateStr: string) => {
    try {
      let d: Date;
      // ISO format YYYY-MM-DD (from new date picker)
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        d = new Date(dateStr + 'T00:00:00');
      } else {
        const cleaned = dateStr.replace(/(st|nd|rd|th),/g, ',');
        d = new Date(cleaned);
      }
      if (!isNaN(d.getTime())) {
        const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
        const day = d.toLocaleDateString('en-US', { day: 'numeric' });
        return { month, day };
      }
    } catch (e) {}
    return { month: 'EVT', day: '00' };
  };

  const { month, day } = getCalendarDateParts(event.date);

  return (
    <div 
      className="min-h-screen text-white font-sans overflow-x-hidden pt-20 sm:pt-28 pb-32 relative"
      style={event.themeColor ? { backgroundColor: `${event.themeColor}08` } : {}}
    >
      {/* Dynamic Theme Glow */}
      {event.themeColor && (
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full blur-[120px] opacity-[0.15] pointer-events-none"
          style={{ backgroundColor: event.themeColor }}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-medium mb-8 group"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Events Calendar</span>
        </Link>

        {/* Layout Grid: Left (Poster & Hosts Info) & Right (Title, Booking Card, Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Event Poster image & Host Profile details */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Event Poster Card */}
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-[#0C0C0C] shadow-2xl">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Clock className="w-12 h-12 text-neutral-800" />
                </div>
              )}
            </div>

            {/* Presented By description card */}
            <div className="bg-[#0C0C0C]/80 border border-white/10 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center font-bold text-xs uppercase text-white">
                    {event.coHosts?.[0]?.image ? (
                      <img src={event.coHosts[0].image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span>M</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mb-0.5">Presented by</span>
                    <span className="text-xs font-bold text-white">
                      {event.coHosts?.[0]?.name || 'MP DAO Admin'}
                    </span>
                  </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all">
                  Follow
                </button>
              </div>

              <p className="text-neutral-400 text-xs font-light leading-relaxed border-t border-white/5 pt-3">
                Connecting India's top developers, founders, startup builders, and tech professionals in central India.
              </p>

              {/* Social row */}
              <div className="flex gap-4 text-neutral-500 text-xs pt-1">
                <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"><Globe size={12} /> Website</span>
                <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"><Twitter size={12} /> Twitter</span>
                <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"><Instagram size={12} /> Instagram</span>
              </div>
            </div>

            {/* Co-Hosts Detail List */}
            {event.coHosts && event.coHosts.length > 0 && (
              <div className="bg-[#0C0C0C]/40 border border-white/5 rounded-3xl p-5 space-y-4">
                <h4 className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Hosted By</h4>
                <div className="space-y-3">
                  {event.coHosts.map((host: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between gap-3 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 overflow-hidden relative flex items-center justify-center text-[10px] text-white">
                          {host.image ? (
                            <img src={host.image} alt={host.name} className="w-full h-full object-cover" />
                          ) : (
                            <span>H</span>
                          )}
                        </div>
                        <span className="text-xs font-medium text-white">{host.name}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500">Host</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Event details, calendar box, redirection booking card */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Title & category */}
            <div>
              <span className="bg-white/10 border border-white/20 text-[9px] text-neutral-300 tracking-wider uppercase px-2.5 py-1.5 rounded-full font-bold inline-block mb-3">
                {event.category || 'meetup'}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {event.title}
              </h1>
            </div>

            {/* Date and Location indicators */}
            <div className="space-y-4">
              
              {/* Calendar Badge & DateTime text block */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-neutral-400 tracking-wider block">{month}</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5 leading-none">{day}</span>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    {(() => {
                      if (/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
                        const d = new Date(event.date + 'T00:00:00');
                        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                      }
                      return event.date;
                    })()}
                  </span>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    {event.startTime ? `${event.startTime}` : '12:00 am'} 
                    {event.endTime && ` - ${event.endTime}`}
                  </span>
                </div>
              </div>

              {/* Map pin Badge & Venue address text block */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-neutral-400" />
                </div>
                <div>
                  {event.location?.startsWith('http') ? (
                    <a href={event.location} target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-bold text-white hover:underline block truncate max-w-xs sm:max-w-md">
                      View Map / Location Link
                    </a>
                  ) : (
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {event.location}
                    </span>
                  )}
                  <span className="text-[10px] text-neutral-500 block mt-0.5">
                    Event Venue
                  </span>
                </div>
              </div>

            </div>

            {/* Registration Card (as shown in screenshot - but with Register redirection action instead of invitation decline button) */}
            <div className="bg-[#0C0C0C] border border-white/10 rounded-[1.5rem] overflow-hidden shadow-2xl">
              
              {/* Card Title Header bar */}
              <div className="bg-neutral-900/60 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Registration</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">Active</span>
              </div>

              {/* Card Core body */}
              <div className="p-6 space-y-6">
                
                {/* Primary Register button (Redirects immediately to external url portal) */}
                <div className="pt-2">
                  {event.eventLink ? (
                    <a
                      href={event.eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-white text-black py-4 rounded-full font-bold hover:bg-neutral-200 transition-all text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Register / Redirect</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 text-neutral-600 py-4 rounded-full font-semibold text-xs cursor-not-allowed uppercase tracking-wider"
                    >
                      No Registration Link Configured
                    </button>
                  )}
                  
                  {/* Views count */}
                  <div className="text-center text-[10px] text-neutral-500 font-light mt-3 flex items-center justify-center gap-1.5">
                    <Eye size={12} className="text-neutral-600" />
                    <span>{(event.views ?? 0)} direct page views recorded</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Share Section */}
            <div className="bg-[#0C0C0C]/40 border border-white/5 rounded-[1.5rem] p-6 text-center space-y-4">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <Share2 size={14} className="text-neutral-500" />
                <span>Share this Event</span>
              </h3>
              <div className="flex items-center justify-center gap-3">
                {(() => {
                  const eventUrl = `https://mpdao.xyz/events/${event.slug || event._id}`;
                  const shareText = `Join us at ${event.title}!\nDate: ${event.date}\nLocation: ${event.location}\n\n${event.slogan}\n\nRegister here: ${eventUrl}`;
                  const encodedShareText = encodeURIComponent(shareText);
                  const encodedUrl = encodeURIComponent(eventUrl);
                  
                  return (
                    <>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodedShareText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#0C0C0C] border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg"
                        title="Share on X (Twitter)"
                      >
                        <Twitter size={16} className="text-white" />
                      </a>
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodedShareText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#0C0C0C] border border-white/10 flex items-center justify-center hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-colors shadow-lg"
                        title="Share on WhatsApp"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-[#25D366] transition-colors"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#0C0C0C] border border-white/10 flex items-center justify-center hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 transition-colors shadow-lg"
                        title="Share on LinkedIn"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-[#0A66C2] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* About Event HTML Content */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                About Event
              </h3>
              
              {/* Rich description parsed HTML */}
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: linkifyHtml(
                    (event.description?.length > 500 && !isDescriptionExpanded)
                      ? event.description.substring(0, 450) + '...'
                      : (event.description || '')
                  ) 
                }} 
                className="prose prose-invert max-w-none text-neutral-300 text-sm sm:text-base font-light font-sans space-y-4 leading-relaxed mt-2 whitespace-pre-wrap"
              />

              {event.description?.length > 500 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-white hover:text-neutral-300 font-semibold text-xs transition-colors uppercase tracking-widest border border-white/20 hover:bg-white/5 px-4 py-2 rounded-full mt-2"
                >
                  {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Speakers List */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="space-y-6 pt-6">
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">
                  Featured Speakers
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {event.speakers.map((speaker: any, idx: number) => (
                    <div 
                      key={idx}
                      className="bg-[#0C0C0C]/40 border border-white/5 rounded-2xl p-4 text-center flex flex-col items-center hover:border-white/10 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-black mb-3 relative">
                        {speaker.image ? (
                          <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-neutral-700 bg-neutral-900">Photo</div>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-white truncate max-w-full mb-0.5">{speaker.name}</h5>
                      <p className="text-neutral-500 text-[10px] font-light truncate max-w-full">{speaker.title}</p>
                      
                      {speaker.link && (
                        <a 
                          href={speaker.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1 text-[9px] text-neutral-400 hover:text-white transition-colors"
                        >
                          <span>Connect</span>
                          <ExternalLink size={8} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Associated Partners Lists */}
            {(associatedSponsors.length > 0 || associatedCommunityPartners.length > 0 || associatedMediaPartners.length > 0) && (
              <div className="border-t border-white/5 pt-8 space-y-10">
                
                {/* 1. Supported Ecosystems */}
                {associatedSponsors.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Sparkles size={14} className="text-neutral-500" />
                      <span>Supported Ecosystems</span>
                    </h4>
                    <div className="flex flex-wrap gap-6 items-center bg-[#0C0C0C]/40 border border-white/5 p-6 rounded-[2rem]">
                      {associatedSponsors.map((sponsor: any) => (
                        <a
                          key={sponsor._id}
                          href={sponsor.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-105 transition-all duration-300"
                        >
                          {sponsor.logoUrl ? (
                            <img src={sponsor.logoUrl} alt={sponsor.name} className="h-8 sm:h-9 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity" />
                          ) : (
                            <span className="text-xs text-neutral-400 font-semibold">{sponsor.name}</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Community Partners */}
                {associatedCommunityPartners.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Users size={12} />
                      <span>Community Partners</span>
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {associatedCommunityPartners.map((partner: any) => (
                        <a
                          key={partner._id}
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0C0C0C]/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
                        >
                          <div className="w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                            {partner.logoUrl ? (
                              <img
                                src={partner.logoUrl}
                                alt={partner.name}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <Users size={10} className="text-neutral-600" />
                            )}
                          </div>
                          <span className="text-xs font-medium truncate text-white">{partner.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Media Partners */}
                {associatedMediaPartners.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FileText size={12} />
                      <span>Media Partners</span>
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {associatedMediaPartners.map((partner: any) => (
                        <a
                          key={partner._id}
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0C0C0C]/40 border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
                        >
                          <div className="w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                            {partner.logoUrl ? (
                              <img
                                src={partner.logoUrl}
                                alt={partner.name}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <FileText size={10} className="text-neutral-600" />
                            )}
                          </div>
                          <span className="text-xs font-medium truncate text-white">{partner.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* MOBILE STICKY BOTTOM REDIRECTION FOOTER BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 p-4 flex items-center justify-between gap-4 backdrop-blur-lg">
        <div className="overflow-hidden">
          <span className="text-[9px] text-neutral-500 uppercase block tracking-wider font-semibold">Event Ticket</span>
          <span className="text-xs font-semibold text-white truncate block max-w-[200px]">{event.title}</span>
        </div>
        {event.eventLink ? (
          <a
            href={event.eventLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black font-bold rounded-full text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1.5 flex-shrink-0 uppercase tracking-wider shadow-lg"
          >
            <span>Register Now</span>
            <ExternalLink size={12} />
          </a>
        ) : (
          <button
            disabled
            className="px-6 py-3 bg-neutral-900 text-neutral-600 font-bold rounded-full text-xs cursor-not-allowed uppercase tracking-wider"
          >
            N/A
          </button>
        )}
      </div>

    </div>
  );
}
