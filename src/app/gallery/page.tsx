"use client"

import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import Link from "next/link"
import Image from "next/image"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Home, Sparkles, Calendar, ImageIcon } from "lucide-react"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function GalleryPage() {
  const projects = useQuery(api.projects.getAll)

  if (projects === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-6 py-2 bg-red-600/10 text-red-400 border-red-600/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Loading Gallery
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Restoration Gallery
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-none bg-white/5 backdrop-blur-sm overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-700/50 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-slate-700/50 rounded animate-pulse w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="text-gray-400">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-white transition">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-600" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">Gallery</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-16">
          <Badge className="mb-6 px-6 py-2 bg-red-600/10 text-red-400 border-red-600/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Restoration Excellence
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Restoration Gallery
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Browse our completed tractor restoration projects. Each restoration is a testament to 
            <span className="text-red-400 font-semibold"> craftsmanship</span> and 
            <span className="text-red-400 font-semibold"> attention to detail</span>.
          </p>
        </div>

        {projects.length === 0 ? (
          <Card className="border-none bg-white/5 backdrop-blur-sm p-16 text-center">
            <div className="max-w-md mx-auto">
              <ImageIcon className="w-16 h-16 mx-auto mb-6 text-gray-600" />
              <p className="text-gray-400 text-xl mb-4">No projects yet.</p>
              <p className="text-gray-500">Start adding restoration projects to showcase your work!</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <HoverCard key={project._id}>
                <HoverCardTrigger asChild>
                  <Link
                    href={`/gallery/${project._id}`}
                    className="group block"
                  >
                    <Card className="border-none bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                      {project.images[0] ? (
                        <div className="relative h-72 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                          <Image
                            src={project.images[0].url}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                      ) : (
                        <div className="h-72 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {project.status && (
                            <Badge className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-green-600/30 backdrop-blur-sm">
                              {project.status}
                            </Badge>
                          )}
                          <div className="flex items-center text-gray-500 text-sm ml-auto">
                            <ImageIcon className="w-4 h-4 mr-1" />
                            {project.images.length}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 border-slate-700 bg-slate-900/95 backdrop-blur-sm">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white">{project.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
                    <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-slate-800">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      {project.images.length} image{project.images.length !== 1 ? 's' : ''} • Click to view details
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
