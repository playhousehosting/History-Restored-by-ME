"use client"

import { useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import Image from "next/image"
import type { Id } from "@/../convex/_generated/dataModel"

export default function ProjectPage() {
  const params = useParams()
  const id = params.id as string

  const project = useQuery(api.projects.getById, { id: id as Id<"projects"> })

  if (project === undefined) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (project === null) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        
        {project.status && (
          <span className="inline-block mb-6 px-4 py-2 bg-green-100 text-green-800 rounded-full">
            {project.status}
          </span>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image) => (
              <div key={image._id} className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt || project.title}
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
        </div>
      </div>
    </div>
  )
}
