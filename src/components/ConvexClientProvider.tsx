"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    
    if (!url) {
      console.error("❌ NEXT_PUBLIC_CONVEX_URL is not set!");
      console.error("Available env vars:", Object.keys(process.env).filter(k => k.startsWith("NEXT_PUBLIC")));
      throw new Error(
        "Missing NEXT_PUBLIC_CONVEX_URL environment variable. " +
        "Please set it in your Vercel environment variables."
      );
    }
    
    console.log("✅ Convex URL:", url);
    console.log("🔄 ConvexClientProvider initialized successfully");
    
    try {
      return new ConvexReactClient(url);
    } catch (error) {
      console.error("❌ Failed to initialize Convex client:", error);
      throw error;
    }
  }, []);

  return (
    <ConvexAuthNextjsProvider client={convex}>
      {children}
    </ConvexAuthNextjsProvider>
  );
}
