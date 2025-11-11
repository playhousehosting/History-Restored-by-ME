import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all projects
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").order("desc").collect();
    
    // Get images for each project
    const projectsWithImages = await Promise.all(
      projects.map(async (project) => {
        const images = await ctx.db
          .query("images")
          .withIndex("by_project", (q) => q.eq("projectId", project._id))
          .order("asc")
          .collect();
        return { ...project, images };
      })
    );
    
    return projectsWithImages;
  },
});

// Query to get featured projects
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(6);
    
    // Get first image for each project
    const projectsWithImages = await Promise.all(
      projects.map(async (project) => {
        const images = await ctx.db
          .query("images")
          .withIndex("by_project", (q) => q.eq("projectId", project._id))
          .order("asc")
          .take(1);
        return { ...project, images };
      })
    );
    
    return projectsWithImages;
  },
});

// Query to get a single project by ID
export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) return null;
    
    const images = await ctx.db
      .query("images")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .order("asc")
      .collect();
    
    return { ...project, images };
  },
});

// Mutation to create a project
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("completed"),
      v.literal("in-progress"),
      v.literal("planned")
    ),
    featured: v.boolean(),
    userId: v.id("users"),
    images: v.array(
      v.object({
        url: v.string(),
        alt: v.optional(v.string()),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { images, ...projectData } = args;
    
    // Create project
    const projectId = await ctx.db.insert("projects", {
      ...projectData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    // Create images
    for (const image of images) {
      await ctx.db.insert("images", {
        ...image,
        projectId,
        createdAt: Date.now(),
      });
    }
    
    return projectId;
  },
});

// Mutation to update a project
export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("completed"),
      v.literal("in-progress"),
      v.literal("planned")
    ),
    featured: v.boolean(),
    images: v.array(
      v.object({
        url: v.string(),
        alt: v.optional(v.string()),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, images, ...projectData } = args;
    
    // Update project
    await ctx.db.patch(id, {
      ...projectData,
      updatedAt: Date.now(),
    });
    
    // Delete existing images
    const existingImages = await ctx.db
      .query("images")
      .withIndex("by_project", (q) => q.eq("projectId", id))
      .collect();
    
    for (const image of existingImages) {
      await ctx.db.delete(image._id);
    }
    
    // Create new images
    for (const image of images) {
      await ctx.db.insert("images", {
        ...image,
        projectId: id,
        createdAt: Date.now(),
      });
    }
    
    return id;
  },
});

// Mutation to delete a project
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    // Delete all images
    const images = await ctx.db
      .query("images")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();
    
    for (const image of images) {
      await ctx.db.delete(image._id);
    }
    
    // Delete project
    await ctx.db.delete(args.id);
    
    return args.id;
  },
});
