"use client"

import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Home, Sparkles } from "lucide-react"

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
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
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
            <HoverCard key={post._id}>
              <HoverCardTrigger asChild>
                <article className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition cursor-pointer">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold hover:text-red-700 transition flex-1">
                        {post.title}
                      </h2>
                      {post.aiGenerated && (
                        <Badge variant="outline" className="ml-4">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </div>
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
                      className="text-red-700 hover:text-red-800 font-semibold"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold line-clamp-2">{post.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.excerpt || post.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."}
                  </p>
                  <div className="text-xs text-gray-500 pt-2 flex items-center justify-between">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    {post.aiGenerated && <span className="text-blue-600">AI Generated</span>}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      )}
    </div>
  )
}
