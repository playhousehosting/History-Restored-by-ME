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

          <div>
            <Label>Content *</Label>
            <Tabs defaultValue="editor" className="mt-2">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="border rounded-lg p-0 mt-2">
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              </TabsContent>
              <TabsContent value="preview" className="border rounded-lg p-6 mt-2">
                <div
                  className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </TabsContent>
            </Tabs>
          </div>

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
