import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  
  // Note: authTables already includes a users table with email and name
  // We can add custom user metadata in a separate table if needed

  projects: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("completed"),
      v.literal("in-progress"),
      v.literal("planned")
    ),
    featured: v.boolean(),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_featured", ["featured"])
    .index("by_user", ["userId"]),

  images: defineTable({
    url: v.string(),
    alt: v.optional(v.string()),
    projectId: v.id("projects"),
    order: v.number(),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_order", ["projectId", "order"]),

  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    published: v.boolean(),
    status: v.union(
      v.literal("draft"),
      v.literal("scheduled"),
      v.literal("published")
    ),
    scheduledPublishDate: v.optional(v.number()),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    tags: v.optional(v.string()),
    aiGenerated: v.boolean(),
    aiPrompt: v.optional(v.string()),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_status", ["status"])
    .index("by_scheduled", ["scheduledPublishDate"])
    .index("by_user", ["userId"])
    .index("by_ai_generated", ["aiGenerated"]),

  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("responded")
    ),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),
});
