import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true } },
      images: { orderBy: { order: "asc" } },
    },
  })

  if (!post || !post.published) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="text-gray-600 mb-8 pb-8 border-b">
          By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {post.updatedAt.getTime() !== post.createdAt.getTime() && (
          <div className="mt-8 text-sm text-gray-500">
            Last updated: {new Date(post.updatedAt).toLocaleDateString()}
          </div>
        )}
      </article>
    </div>
  )
}
