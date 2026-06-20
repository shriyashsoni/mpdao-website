import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTeamMembers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("teamMembers").order("asc").collect();
  },
});

export const addTeamMember = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    image: v.string(),
    twitterUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    achievements: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("teamMembers", args);
  },
});

export const updateTeamMember = mutation({
  args: {
    id: v.id("teamMembers"),
    name: v.string(),
    role: v.string(),
    image: v.string(),
    twitterUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    achievements: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const deleteTeamMember = mutation({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
