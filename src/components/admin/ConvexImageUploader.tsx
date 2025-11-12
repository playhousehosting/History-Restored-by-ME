"use client"

import { useState, useRef } from "react"
import { useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import type { Id } from "@convex/_generated/dataModel"

interface ConvexImageUploaderProps {
  onUploadComplete?: (fileId: Id<"files">, url: string) => void
  maxFiles?: number
  accept?: string
  usedIn?: {
    type: "project" | "blogPost"
    id: Id<"projects"> | Id<"blogPosts">
  }
}

export function ConvexImageUploader({
  onUploadComplete,
  maxFiles = 10,
  accept = "image/*",
  usedIn,
}: ConvexImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: Id<"files">; url: string; name: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const saveFileMetadata = useMutation(api.files.saveFileMetadata)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    if (uploadedFiles.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`)
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      const totalFiles = files.length
      let completedFiles = 0

      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`)
          continue
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 10MB)`)
          continue
        }

        // Step 1: Get upload URL from Convex
        const uploadUrl = await generateUploadUrl()

        // Step 2: Upload file to Convex storage
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        })

        if (!result.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const { storageId } = await result.json()

        // Step 3: Save file metadata
        const fileId = await saveFileMetadata({
          storageId,
          name: file.name,
          type: file.type,
          size: file.size,
          usedIn,
        })

        // Step 4: Get file URL
        const fileUrl = new URL(uploadUrl)
        fileUrl.pathname = `/api/storage/${storageId}`
        const url = fileUrl.toString()

        const uploadedFile = { id: fileId, url, name: file.name }
        setUploadedFiles((prev) => [...prev, uploadedFile])

        if (onUploadComplete) {
          onUploadComplete(fileId, url)
        }

        completedFiles++
        setProgress((completedFiles / totalFiles) * 100)
      }

      toast.success(`Successfully uploaded ${completedFiles} file(s)`)
    } catch (error: any) {
      console.error("Upload error:", error)
      toast.error(error.message || "Failed to upload files")
    } finally {
      setUploading(false)
      setProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || uploadedFiles.length >= maxFiles}
          className="w-full sm:w-auto"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Uploading..." : "Select Images"}
        </Button>
        {uploadedFiles.length > 0 && (
          <span className="text-sm text-gray-600">
            {uploadedFiles.length} / {maxFiles} uploaded
          </span>
        )}
      </div>

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 text-center">{Math.round(progress)}%</p>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedFiles.map((file, index) => (
            <div key={file.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mt-1 text-xs text-gray-600 truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {uploadedFiles.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">
            Click "Select Images" to upload files
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Accepts images up to 10MB • Max {maxFiles} files
          </p>
        </div>
      )}
    </div>
  )
}
