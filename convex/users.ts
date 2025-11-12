import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Query to get the current authenticated user
export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    
    const user = await ctx.db.get(userId);
    return user;
  },
});

// Query to get all users (admin only)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Get all users from the authTables users table
    const users = await ctx.db.query("users").collect();
    
    return users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      emailVerificationTime: user.emailVerificationTime,
      _creationTime: user._creationTime,
    }));
  },
});

// Create a new user as admin - uses action to call register endpoint
export const createUserAsAdmin = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated - admin access required");
    }

    // Check if email already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    // Use bcrypt to hash the password (same as Convex auth uses)
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(args.password, 10);

    // Create the user
    const newUserId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      emailVerificationTime: undefined,
      phoneVerificationTime: undefined,
      isAnonymous: false,
    });

    // Create auth account for password authentication
    await ctx.db.insert("authAccounts", {
      userId: newUserId,
      provider: "password",
      providerAccountId: args.email,
      secret: hashedPassword,
    });

    return { success: true, userId: newUserId };
  },
});

// Mutation to delete a user (admin only)
export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Don't allow deleting yourself
    if (userId === args.id) {
      throw new Error("You cannot delete your own account");
    }

    // Delete associated auth accounts
    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", args.id))
      .collect();
    
    for (const account of accounts) {
      await ctx.db.delete(account._id);
    }

    // Delete associated sessions
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", (q) => q.eq("userId", args.id))
      .collect();
    
    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }

    // Delete the user
    await ctx.db.delete(args.id);
    
    return args.id;
  },
});
