"use client"

import { useState } from "react"
import { useAction } from "convex/react"
import { api } from "@convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export function AIBlogGenerator({ onSuccess }: { onSuccess?: () => void }) {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState<"professional" | "casual" | "enthusiast" | "technical">("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)

  const generateBlogPost = useAction(api.aiBlogGeneration.generateBlogPost)

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a tractor or machinery topic")
      return
    }

    setIsGenerating(true)
    setResult(null)

    try {
      const response = await generateBlogPost({
        topic: topic.trim(),
        keywords: keywords.trim() || undefined,
        tone,
      })

      setResult(response)
      toast.success("Blog post generated successfully!")
      
      // Clear form
      setTopic("")
      setKeywords("")
      setTone("professional")
      
      // Call onSuccess callback
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error("Generation error:", error)
      toast.error(error.message || "Failed to generate blog post")
    } finally {
      setIsGenerating(false)
    }
  }

  const suggestedTopics = [
    "1950 Ford 8N Tractor",
    "John Deere Model A Restoration",
    "Farmall Cub: Complete Guide",
    "Allis-Chalmers WD-45",
    "Case IH Magnum Series",
    "International Harvester Cub Cadet",
    "Massey Ferguson 35",
    "Oliver 77 Row Crop",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-red-700" />
          AI Blog Post Generator
        </CardTitle>
        <CardDescription>
          Generate comprehensive, SEO-optimized blog posts about tractors and vintage machinery using Claude Haiku 4.5
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="topic">Tractor / Machinery Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., 1950 Ford 8N Tractor"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isGenerating}
              className="mt-1.5"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the specific tractor model, brand, or machinery you want to write about
            </p>
          </div>

          <div>
            <Label>Quick Topic Suggestions</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {suggestedTopics.map((suggested, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTopic(suggested)}
                  disabled={isGenerating}
                  className="text-xs justify-start"
                >
                  {suggested}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="keywords">Additional Keywords (Optional)</Label>
            <Textarea
              id="keywords"
              placeholder="e.g., restoration, vintage, collector value, maintenance tips"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              disabled={isGenerating}
              rows={2}
              className="mt-1.5"
            />
            <p className="text-sm text-gray-500 mt-1">
              Add specific terms you want included in the article (comma-separated)
            </p>
          </div>

          <div>
            <Label htmlFor="tone">Writing Tone</Label>
            <Select value={tone} onValueChange={(value: any) => setTone(value)} disabled={isGenerating}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional - Formal and authoritative</SelectItem>
                <SelectItem value="casual">Casual - Friendly and conversational</SelectItem>
                <SelectItem value="enthusiast">Enthusiast - Passionate and engaging</SelectItem>
                <SelectItem value="technical">Technical - Detailed and spec-focused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
          <h4 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">✨ What will be generated:</h4>
          <ul className="text-xs md:text-sm text-blue-800 space-y-1">
            <li>• 1200-1800 word comprehensive article</li>
            <li>• SEO-optimized meta title & description</li>
            <li>• Structured with H2/H3 headings</li>
            <li>• Historical context & technical details</li>
            <li>• Restoration tips & collector insights</li>
            <li>• Automatically saved as DRAFT for your review</li>
          </ul>
        </div>

        {result && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong className="text-sm md:text-base">Blog post generated successfully!</strong>
              <div className="mt-2 space-y-1 text-xs md:text-sm">
                <p className="break-words">• Title: {result.preview?.title}</p>
                <p>• Word Count: {result.preview?.wordCount || 0}</p>
                <p className="break-words">• Tags: {result.preview?.tags}</p>
                <p className="mt-2 font-semibold">Check the "Drafts" tab to review and publish!</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
          className="w-full bg-red-700 hover:bg-red-800"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating Blog Post with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Blog Post
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Powered by Claude Haiku 4.5 • Generation takes 10-30 seconds
        </p>
      </CardContent>
    </Card>
  )
}
