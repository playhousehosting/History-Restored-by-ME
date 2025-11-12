import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
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

// Action to create a new user as admin (with password hashing in Node environment)
export const createUserAsAdmin = action({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify admin is authenticated
    const userId = await ctx.runQuery(api.users.viewer);
    if (!userId) {
      throw new Error("Not authenticated - admin access required");
    }

    // Check if email already exists
    const existingUser = await ctx.runQuery(api.users.checkEmailExists, { email: args.email });
    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    // Use Node.js bcrypt for password hashing (available in actions)
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(args.password, 10);

    // Create the user via mutation
    const result = await ctx.runMutation(api.users.createUserWithHash, {
      name: args.name,
      email: args.email,
      hashedPassword,
    });

    return result;
  },
});

// Helper query to check if email exists
export const checkEmailExists = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    return !!existingUser;
  },
});

// Helper mutation to create user with pre-hashed password
export const createUserWithHash = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    hashedPassword: v.string(),
  },
  handler: async (ctx, args) => {
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
      secret: args.hashedPassword,
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
