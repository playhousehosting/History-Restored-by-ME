"use client"

import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { notFound, useParams } from "next/navigation"
import { useEffect } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const post = useQuery(api.blogPosts.getBySlug, { slug })

  // Update page title and meta tags when post loads
  useEffect(() => {
    if (post && post.published) {
      // Update document title
      document.title = post.metaTitle || `${post.title} | History Restored by ME`
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', post.metaDescription || post.excerpt || '')
      } else {
        const newMeta = document.createElement('meta')
        newMeta.name = 'description'
        newMeta.content = post.metaDescription || post.excerpt || ''
        document.head.appendChild(newMeta)
      }

      // Update Open Graph tags
      const updateOrCreateMeta = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`)
        if (meta) {
          meta.setAttribute('content', content)
        } else {
          meta = document.createElement('meta')
          meta.setAttribute('property', property)
          meta.setAttribute('content', content)
          document.head.appendChild(meta)
        }
      }

      updateOrCreateMeta('og:title', post.metaTitle || post.title)
      updateOrCreateMeta('og:description', post.metaDescription || post.excerpt || '')
      updateOrCreateMeta('og:type', 'article')
      updateOrCreateMeta('og:url', `https://www.historyrestoredbyme.com/blog/${post.slug}`)
      if (post.featuredImage) {
        updateOrCreateMeta('og:image', post.featuredImage)
      }

      // Update Twitter Card tags
      updateOrCreateMeta('twitter:card', 'summary_large_image')
      updateOrCreateMeta('twitter:title', post.metaTitle || post.title)
      updateOrCreateMeta('twitter:description', post.metaDescription || post.excerpt || '')
      if (post.featuredImage) {
        updateOrCreateMeta('twitter:image', post.featuredImage)
      }
    }
  }, [post])

  if (post === undefined) {
    return (
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
          {post.title}
        </h1>
        
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed font-light border-l-4 border-red-700 pl-6 py-2 italic">
            {post.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base text-gray-600 mb-12 pb-8 border-b-2 border-gray-200">
          <time dateTime={new Date(post.createdAt).toISOString()} className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.updatedAt !== post.createdAt && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </>
          )}
          {post.aiGenerated && (
            <>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                AI-Enhanced Content
              </span>
            </>
          )}
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg md:prose-xl max-w-none
                     prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                     prose-h2:text-2xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-red-700
                     prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-red-800
                     prose-p:mb-8 prose-p:leading-loose prose-p:text-gray-800 prose-p:text-base md:prose-p:text-lg
                     prose-a:text-red-700 prose-a:underline prose-a:font-medium prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:text-red-900
                     prose-strong:text-gray-900 prose-strong:font-bold prose-strong:bg-yellow-50 prose-strong:px-1
                     prose-em:text-gray-700 prose-em:italic
                     prose-ul:my-8 prose-ul:space-y-3 prose-ul:list-disc prose-ul:pl-6
                     prose-ol:my-8 prose-ol:space-y-3 prose-ol:list-decimal prose-ol:pl-6
                     prose-li:text-gray-800 prose-li:leading-relaxed prose-li:text-base md:prose-li:text-lg prose-li:pl-2
                     prose-blockquote:border-l-4 prose-blockquote:border-red-700 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-red-50 prose-blockquote:py-4 prose-blockquote:my-8
                     prose-code:text-red-700 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                     prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:my-8
                     prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-12
                     prose-hr:border-gray-300 prose-hr:my-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.split(",").map((tag, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
