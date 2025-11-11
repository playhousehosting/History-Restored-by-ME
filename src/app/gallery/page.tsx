import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export default async function GalleryPage() {
  let projects = []

  try {
    projects = await prisma.project.findMany({
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.log("Database not connected.")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Restoration Gallery</h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Browse our completed tractor restoration projects. Each restoration is a testament to craftsmanship and attention to detail.
      </p>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No projects yet.</p>
          <p className="text-gray-500">Set up your database and start adding restoration projects!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
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
                  <p className="text-gray-600 mb-2">
                    {project.makeModel} {project.year && `(${project.year})`}
                  </p>
                )}
                <p className="text-gray-700 line-clamp-2">{project.description}</p>
                {project.status && (
                  <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {project.status}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
