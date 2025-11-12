"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wrench, Award, Clock, ArrowRight, Star, Sparkles, Shield, Users, TrendingUp, CheckCircle2, Zap, Target, Heart, Phone, Mail as MailIcon, MapPin, Calendar } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"

// Force dynamic rendering to prevent SSG/SSR issues with Convex
export const dynamic = 'force-dynamic'

export default function HomePage() {
  const featuredProjects = useQuery(api.projects.getFeatured);
  const recentPosts = useQuery(api.blogPosts.getRecent, { limit: 3 });

  // Handle loading state
  if (featuredProjects === undefined || recentPosts === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-red-600 mx-auto"></div>
            <Sparkles className="h-6 w-6 text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg font-medium">Loading Premium Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium Full Screen */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">Premium Restoration Services Since 1985</span>
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>

            {/* Main Logo */}
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="History Restored by ME"
                width={600}
                height={200}
                className="w-full max-w-2xl h-auto animate-float"
                priority
              />
            </div>

            <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Specializes in Farmall but Can Fix Them All
            </p>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Transforming vintage agricultural machinery into timeless masterpieces with precision engineering and passionate craftsmanship.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl shadow-red-600/50 text-lg px-8 py-6 group">
                <Link href="/gallery">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore Our Portfolio
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6">
                <Link href="/contact">
                  Start Your Project
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
              {[
                { icon: Shield, label: "Quality Guaranteed", value: "100%" },
                { icon: Users, label: "Happy Clients", value: "500+" },
                { icon: Award, label: "Years Experience", value: "40+" },
                { icon: TrendingUp, label: "Projects Completed", value: "1000+" }
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="mb-3 mx-auto w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Grid - Modern Cards */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-red-600 border-red-600">Why Choose Us</Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Excellence in Every Detail
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine traditional craftsmanship with modern precision to deliver restorations that exceed expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Wrench,
                title: "Master Craftsmanship",
                description: "40+ years of specialized experience in vintage tractor restoration with unmatched attention to detail and historical accuracy.",
                color: "red"
              },
              {
                icon: Shield,
                title: "Premium Quality",
                description: "Every restoration backed by our comprehensive quality guarantee and lifetime craftsmanship warranty.",
                color: "blue"
              },
              {
                icon: Zap,
                title: "Fast Turnaround",
                description: "Efficient project management ensures your restoration is completed on schedule without compromising quality.",
                color: "yellow"
              },
              {
                icon: Award,
                title: "Award Winning",
                description: "Recognized industry leader with numerous awards for restoration excellence and customer satisfaction.",
                color: "purple"
              },
              {
                icon: Target,
                title: "Precision Engineering",
                description: "State-of-the-art tools combined with traditional techniques ensure perfect results every time.",
                color: "green"
              },
              {
                icon: Heart,
                title: "Passionate Service",
                description: "We treat every tractor as if it were our own, dedicating our passion and expertise to your project.",
                color: "pink"
              }
            ].map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <Card key={i} className="group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardHeader className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-red-600 border-red-600">Portfolio</Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Masterpiece Restorations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Witness the transformation of vintage tractors into stunning works of mechanical art
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <Card className="p-16 text-center border-2 border-dashed">
              <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <CardDescription className="text-xl text-gray-500">
                New restorations coming soon. Check back to see our latest masterpieces!
              </CardDescription>
            </Card>
          ) : (
            <Carousel className="w-full max-w-7xl mx-auto" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-4">
                {featuredProjects.map((project: any) => (
                  <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link href={`/gallery/${project.id}`}>
                      <Card className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                        <div className="relative h-72 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                          {project.images[0] ? (
                            <Image
                              src={project.images[0].url}
                              alt={project.images[0].alt || project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Wrench className="h-20 w-20 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-3">
                              {project.status}
                            </Badge>
                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                          </div>
                        </div>
                        <CardHeader>
                          <CardDescription className="line-clamp-3 text-base">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12 bg-white shadow-xl" />
              <CarouselNext className="-right-12 bg-white shadow-xl" />
            </Carousel>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg group text-lg px-8 py-6">
              <Link href="/gallery">
                View Complete Gallery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Blog Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-red-600 border-red-600">Insights</Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Stories from the Workshop
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep dive into restoration techniques, tractor history, and behind-the-scenes stories
            </p>
          </div>

          {recentPosts.length === 0 ? (
            <Card className="p-16 text-center border-2 border-dashed">
              <CardDescription className="text-xl text-gray-500">
                Blog posts coming soon. Stay tuned for restoration insights and stories!
              </CardDescription>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group h-full border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    {post.featuredImage && (
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="group-hover:text-red-600 transition-colors line-clamp-2 text-xl">
                        {post.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4" />
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3 text-base">
                        {post.excerpt ||
                          post.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150) + "..."}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="group text-lg px-8 py-6">
              <Link href="/blog">
                Read All Articles
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process/FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-red-600 border-red-600">Process</Badge>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Our Restoration Process
              </h2>
              <p className="text-xl text-gray-600">
                Transparent, professional, and designed for perfection
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  value: "1",
                  title: "Initial Consultation & Assessment",
                  content: "We begin with a comprehensive evaluation of your tractor's condition. Our experts document every detail, discuss your restoration goals, and provide a detailed restoration plan with timeline and cost estimates."
                },
                {
                  value: "2",
                  title: "Complete Disassembly & Documentation",
                  content: "Each component is carefully removed, tagged, and photographed. We create a complete inventory and assess each part for restoration or replacement, ensuring nothing is overlooked in the process."
                },
                {
                  value: "3",
                  title: "Expert Restoration & Refinishing",
                  content: "Using professional-grade equipment and techniques, we restore each component to factory specifications or better. This includes engine rebuilding, frame repair, sandblasting, painting, and chrome work."
                },
                {
                  value: "4",
                  title: "Precision Reassembly & Testing",
                  content: "Components are reassembled with meticulous attention to detail. We conduct thorough testing of all systems, ensuring your tractor not only looks spectacular but runs perfectly."
                },
                {
                  value: "5",
                  title: "Final Inspection & Delivery",
                  content: "A comprehensive quality check ensures every detail meets our exacting standards. We provide complete documentation, photos, and maintenance recommendations for your restored tractor."
                }
              ].map((item) => (
                <AccordionItem key={item.value} value={item.value} className="border border-gray-200 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {item.value}
                      </div>
                      <span className="text-xl font-semibold text-gray-900">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6 pl-14">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/30 text-sm px-4 py-2">
              Ready to Begin?
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Let's Restore Your
              <span className="block mt-2 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Piece of History
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Every restoration begins with a conversation. Contact us today to discuss your project and discover how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl text-lg px-8 py-6 group">
                <Link href="/contact">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6">
                <Link href="/gallery">
                  View Our Work
                </Link>
              </Button>
            </div>

            {/* Contact Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto">
              {[
                { icon: Clock, label: "Response Time", value: "< 24 hrs" },
                { icon: Shield, label: "Satisfaction", value: "100%" },
                { icon: Star, label: "Rating", value: "5.0/5.0" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="h-8 w-8 text-red-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
