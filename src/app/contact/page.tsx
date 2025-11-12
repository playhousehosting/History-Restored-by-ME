"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { Loader2, Mail, Phone, User, MessageSquare, Home, Info, Clock, Sparkles, Send } from "lucide-react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const createSubmission = useMutation(api.contactSubmissions.create)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      })

      toast.success("Message sent successfully! We'll get back to you soon.")
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
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
        <div className="max-w-6xl mx-auto">
          <Breadcrumb className="mb-8">
            <BreadcrumbList className="text-gray-400">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-white transition">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-600" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 px-6 py-2 bg-red-600/10 text-red-400 border-red-600/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Let's Connect
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Have a tractor restoration project in mind? 
              <span className="text-red-400 font-semibold"> We'd love to hear from you.</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-none bg-white/5 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
                  <CardDescription className="text-gray-400 text-base">
                    Reach out to us for restoration services, questions, or collaboration opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-red-600 to-red-700">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Email</p>
                      <a href="mailto:info@historyrestoredbyme.com" className="text-red-400 hover:text-red-300 transition">
                        info@historyrestoredbyme.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Phone</p>
                      <a href="tel:+1234567890" className="text-blue-400 hover:text-blue-300 transition">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-5 w-5 text-red-400" />
                      <h3 className="font-semibold text-white">Business Hours</h3>
                    </div>
                    <div className="space-y-2 text-gray-400">
                      <p className="flex justify-between"><span>Monday - Friday:</span><span className="text-gray-300">8:00 AM - 6:00 PM</span></p>
                      <p className="flex justify-between"><span>Saturday:</span><span className="text-gray-300">9:00 AM - 4:00 PM</span></p>
                      <p className="flex justify-between"><span>Sunday:</span><span className="text-gray-300">Closed</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-white/5 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-white">Frequently Asked Questions</CardTitle>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                          <Info className="h-5 w-5 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="border-slate-700 bg-slate-900/95 backdrop-blur-sm text-gray-300">
                        <p className="text-sm">Common questions about our restoration services</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-slate-800">
                      <AccordionTrigger className="text-white hover:text-red-400">What's your turnaround time?</AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        Complete restorations typically take 3-6 months depending on the condition and scope of work. We provide regular progress updates throughout the process.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-slate-800">
                      <AccordionTrigger className="text-white hover:text-red-400">Do you work on all tractor brands?</AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        While we specialize in Farmall tractors, we have expertise with all major brands including John Deere, Ford, Allis-Chalmers, and International Harvester.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-slate-800">
                      <AccordionTrigger className="text-white hover:text-red-400">What's included in a full restoration?</AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        A complete restoration includes engine rebuild, bodywork and paint, electrical system, hydraulics, transmission service, new tires, and detailed finishing touches.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-slate-800">
                      <AccordionTrigger className="text-white hover:text-red-400">Can you source vintage parts?</AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        Yes! We have an extensive network of suppliers for authentic vintage parts. We prioritize original components whenever possible to maintain historical accuracy.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-none bg-white/5 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send Us a Message</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Fill out the form below and we'll respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="pl-10 bg-white/5 border-slate-700 text-white placeholder:text-gray-500 focus:border-red-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="pl-10 bg-white/5 border-slate-700 text-white placeholder:text-gray-500 focus:border-red-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone (optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(123) 456-7890"
                        className="pl-10 bg-white/5 border-slate-700 text-white placeholder:text-gray-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Restoration inquiry"
                        className="pl-10 bg-white/5 border-slate-700 text-white placeholder:text-gray-500 focus:border-red-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-300">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your tractor restoration project..."
                      rows={6}
                      className="bg-white/5 border-slate-700 text-white placeholder:text-gray-500 focus:border-red-500"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
