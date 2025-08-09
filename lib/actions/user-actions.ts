'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserBySlug(slug: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        profileSlug: slug,
        profilePublic: true,
        profileCompleted: true
      },
      include: {
        skills: {
          include: {
            skill: true
          }
        },
        repositories: {
          where: {
            isFeatured: true
          },
          orderBy: {
            stars: 'desc'
          }
        }
      }
    })

    if (!user) {
      return null
    }

    // Transform data for frontend
    return {
      id: user.id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      photoUrl: user.photoUrl,
      backgroundImage: user.backgroundImage,
      profession: user.profession,
      portfolioWebsite: user.portfolioWebsite,
      bio: user.bio,
      githubProfile: user.githubProfile,
      upworkProfile: user.upworkProfile,
      fiverProfile: user.fiverProfile,
      freelancerProfile: user.freelancerProfile,
      maltProfile: user.maltProfile,
      linkedin: user.linkedin,
      behance: user.behance,
      dribbble: user.dribbble,
      colorTheme: user.colorTheme,
      layoutStyle: user.layoutStyle,
      profileSlug: user.profileSlug,
      skills: user.skills.map(userSkill => ({
        id: userSkill.skill.id,
        name: userSkill.skill.name,
        category: userSkill.skill.category,
        level: userSkill.level
      })),
      repositories: user.repositories,
      createdAt: user.createdAt
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function getUserStats(userId: string) {
  try {
    const [skillsCount, reposCount] = await Promise.all([
      prisma.userSkill.count({
        where: { userId }
      }),
      prisma.repository.count({
        where: { userId }
      })
    ])

    return {
      skillsCount,
      reposCount,
      profileViews: 0, // TODO: Implement view tracking
      lastUpdated: new Date()
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return null
  }
}

export async function getUserForForm(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        skills: {
          include: {
            skill: true
          }
        },
        repositories: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      return null
    }

    // Transform for form pre-filling
    return {
      // Personal Information
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      age: user.age?.toString() || '',
      email: user.email || '',
      photoUrl: user.photoUrl,
      backgroundImage: user.backgroundImage,
      
      // Professional Details
      profession: user.profession || '',
      skills: user.skills.map(userSkill => userSkill.skill.name),
      portfolioWebsite: user.portfolioWebsite || '',
      
      // GitHub Integration
      githubProfile: user.githubProfile || '',
      selectedRepos: user.repositories.map(repo => ({
        name: repo.name,
        url: repo.url,
        image: repo.imageUrl || '',
        description: repo.description || ''
      })),
      
      // Freelance Platforms
      upworkProfile: user.upworkProfile || '',
      fiverProfile: user.fiverProfile || '',
      freelancerProfile: user.freelancerProfile || '',
      maltProfile: user.maltProfile || '',
      linkedin: user.linkedin || '',
      behance: user.behance || '',
      dribbble: user.dribbble || '',
      
      // Design Customization
      colorTheme: user.colorTheme || 'default',
      layoutStyle: user.layoutStyle || 'modern',
      
      // Meta
      profileCompleted: user.profileCompleted,
      profileSlug: user.profileSlug
    }
  } catch (error) {
    console.error('Error fetching user for form:', error)
    return null
  }
}

export async function getCurrentUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        skills: {
          include: {
            skill: true
          }
        },
        repositories: {
          orderBy: {
            stars: 'desc'
          }
        }
      }
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      photoUrl: user.photoUrl,
      backgroundImage: user.backgroundImage,
      profession: user.profession,
      portfolioWebsite: user.portfolioWebsite,
      bio: user.bio,
      githubProfile: user.githubProfile,
      upworkProfile: user.upworkProfile,
      fiverProfile: user.fiverProfile,
      freelancerProfile: user.freelancerProfile,
      maltProfile: user.maltProfile,
      linkedin: user.linkedin,
      behance: user.behance,
      dribbble: user.dribbble,
      colorTheme: user.colorTheme,
      layoutStyle: user.layoutStyle,
      profileSlug: user.profileSlug,
      profileCompleted: user.profileCompleted,
      profilePublic: user.profilePublic,
      skills: user.skills.map(userSkill => ({
        id: userSkill.skill.id,
        name: userSkill.skill.name,
        category: userSkill.skill.category,
        level: userSkill.level
      })),
      repositories: user.repositories,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  } catch (error) {
    console.error('Error fetching current user profile:', error)
    return null
  }
}