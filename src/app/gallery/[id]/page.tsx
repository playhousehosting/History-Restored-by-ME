"use client"

import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Id } from "@convex/_generated/dataModel"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Home } from "lucide-react"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

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
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/gallery">Gallery</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        
        {project.status && (
          <span className="inline-block mb-6 px-4 py-2 bg-green-100 text-green-800 rounded-full">
            {project.status}
          </span>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
          {project.images.length > 0 ? (
            <Carousel className="w-full max-w-3xl mx-auto">
              <CarouselContent>
                {project.images.map((image) => (
                  <CarouselItem key={image._id}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-video items-center justify-center p-0">
                          <div className="relative w-full h-[500px]">
                            <Image
                              src={image.url}
                              alt={image.alt || project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                              className="object-contain rounded-lg"
                              unoptimized={image.url.includes('convex.cloud')}
                              priority={false}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
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
