import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate a short-lived signed URL for uploading a file to Convex Storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// After uploading, call this mutation with the storageId to get the real public URL
// This is more reliable than manually constructing the URL on the frontend
export const getStorageUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url; // Returns null if not found, or the full https://... URL
  },
});

// Query version (reactive) — use this if you want to display a stored storageId as an image
export const getImageUrl = query({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
