import { v } from "convex/values";
import { action, internalMutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "./auth";

/**
 * Generate a comprehensive SEO-optimized blog post about tractors/machinery
 * using Claude Haiku 4.5
 */
export const generateBlogPost = action({
  args: {
    topic: v.string(), // e.g., "1950 Ford 8N Tractor"
    keywords: v.optional(v.string()), // Optional additional keywords
    tone: v.optional(v.union(
      v.literal("professional"),
      v.literal("casual"),
      v.literal("enthusiast"),
      v.literal("technical")
    )),
  },
  handler: async (ctx, { topic, keywords = "", tone = "professional" }) => {
    // Verify user is authenticated - get userId from query that has access to ctx
    const userId = await ctx.runQuery(api.aiBlogGeneration.getCurrentUserId);
    if (!userId) {
      throw new Error("Must be authenticated to generate blog posts");
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY is not configured. Please set it in your Convex dashboard: " +
        "npx convex env set ANTHROPIC_API_KEY your-key-here"
      );
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Create the prompt for Claude
    const prompt = `You are an expert content writer specializing in vintage tractors, agricultural machinery, and equipment restoration. Create a professional, magazine-quality blog post.

Write a comprehensive, SEO-optimized blog post about: "${topic}"

CONTENT REQUIREMENTS:
- Length: 1500-2000 words (comprehensive and detailed)
- Tone: ${tone}
- Include specific technical details, history, and restoration insights
- Create engaging narrative that captivates readers
- Natural keyword integration: ${keywords || topic}
- Include maintenance tips, historical context, and collector value insights
- Use specific model numbers, years, and technical specifications
- Add expert insights and practical advice
- Include troubleshooting tips where relevant

STRUCTURE REQUIREMENTS:
1. Opening Hook (2-3 paragraphs): Compelling introduction that draws readers in
2. 5-7 Main Sections with H2 headings (Historical Context, Technical Specs, Design Features, Restoration Guide, Maintenance Tips, Collector Value, etc.)
3. Each main section should have 2-4 subsections with H3 headings
4. Practical lists for specifications, tips, and procedures
5. Strong conclusion that summarizes key points

HTML FORMATTING RULES (STRICTLY FOLLOW):
1. Use <p></p> tags for EVERY paragraph - no exceptions
2. Use <h2></h2> for main section titles
3. Use <h3></h3> for subsections
4. Use <ul><li></li></ul> for bulleted lists
5. Use <ol><li></li></ul> for numbered lists
6. Use <strong></strong> for important terms and emphasis
7. Use <em></em> for subtle emphasis or technical terms
8. Use <blockquote></blockquote> for quotes or key insights

SPACING RULES:
- Leave blank line after each closing tag
- Separate sections with double line breaks
- Each paragraph should be standalone with proper tags
- Lists must be properly formatted with ul/ol tags

EXAMPLE STRUCTURE:
<p>Opening paragraph that hooks the reader with interesting facts...</p>

<p>Second paragraph expanding on the hook...</p>

<h2>Historical Development</h2>

<p>First paragraph of this section...</p>

<p>Second paragraph with more details...</p>

<h3>Key Innovations</h3>

<p>Explanation of innovations...</p>

<ul>
<li>First innovation point</li>
<li>Second innovation point</li>
<li>Third innovation point</li>
</ul>

<h2>Technical Specifications</h2>

<p>Overview of technical details...</p>

<h3>Engine and Performance</h3>

<p>Detailed engine information...</p>

<ul>
<li><strong>Engine Type:</strong> Details here</li>
<li><strong>Horsepower:</strong> Details here</li>
<li><strong>Displacement:</strong> Details here</li>
</ul>

Continue with comprehensive sections covering restoration, maintenance, collector value, and practical tips. End with a strong conclusion.`;

    try {
      // Call Claude Haiku 4.5 API
      console.log("Calling Anthropic API for topic:", topic);
      const message = await anthropic.messages.create({
        model: "claude-3-5-haiku-20241022", // Claude Haiku 4.5
        max_tokens: 4096,
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      console.log("Anthropic API response received");

      // Extract the generated content
      const content = message.content[0].type === "text" 
        ? message.content[0].text 
        : "";

      if (!content) {
        throw new Error("No content generated from AI");
      }
      
      console.log("Content generated, length:", content.length);

      // Generate SEO metadata
      const metaTitle = await generateMetaTitle(topic);
      const metaDescription = await generateMetaDescription(content, topic);
      const excerpt = await generateExcerpt(content);
      const tags = await generateTags(topic, keywords);
      const slug = generateSlug(topic);

      // Create the draft blog post
      const blogPostId = await ctx.runMutation(internal.aiBlogGeneration.createDraftPost, {
        title: topic,
        slug,
        content,
        excerpt,
        metaTitle,
        metaDescription,
        tags,
        aiPrompt: prompt,
        userId,
      });

      return {
        success: true,
        blogPostId,
        preview: {
          title: topic,
          slug,
          excerpt,
          metaTitle,
          metaDescription,
          tags,
          wordCount: content.split(/\s+/).length,
        },
      };
    } catch (error: any) {
      console.error("AI generation error:", error);
      console.error("Error details:", {
        message: error.message,
        status: error.status,
        type: error.type,
        name: error.name,
      });
      
      // Provide more specific error messages
      if (error.status === 401) {
        throw new Error("Invalid Anthropic API key. Please check your ANTHROPIC_API_KEY in Convex dashboard.");
      } else if (error.status === 429) {
        throw new Error("API rate limit exceeded. Please try again in a few moments.");
      } else if (error.message?.includes("API key")) {
        throw new Error(`API key error: ${error.message}`);
      }
      
      throw new Error(`Failed to generate blog post: ${error.message || "Unknown error"}`);
    }
  },
});

/**
 * Auto-generate 1-2 draft blog posts for admin review
 * This can be called manually or scheduled via cron
 */
export const autoGenerateDrafts = action({
  args: {
    count: v.optional(v.number()), // Number of drafts to generate (1-2)
  },
  handler: async (ctx, { count = 2 }) => {
    // Verify user is authenticated (for manual trigger) or skip for cron
    try {
      const userId = await ctx.runQuery(internal.aiBlogGeneration.getCurrentUserId);
      if (!userId) {
        // If no user (cron job), use system generation
        console.log("Auto-generating drafts via cron job");
      }
    } catch (e) {
      console.log("Running as scheduled job");
    }

    // List of popular tractor/machinery topics for auto-generation
    const topics = [
      "John Deere Model A Tractor Restoration Guide",
      "Farmall Cub: The Perfect Small Farm Tractor",
      "Allis-Chalmers WD-45: History and Restoration",
      "Ford 8N Tractor: America's Favorite Utility Tractor",
      "Case IH Magnum Series: Power and Performance",
      "International Harvester Cub Cadet: Collector's Guide",
      "Massey Ferguson 35: The World's Best-Selling Tractor",
      "Oliver 77 Row Crop: A Green Machine Classic",
      "Minneapolis-Moline U: The Unique Prairie Tractor",
      "Farmall M: Heavy-Duty Farming Power",
      "John Deere 4020: The Legendary Workhorse",
      "Ford 9N: The Tractor That Changed Farming",
      "Allis-Chalmers B: The Small Tractor with Big Impact",
      "Case VAC: The Streamlined Farm Tractor",
      "International Harvester 560: The Troublesome Legend",
    ];

    // Randomly select topics
    const selectedTopics = [];
    const usedIndices = new Set<number>();
    
    for (let i = 0; i < Math.min(count, 2); i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * topics.length);
      } while (usedIndices.has(randomIndex));
      
      usedIndices.add(randomIndex);
      selectedTopics.push(topics[randomIndex]);
    }

    // Generate drafts
    const results = [];
    for (const topic of selectedTopics) {
      try {
        const result = await ctx.runAction(api.aiBlogGeneration.generateBlogPost, {
          topic,
          tone: "enthusiast",
        });
        results.push(result);
      } catch (error: any) {
        console.error(`Failed to generate draft for "${topic}":`, error);
        results.push({ success: false, topic, error: error.message });
      }
    }

    return {
      success: true,
      generated: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results,
    };
  },
});

/**
 * Query to get current user ID
 */
export const getCurrentUserId = query({
  args: {},
  handler: async (ctx) => {
    // Use the auth helper to get the user ID
    const userId = await auth.getUserId(ctx);
    return userId;
  },
});

/**
 * Internal mutation to create a draft blog post
 */
export const createDraftPost = internalMutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    tags: v.optional(v.string()),
    aiPrompt: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Ensure slug is unique
    let slug = args.slug;
    let counter = 1;
    while (true) {
      const existing = await ctx.db
        .query("blogPosts")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      
      if (!existing) break;
      slug = `${args.slug}-${counter}`;
      counter++;
    }

    return await ctx.db.insert("blogPosts", {
      title: args.title,
      slug,
      content: args.content,
      excerpt: args.excerpt,
      metaTitle: args.metaTitle,
      metaDescription: args.metaDescription,
      tags: args.tags,
      published: false,
      status: "draft",
      aiGenerated: true,
      aiPrompt: args.aiPrompt,
      userId: args.userId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Helper functions for SEO metadata generation

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 60);
}

async function generateMetaTitle(topic: string): Promise<string> {
  // Create SEO-optimized title (max 60 chars)
  const title = topic.length <= 55 
    ? `${topic} Guide` 
    : topic.substring(0, 60);
  return title;
}

async function generateMetaDescription(content: string, topic: string): Promise<string> {
  // Extract first paragraph or create description
  const textContent = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const description = textContent.substring(0, 155) + "...";
  return description;
}

async function generateExcerpt(content: string): Promise<string> {
  // Extract first 2-3 sentences
  const textContent = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const sentences = textContent.match(/[^.!?]+[.!?]+/g) || [];
  const excerpt = sentences.slice(0, 2).join(" ");
  return excerpt.substring(0, 300);
}

async function generateTags(topic: string, keywords: string): Promise<string> {
  // Extract relevant tags from topic and keywords
  const words = [...topic.split(" "), ...keywords.split(" ")];
  const tags = new Set<string>();
  
  // Common tractor-related tags
  const relevantTerms = ["tractor", "restoration", "vintage", "antique", "farming", 
    "agriculture", "machinery", "equipment", "diesel", "collector"];
  
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanWord.length > 3 && !["the", "and", "for", "with"].includes(cleanWord)) {
      tags.add(cleanWord);
    }
  });
  
  // Add relevant general tags
  relevantTerms.forEach(term => {
    if (topic.toLowerCase().includes(term) || keywords.toLowerCase().includes(term)) {
      tags.add(term);
    }
  });
  
  return Array.from(tags).slice(0, 8).join(", ");
}
