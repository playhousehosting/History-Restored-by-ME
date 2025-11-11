"use client"

import { useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"
import { notFound, useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const post = useQuery(api.blogPosts.getBySlug, { slug })

  if (post === undefined) {
    return (
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2 mt-8">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </article>
      </div>
    )
  }

  if (post === null || !post.published) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="text-gray-600 mb-8 pb-8 border-b">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {post.updatedAt !== post.createdAt && (
          <div className="mt-8 text-sm text-gray-500">
            Last updated: {new Date(post.updatedAt).toLocaleDateString()}
          </div>
        )}
      </article>
    </div>
  )
}
