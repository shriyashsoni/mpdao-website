import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getSponsors = query({
  args: {},
  handler: async (ctx) => {
    const sponsors = await ctx.db.query("sponsors").collect();
    // Sort by order if present
    return sponsors.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

export const addSponsor = mutation({
  args: {
    name: v.string(),
    logoUrl: v.string(),
    link: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("sponsors", {
      name: args.name,
      logoUrl: args.logoUrl,
      link: args.link,
      order: args.order ?? 0,
    });
    return id;
  },
});

export const updateSponsor = mutation({
  args: {
    id: v.id("sponsors"),
    name: v.string(),
    logoUrl: v.string(),
    link: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      logoUrl: args.logoUrl,
      link: args.link,
      order: args.order,
    });
    return { success: true };
  },
});

export const deleteSponsor = mutation({
  args: {
    id: v.id("sponsors"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
