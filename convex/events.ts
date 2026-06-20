import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

export const getEventById = query({
  args: {
    id: v.id("events"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getEventBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.query("events").withIndex("by_slug", q => q.eq("slug", args.slug)).first();
    if (event) return event;
    
    // Fallback to id fetch
    try {
      const id = args.slug as import("./_generated/dataModel").Id<"events">;
      return await ctx.db.get(id);
    } catch {
      return null;
    }
  },
});

export const addEvent = mutation({
  args: {
    title: v.string(),
    slogan: v.string(),
    date: v.string(),
    location: v.string(),
    tag: v.string(),
    image: v.string(),
    description: v.string(),
    eventLink: v.optional(v.string()),
    isPast: v.boolean(),
    communityPartners: v.optional(v.array(v.string())),
    mediaPartners: v.optional(v.array(v.string())),
    
    // Detailed attributes
    endDate: v.optional(v.string()),
    endTime: v.optional(v.string()),
    startTime: v.optional(v.string()),
    category: v.optional(v.string()),
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
    supportedEcosystems: v.optional(v.array(v.string())),
    themeColor: v.optional(v.string()),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("events", {
      title: args.title,
      slogan: args.slogan,
      date: args.date,
      location: args.location,
      tag: args.tag,
      image: args.image,
      description: args.description,
      eventLink: args.eventLink,
      isPast: args.isPast,
      communityPartners: args.communityPartners ?? [],
      mediaPartners: args.mediaPartners ?? [],
      
      endDate: args.endDate,
      endTime: args.endTime,
      startTime: args.startTime,
      category: args.category ?? "meetup",
      views: 0,
      speakers: args.speakers ?? [],
      coHosts: args.coHosts ?? [],
      supportedEcosystems: args.supportedEcosystems ?? [],
      themeColor: args.themeColor,
      slug: args.slug,
    });
    return id;
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    title: v.string(),
    slogan: v.string(),
    date: v.string(),
    location: v.string(),
    tag: v.string(),
    image: v.string(),
    description: v.string(),
    eventLink: v.optional(v.string()),
    isPast: v.boolean(),
    communityPartners: v.optional(v.array(v.string())),
    mediaPartners: v.optional(v.array(v.string())),
    
    // Detailed attributes
    endDate: v.optional(v.string()),
    endTime: v.optional(v.string()),
    startTime: v.optional(v.string()),
    category: v.optional(v.string()),
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
    supportedEcosystems: v.optional(v.array(v.string())),
    themeColor: v.optional(v.string()),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    await ctx.db.patch(args.id, {
      title: args.title,
      slogan: args.slogan,
      date: args.date,
      location: args.location,
      tag: args.tag,
      image: args.image,
      description: args.description,
      eventLink: args.eventLink,
      isPast: args.isPast,
      communityPartners: args.communityPartners ?? [],
      mediaPartners: args.mediaPartners ?? [],
      
      endDate: args.endDate,
      endTime: args.endTime,
      startTime: args.startTime,
      category: args.category ?? "meetup",
      speakers: args.speakers ?? [],
      coHosts: args.coHosts ?? [],
      supportedEcosystems: args.supportedEcosystems ?? [],
      themeColor: args.themeColor,
      slug: args.slug,
    });
    return { success: true };
  },
});

export const incrementEventViews = mutation({
  args: {
    id: v.id("events"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (existing) {
      const currentViews = existing.views ?? 0;
      await ctx.db.patch(args.id, {
        views: currentViews + 1,
      });
    }
    return { success: true };
  },
});

export const deleteEvent = mutation({
  args: {
    id: v.id("events"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
