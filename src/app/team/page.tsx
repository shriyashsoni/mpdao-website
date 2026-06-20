'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Users, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function TeamPage() {
  const teamMembers = useQuery(api.team.getTeamMembers);

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden pt-24 sm:pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0C0C0C] mb-6">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-300 font-medium">Protocol</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white mb-6">
            Core Team
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Meet the builders, contributors, and visionaries driving the MP DAO ecosystem forward.
          </p>
        </div>

        {/* Team Members Grid */}
        {teamMembers === undefined ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin" />
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 font-light bg-[#0C0C0C] rounded-3xl border border-white/5">
            No team members added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div 
                key={member._id} 
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0C] p-6 sm:p-8 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-black border border-white/10 rounded-full flex items-center justify-center overflow-hidden relative mb-5 group-hover:scale-105 transition-transform duration-300">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Users className="w-10 h-10 text-neutral-600" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-neutral-400 font-light mb-4">{member.role}</p>
                  
                  {member.achievements && (
                    <div className="w-full text-left bg-black/50 border border-white/5 rounded-xl p-4 mb-5">
                      <p className="text-xs text-neutral-300 font-light leading-relaxed whitespace-pre-wrap">
                        {member.achievements}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5 w-full justify-center">
                    {member.twitterUrl && (
                      <a 
                        href={member.twitterUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <Twitter className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a 
                        href={member.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
