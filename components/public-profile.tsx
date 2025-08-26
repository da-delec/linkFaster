'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CiTwitter } from "react-icons/ci";

import { CiMail } from "react-icons/ci";
import GithubCaldnarIntegration from '@/app/test/page'
import { Badge } from '@/components/ui/badge'
import ReviewForm from '@/components/review-form'
import ReviewMetrics from '@/components/review-metrics'
import { 
  ExternalLink, 
  Globe, 
  MapPin,
  Calendar,
  Star,
  GitFork,
  Briefcase,
  Mail,
  Share2
} from 'lucide-react'
import { 
  SiGithub,
  SiLinkedin,
  SiDribbble,
  SiBehance,
  SiFiverr,
  SiUpwork,
  SiFreelancer,
  SiMalt
} from 'react-icons/si'

interface User {
  id: string
  name: string
  firstName: string | null
  lastName: string | null
  email: string
  age: number | null
  photoUrl: string | null
  backgroundImage: string | null
  profession: string | null
  portfolioWebsite: string | null
  bio: string | null
  githubProfile: string | null
  githubCalendar: boolean
  upworkProfile: string | null
  fiverProfile: string | null
  freelancerProfile: string | null
  maltProfile: string | null
  linkedin: string | null
  behance: string | null
  dribbble: string | null
  colorTheme: string
  layoutStyle: string
  profileSlug: string | null
  isPremium: boolean

  enableReviews: boolean
  skills: string[]
  repositories: Array<{
    id: string
    name: string
    url: string
    description: string | null
    imageUrl: string | null
    language: string | null
    stars: number
    forks: number
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    url: string
    previewUrl?: string | null // Deprecated - for backward compatibility
    previewImage?: string | null // New field for base64 image
    technologies: string[]
  }>
  createdAt: Date
}

interface Review {
  id: string
  rating: number
  comment: string | null
  reviewerName: string
  createdAt: string
  isVerified: boolean
}

interface ReviewStatistics {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

interface PublicProfileProps {
  user: User
}

const PublicProfile: React.FC<PublicProfileProps> = ({ user }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewStats, setReviewStats] = useState<ReviewStatistics | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)


  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews)
        setReviewStats(data.statistics)
      }
    } catch (error) {
      console.error('Error loading reviews:', error)
    }
  }

  useEffect(() => {
    if (user.enableReviews) {
      fetchReviews()
    }
  }, [user.id, user.enableReviews])

  const handleReviewSubmitted = () => {
    setShowReviewForm(false)
    fetchReviews()
  }
  const getThemeColors = (theme: string) => {
    switch (theme) {
      // 3 FREE THEMES - Apple design, simple and clean
      case 'default':
        return {
          primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
          secondary: 'bg-gradiant from-white to-blue300 border border-slate-200 shadow-sm',
          accent: 'text-blue-600',
          text: 'text-slate-900',
          textCard: 'text-slate-900',
          background: 'from-slate-50 to-white',
          cardBorder: 'border-slate-200',
          cardShadow: 'shadow-sm'
        }
      case 'emerald':
        return {
          primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
          secondary: 'bg-white border border-slate-200 shadow-sm',
          accent: 'text-emerald-600',
          text: 'text-slate-900',
          textCard: 'text-slate-900',
          background: 'from-emerald-50 to-white',
          cardBorder: 'border-slate-200',
          cardShadow: 'shadow-sm'
        }
      case 'purple':
        return {
          primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm',
          secondary: 'bg-white border border-slate-200 shadow-sm',
          accent: 'text-purple-600',
          text: 'text-slate-900',
          textCard: 'text-slate-900',
          background: 'from-purple-50 to-white',
          cardBorder: 'border-slate-200',
          cardShadow: 'shadow-sm'
        }

      // 1 PREMIUM DARK THEME - Apple dark design with background image
      case 'midnight':
        return {
          primary: 'bg-sky-500  hover:bg-slate-700/80 backdrop-blur-md border border-slate-600/50 text-white shadow-xl hover:shadow-2xl transition-all duration-300',
          secondary: 'bg-white/20 backdrop-blur-md border border-slate-600/40 shadow-xl hover:shadow-2xl transition-all duration-300',
          accent: 'text-sky-500',
          text: 'text-slate-100',
          textCard: 'text-slate-100',
          background: 'midnight-background',
          cardBorder: 'border-slate-600/40',
          cardShadow: 'shadow-xl backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-slate-800/60 border-slate-600/40 shadow-xl',
          darkBackground: true
        }

      // 3 PREMIUM GLASSMORPHISM THEMES - Modern Apple design with abstract backgrounds
      case 'glass-aurora':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg hover:shadow-xl transition-all duration-300',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300',
          accent: 'text-blue-400/90',
          text: 'text-white',
          textCard: 'text-white',
          background: 'glass-aurora-background',
          cardBorder: 'border-white/20',
          cardShadow: 'shadow-lg backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-white/10 border-white/20 shadow-lg',
          abstractOrbs: true
        }
      case 'glass-nebula':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg hover:shadow-xl transition-all duration-300',
          secondary: 'bg-slate-400/25 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300',
          accent: 'text-rose-600/80',
          text: 'text-slate-800',
          textCard: 'text-rose-600/80',
          background: 'glass-nebula-background',
          cardBorder: 'border-white/20',
          cardShadow: 'shadow-lg backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-slate-500/10 border-white/20 shadow-lg',
          abstractOrbs: true
        }
      case 'glass-cosmic':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg hover:shadow-xl transition-all duration-300',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300',
          accent: 'text-fuchsia-400',
          text: 'text-white',
          textCard: 'text-white',
          background: 'glass-cosmic-background',
          cardBorder: 'fuchsia-400',
          cardShadow: 'shadow-lg backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-white/10 border-white/20 shadow-lg',
          abstractOrbs: true
        }
      case 'glass':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg hover:shadow-xl transition-all duration-300',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300',
          accent: 'text-blue-300',
          text: 'text-white',
          textCard: 'text-white',
          background: 'glass-aurora-background',
          cardBorder: 'border-white/20',
          cardShadow: 'shadow-lg backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-white/10 border-white/20 shadow-lg',
          abstractOrbs: true
        }

      // PREMIUM PRISME THEMES - Modern backgrounds with sophisticated effects
      case 'prisme-dark':
        return {
          primary: 'bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white shadow-xl hover:shadow-2xl transition-all duration-300',
          secondary: 'bg-white/15 backdrop-blur-md border border-white/25 shadow-xl hover:shadow-2xl transition-all duration-300',
          accent: 'text-emerald-300/90',
          text: 'text-white',
          textCard: 'text-white',
          background: 'prisme-dark-background',
          cardBorder: 'border-white/35',
          cardShadow: 'shadow-xl backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-white/15 border-white/25 shadow-xl',
          prismeTheme: true
        }
      case 'prisme-grey':
        return {
          primary: 'bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-md border border-slate-600/50 text-white shadow-xl hover:shadow-2xl transition-all duration-300',
          secondary: 'bg-slate-500/30 backdrop-blur-md border border-slate-600/40 shadow-xl hover:shadow-2xl transition-all duration-300',
          accent: 'text-amber-400',
          text: 'text-slate-100',
          textCard: 'text-slate-100',
          background: 'prisme-grey-background',
          cardBorder: 'border-slate-600/40',
          cardShadow: 'shadow-xl backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-slate-800/70 border-slate-600/40 shadow-xl',
          prismeTheme: true
        }

      default:
        return {
          primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
          secondary: 'bg-white border border-slate-200 shadow-sm',
          accent: 'text-blue-600',
          text: 'text-slate-900',
          textCard: 'text-slate-900',
          background: 'from-slate-50 to-white',
          cardBorder: 'border-slate-200',
          cardShadow: 'shadow-sm'
        }
    }
  }

  const getLayoutStyles = (layoutStyle: string) => {
    switch (layoutStyle) {
      case 'creative':
        return {
          container: 'max-w-3xl',
          linkCard: 'transform hover:scale-110 transition-all duration-500 border-l-8 hover:rotate-2 hover:shadow-2xl relative overflow-hidden',
          profileCard: 'transform rotate-1 hover:rotate-0 transition-transform duration-300 hover:shadow-xl',
          spacing: 'space-y-8',
          headerExtra: 'relative overflow-hidden',
          cardPattern: 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000',
          skillsPattern: 'hover:rotate-6 hover:scale-125 hover:shadow-lg',
          headerTilt: 'transform hover:-rotate-1 transition-transform duration-300'
        }
      case 'professional':
        return {
          container: 'max-w-5xl',
          linkCard: 'border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-fuchsia-500 dark:hover:border-fuchsia-500 transition-all duration-300',
          profileCard: 'shadow-lg border-slate-200 dark:border-slate-700',
          spacing: 'space-y-6',
          headerExtra: 'bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-inner',
          skillsPattern: 'hover:shadow-md hover:scale-105',
          headerTilt: ''
        }
      case 'minimal':
        return {
          container: 'max-w-md',
          linkCard: 'border-0 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 rounded-2xl backdrop-blur-sm transition-all duration-200',
          profileCard: 'border-0 bg-transparent',
          spacing: 'space-y-4',
          headerExtra: 'backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 rounded-full p-6',
          skillsPattern: 'hover:scale-105',
          headerTilt: ''
        }
      default: // modern
        return {
          container: 'max-w-2xl',
          linkCard: 'hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border-l-4 border-l-transparent hover:border-l-fuchsia-500 bg-gradient-to-r hover:from-fuchsia-50 hover:to-purple-50 dark:hover:from-slate-800 dark:hover:to-slate-700',
          profileCard: 'hover:shadow-lg transition-all duration-300',
          spacing: 'space-y-5',
          headerExtra: '',
          skillsPattern: 'hover:scale-110 hover:-translate-y-1',
          headerTilt: ''
        }
    }
  }

  const colors = getThemeColors(user.colorTheme || 'default')
  const layout = getLayoutStyles(user.layoutStyle || 'modern')
  
  // Debug: display the theme used
  console.log('Theme used:', user.colorTheme, 'Colors:', colors)
  
  // Detection of glass and prisme themes for text in cards
  const isGlassTheme = ['glass', 'glass-aurora', 'glass-nebula', 'glass-cosmic'].includes(user.colorTheme)
  const isPrismeTheme = ['prisme-dark', 'prisme-grey'].includes(user.colorTheme)
  const isDarkTheme = ['midnight'].includes(user.colorTheme)
  const isGlassLikeTheme = isGlassTheme || isPrismeTheme || isDarkTheme
  const isGradientTheme = false // No gradient themes in the new design

  const platforms = [
    { key: 'portfolioWebsite', name: 'Portfolio', icon: Globe, url: user.portfolioWebsite, color: 'bg-gradient-to-r from-blue-500 to-purple-600' },
    { key: 'githubProfile', name: 'GitHub', icon: SiGithub, url: user.githubProfile, color: 'bg-slate-800 hover:bg-slate-900' },
    { key: 'linkedin', name: 'LinkedIn', icon: SiLinkedin, url: user.linkedin, color: 'bg-[#0077B5] hover:bg-[#005885]' },
    { key: 'upworkProfile', name: 'Upwork', icon: SiUpwork, url: user.upworkProfile, color: 'bg-[#6fda44] hover:bg-[#5bc73a]' },
    { key: 'fiverProfile', name: 'Fiverr', icon: SiFiverr, url: user.fiverProfile, color: 'bg-[#00b22d] hover:bg-[#009926]' },
    { key: 'freelancerProfile', name: 'Freelancer', icon: SiFreelancer, url: user.freelancerProfile, color: 'bg-[#29b2fe] hover:bg-[#1a9de8]' },
    { key: 'maltProfile', name: 'Malt', icon: SiMalt, url: user.maltProfile, color: 'bg-[#fc5757] hover:bg-[#f43f3f]' },
    { key: 'behance', name: 'Behance', icon: SiBehance, url: user.behance, color: 'bg-[#1769ff] hover:bg-[#0056e0]' },
    { key: 'dribbble', name: 'Dribbble', icon: SiDribbble, url: user.dribbble, color: 'bg-[#ea4c89] hover:bg-[#e73370]' },
  ].filter(platform => platform.url)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.name}'s Profile`,
          text: `Discover ${user.name}'s freelance profile`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Sharing failed:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  // Track profile view when component mounts
  useEffect(() => {
    const trackProfileView = async () => {
      try {
        await fetch('/api/track-profile-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id
          })
        })
      } catch (error) {
        console.error('Failed to track profile view:', error)
      }
    }

    trackProfileView()
  }, [user.id])

  // Function to track link clicks
  const trackLinkClick = async (linkType: string, linkUrl: string) => {
    try {
      await fetch('/api/track-link-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          linkType,
          linkUrl
        })
      })
    } catch (error) {
      console.error('Failed to track link click:', error)
    }
  }



  return (
    <div className={`min-h-screen ${colors.abstractOrbs || colors.darkBackground || colors.prismeTheme ? colors.background : colors.background ? `bg-gradient-to-br ${colors.background}` : 'bg-white'} ${colors.text} relative overflow-hidden`}>
      {/* Glass theme background overlay */}
      {colors.abstractOrbs && (
        <div className={`absolute inset-0 z-0 ${
          user.colorTheme === 'glass-nebula' ? 'bg-black/10' : 
          user.colorTheme === 'glass-cosmic' ? 'bg-black/25' : 
          'bg-black/30'
        }`}></div>
      )}
      
      {/* Dark theme background overlay */}
      {colors.darkBackground && (
        <div className="absolute inset-0 bg-black/20 z-0"></div>
      )}
      
      {/* Prisme theme background overlay */}
      {colors.prismeTheme && (
        <div className={`absolute inset-0 z-0 ${
          user.colorTheme === 'prisme-dark' ? 'bg-black/40' : 
          'bg-black/30'
        }`}></div>
      )}


      <div className={`container mx-auto px-4 py-8 ${layout.container} relative z-10`}>
        <div>
        {/* Profile Header */}
        <div className={`relative z-10 text-center space-y-6 mt-16 animate-fade-in`}>
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 border-2 border-slate-50/70 dark:border-gray-800 shadow-xl transition-all duration-300 hover:scale-105">
              <AvatarImage src={user.photoUrl || undefined} alt={user.name} />
              <AvatarFallback className={`text-2xl font-bold ${colors.primary} text-white`}>
                {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className={`text-4xl font-medium bg-gradient-to-br from-gray-400 to-gray-200 text-transparent bg-clip-text `}>
                {user.name}
              </h1>
              {user.profession && (
                <p className={`text-2xl ${
                  isDarkTheme || isGlassLikeTheme ? colors.accent : 
                  user.colorTheme === 'default' ? 'text-blue-700' :
                  user.colorTheme === 'emerald' ? 'text-emerald-700' :
                  user.colorTheme === 'purple' ? 'text-purple-700' :
                  colors.accent
                }`}>
                  {user.profession}
                </p>
              )}
            </div>

            {user.bio && (
              <p className={`max-w-md font-light mx-auto ${colors.text} opacity-90`}>
                {user.bio}
              </p>
            )}

            <div className={`flex items-center justify-center space-x-4 text-sm ${
              isDarkTheme || isGlassLikeTheme ? 'text-slate-200' : 'text-slate-600'
            }`}>
              {user.age && (
                <div className="flex text-lg items-center space-x-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{user.age} years old</span>
                </div>
              )}
              <div className="flex items-center text-lg space-x-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Freelance</span>
              </div>
            </div>

            {/* Share Button */}
            <div className=' flex justify-center items-center gap-4'>
           <Link 
             href={`https://twitter.com/intent/tweet?url=`} 
             className={`mt-4 hover:scale-110 hover:text-blue-400 transition-all duration-300 `}
             onClick={(e) => {
               const currentUrl = window.location.href;
               const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
               trackLinkClick('twitter', twitterUrl);
               e.currentTarget.href = twitterUrl;
             }}
           >
            <CiTwitter className="w-10 h-10 " />
           
           </Link>
           <Link 
             href={`mailto:${user.email}`} 
             className={`mt-4 hover:scale-110 hover:text-blue-400 transition-all duration-300 `}
             onClick={() => trackLinkClick('email-share', `mailto:${user.email}`)}
           >
             <CiMail className="w-10 h-10 " />
           </Link>
          </div>
          </div>
        </div>
        
        {/* GitHub Calendar Section */}
        {user.githubCalendar && user.githubProfile && (
          <div className={`${layout.spacing} p-6 mt-12 rounded-2xl border transition-all duration-300 ${colors.secondary} ${colors.cardBorder} ${colors.cardShadow}`}>
            <GithubCaldnarIntegration 
              username={user.githubProfile.split('/').pop() || "da-delec"} 
              colorTheme={user.colorTheme}
            />
          </div>
        )}


        {/* Links Section */}
        {platforms.length > 0 && (
          <div className={`mt-8 ${layout.spacing} relative z-10`}>
            <h2 className={`text-xl font-semibold text-center mb-6 ${
              isDarkTheme || isGlassLikeTheme ? 'text-slate-100' : 'text-slate-900'
            }`}>
              My Links
            </h2>
            
            {platforms.map((platform) => {
              const Icon = platform.icon
              return (
                <Link
                  key={platform.key}
                  href={platform.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onClick={() => trackLinkClick(platform.key, platform.url!)}
                >
                  <Card className={`${layout.linkCard} ${colors.secondary} ${colors.cardBorder || ''} ${colors.cardShadow || ''} transition-all duration-200 hover:scale-[1.02] ${isGlassLikeTheme ? 'border-white/30 shadow-2xl backdrop-blur-lg' : ''}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white shadow-lg transition-all duration-200 ${isGlassLikeTheme ? 'shadow-white/20' : ''}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={`font-medium ${isGlassLikeTheme ? colors.textCard : colors.text}`}>
                            {platform.name}
                          </h3>
                          <p className={`text-sm truncate max-w-xs ${isGlassLikeTheme ? colors.textCard : colors.text} opacity-70`}>
                            {platform.url?.replace(/^https?:\/\//, '')}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className={`w-4 h-4 ${isGlassLikeTheme ? colors.textCard : colors.text} opacity-60`} />
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        {/* Skills Section */}
        {user.skills.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold text-center mb-6 ${
              isDarkTheme || isGlassLikeTheme ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Skills
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {user.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${colors.secondary} ${
                    isGlassLikeTheme ? colors.textCard : 
                    isDarkTheme ? 'text-slate-100 bg-slate-700/80 border-slate-600' :
                    colors.accent
                  } border px-4 py-2 text-sm ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassLikeTheme ? 'border-white/30 shadow-lg backdrop-blur-md' : ''} transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-default animate-fade-in`}
                  style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Production Projects Section */}
        {user.projects && user.projects.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold text-center mb-6 ${
              isDarkTheme || isGlassLikeTheme ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Production Projects
            </h2>
            
            <div className="grid gap-4">
              {user.projects.map((project) => (
                <Link
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLinkClick('project', project.url)}
                >
                  <Card className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer ${colors.secondary} ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassLikeTheme ? 'border-white/30 shadow-xl backdrop-blur-md' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Globe className={`w-4 h-4 ${
                              isGlassTheme 
                                ? 'text-white/70' 
                                : isDarkTheme
                                ? 'text-slate-300'
                                : 'text-slate-500'
                            }`} />
                            <h3 className={`font-medium ${
                              isGlassLikeTheme ? colors.textCard : colors.text
                            }`}>
                              {project.title}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${isGlassLikeTheme ? 'border-white/30 text-white/90 bg-white/10' : ' bg-blue-500 border-blue-200'}`}
                            >
                              In Production
                            </Badge>
                          </div>
                          
                          <p className={`text-sm mb-3 ${
                            isGlassTheme 
                              ? 'text-white/80 drop-shadow' 
                              : isDarkTheme
                              ? 'text-slate-200'
                              : colors.text + ' opacity-80'
                          }`}>
                            {project.description}
                          </p>
                          
                          {project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies.map((tech, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className={`text-xs border-blue-200/70 bg-gradient-to-br from-blue-500/50 to-purple-600/50 text-white`}
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <div className={`flex items-center space-x-2 text-xs ${
                            isGlassTheme 
                              ? 'text-white/70' 
                              : isDarkTheme
                              ? 'text-slate-300'
                              : 'text-slate-500'
                          }`}>
                            <ExternalLink className="w-3 h-3" />
                            <span>{project.url.replace(/^https?:\/\//, '')}</span>
                          </div>
                        </div>
                        
                        {(project.previewImage || project.previewUrl) && (
                          <div className="ml-4">
                            <img
                              src={project.previewImage || project.previewUrl!}
                              alt={project.title}
                              className="w-32 h-24 object-cover rounded border shadow-sm"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Projects Section */}
        {user.repositories.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold text-center mb-6 ${
              isDarkTheme || isGlassLikeTheme ? 'text-slate-100' : 'text-slate-900'
            }`}>
              GitHub Projects
            </h2>
            
            <div className="grid gap-4">
              {user.repositories.map((repo) => (
                <Link
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLinkClick('github', repo.url)}
                >
                  <Card className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer ${colors.secondary} ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassLikeTheme ? 'border-white/30 shadow-xl backdrop-blur-md' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <SiGithub className={`w-4 h-4 ${
                              isGlassTheme 
                                ? 'text-white/70' 
                                : isDarkTheme
                                ? 'text-slate-300'
                                : 'text-slate-500'
                            }`} />
                            <h3 className={`font-medium ${
                              isGlassLikeTheme ? colors.textCard : colors.text
                            }`}>
                              {repo.name}
                            </h3>
                            {repo.language && (
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  isGlassTheme 
                                    ? 'border-white/40 text-white/90 bg-white/10' 
                                    : isDarkTheme
                                    ? 'border-slate-500 text-slate-200 bg-slate-700/50'
                                    : ''
                                }`}
                              >
                                {repo.language}
                              </Badge>
                            )}
                          </div>
                          
                          {repo.description && (
                            <p className={`text-sm mb-3 ${
                              isGlassTheme 
                                ? colors.textCard + ' opacity-80' 
                                : isDarkTheme
                                ? 'text-slate-200 opacity-80'
                                : colors.text + ' opacity-80'
                            }`}>
                              {repo.description}
                            </p>
                          )}
                          
                          <div className={`flex items-center space-x-4 text-xs ${
                            isGlassTheme 
                              ? 'text-white/70' 
                              : isDarkTheme
                              ? 'text-slate-300'
                              : 'text-slate-500'
                          }`}>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{repo.stars}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitFork className="w-3 h-3" />
                              <span>{repo.forks}</span>
                            </div>
                          </div>
                        </div>
                        
                        {repo.imageUrl && (
                          <div className="ml-4">
                            <img
                              src={repo.imageUrl}
                              alt={repo.name}
                              className="w-16 h-12 object-cover rounded border"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section - Only when enabled by user */}
        {user.enableReviews && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold text-center mb-6 ${
              isDarkTheme || isGlassLikeTheme ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Client Reviews
            </h2>
            
            {reviewStats && (
              <ReviewMetrics 
                reviews={reviews} 
                statistics={reviewStats} 
                theme={{
                  colors,
                  colorTheme: user.colorTheme
                }}
              />
            )}
            
            <div className="mt-6 text-center">
              {showReviewForm ? (
                <div className="mt-6">
                  <ReviewForm 
                    userId={user.id} 
                    onReviewSubmitted={handleReviewSubmitted}
                    colorTheme={user.colorTheme}
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowReviewForm(false)}
                    className={`mt-4 ${
                      isDarkTheme 
                        ? 'border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-slate-100' 
                        : ''
                    }`}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowReviewForm(true)}
                  className={`${colors.primary} shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Leave a Review
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-8 text-center">
          <Card className={`${colors.secondary} border ${layout.profileCard} ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassLikeTheme ? 'border-white/30 shadow-xl backdrop-blur-md' : ''}`}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkTheme || isGlassLikeTheme ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Interested in my profile?
              </h3>
              <Button 
                asChild 
                size="lg"
                className={`${colors.primary} shadow-lg hover:shadow-xl transition-shadow`}
              >
                <Link 
                  href={`mailto:${user.email}`}
                  onClick={() => trackLinkClick('email', `mailto:${user.email}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Link>
              </Button>
              
              {/* Creative layout extra elements */}
              {user.layoutStyle === 'creative' && (
                <div className={`mt-4 h-1 w-16 mx-auto ${colors.primary} rounded-full`}></div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Profile created with <strong>LinkFaster</strong></p>
          <Link 
            href="/create-profil" 
            className={`${colors.accent} hover:underline font-medium`}
          >
            Create my profile for free
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default PublicProfile