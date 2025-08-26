'use server'

import { prisma } from '@/lib/prisma'

export interface ProfileCompletionDetail {
  percentage: number
  basicInfo: boolean
  skillsProjects: boolean
  customBio: boolean
  platforms: boolean
}

export async function getProfileCompletionDetails(userId: string): Promise<ProfileCompletionDetail | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        repositories: true,
        projects: true
      }
    })

    if (!user) {
      return null
    }

    // Check basic info completion
    const basicInfo = !!(
      user.firstName &&
      user.lastName &&
      user.profession
    )

    // Check skills and projects completion
    const skillsProjects = !!(
      user.skills.length > 0 ||
      user.repositories.length > 0 ||
      user.projects.length > 0
    )

    // Check custom bio completion
    const customBio = !!(user.bio && user.bio.trim().length > 0)

    // Check platforms completion
    const platforms = !!(
      user.githubProfile ||
      user.linkedin ||
      user.upworkProfile ||
      user.fiverProfile ||
      user.freelancerProfile ||
      user.maltProfile ||
      user.behance ||
      user.dribbble ||
      user.portfolioWebsite
    )

    const completedSections = [basicInfo, skillsProjects, customBio, platforms].filter(Boolean).length
    const percentage = Math.round((completedSections / 4) * 100)

    return {
      percentage,
      basicInfo,
      skillsProjects,
      customBio,
      platforms
    }
  } catch (error) {
    console.error('Error calculating profile completion:', error)
    return null
  }
}