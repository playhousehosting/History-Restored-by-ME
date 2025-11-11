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
        "Please set it in your Vercel environment variables to: https://usable-blackbird-499.convex.cloud"
      );
    }
    
    console.log("✅ Convex URL:", url);
    return new ConvexReactClient(url);
  }, []);

  return (
    <ConvexAuthNextjsProvider client={convex}>
      {children}
    </ConvexAuthNextjsProvider>
  );
}
