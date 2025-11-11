"use client"

import { useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"
import Link from "next/link"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function BlogPage() {
  const posts = useQuery(api.blogPosts.getPublished)

  if (posts === undefined) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <div className="max-w-4xl mx-auto space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-8">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Read about our restoration projects, techniques, and insights from the workshop.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No blog posts yet.</p>
          <p className="text-gray-500">Start sharing restoration stories!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold mb-3 hover:text-green-700 transition">
                  {post.title}
                </h2>
              </Link>
              {post.excerpt && (
                <p className="text-gray-700 mb-4 text-lg">{post.excerpt}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-green-700 hover:text-green-800 font-semibold"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
