'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const prisma = new PrismaClient()

// Server-side Supabase client with service role for uploads
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key needed for server uploads
)

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export interface ProfileFormData {
  // Personal Information
  firstName: string
  lastName: string
  age: string
  email: string
  
  // Professional Details
  profession: string
  bio: string
  skills: string[]
  portfolioWebsite: string
  
  // GitHub Integration
  githubProfile: string
  githubCalendar: boolean
  selectedRepos: Array<{
    name: string
    url: string
    image: string
    description: string
  }>
  
  // Production Projects
  projects: Array<{
    id?: string
    title: string
    description: string
    url: string
    previewUrl?: string // Deprecated - for backward compatibility
    previewImage?: string // New field for base64 image
    technologies: string[]
  }>
  
  // Freelance Platforms
  upworkProfile: string
  fiverProfile: string
  freelancerProfile: string
  maltProfile: string
  linkedin: string
  behance: string
  dribbble: string
  
  // Design Customization
  colorTheme: string
  layoutStyle: string
  enableReviews: boolean
}

// Function to calculate profile completion percentage
function calculateProfileCompletion(data: ProfileFormData): boolean {
  const requiredFields = [
    data.firstName,
    data.lastName,
    data.profession,
    data.bio, // This is the custom bio that was missing
    data.skills.length > 0
  ]
  
  // At least 4 out of 5 required fields should be filled
  const completedFields = requiredFields.filter(Boolean).length
  return completedFields >= 4
}

async function uploadFileToSupabase(
  file: File,
  userId: string,
  type: 'profile' | 'background'
): Promise<string | null> {
  try {
    // File validation
    if (file.size > MAX_FILE_SIZE) {
      console.error('File too large:', file.size, 'bytes (max:', MAX_FILE_SIZE, ')')
      return null
    }
    
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      console.error('Invalid file type:', file.type, '(allowed:', ALLOWED_IMAGE_TYPES, ')')
      return null
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${type}-${Date.now()}.${fileExt}`
    
    // Convert File to ArrayBuffer for server upload
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, uint8Array, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return null
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(data.path)

    return publicData.publicUrl
  } catch (error) {
    console.error('Upload function failed:', error)
    return null
  }
}

export async function createOrUpdateProfile(formData: FormData) {
  try {
    // Extract regular form data
    const data: ProfileFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      age: formData.get('age') as string,
      email: formData.get('email') as string,
      profession: formData.get('profession') as string,
      bio: formData.get('bio') as string,
      skills: JSON.parse(formData.get('skills') as string || '[]'),
      portfolioWebsite: formData.get('portfolioWebsite') as string,
      githubProfile: formData.get('githubProfile') as string,
      githubCalendar: formData.get('githubCalendar') === 'true',
      selectedRepos: JSON.parse(formData.get('selectedRepos') as string || '[]'),
      projects: JSON.parse(formData.get('projects') as string || '[]'),
      upworkProfile: formData.get('upworkProfile') as string,
      fiverProfile: formData.get('fiverProfile') as string,
      freelancerProfile: formData.get('freelancerProfile') as string,
      maltProfile: formData.get('maltProfile') as string,
      linkedin: formData.get('linkedin') as string,
      behance: formData.get('behance') as string,
      dribbble: formData.get('dribbble') as string,
      colorTheme: formData.get('colorTheme') as string,
      layoutStyle: formData.get('layoutStyle') as string,
      enableReviews: formData.get('enableReviews') === 'true',
    }

    // Get files
    const photoFile = formData.get('photo') as File | null
    const backgroundFile = formData.get('backgroundImage') as File | null


    // Get user ID from form data (passed by the hook)
    const userId = formData.get('userId') as string
    if (!userId) {
      return {
        success: false,
        message: 'Utilisateur non identifié.'
      }
    }


    let photoUrl = null
    let backgroundImageUrl = null

    // Upload files if they exist
    if (photoFile && photoFile.size > 0) {
      photoUrl = await uploadFileToSupabase(photoFile, userId, 'profile')
    }

    if (backgroundFile && backgroundFile.size > 0) {
      backgroundImageUrl = await uploadFileToSupabase(backgroundFile, userId, 'background')
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { id: userId } })
    
    // Generate unique profile slug only for new users or if names changed
    let profileSlug = existingUser?.profileSlug
    
    if (!profileSlug || (existingUser && (existingUser.firstName !== data.firstName || existingUser.lastName !== data.lastName))) {
      const baseSlug = `${data.firstName}-${data.lastName}`.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      profileSlug = baseSlug
      let counter = 1
      
      // Check if slug exists and increment if needed (but skip current user's slug)
      while (await prisma.user.findUnique({ 
        where: { 
          profileSlug,
          NOT: { id: userId }
        } 
      })) {
        profileSlug = `${baseSlug}-${counter}`
        counter++
      }
    }

    // Create or update user in database
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age ? parseInt(data.age) : null,
        photoUrl: photoUrl || existingUser?.photoUrl,
        backgroundImage: backgroundImageUrl || existingUser?.backgroundImage,
        profession: data.profession,
        bio: data.bio,
        portfolioWebsite: data.portfolioWebsite,
        githubProfile: data.githubProfile,
        githubCalendar: data.githubCalendar,
        upworkProfile: data.upworkProfile,
        fiverProfile: data.fiverProfile,
        freelancerProfile: data.freelancerProfile,
        maltProfile: data.maltProfile,
        linkedin: data.linkedin,
        behance: data.behance,
        dribbble: data.dribbble,
        colorTheme: data.colorTheme,
        layoutStyle: data.layoutStyle,
        enableReviews: data.enableReviews,
        profileCompleted: calculateProfileCompletion(data),
        profilePublic: calculateProfileCompletion(data),
        profileSlug,
      },
      create: {
        id: userId,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age ? parseInt(data.age) : null,
        photoUrl,
        backgroundImage: backgroundImageUrl,
        profession: data.profession,
        bio: data.bio,
        portfolioWebsite: data.portfolioWebsite,
        githubProfile: data.githubProfile,
        githubCalendar: data.githubCalendar,
        upworkProfile: data.upworkProfile,
        fiverProfile: data.fiverProfile,
        freelancerProfile: data.freelancerProfile,
        maltProfile: data.maltProfile,
        linkedin: data.linkedin,
        behance: data.behance,
        dribbble: data.dribbble,
        colorTheme: data.colorTheme,
        layoutStyle: data.layoutStyle,
        enableReviews: data.enableReviews,
        profileCompleted: calculateProfileCompletion(data),
        profileSlug,
        profilePublic: calculateProfileCompletion(data),
      },
    })

    // Handle skills - simple array update
    await prisma.user.update({
      where: { id: user.id },
      data: {
        skills: data.skills
      }
    })

    // Handle repositories - clear existing and add new ones
    await prisma.repository.deleteMany({
      where: { userId: user.id }
    })

    for (const repo of data.selectedRepos) {
      await prisma.repository.create({
        data: {
          userId: user.id,
          name: repo.name,
          url: repo.url,
          description: repo.description,
          imageUrl: repo.image || null,
          isFeatured: true
        }
      })
    }

    // Handle projects - clear existing and add new ones
    await prisma.project.deleteMany({
      where: { userId: user.id }
    })

    for (const project of data.projects) {
      await prisma.project.create({
        data: {
          userId: user.id,
          title: project.title,
          description: project.description,
          url: project.url,
          previewUrl: project.previewUrl || null,
          previewImage: project.previewImage || null,
          technologies: project.technologies,
          isFeatured: true
        }
      })
    }

    // Revalidate relevant pages
    revalidatePath('/dashboard')
    revalidatePath(`/profile/${profileSlug}`)

    return {
      success: true,
      message: existingUser ? 'Profil mis à jour avec succès !' : 'Profil créé avec succès !',
      profileSlug,
      userId: user.id,
      isUpdate: !!existingUser
    }

  } catch (error) {
    console.error('Error creating/updating profile:', error)
    return {
      success: false,
      message: 'Erreur lors de la sauvegarde du profil. Veuillez réessayer.'
    }
  }
}

