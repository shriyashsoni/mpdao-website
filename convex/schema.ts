import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sponsors: defineTable({
    name: v.string(),
    logoUrl: v.string(),
    link: v.string(),
    order: v.optional(v.number()),
  }),
  partners: defineTable({
    name: v.string(),
    logoUrl: v.string(),
    link: v.string(),
    type: v.string(), // 'community' | 'media'
    order: v.optional(v.number()),
  }),
  events: defineTable({
    title: v.string(),
    slogan: v.string(),
    date: v.string(),
    location: v.string(),
    tag: v.string(),
    image: v.string(),
    description: v.string(),
    eventLink: v.optional(v.string()),
    isPast: v.boolean(),
    communityPartners: v.optional(v.array(v.string())), // names or ids
    mediaPartners: v.optional(v.array(v.string())), // names or ids
    
    // Detailed attributes
    endDate: v.optional(v.string()),
    endTime: v.optional(v.string()),
    startTime: v.optional(v.string()),
    category: v.optional(v.string()), // 'hackathon' | 'meetup' | 'workshop' | 'other'
    views: v.optional(v.number()),
    speakers: v.optional(v.array(v.object({
      name: v.string(),
      title: v.string(),
      image: v.string(),
      link: v.optional(v.string()),
    }))),
    coHosts: v.optional(v.array(v.object({
      name: v.string(),
      email: v.optional(v.string()),
      image: v.string(),
    }))),
    supportedEcosystems: v.optional(v.array(v.string())), // sponsor names or ids
    themeColor: v.optional(v.string()), // custom background color hex
    slug: v.optional(v.string()), // URL slug generated from title
  }).index("by_slug", ["slug"]),
  teamMembers: defineTable({
    name: v.string(),
    role: v.string(),
    image: v.string(),
    twitterUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    achievements: v.optional(v.string()), // can be markdown or raw text post
    order: v.optional(v.number()),
  }),
  admins: defineTable({
    email: v.string(),
    passwordHash: v.string(),
  }),
});
