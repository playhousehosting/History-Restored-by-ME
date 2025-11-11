"use client"

import Link from "next/link"
import { useAuthActions } from "@convex-dev/auth/react"
import { useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"

export default function Header() {
  const { signOut } = useAuthActions()
  // Check if user is authenticated by trying to get their identity
  const viewer = useQuery(api.users.viewer)
  
  // Handle loading state
  if (viewer === undefined) {
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">
            History Restored By Me
          </Link>
          <nav>
            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-red-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-red-200 transition">
            History Restored by ME
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-red-200 transition">
              Home
            </Link>
            <Link href="/gallery" className="hover:text-red-200 transition">
              Gallery
            </Link>
            <Link href="/blog" className="hover:text-red-200 transition">
              Blog
            </Link>
            
            {viewer ? (
              <>
                {viewer.role === "admin" && (
                  <Link href="/admin" className="hover:text-red-200 transition">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => void signOut()}
                  className="bg-red-700 hover:bg-red-900 px-4 py-2 rounded transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="bg-red-700 hover:bg-red-900 px-4 py-2 rounded transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
