"use client"

import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/../convex/_generated/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ImageUploader, ImagePreview } from "./ImageUploader"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import type { Id } from "@/../convex/_generated/dataModel"

interface ProjectFormProps {
  project?: any
  onClose: () => void
  onSave: () => void
}

export function ProjectForm({ project, onClose, onSave }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "completed" as "completed" | "in-progress" | "planned",
    featured: false,
    images: [] as { url: string; alt?: string; order: number }[],
  })

  const createProject = useMutation(api.projects.create)
  const updateProject = useMutation(api.projects.update)

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        status: project.status,
        featured: project.featured,
        images: (project.images || []).map((img: any, idx: number) => ({
          url: img.url,
          alt: img.alt,
          order: img.order ?? idx
        })),
      })
    }
  }, [project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (project) {
        await updateProject({
          id: project._id as Id<"projects">,
          title: formData.title,
          description: formData.description,
          status: formData.status,
          featured: formData.featured,
          images: formData.images,
        })
        toast.success("Project updated successfully!")
      } else {
        await createProject({
          title: formData.title,
          description: formData.description,
          status: formData.status,
          featured: formData.featured,
          images: formData.images,
        })
        toast.success("Project created successfully!")
      }
      onSave()
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleImagesUploaded = (urls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...urls.map((url, index) => ({ 
        url, 
        alt: formData.title,
        order: prev.images.length + index
      }))],
    }))
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleReorderImages = (fromIndex: number, toIndex: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images]
      const [removed] = newImages.splice(fromIndex, 1)
      newImages.splice(toIndex, 0, removed)
      // Update order numbers after reordering
      const reorderedImages = newImages.map((img, idx) => ({ ...img, order: idx }))
      return { ...prev, images: reorderedImages }
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "New Project"}</DialogTitle>
          <DialogDescription>
            {project
              ? "Update project details and images"
              : "Create a new restoration project with images"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., 1952 Farmall M Restoration"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the restoration project..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as "completed" | "in-progress" | "planned" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured on homepage</Label>
            </div>
          </div>

          <div>
            <Label>Project Images</Label>
            <p className="text-sm text-gray-500 mb-2">
              Upload multiple images. Drag to reorder them.
            </p>
            <ImageUploader onImagesUploaded={handleImagesUploaded} />
            {formData.images.length > 0 && (
              <div className="mt-4">
                <ImagePreview
                  images={formData.images}
                  onRemove={handleRemoveImage}
                  onReorder={handleReorderImages}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-red-700 hover:bg-red-800">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {project ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
