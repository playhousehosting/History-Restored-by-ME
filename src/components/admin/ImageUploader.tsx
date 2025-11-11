"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import ReactCrop, { Crop, PixelCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X, Crop as CropIcon } from "lucide-react"
import { toast } from "sonner"

interface ImageUploaderProps {
  onImagesUploaded: (urls: string[]) => void
  maxFiles?: number
}

export function ImageUploader({ onImagesUploaded, maxFiles = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [cropImage, setCropImage] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true)
      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/uploadthing", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) throw new Error("Upload failed")

          const data = await response.json()
          return data.url
        })

        const urls = await Promise.all(uploadPromises)
        onImagesUploaded(urls)
        toast.success(`${urls.length} image(s) uploaded successfully!`)
      } catch (error) {
        console.error("Upload error:", error)
        toast.error("Failed to upload images")
      } finally {
        setUploading(false)
      }
    },
    [onImagesUploaded]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles,
    disabled: uploading,
  })

  return (
    <>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-red-500 bg-red-50"
            : "border-gray-300 hover:border-red-400"
        } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-red-700 font-medium">Drop images here...</p>
        ) : (
          <div>
            <p className="text-gray-700 font-medium mb-2">
              {uploading ? "Uploading..." : "Drag & drop images here"}
            </p>
            <p className="text-sm text-gray-500">
              or click to select files (max {maxFiles})
            </p>
          </div>
        )}
      </div>
    </>
  )
}

interface ImagePreviewProps {
  images: { url: string; alt?: string }[]
  onRemove: (index: number) => void
  onReorder: (fromIndex: number, toIndex: number) => void
}

export function ImagePreview({ images, onRemove, onReorder }: ImagePreviewProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index)
      setDraggedIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`relative group cursor-move border-2 rounded-lg overflow-hidden ${
            draggedIndex === index ? "border-red-500" : "border-transparent"
          }`}
        >
          <img
            src={image.url}
            alt={image.alt || `Image ${index + 1}`}
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-2 left-2 bg-white rounded px-2 py-1 text-xs font-medium">
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  )
}
