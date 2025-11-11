import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function HomePage() {
  let featuredProjects = []
  let recentPosts = []

  try {
    featuredProjects = await prisma.project.findMany({
      where: { featured: true },
      include: { images: { orderBy: { order: "asc" }, take: 1 } },
      take: 6,
      orderBy: { createdAt: "desc" },
    })

    recentPosts = await prisma.blogPost.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
      take: 3,
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.log("Database not connected. Running in demo mode.")
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-800 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">History Restored by ME</h1>
          <p className="text-2xl mb-4 max-w-2xl mx-auto font-semibold">
            Specializes in Farmall but Can Fix Them All!!!
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Professional tractor restoration services. Bringing vintage Farmall tractors back to their former glory.
          </p>
          <div className="space-x-4">
            <Link
              href="/gallery"
              className="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              View Gallery
            </Link>
            <Link
              href="/blog"
              className="bg-red-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-950 transition inline-block"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Restorations</h2>
          {featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No projects yet.</p>
              <p className="text-gray-500">Connect your database and add restoration projects to showcase your work!</p>
            </div>
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project: any) => (
              <Link
                key={project.id}
                href={`/gallery/${project.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {project.images[0] ? (
                  <div className="relative h-64 bg-gray-200">
                    <Image
                      src={project.images[0].url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-64 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  {project.makeModel && (
                    <p className="text-gray-600 mb-2">{project.makeModel} {project.year && `(${project.year})`}</p>
                  )}
                  <p className="text-gray-700 line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition inline-block"
            >
              View All Projects
            </Link>
          </div>
          </>
          )}
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Latest Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="text-sm text-gray-500">
                    By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition inline-block"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">About Our Work</h2>
          <p className="text-lg text-gray-700 mb-4">
            With years of experience in tractor restoration, we specialize in bringing vintage Farmall tractors back to life. 
            From complete frame-off restorations to mechanical rebuilds, we handle every aspect with care and precision.
          </p>
          <p className="text-lg text-gray-700">
            While we specialize in Farmall, we can restore any make or model. Every project is a labor of love, 
            ensuring these historic machines can be enjoyed for generations to come.
          </p>
        </div>
      </section>
    </div>
  )
}
