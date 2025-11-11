"use client"

import Link from "next/link"
import { Suspense } from "react"
import { useAuthActions } from "@convex-dev/auth/react"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"

function HeaderContent() {
  // All hooks MUST be called first, unconditionally (React 19 strict rules)
  // DO NOT DESTRUCTURE - causes SSR issues with React 19
  const authActions = useAuthActions();
  const viewer = useQuery(api.users.viewer);
  
  // Handle loading state
  if (viewer === undefined || !authActions || !authActions.signOut) {
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
              <div className="h-10 w-24 bg-red-700 animate-pulse rounded" />
            </div>
          </div>
        </nav>
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
            <Link href="/contact" className="hover:text-red-200 transition">
              Contact
            </Link>
            
            {viewer ? (
              <>
                <Link href="/admin" className="hover:text-red-200 transition">
                  Admin
                </Link>
                <button
                  onClick={() => void authActions.signOut()}
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

export default function Header() {
  return (
    <Suspense fallback={<LoadingHeader />}>
      <HeaderContent />
    </Suspense>
  )
}

function LoadingHeader() {
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
            <Link href="/contact" className="hover:text-red-200 transition">
              Contact
            </Link>
            <div className="h-10 w-24 bg-red-700 animate-pulse rounded" />
          </div>
        </div>
      </nav>
    </header>
  )
}
