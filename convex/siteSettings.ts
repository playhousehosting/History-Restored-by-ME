import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get current site settings
export const get = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("siteSettings").first();
    
    // Return default settings if none exist
    if (!settings) {
      return {
        registrationEnabled: true,
        signInEnabled: true,
        updatedAt: Date.now(),
      };
    }
    
    return settings;
  },
});

// Initialize default settings (called once)
export const initialize = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("siteSettings").first();
    
    if (!existing) {
      await ctx.db.insert("siteSettings", {
        registrationEnabled: true,
        signInEnabled: true,
        updatedAt: Date.now(),
      });
    }
    
    return { success: true };
  },
});

// Update registration setting
export const updateRegistration = mutation({
  args: {
    enabled: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // User is authenticated, allow update
    // TODO: Add proper role-based access control if needed

    const settings = await ctx.db.query("siteSettings").first();
    
    if (settings) {
      await ctx.db.patch(settings._id, {
        registrationEnabled: args.enabled,
        updatedAt: Date.now(),
        updatedBy: userId,
      });
    } else {
      await ctx.db.insert("siteSettings", {
        registrationEnabled: args.enabled,
        signInEnabled: true,
        updatedAt: Date.now(),
        updatedBy: userId,
      });
    }
    
    return { success: true };
  },
});

// Update sign-in setting
export const updateSignIn = mutation({
  args: {
    enabled: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // User is authenticated, allow update
    // TODO: Add proper role-based access control if needed

    const settings = await ctx.db.query("siteSettings").first();
    
    if (settings) {
      await ctx.db.patch(settings._id, {
        signInEnabled: args.enabled,
        updatedAt: Date.now(),
        updatedBy: userId,
      });
    } else {
      await ctx.db.insert("siteSettings", {
        registrationEnabled: true,
        signInEnabled: args.enabled,
        updatedAt: Date.now(),
        updatedBy: userId,
      });
    }
    
    return { success: true };
  },
});

// Update both settings at once
export const updateSettings = mutation({
  args: {
    registrationEnabled: v.boolean(),
    signInEnabled: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // User is authenticated, allow update
    // TODO: Add proper role-based access control if needed

    const settings = await ctx.db.query("siteSettings").first();
    
    if (settings) {
      await ctx.db.patch(settings._id, {
        registrationEnabled: args.registrationEnabled,
        signInEnabled: args.signInEnabled,
        updatedAt: Date.now(),
        updatedBy: userId,
      });
    } else {
      await ctx.db.insert("siteSettings", {
        registrationEnabled: args.registrationEnabled,
        signInEnabled: args.signInEnabled,
        updatedAt: Date.now(),
        updatedBy: userId,
      });
    }
    
    return { success: true };
  },
});
