import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper to hash password using SHA-256
async function sha256(message: string): Promise<string> {
  // Convert string to Buffer/ArrayBuffer, then compute SHA-256 hash
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export const initDefaultAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("admins").collect();
    if (existing.length === 0) {
      // Create a default admin if none exists
      // email: admin@mpdao.in, password: password123 (or custom)
      const passwordHash = await sha256("mpdao2026");
      await ctx.db.insert("admins", {
        email: "mpdaoofficial@gmail.com",
        passwordHash,
      });
      return { success: true, message: "Default admin created: mpdaoofficial@gmail.com / mpdao2026" };
    }
    return { success: false, message: "Admins already exist" };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const passwordHash = await sha256(args.password);
    const admin = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    if (admin && admin.passwordHash === passwordHash) {
      return { success: true, email: admin.email, id: admin._id };
    }
    return { success: false, error: "Invalid email or password" };
  },
});

export const createAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const passwordHash = await sha256(args.password);
    const existing = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    if (existing) {
      throw new Error("Admin email already exists");
    }

    const id = await ctx.db.insert("admins", {
      email: args.email,
      passwordHash,
    });
    return { success: true, id };
  },
});

export const listAdmins = query({
  args: {},
  handler: async (ctx) => {
    const admins = await ctx.db.query("admins").collect();
    return admins.map(a => ({ id: a._id, email: a.email }));
  },
});

export const deleteAdmin = mutation({
  args: {
    id: v.id("admins"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
