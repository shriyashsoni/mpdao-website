import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getPartners = query({
  args: {},
  handler: async (ctx) => {
    const partners = await ctx.db.query("partners").collect();
    return partners.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

export const addPartner = mutation({
  args: {
    name: v.string(),
    logoUrl: v.string(),
    link: v.string(),
    type: v.string(), // 'community' | 'media'
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("partners", {
      name: args.name,
      logoUrl: args.logoUrl,
      link: args.link,
      type: args.type,
      order: args.order ?? 0,
    });
    return id;
  },
});

export const updatePartner = mutation({
  args: {
    id: v.id("partners"),
    name: v.string(),
    logoUrl: v.string(),
    link: v.string(),
    type: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      logoUrl: args.logoUrl,
      link: args.link,
      type: args.type,
      order: args.order,
    });
    return { success: true };
  },
});

export const deletePartner = mutation({
  args: {
    id: v.id("partners"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
