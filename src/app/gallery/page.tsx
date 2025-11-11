"use client"

import { useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"
import Link from "next/link"
import Image from "next/image"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function GalleryPage() {
  const projects = useQuery(api.projects.getAll)

  if (projects === undefined) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Restoration Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
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
          <p className="text-gray-500">Start adding restoration projects to showcase your work!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/gallery/${project._id}`}
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
