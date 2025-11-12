"use client"

import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Home, Sparkles, Calendar, ArrowRight, FileText } from "lucide-react"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function BlogPage() {
  const posts = useQuery(api.blogPosts.getPublished)

  if (posts === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-6 py-2 bg-red-600/10 text-red-400 border-red-600/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Loading Stories
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Blog
            </h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-none bg-white/5 backdrop-blur-sm p-8">
                <div className="h-8 bg-slate-700/50 rounded animate-pulse mb-4 w-3/4"></div>
                <div className="h-4 bg-slate-700/50 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-slate-700/50 rounded animate-pulse w-2/3"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="text-gray-400">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-white transition">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-600" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-16">
          <Badge className="mb-6 px-6 py-2 bg-red-600/10 text-red-400 border-red-600/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Restoration Stories
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Read about our restoration projects, 
            <span className="text-red-400 font-semibold"> techniques</span>, and 
            <span className="text-red-400 font-semibold"> insights from the workshop</span>.
          </p>
        </div>

        {posts.length === 0 ? (
          <Card className="border-none bg-white/5 backdrop-blur-sm p-16 text-center max-w-2xl mx-auto">
            <FileText className="w-16 h-16 mx-auto mb-6 text-gray-600" />
            <p className="text-gray-400 text-xl mb-4">No blog posts yet.</p>
            <p className="text-gray-500">Start sharing restoration stories!</p>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {posts.map((post) => (
              <HoverCard key={post._id}>
                <HoverCardTrigger asChild>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="border-none bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 group cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-3xl font-bold text-white group-hover:text-red-400 transition flex-1 leading-tight">
                          {post.title}
                        </h2>
                        {post.aiGenerated && (
                          <Badge className="ml-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-blue-600/30 backdrop-blur-sm">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                      {post.excerpt && (
                        <p className="text-gray-400 mb-6 text-lg leading-relaxed">{post.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(post.createdAt).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <span className="flex items-center text-red-400 font-semibold group-hover:text-red-300 transition">
                          Read more
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 border-slate-700 bg-slate-900/95 backdrop-blur-sm">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold line-clamp-2 text-white">{post.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {post.excerpt || post.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."}
                    </p>
                    <div className="text-xs text-gray-500 pt-2 flex items-center justify-between border-t border-slate-800">
                      <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      {post.aiGenerated && <span className="text-blue-400">AI Generated</span>}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
