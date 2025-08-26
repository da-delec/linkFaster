'use client'

import React, { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload, Camera, X } from 'lucide-react'

interface PersonalInfoStepProps {
  data: {
    firstName: string
    lastName: string
    age: string
    email: string
    photo: File | null
  }
  onUpdate: (data: any) => void
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onUpdate }) => {
  const photoInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Pour l'instant, on garde le File object pour la preview
      // L'upload vers Supabase se fera lors de la soumission du formulaire
      onUpdate({ photo: file })
    }
  }


  const removePhoto = () => {
    onUpdate({ photo: null })
    if (photoInputRef.current) {
      photoInputRef.current.value = ''
    }
  }


  return (
    <div className="space-y-8">
      {/* Photo Upload Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="w-24 h-24">
              {data.photo ? (
                <AvatarImage 
                  src={URL.createObjectURL(data.photo)} 
                  alt="Profile photo" 
                />
              ) : (
                <AvatarFallback className="text-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600">
                  <Camera className="w-8 h-8 text-slate-500" />
                </AvatarFallback>
              )}
            </Avatar>
            {data.photo && (
              <Button
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                onClick={removePhoto}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={() => photoInputRef.current?.click()}
            className="flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>{data.photo ? 'Change photo' : 'Add a photo'}</span>
          </Button>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
          <p className="text-xs text-slate-500 mt-2">
            Recommended format: JPG, PNG (max 5MB)
          </p>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            placeholder="Your first name"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            placeholder="Your last name"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={data.age}
            onChange={(e) => onUpdate({ age: e.target.value })}
            placeholder="Your age"
            className="h-10"
            min="16"
            max="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="your.email@example.com"
            className="h-10"
          />
        </div>
      </div>


      {/* Information Note */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex space-x-3">
          <div className="text-blue-600 dark:text-blue-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200">
              Why this information?
            </h4>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              This data will help recruiters and clients get to know you better. 
              Only information marked with * is required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoStep