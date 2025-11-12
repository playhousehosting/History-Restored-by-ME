"use client"

import { useState, useRef } from "react"
import { useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { Id } from "@convex/_generated/dataModel"

interface SingleImageUploaderProps {
  currentImage?: string
  onImageChange: (url: string) => void
  label?: string
  maxSizeMB?: number
}

export function SingleImageUploader({
  currentImage,
  onImageChange,
  label = "Upload Image",
  maxSizeMB = 10,
}: SingleImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const saveFileMetadata = useMutation(api.files.saveFileMetadata)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024
    if (file.size > maxSize) {
      toast.error(`Image must be smaller than ${maxSizeMB}MB`)
      return
    }

    setUploading(true)

    try {
      // Step 1: Get upload URL from Convex
      const uploadUrl = await generateUploadUrl()

      // Step 2: Upload file to Convex storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (!result.ok) {
        throw new Error("Failed to upload image")
      }

      const { storageId } = await result.json()

      // Step 3: Save file metadata
      await saveFileMetadata({
        storageId,
        name: file.name,
        type: file.type,
        size: file.size,
      })

      // Step 4: Get file URL
      const fileUrl = new URL(uploadUrl)
      fileUrl.pathname = `/api/storage/${storageId}`
      const url = fileUrl.toString()

      onImageChange(url)
      toast.success("Image uploaded successfully!")
    } catch (error: any) {
      console.error("Upload error:", error)
      toast.error(error.message || "Failed to upload image")
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="space-y-3">
      {currentImage && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
          <img
            src={currentImage}
            alt="Upload preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onImageChange("")}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {label}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
