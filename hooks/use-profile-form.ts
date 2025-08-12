'use client'

import { useState } from 'react'
import { createOrUpdateProfile } from '@/lib/actions/profile-actions'
import { toast } from 'sonner'

export function useProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitProfile = async (formData: any, files: { photo: File | null, backgroundImage: File | null }, userId: string) => {
    setIsSubmitting(true)

    try {
      // Create FormData object for server action
      const submitFormData = new FormData()
      
      // Add user ID
      submitFormData.append('userId', userId)
      
      // Add text fields
      submitFormData.append('firstName', formData.firstName)
      submitFormData.append('lastName', formData.lastName)
      submitFormData.append('age', formData.age.toString())
      submitFormData.append('email', formData.email)
      submitFormData.append('profession', formData.profession)
      submitFormData.append('bio', formData.bio)
      submitFormData.append('skills', JSON.stringify(formData.skills))
      submitFormData.append('portfolioWebsite', formData.portfolioWebsite)
      submitFormData.append('githubProfile', formData.githubProfile)
      submitFormData.append('selectedRepos', JSON.stringify(formData.selectedRepos))
      submitFormData.append('projects', JSON.stringify(formData.projects))
      submitFormData.append('upworkProfile', formData.upworkProfile)
      submitFormData.append('fiverProfile', formData.fiverProfile)
      submitFormData.append('freelancerProfile', formData.freelancerProfile)
      submitFormData.append('maltProfile', formData.maltProfile)
      submitFormData.append('linkedin', formData.linkedin)
      submitFormData.append('behance', formData.behance)
      submitFormData.append('dribbble', formData.dribbble)
      submitFormData.append('colorTheme', formData.colorTheme)
      submitFormData.append('layoutStyle', formData.layoutStyle)
      submitFormData.append('enableReviews', formData.enableReviews.toString())

      // Add files
      if (files.photo) {
        submitFormData.append('photo', files.photo)
      }
      if (files.backgroundImage) {
        submitFormData.append('backgroundImage', files.backgroundImage)
      }

      const result = await createOrUpdateProfile(submitFormData)

      if (result.success) {
        toast.success(result.message, {
          description: `Votre profil est maintenant disponible à : linkfaster.com/${result.profileSlug}`
        })
        
        // Redirect to profile or dashboard
        window.location.href = '/dashboard'
        
        return { success: true, data: result }
      } else {
        toast.error(result.message)
        return { success: false, error: result.message }
      }

    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Une erreur inattendue est survenue')
      return { success: false, error: 'Erreur inattendue' }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submitProfile,
    isSubmitting
  }
}