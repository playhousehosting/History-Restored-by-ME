import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Admin-only mutation to delete a user by email
// This is for development/testing purposes
export const deleteUserByEmail = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Find user by email
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();
    
    if (!user) {
      throw new Error(`No user found with email: ${args.email}`);
    }
    
    // Delete the user
    await ctx.db.delete(user._id);
    
    // Also delete associated auth accounts
    const accounts = await ctx.db
      .query("authAccounts")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();
    
    for (const account of accounts) {
      await ctx.db.delete(account._id);
    }
    
    // Delete associated auth sessions
    const sessions = await ctx.db
      .query("authSessions")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();
    
    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }
    
    return { success: true, deletedUserId: user._id };
  },
});
