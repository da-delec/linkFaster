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

export interface ProfileFormData {
  // Personal Information
  firstName: string
  lastName: string
  age: string
  email: string
  
  // Professional Details
  profession: string
  skills: string[]
  portfolioWebsite: string
  
  // GitHub Integration
  githubProfile: string
  selectedRepos: Array<{
    name: string
    url: string
    image: string
    description: string
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
}

async function uploadFileToSupabase(
  file: File,
  userId: string,
  type: 'profile' | 'background'
): Promise<string | null> {
  try {
    console.log('🔍 [DEBUG] Starting file upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      userId,
      type
    })

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${type}-${Date.now()}.${fileExt}`
    
    console.log('📁 [DEBUG] Generated filename:', fileName)
    
    // Convert File to ArrayBuffer for server upload
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    console.log('💾 [DEBUG] File converted to buffer, size:', uint8Array.length)
    
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, uint8Array, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('❌ [ERROR] Supabase upload error:', error)
      return null
    }

    console.log('✅ [SUCCESS] File uploaded to Supabase:', data.path)

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(data.path)

    console.log('🔗 [DEBUG] Public URL generated:', publicData.publicUrl)

    return publicData.publicUrl
  } catch (error) {
    console.error('💥 [ERROR] Upload function failed:', error)
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
      skills: JSON.parse(formData.get('skills') as string || '[]'),
      portfolioWebsite: formData.get('portfolioWebsite') as string,
      githubProfile: formData.get('githubProfile') as string,
      selectedRepos: JSON.parse(formData.get('selectedRepos') as string || '[]'),
      upworkProfile: formData.get('upworkProfile') as string,
      fiverProfile: formData.get('fiverProfile') as string,
      freelancerProfile: formData.get('freelancerProfile') as string,
      maltProfile: formData.get('maltProfile') as string,
      linkedin: formData.get('linkedin') as string,
      behance: formData.get('behance') as string,
      dribbble: formData.get('dribbble') as string,
      colorTheme: formData.get('colorTheme') as string,
      layoutStyle: formData.get('layoutStyle') as string,
    }

    // Get files
    const photoFile = formData.get('photo') as File | null
    const backgroundFile = formData.get('backgroundImage') as File | null

    console.log('📤 [DEBUG] Files received:', {
      photoFile: photoFile ? { name: photoFile.name, size: photoFile.size, type: photoFile.type } : null,
      backgroundFile: backgroundFile ? { name: backgroundFile.name, size: backgroundFile.size, type: backgroundFile.type } : null
    })

    // Get user ID from form data (passed by the hook)
    const userId = formData.get('userId') as string
    if (!userId) {
      return {
        success: false,
        message: 'Utilisateur non identifié.'
      }
    }

    console.log('👤 [DEBUG] User ID:', userId)

    let photoUrl = null
    let backgroundImageUrl = null

    // Upload files if they exist
    if (photoFile && photoFile.size > 0) {
      console.log('🖼️ [DEBUG] Uploading profile photo...')
      photoUrl = await uploadFileToSupabase(photoFile, userId, 'profile')
      console.log('🖼️ [DEBUG] Profile photo result:', photoUrl)
    } else {
      console.log('⚠️ [DEBUG] No profile photo to upload')
    }

    if (backgroundFile && backgroundFile.size > 0) {
      console.log('🌄 [DEBUG] Uploading background image...')
      backgroundImageUrl = await uploadFileToSupabase(backgroundFile, userId, 'background')
      console.log('🌄 [DEBUG] Background image result:', backgroundImageUrl)
    } else {
      console.log('⚠️ [DEBUG] No background image to upload')
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
        portfolioWebsite: data.portfolioWebsite,
        githubProfile: data.githubProfile,
        upworkProfile: data.upworkProfile,
        fiverProfile: data.fiverProfile,
        freelancerProfile: data.freelancerProfile,
        maltProfile: data.maltProfile,
        linkedin: data.linkedin,
        behance: data.behance,
        dribbble: data.dribbble,
        colorTheme: data.colorTheme,
        layoutStyle: data.layoutStyle,
        profileCompleted: true,
        profilePublic: true,
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
        portfolioWebsite: data.portfolioWebsite,
        githubProfile: data.githubProfile,
        upworkProfile: data.upworkProfile,
        fiverProfile: data.fiverProfile,
        freelancerProfile: data.freelancerProfile,
        maltProfile: data.maltProfile,
        linkedin: data.linkedin,
        behance: data.behance,
        dribbble: data.dribbble,
        colorTheme: data.colorTheme,
        layoutStyle: data.layoutStyle,
        profileCompleted: true,
        profileSlug,
        profilePublic: true,
      },
    })

    // Handle skills - clear existing and add new ones
    await prisma.userSkill.deleteMany({
      where: { userId: user.id }
    })

    for (const skillName of data.skills) {
      // Create skill if it doesn't exist
      const skill = await prisma.skill.upsert({
        where: { name: skillName },
        update: {},
        create: {
          name: skillName,
          category: categorizeSkill(skillName)
        }
      })

      // Link skill to user
      await prisma.userSkill.create({
        data: {
          userId: user.id,
          skillId: skill.id,
          level: 'intermediate'
        }
      })
    }

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

// Helper function to categorize skills
function categorizeSkill(skillName: string): string {
  const frontendSkills = ['React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Sass/SCSS', 'Tailwind CSS', 'Bootstrap']
  const backendSkills = ['Node.js', 'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot', 'PHP', 'Laravel', 'C#', '.NET', 'Go', 'Rust']
  const databaseSkills = ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis']
  const devopsSkills = ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'DevOps']
  const designSkills = ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Responsive Design']
  const mobileSkills = ['Swift', 'Kotlin', 'Flutter', 'React Native']

  if (frontendSkills.includes(skillName)) return 'Frontend'
  if (backendSkills.includes(skillName)) return 'Backend'
  if (databaseSkills.includes(skillName)) return 'Database'
  if (devopsSkills.includes(skillName)) return 'DevOps'
  if (designSkills.includes(skillName)) return 'Design'
  if (mobileSkills.includes(skillName)) return 'Mobile'
  
  return 'Other'
}