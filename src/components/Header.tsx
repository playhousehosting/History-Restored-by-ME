"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

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
            
            {session ? (
              <>
                {session.user?.role === "admin" && (
                  <Link href="/admin" className="hover:text-red-200 transition">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
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
