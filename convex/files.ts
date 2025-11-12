import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

/**
 * Generate upload URL for Convex file storage
 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to upload files");
    }
    
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Save file metadata after upload
 */
export const saveFileMetadata = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
    type: v.string(),
    size: v.number(),
    usedIn: v.optional(v.union(
      v.object({
        type: v.literal("project"),
        id: v.id("projects"),
      }),
      v.object({
        type: v.literal("blogPost"),
        id: v.id("blogPosts"),
      })
    )),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to save file metadata");
    }

    const fileId = await ctx.db.insert("files", {
      storageId: args.storageId,
      name: args.name,
      type: args.type,
      size: args.size,
      uploadedBy: userId,
      usedIn: args.usedIn,
      createdAt: Date.now(),
    });

    return fileId;
  },
});

/**
 * Get file URL from storage ID
 */
export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

/**
 * List all files uploaded by a user
 */
export const listUserFiles = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const files = await ctx.db
      .query("files")
      .withIndex("by_user", (q) => q.eq("uploadedBy", userId))
      .order("desc")
      .take(args.limit ?? 50);

    // Get URLs for all files
    const filesWithUrls = await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await ctx.storage.getUrl(file.storageId),
      }))
    );

    return filesWithUrls;
  },
});

/**
 * List all files (admin only)
 */
export const listAllFiles = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated");
    }

    // Check if user is admin
    const user = await ctx.db.get(userId);
    if (!user?.isAdmin) {
      throw new Error("Admin access required");
    }

    const files = await ctx.db
      .query("files")
      .order("desc")
      .take(args.limit ?? 100);

    // Get URLs for all files
    const filesWithUrls = await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await ctx.storage.getUrl(file.storageId),
      }))
    );

    return filesWithUrls;
  },
});

/**
 * Delete a file from storage
 */
export const deleteFile = mutation({
  args: { 
    fileId: v.id("files"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to delete files");
    }

    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Check if user owns the file or is admin
    const user = await ctx.db.get(userId);
    if (file.uploadedBy !== userId && !user?.isAdmin) {
      throw new Error("Not authorized to delete this file");
    }

    // Delete from storage
    await ctx.storage.delete(file.storageId);
    
    // Delete metadata
    await ctx.db.delete(args.fileId);

    return { success: true };
  },
});
