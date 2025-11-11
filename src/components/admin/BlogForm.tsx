"use client"

import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RichTextEditor } from "./RichTextEditor"
import { toast } from "sonner"
import { Loader2, Eye } from "lucide-react"
import type { Id } from "@convex/_generated/dataModel"

interface BlogFormProps {
  post?: any
  onClose: () => void
  onSave: () => void
}

export function BlogForm({ post, onClose, onSave }: BlogFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    published: false,
    metaTitle: "",
    metaDescription: "",
    tags: "",
  })

  const createPost = useMutation(api.blogPosts.create)
  const updatePost = useMutation(api.blogPosts.update)

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content,
        featuredImage: post.featuredImage || "",
        published: post.published,
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        tags: post.tags || "",
      })
    }
  }, [post])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: !post ? generateSlug(title) : prev.slug,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (post) {
        await updatePost({
          id: post._id as Id<"blogPosts">,
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt || undefined,
          featuredImage: formData.featuredImage || undefined,
          published: formData.published,
          metaTitle: formData.metaTitle || undefined,
          metaDescription: formData.metaDescription || undefined,
          tags: formData.tags || undefined,
        })
        toast.success("Post updated successfully!")
      } else {
        await createPost({
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt || undefined,
          featuredImage: formData.featuredImage || undefined,
          published: formData.published,
          metaTitle: formData.metaTitle || undefined,
          metaDescription: formData.metaDescription || undefined,
          tags: formData.tags || undefined,
        })
        toast.success("Post created successfully!")
      }
      onSave()
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Blog Post" : "New Blog Post"}</DialogTitle>
          <DialogDescription>
            {post
              ? "Update your blog post content"
              : "Create a new blog post about tractor restoration"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Post Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Restoring a 1952 Farmall M"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="restoring-1952-farmall-m"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short summary of the post..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="featuredImage">Featured Image URL (optional)</Label>
            <Input
              id="featuredImage"
              value={formData.featuredImage}
              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <Tabs defaultValue="content" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div>
                <Label>Post Content *</Label>
                <div className="mt-2">
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Use the rich text editor to format your content. Supports HTML, markdown-style formatting, images, links, and code blocks.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">SEO Title (optional)</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder={formData.title || "Override the post title for search engines"}
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.metaTitle.length}/60 characters. Recommended: 50-60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description (optional)</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder={formData.excerpt || "Write a compelling description for search engines"}
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.metaDescription.length}/160 characters. Recommended: 150-160 characters
                </p>
              </div>

              <div>
                <Label htmlFor="tags">Tags (optional)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="restoration, farmall, vintage, tractor (comma-separated)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add tags to help organize and categorize your content
                </p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">SEO Preview</h4>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                    {formData.metaTitle || formData.title || "Your post title"}
                  </div>
                  <div className="text-green-700 text-sm">
                    historyrestoredbyme.com › blog › {formData.slug || "post-slug"}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {formData.metaDescription || formData.excerpt || "Your post description will appear here in search results..."}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="border rounded-lg p-6">
              <article>
                {formData.featuredImage && (
                  <img 
                    src={formData.featuredImage} 
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                <h1 className="text-4xl font-bold mb-2">{formData.title || "Post Title"}</h1>
                {formData.excerpt && (
                  <p className="text-xl text-gray-600 mb-6">{formData.excerpt}</p>
                )}
                <div
                  className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content || "<p>Your content will appear here...</p>" }}
                />
                {formData.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {formData.tags.split(",").map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </TabsContent>
          </Tabs>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label htmlFor="published">
              Publish immediately (uncheck to save as draft)
            </Label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-red-700 hover:bg-red-800">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {formData.published
                ? post
                  ? "Update & Publish"
                  : "Create & Publish"
                : post
                ? "Save Changes"
                : "Save as Draft"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
