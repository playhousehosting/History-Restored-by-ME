import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all published blog posts
export const getPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
  },
});

// Query to get recent published blog posts
export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 3;
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .take(limit);
  },
});

// Query to get all blog posts (including drafts, for admin)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogPosts").order("desc").collect();
  },
});

// Query to get a blog post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Query to get a blog post by ID
export const getById = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation to create a blog post
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user ID
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) {
      throw new Error("User must be authenticated to create a blog post");
    }
    
    const postId = await ctx.db.insert("blogPosts", {
      ...args,
      userId: userId.subject as any,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return postId;
  },
});

// Mutation to update a blog post
export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    
    await ctx.db.patch(id, {
      ...updateData,
      updatedAt: Date.now(),
    });
    
    return id;
  },
});

// Mutation to delete a blog post
export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
