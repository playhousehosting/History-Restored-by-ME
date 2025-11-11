import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: "asc" } },
      createdBy: { select: { name: true } },
    },
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        
        {project.makeModel && (
          <p className="text-xl text-gray-600 mb-2">
            {project.makeModel} {project.year && `(${project.year})`}
          </p>
        )}
        
        {project.status && (
          <span className="inline-block mb-6 px-4 py-2 bg-green-100 text-green-800 rounded-full">
            {project.status}
          </span>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image) => (
              <div key={image.id} className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.name || project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {project.images.length === 0 && (
            <p className="text-gray-600">No images available for this project.</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
        </div>

        <div className="text-sm text-gray-500">
          Added {new Date(project.createdAt).toLocaleDateString()}
          {project.createdBy.name && ` by ${project.createdBy.name}`}
        </div>
      </div>
    </div>
  )
}
