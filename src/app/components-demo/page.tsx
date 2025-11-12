"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Sparkles, Info, Menu, Search, Home, FileText, Image } from "lucide-react"

export default function ComponentsDemoPage() {
  const [commandOpen, setCommandOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Luxury Components Showcase</h1>
        <p className="text-xl text-gray-600">Demonstrating all new shadcn/ui components</p>
      </div>

      <div className="space-y-12">
        {/* Breadcrumb */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Breadcrumb Navigation</h2>
          <Card>
            <CardHeader>
              <CardTitle>Breadcrumb Component</CardTitle>
              <CardDescription>Navigate through hierarchical paths</CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components-demo">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Demo</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent>
          </Card>
        </section>

        {/* Accordion */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Accordion</h2>
          <Card>
            <CardHeader>
              <CardTitle>Expandable FAQ Sections</CardTitle>
              <CardDescription>Perfect for FAQs and expandable content</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What tractors do you restore?</AccordionTrigger>
                  <AccordionContent>
                    We specialize in vintage tractors from the 1940s-1970s, including popular models like Ford 8N, 
                    John Deere Model A, Farmall Cub, and Allis-Chalmers WD-45. Each restoration is done with 
                    meticulous attention to historical accuracy.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How long does a restoration take?</AccordionTrigger>
                  <AccordionContent>
                    A complete restoration typically takes 3-6 months depending on the condition of the tractor 
                    and the level of detail required. We prioritize quality over speed to ensure authentic results.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Do you offer custom paint schemes?</AccordionTrigger>
                  <AccordionContent>
                    Yes! While we recommend period-correct colors for authenticity, we can accommodate custom 
                    paint schemes. We use premium automotive paints for durability and show-quality finish.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Carousel */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Carousel</h2>
          <Card>
            <CardHeader>
              <CardTitle>Image Gallery Carousel</CardTitle>
              <CardDescription>Swipeable image galleries</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full max-w-3xl mx-auto">
                <CarouselContent>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-video items-center justify-center p-6 bg-gradient-to-br from-red-100 to-gray-100">
                            <div className="text-center">
                              <Image className="h-16 w-16 mx-auto mb-4 text-red-700" />
                              <span className="text-4xl font-semibold">Tractor {index}</span>
                              <p className="text-gray-600 mt-2">Restoration Project #{index}</p>
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
            </CardContent>
          </Card>
        </section>

        {/* Tooltip */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Tooltips</h2>
          <Card>
            <CardHeader>
              <CardTitle>Helpful Hover Hints</CardTitle>
              <CardDescription>Provide additional context on hover</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Info className="h-4 w-4 mr-2" />
                      Hover for Info
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is helpful tooltip information!</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-red-700 hover:bg-red-800">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Generator
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate blog posts with AI</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </section>

        {/* Hover Card */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Hover Card</h2>
          <Card>
            <CardHeader>
              <CardTitle>Rich Preview on Hover</CardTitle>
              <CardDescription>Show detailed previews when hovering</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Check out our{" "}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="font-semibold text-red-700 cursor-pointer underline">
                      Ford 8N restoration
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">1950 Ford 8N Tractor</h4>
                      <p className="text-sm text-gray-600">
                        Complete frame-off restoration with original paint scheme. 
                        Engine rebuilt, new wiring harness, and powder-coated components.
                      </p>
                      <div className="flex items-center pt-2">
                        <span className="text-xs text-gray-500">Hover for details</span>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {" "}project for more information.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Popover */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Popover</h2>
          <Card>
            <CardHeader>
              <CardTitle>Click-triggered Overlays</CardTitle>
              <CardDescription>Show additional content on click</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Contact Info</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Get in Touch</h4>
                    <p className="text-sm text-gray-600">
                      Contact us for restoration quotes and project inquiries.
                    </p>
                    <div className="text-sm space-y-1 pt-2">
                      <p><strong>Email:</strong> info@historyrestored.com</p>
                      <p><strong>Phone:</strong> (555) 123-4567</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-red-700 hover:bg-red-800">Service Hours</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">Business Hours</h4>
                    <ul className="text-sm space-y-1">
                      <li>Monday-Friday: 8am-5pm</li>
                      <li>Saturday: 9am-2pm</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </section>

        {/* Sheet (Side Panel) */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Sheet (Side Drawer)</h2>
          <Card>
            <CardHeader>
              <CardTitle>Slide-out Side Panels</CardTitle>
              <CardDescription>Perfect for navigation menus and forms</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Menu className="h-4 w-4 mr-2" />
                    Open Menu
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>
                      Quick access to all sections
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/"><Home className="h-4 w-4 mr-2" />Home</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/gallery"><Image className="h-4 w-4 mr-2" />Gallery</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/blog"><FileText className="h-4 w-4 mr-2" />Blog</a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </section>

        {/* Command */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Command Palette</h2>
          <Card>
            <CardHeader>
              <CardTitle>Quick Search & Actions</CardTitle>
              <CardDescription>Fast navigation with keyboard shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setCommandOpen(true)}>
                <Search className="h-4 w-4 mr-2" />
                Open Command Palette (⌘K)
              </Button>
              
              <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Navigation">
                    <CommandItem onSelect={() => window.location.href = '/'}>
                      <Home className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </CommandItem>
                    <CommandItem onSelect={() => window.location.href = '/gallery'}>
                      <Image className="mr-2 h-4 w-4" />
                      <span>Gallery</span>
                    </CommandItem>
                    <CommandItem onSelect={() => window.location.href = '/blog'}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Blog</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="Tractors">
                    <CommandItem>Ford 8N</CommandItem>
                    <CommandItem>John Deere Model A</CommandItem>
                    <CommandItem>Farmall Cub</CommandItem>
                    <CommandItem>Allis-Chalmers WD-45</CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </CardContent>
          </Card>
        </section>

        {/* Pagination */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-700">Pagination</h2>
          <Card>
            <CardHeader>
              <CardTitle>Page Navigation</CardTitle>
              <CardDescription>Navigate through multiple pages of content</CardDescription>
            </CardHeader>
            <CardContent>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === 1}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(1)
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      href="#"
                      isActive={currentPage === 2}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(2)
                      }}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      href="#"
                      isActive={currentPage === 3}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(3)
                      }}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(Math.min(10, currentPage + 1))
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <p className="text-center mt-4 text-gray-600">Current Page: {currentPage}</p>
            </CardContent>
          </Card>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-red-50 to-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4 text-red-700 text-center">All Components Verified! ✅</h2>
          <p className="text-center text-gray-700 text-lg">
            All luxury shadcn/ui components are fully functional and ready to use throughout your application.
          </p>
        </section>
      </div>
    </div>
  )
}
