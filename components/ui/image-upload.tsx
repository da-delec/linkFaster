'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: string // base64 string
  onChange: (value: string | null) => void
  className?: string
  maxSizeInMB?: number
  acceptedTypes?: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  className,
  maxSizeInMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const compressImage = (file: File, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions to keep reasonable size
        const maxWidth = 800
        const maxHeight = 600
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedBase64)
      }

      img.onerror = () => reject(new Error('Error processing image'))
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileSelect = async (file: File) => {
    setError(null)

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Unsupported file type. Use: ${acceptedTypes.join(', ')}`)
      return
    }

    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxSizeInMB) {
      setError(`File too large. Maximum size: ${maxSizeInMB}MB`)
      return
    }

    try {
      // Compress image to reduce size
      const compressedBase64 = await compressImage(file, 0.7)
      
      // Check compressed size (rough estimation)
      const compressedSizeInMB = (compressedBase64.length * 0.75) / (1024 * 1024)
      if (compressedSizeInMB > 0.5) { // 500KB limit for final compressed image
        // Try with lower quality
        const recompressedBase64 = await compressImage(file, 0.5)
        onChange(recompressedBase64)
      } else {
        onChange(compressedBase64)
      }
    } catch (error) {
      setError('Error compressing image')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemove = () => {
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {value ? (
        <Card className="relative overflow-hidden">
          <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <img
              src={value}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(value, '_blank')}
              className="bg-white/90 hover:bg-white"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="bg-red-500/90 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card
          className={cn(
            'border-2 border-dashed cursor-pointer transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-slate-300 dark:border-slate-600 hover:border-primary',
            error && 'border-red-300 dark:border-red-600'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <Upload className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
              Drag an image here or click to select
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Supported formats: JPEG, PNG, WebP, GIF (max {maxSizeInMB}MB)<br/>
              <span className="text-xs">Image automatically compressed and resized</span>
            </p>
            <Button variant="outline" type="button">
              Choose a file
            </Button>
          </div>
        </Card>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
          {error}
        </p>
      )}
    </div>
  )
}

export default ImageUpload