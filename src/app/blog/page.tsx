import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function BlogPage() {
  let posts = []

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.log("Database not connected.")
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
          <p className="text-gray-500">Set up your database and start sharing restoration stories!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {posts.map((post: any) => (
            <article
              key={post.id}
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
                  By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
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
