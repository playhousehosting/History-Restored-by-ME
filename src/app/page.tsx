"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wrench, Award, Clock, ArrowRight, Star } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function HomePage() {
  const featuredProjects = useQuery(api.projects.getFeatured) ?? [];
  const recentPosts = useQuery(api.blogPosts.getRecent, { limit: 3 }) ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-800 via-red-700 to-red-600 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Premium Restoration Services
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              History Restored by ME
            </h1>
            <p className="text-xl md:text-2xl text-red-100 font-medium">
              Specializes in Farmall but Can Fix Them All!!!
            </p>
            <p className="text-lg text-red-50 max-w-2xl mx-auto">
              Expert restoration of vintage Farmall tractors and all makes and models.
              Bringing classic farm equipment back to life with precision and passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="bg-white text-red-700 hover:bg-red-50">
                <Link href="/gallery">
                  View Our Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/blog">Read Our Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-red-700" />
                </div>
                <CardTitle>Expert Craftsmanship</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Decades of experience in restoring vintage Farmall tractors and agricultural
                  equipment with meticulous attention to detail.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-red-700" />
                </div>
                <CardTitle>Quality Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every restoration meets the highest standards, preserving historical accuracy
                  while ensuring reliable performance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-red-700" />
                </div>
                <CardTitle>Timely Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Committed to delivering your restored tractor on schedule without compromising
                  on quality or craftsmanship.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Our Work</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Restorations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a look at some of our recently completed restoration projects
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <Card className="p-12 text-center">
              <CardDescription className="text-lg">
                No featured projects yet. Check back soon to see our latest restorations!
              </CardDescription>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project: any) => (
                <Link key={project.id} href={`/gallery/${project.id}`}>
                  <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64 bg-gray-200 overflow-hidden">
                      {project.images[0] ? (
                        <Image
                          src={project.images[0].url}
                          alt={project.images[0].alt || project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Wrench className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-red-700 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="capitalize">
                        {project.status}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/gallery">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* Recent Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Latest Stories</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">From the Workshop</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read about our restoration projects, tips, and tractor history
            </p>
          </div>

          {recentPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <CardDescription className="text-lg">
                No blog posts yet. Stay tuned for restoration stories and tips!
              </CardDescription>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300">
                    {post.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="group-hover:text-red-700 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt ||
                          post.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150) + "..."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/blog">
                Read All Posts
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">About Us</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Preserving Agricultural History
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At History Restored by ME, we're passionate about bringing vintage tractors back
              to life. With a specialization in Farmall tractors and expertise across all makes
              and models, we combine traditional craftsmanship with modern techniques to ensure
              every restoration meets the highest standards.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Each tractor tells a story, and we're honored to be part of preserving these
              mechanical marvels for future generations. Whether it's a complete frame-off
              restoration or essential repairs, we treat every project with the care and
              attention it deserves.
            </p>
            <Button asChild size="lg" className="bg-red-700 hover:bg-red-800">
              <Link href="/gallery">
                Explore Our Restorations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
