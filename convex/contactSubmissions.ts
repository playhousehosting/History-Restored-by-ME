import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all contact submissions
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_created")
      .order("desc")
      .collect();
  },
});

// Query to get submissions by status
export const getByStatus = query({
  args: { status: v.union(v.literal("new"), v.literal("read"), v.literal("responded")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect();
  },
});

// Query to get unread count
export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const newSubmissions = await ctx.db
      .query("contactSubmissions")
      .withIndex("by_status", (q) => q.eq("status", "new"))
      .collect();
    return newSubmissions.length;
  },
});

// Mutation to create a contact submission
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
    
    return submissionId;
  },
});

// Mutation to update submission status
export const updateStatus = mutation({
  args: {
    id: v.id("contactSubmissions"),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("responded")),
  },
  handler: async (ctx, args) => {
    const { id, status } = args;
    
    await ctx.db.patch(id, { status });
    
    return id;
  },
});

// Mutation to delete a submission
export const remove = mutation({
  args: { id: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
