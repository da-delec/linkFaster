'use server'

import { prisma } from '@/lib/prisma'

export async function getUserBySlug(slug: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        profileSlug: slug,
        profilePublic: true,
        profileCompleted: true
      },
      include: {
        repositories: {
          where: {
            isFeatured: true
          },
          orderBy: {
            stars: 'desc'
          }
        },
        projects: {
          where: {
            isVisible: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            title: true,
            description: true,
            url: true,
            previewUrl: true,
            previewImage: true,
            technologies: true
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
      githubCalendar: user.githubCalendar,
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
      isPremium: user.isPremium,
      enableReviews: user.enableReviews,
      stripeCustomerId: user.stripeCustomerId,
      skills: user.skills,
      repositories: user.repositories,
      projects: user.projects,
      createdAt: user.createdAt
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function getUserStats(userId: string) {
  try {
    const [user, reposCount] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { 
          skills: true,
          profileViewCount: true,
          totalLinkClicks: true,
          weeklyClicks: true
        }
      }),
      prisma.repository.count({
        where: { userId }
      })
    ])

    return {
      skillsCount: user?.skills?.length || 0,
      reposCount,
      profileViews: user?.profileViewCount || 0,
      linkClicks: user?.totalLinkClicks || 0,
      monthlyClicks: user?.totalLinkClicks || 0,
      weeklyClicks: user?.weeklyClicks || 0,
      lastUpdated: new Date()
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return null
  }
}

export async function getUserForForm(userId: string) {
  try {
    // Fetch user data and relations in parallel for better performance
    const [user, repositories, projects] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          firstName: true,
          lastName: true,
          age: true,
          email: true,
          photoUrl: true,
          backgroundImage: true,
          profession: true,
          bio: true,
          skills: true,
          portfolioWebsite: true,
          githubProfile: true,
          githubCalendar: true,
          upworkProfile: true,
          fiverProfile: true,
          freelancerProfile: true,
          maltProfile: true,
          linkedin: true,
          behance: true,
          dribbble: true,
          colorTheme: true,
          layoutStyle: true,
          enableReviews: true,
          profileCompleted: true,
          profileSlug: true,
          isPremium: true,
          stripeCustomerId: true
        }
      }),
      prisma.repository.findMany({
        where: { userId },
        select: {
          name: true,
          url: true,
          imageUrl: true,
          description: true
        },
        orderBy: { createdAt: 'desc' },
        take: 50 // Limit to prevent huge payloads
      }),
      prisma.project.findMany({
        where: { userId },
        select: {
          id: true,
          title: true,
          description: true,
          url: true,
          previewUrl: true,
          previewImage: true,
          technologies: true
        },
        orderBy: { createdAt: 'desc' },
        take: 50 // Limit to prevent huge payloads
      })
    ])

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
      bio: user.bio || '',
      skills: user.skills,
      portfolioWebsite: user.portfolioWebsite || '',
      
      // GitHub Integration
      githubProfile: user.githubProfile || '',
      githubCalendar: user.githubCalendar || false,
      selectedRepos: repositories.map(repo => ({
        name: repo.name,
        url: repo.url,
        image: repo.imageUrl || '',
        description: repo.description || ''
      })),
      
      // Production Projects
      projects: projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        url: project.url,
        previewUrl: project.previewUrl || '',
        previewImage: project.previewImage || '',
        technologies: project.technologies
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
      enableReviews: user.enableReviews || false,
      
      // Meta
      profileCompleted: user.profileCompleted,
      profileSlug: user.profileSlug,
      isPremium: user.isPremium || false,
      stripeCustomerId: user.stripeCustomerId
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
        repositories: {
          orderBy: {
            stars: 'desc'
          }
        },
        projects: {
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            title: true,
            description: true,
            url: true,
            previewUrl: true,
            previewImage: true,
            technologies: true,
            isFeatured: true,
            isVisible: true,
            order: true,
            createdAt: true,
            updatedAt: true
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
      githubCalendar: user.githubCalendar,
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
      isPremium: user.isPremium,
      enableReviews: user.enableReviews,
      stripeCustomerId: user.stripeCustomerId,
      skills: user.skills,
      repositories: user.repositories,
      projects: user.projects,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  } catch (error) {
    console.error('Error fetching current user profile:', error)
    return null
  }
}