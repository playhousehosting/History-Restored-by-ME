"use client"

import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { notFound, useParams } from "next/navigation"
import { useEffect } from "react"

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
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 text-gray-900">{post.title}</h1>
        
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.updatedAt !== post.createdAt && (
            <>
              <span>•</span>
              <span className="text-sm">
                Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </>
          )}
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg prose-red max-w-none 
                     prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                     prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                     prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                     prose-p:mb-6 prose-p:leading-relaxed prose-p:text-gray-700
                     prose-a:text-red-700 prose-a:underline prose-a:font-medium
                     prose-strong:text-gray-900 prose-strong:font-semibold
                     prose-ul:my-6 prose-ul:space-y-2
                     prose-li:text-gray-700 prose-li:leading-relaxed
                     prose-img:rounded-lg prose-img:shadow-md"
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
