"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Initialize Convex client at module level to avoid hook issues
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_CONVEX_URL environment variable. " +
    "Please configure it in your Vercel environment variables or .env.local"
  );
}

const convexClient = new ConvexReactClient(convexUrl);

console.log("✅ Convex URL:", convexUrl);
console.log("🔄 Convex client initialized successfully");

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsProvider client={convexClient}>
      {children}
    </ConvexAuthNextjsProvider>
  );
}
