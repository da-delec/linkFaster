'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
      console.error('Erreur lors du chargement des avis:', error)
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
      case 'emerald':
        return {
          primary: 'bg-emerald-600 hover:bg-emerald-700',
          secondary: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800',
          accent: 'text-emerald-600 dark:text-emerald-400',
          gradient: 'from-emerald-400 to-emerald-600',
          background: 'from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800'
        }
      case 'purple':
        return {
          primary: 'bg-purple-600 hover:bg-purple-700',
          secondary: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800',
          accent: 'text-purple-600 dark:text-purple-400',
          gradient: 'from-purple-400 to-purple-600',
          background: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800'
        }
      case 'amber':
        return {
          primary: 'bg-amber-600 hover:bg-amber-700',
          secondary: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800',
          accent: 'text-amber-600 dark:text-amber-400',
          gradient: 'from-amber-400 to-amber-600',
          background: 'from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800'
        }
      case 'rose':
        return {
          primary: 'bg-rose-600 hover:bg-rose-700',
          secondary: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800',
          accent: 'text-rose-600 dark:text-rose-400',
          gradient: 'from-rose-400 to-rose-600',
          background: 'from-rose-50 to-rose-100 dark:from-rose-900 dark:to-rose-800'
        }
      case 'gradient':
        return {
          primary: 'bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700',
          secondary: 'bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-indigo-950/20 dark:to-pink-950/20 border-indigo-200 dark:border-indigo-800',
          accent: 'text-indigo-600 dark:text-indigo-400',
          gradient: 'from-indigo-400 via-purple-500 to-pink-500',
          background: 'from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900'
        }
      case 'slate':
        return {
          primary: 'bg-slate-700 hover:bg-slate-800',
          secondary: 'bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700',
          accent: 'text-slate-700 dark:text-slate-300',
          gradient: 'from-slate-600 to-slate-800',
          background: 'from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800'
        }
      case 'teal':
        return {
          primary: 'bg-teal-600 hover:bg-teal-700',
          secondary: 'bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800',
          accent: 'text-teal-600 dark:text-teal-400',
          gradient: 'from-teal-400 to-teal-600',
          background: 'from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800'
        }
      case 'orange':
        return {
          primary: 'bg-orange-600 hover:bg-orange-700',
          secondary: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800',
          accent: 'text-orange-600 dark:text-orange-400',
          gradient: 'from-orange-400 to-orange-600',
          background: 'from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800'
        }
      case 'dark':
        return {
          primary: 'bg-gray-900 hover:bg-black',
          secondary: 'bg-gray-100 dark:bg-gray-950/80 border-gray-300 dark:border-gray-800',
          accent: 'text-gray-900 dark:text-gray-100',
          gradient: 'from-gray-700 to-gray-900',
          background: 'from-gray-200 to-gray-300 dark:from-gray-950 dark:to-gray-900'
        }
      // Thèmes sombres premium
      case 'midnight':
        return {
          primary: 'bg-slate-800 hover:bg-slate-900 border-blue-400/30',
          secondary: 'bg-slate-900/80 border-slate-700 border-blue-400/20',
          accent: 'text-blue-400',
          gradient: 'from-slate-700 to-slate-900',
          background: 'from-slate-900 to-black'
        }
      case 'obsidian':
        return {
          primary: 'bg-stone-900 hover:bg-black',
          secondary: 'bg-stone-900/60 border-stone-700',
          accent: 'text-purple-400',
          gradient: 'from-stone-800 to-stone-900',
          background: 'from-stone-900 to-black'
        }
      case 'void':
        return {
          primary: 'bg-black hover:bg-gray-900',
          secondary: 'bg-gray-900/40 border-gray-800',
          accent: 'text-cyan-400',
          gradient: 'from-gray-900 to-black',
          background: 'from-black to-gray-950'
        }
      case 'carbon':
        return {
          primary: 'bg-zinc-800 hover:bg-zinc-900 border-emerald-400/30',
          secondary: 'bg-zinc-900/60 border-zinc-700 border-emerald-400/20',
          accent: 'text-emerald-400',
          gradient: 'from-zinc-800 to-zinc-900',
          background: 'from-zinc-900 to-zinc-950'
        }

      // Thèmes glassmorphisme premium
      case 'glass-blue':
        return {
          primary: 'bg-blue-600/80 hover:bg-blue-700/80 backdrop-blur-sm border border-blue-500/30',
          secondary: 'bg-blue-50/20 backdrop-blur-sm border border-blue-200/30',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-blue-400/40 to-blue-600/40',
          background: 'from-blue-50/30 to-blue-100/30'
        }
      case 'glass-purple':
        return {
          primary: 'bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm border border-purple-500/30',
          secondary: 'bg-purple-50/20 backdrop-blur-sm border border-purple-200/30',
          accent: 'text-purple-600 dark:text-purple-400',
          gradient: 'from-purple-400/40 to-purple-600/40',
          background: 'from-purple-50/30 to-purple-100/30'
        }
      case 'glass-emerald':
        return {
          primary: 'bg-emerald-600/80 hover:bg-emerald-700/80 backdrop-blur-sm border border-emerald-500/30',
          secondary: 'bg-emerald-50/20 backdrop-blur-sm border border-emerald-200/30',
          accent: 'text-emerald-600 dark:text-emerald-400',
          gradient: 'from-emerald-400/40 to-emerald-600/40',
          background: 'from-emerald-50/30 to-emerald-100/30'
        }

      // Thèmes élégants premium
      case 'sunset':
        return {
          primary: 'bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600',
          secondary: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800',
          accent: 'text-orange-600 dark:text-orange-400',
          gradient: 'from-red-400 to-orange-500',
          background: 'from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-red-900'
        }
      case 'ocean':
        return {
          primary: 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600',
          secondary: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-blue-500 to-teal-500',
          background: 'from-blue-50 to-teal-50 dark:from-blue-900 dark:to-teal-900'
        }
      case 'forest':
        return {
          primary: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
          secondary: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800',
          accent: 'text-green-600 dark:text-green-400',
          gradient: 'from-green-600 to-emerald-600',
          background: 'from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900'
        }
      case 'aurora':
        return {
          primary: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500',
          secondary: 'bg-white/15 backdrop-blur-2xl border border-emerald-200/30 shadow-2xl shadow-emerald-500/20',
          accent: 'text-emerald-400',
          gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
          background: 'from-slate-950 via-gray-950 to-black'
        }
      case 'cosmic':
        return {
          primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600',
          secondary: 'bg-gradient-to-br from-indigo-900/40 via-purple-900/50 to-pink-900/40 backdrop-blur-xl border border-indigo-400/30 shadow-2xl shadow-purple-500/40',
          accent: 'text-indigo-400',
          gradient: 'from-indigo-500 via-purple-500 to-pink-500',
          background: 'from-indigo-950 via-purple-950 to-pink-950'
        }
      case 'tropical':
        return {
          primary: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600',
          secondary: 'bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl',
          accent: 'text-orange-600',
          gradient: 'from-orange-500 to-pink-500',
          background: 'from-orange-400 via-pink-500 to-red-500'
        }
      default:
        return {
          primary: 'bg-blue-600 hover:bg-blue-700',
          secondary: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-blue-400 to-blue-600',
          background: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800'
        }
    }
  }

  const getLayoutStyles = (layoutStyle: string) => {
    switch (layoutStyle) {
      case 'creative':
        return {
          container: 'max-w-3xl',
          linkCard: 'transform hover:scale-105 transition-all duration-300 border-l-8',
          profileCard: 'transform rotate-1 hover:rotate-0 transition-transform duration-300',
          spacing: 'space-y-6'
        }
      case 'professional':
        return {
          container: 'max-w-4xl',
          linkCard: 'border border-slate-200 dark:border-slate-700 hover:shadow-md',
          profileCard: '',
          spacing: 'space-y-4'
        }
      case 'minimal':
        return {
          container: 'max-w-lg',
          linkCard: 'border-0 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700',
          profileCard: 'border-0',
          spacing: 'space-y-3'
        }
      default: // modern
        return {
          container: 'max-w-2xl',
          linkCard: 'hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer border-l-4 border-l-transparent',
          profileCard: '',
          spacing: 'space-y-4'
        }
    }
  }

  const colors = getThemeColors(user.colorTheme)
  const layout = getLayoutStyles(user.layoutStyle)
  
  // Détecter les thèmes spéciaux
  const isGlassTheme = user.colorTheme?.startsWith('glass-') || ['aurora', 'cosmic', 'tropical'].includes(user.colorTheme)
  const isDarkTheme = ['midnight', 'obsidian', 'void', 'carbon', 'cosmic'].includes(user.colorTheme)
  const isElegantTheme = ['sunset', 'ocean', 'forest'].includes(user.colorTheme)
  const isGradientTheme = ['aurora', 'cosmic', 'tropical', 'sunset', 'ocean', 'forest'].includes(user.colorTheme)

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
          title: `Profil de ${user.name}`,
          text: `Découvrez le profil freelance de ${user.name}`,
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

  const getModernBackground = () => {
    if (!isGradientTheme) return null
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle animated gradient orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/25 to-cyan-400/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-bounce"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i * 8)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + (i % 3) * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  const getGlassBackground = () => {
    if (!isGlassTheme) return null
    
    switch (user.colorTheme) {
      case 'glass-blue':
        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/60 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500/55 rounded-full blur-3xl animate-bounce" style={{animationDuration: '4s'}}></div>
            <div className="absolute top-1/3 left-2/3 w-80 h-80 bg-sky-300/50 rounded-full blur-3xl animate-ping" style={{animationDuration: '6s'}}></div>
            <div className="absolute top-2/3 right-1/4 w-72 h-72 bg-blue-600/45 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
            <div className="absolute top-1/6 left-1/3 w-60 h-60 bg-cyan-400/50 rounded-full blur-3xl animate-bounce" style={{animationDuration: '7s', animationDelay: '1s'}}></div>
          </div>
        )
      case 'glass-purple':
        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[420px] h-[420px] bg-purple-400/55 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-pink-500/50 rounded-full blur-3xl animate-bounce" style={{animationDuration: '4.5s'}}></div>
            <div className="absolute top-1/4 right-1/2 w-80 h-80 bg-violet-300/45 rounded-full blur-3xl animate-ping" style={{animationDuration: '6.5s'}}></div>
            <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-fuchsia-400/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s', animationDuration: '5.5s'}}></div>
            <div className="absolute top-2/3 left-1/6 w-72 h-72 bg-purple-300/50 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s', animationDelay: '2.5s'}}></div>
          </div>
        )
      case 'glass-emerald':
        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-24 w-[450px] h-[450px] bg-emerald-400/55 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-teal-500/50 rounded-full blur-3xl animate-bounce" style={{animationDuration: '4.2s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-76 h-76 bg-green-300/45 rounded-full blur-3xl animate-ping" style={{animationDuration: '6.2s'}}></div>
            <div className="absolute bottom-1/3 left-1/3 w-84 h-84 bg-emerald-600/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.8s', animationDuration: '5.2s'}}></div>
            <div className="absolute top-1/2 right-1/6 w-68 h-68 bg-teal-400/50 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6.8s', animationDelay: '0.8s'}}></div>
          </div>
        )
      case 'aurora':
        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Aurora Borealis Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/90 to-gray-950"></div>
            
            {/* Waves of Aurora */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-0 w-full h-32 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent blur-xl animate-pulse opacity-70" style={{animationDuration: '4s'}}></div>
              <div className="absolute top-32 left-0 w-full h-24 bg-gradient-to-r from-transparent via-teal-300/40 to-transparent blur-lg animate-pulse opacity-80" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
              <div className="absolute top-52 left-0 w-full h-20 bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent blur-xl animate-pulse opacity-60" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
              <div className="absolute top-80 left-0 w-full h-28 bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent blur-2xl animate-pulse opacity-50" style={{animationDuration: '6s', animationDelay: '0.5s'}}></div>
              <div className="absolute top-96 left-0 w-full h-16 bg-gradient-to-r from-transparent via-teal-400/45 to-transparent blur-lg animate-pulse opacity-75" style={{animationDuration: '3.5s', animationDelay: '3s'}}></div>
            </div>
            
            {/* Dancing Particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-emerald-300 rounded-full opacity-60 animate-ping"
                  style={{
                    left: `${(i * 17 + 13) % 100}%`,
                    top: `${20 + ((i * 23 + 7) % 60)}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + (i % 3)}s`
                  }}
                />
              ))}
            </div>
          </div>
        )
      case 'cosmic':
        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Cosmic Background - much more visible */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
            
            {/* Animated cosmic energy waves */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent blur-2xl animate-pulse" style={{animationDuration: '4s', transform: 'rotate(45deg)'}}></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/25 to-transparent blur-2xl animate-pulse" style={{animationDuration: '6s', animationDelay: '2s', transform: 'rotate(-45deg)'}}></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-pink-500/20 to-transparent blur-2xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s', transform: 'rotate(90deg)'}}></div>
            </div>
            
            {/* Floating cosmic orbs */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-radial from-indigo-400/60 to-transparent rounded-full blur-xl animate-float" style={{animationDuration: '8s'}}></div>
              <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-radial from-purple-400/50 to-transparent rounded-full blur-lg animate-float" style={{animationDuration: '10s', animationDelay: '3s'}}></div>
              <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-radial from-pink-400/40 to-transparent rounded-full blur-md animate-float" style={{animationDuration: '7s', animationDelay: '5s'}}></div>
              <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-radial from-indigo-300/50 to-transparent rounded-full blur-sm animate-float" style={{animationDuration: '9s', animationDelay: '1s'}}></div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${isGlassTheme ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900' : `bg-gradient-to-br ${colors.background}`} ${isDarkTheme ? 'text-white' : ''}`}>
      {getModernBackground()}
      {getGlassBackground()}
      {/* Background Image */}
      {user.backgroundImage && (
        <div 
          className="h-64 sm:h-80 lg:h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${user.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      <div className={`container mx-auto px-4 py-8 ${layout.container} ${isGlassTheme ? 'relative' : ''}`}>
        {isGlassTheme && !['aurora', 'cosmic'].includes(user.colorTheme) && (
          <div className="absolute inset-4 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 rounded-2xl border border-white/20"></div>
        )}
        {/* Modern gradient themes glass overlay - skip for aurora/cosmic as they have their own backgrounds */}
        {isGradientTheme && !['aurora', 'cosmic'].includes(user.colorTheme) && (
          <div className="absolute inset-4 backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-3xl border border-white/20 shadow-2xl">
          </div>
        )}
        <div className={`${(isGlassTheme || isGradientTheme) && !['aurora', 'cosmic'].includes(user.colorTheme) ? 'relative z-10' : ''}`}>
        {/* Profile Header */}
        <div className={`${user.backgroundImage ? '-mt-24 sm:-mt-32 lg:-mt-40' : ''} relative z-10 text-center space-y-6`}>
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl">
              <AvatarImage src={user.photoUrl || undefined} alt={user.name} />
              <AvatarFallback className={`text-2xl font-bold ${colors.primary} text-white`}>
                {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className={`text-3xl font-bold ${
                ['aurora', 'cosmic'].includes(user.colorTheme) 
                  ? 'text-white drop-shadow-lg' 
                  : isDarkTheme 
                    ? 'text-white' 
                    : 'text-slate-900 dark:text-slate-100'
              }`}>
                {user.name}
              </h1>
              {user.profession && (
                <p className={`text-lg font-medium ${
                  ['aurora', 'cosmic'].includes(user.colorTheme) 
                    ? `${colors.accent} drop-shadow-md font-semibold` 
                    : colors.accent
                }`}>
                  {user.profession}
                </p>
              )}
            </div>

            {user.bio && (
              <p className={`max-w-md mx-auto ${
                ['aurora', 'cosmic'].includes(user.colorTheme) 
                  ? 'text-white/90 drop-shadow-md' 
                  : isDarkTheme 
                    ? 'text-gray-300' 
                    : 'text-slate-600 dark:text-slate-400'
              }`}>
                {user.bio}
              </p>
            )}

            <div className={`flex items-center justify-center space-x-4 text-sm ${
              ['aurora', 'cosmic'].includes(user.colorTheme) 
                ? 'text-white/80 drop-shadow' 
                : 'text-slate-500'
            }`}>
              {user.age && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{user.age} ans</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Freelance</span>
              </div>
            </div>

            {/* Share Button */}
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className={`mt-4 ${
                user.colorTheme === 'aurora'
                  ? 'border-emerald-400/80 text-white bg-emerald-500/20 hover:bg-emerald-500/30 hover:border-emerald-300 backdrop-blur-sm'
                  : user.colorTheme === 'cosmic'
                    ? 'border-indigo-400/80 text-white bg-indigo-500/20 hover:bg-indigo-500/30 hover:border-indigo-300 backdrop-blur-sm'
                    : user.colorTheme === 'midnight'
                      ? 'border-blue-400/60 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300'
                      : user.colorTheme === 'obsidian'
                        ? 'border-purple-400/60 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-300'
                        : user.colorTheme === 'void'
                          ? 'border-cyan-400/60 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300'
                          : user.colorTheme === 'carbon'
                            ? 'border-emerald-400/60 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-emerald-300'
                            : isDarkTheme 
                              ? 'border-violet-500/60 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 hover:text-violet-300' 
                              : isGradientTheme
                                ? 'border-blue-400/60 text-blue-600 hover:bg-blue-50 hover:border-blue-500'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager le profil
            </Button>
          </div>
        </div>


        {/* Links Section */}
        {platforms.length > 0 && (
          <div className={`mt-8 ${layout.spacing} relative z-10`}>
            <h2 className={`text-xl font-semibold text-center mb-6 ${
              ['aurora', 'cosmic'].includes(user.colorTheme) 
                ? 'text-white drop-shadow-lg' 
                : isDarkTheme 
                  ? 'text-white' 
                  : 'text-slate-900 dark:text-slate-100'
            }`}>
              Mes liens
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
                >
                  <Card className={`${layout.linkCard} ${
                    user.colorTheme === 'aurora'
                      ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl'
                      : user.colorTheme === 'cosmic'
                        ? colors.secondary
                        : colors.secondary
                  } ${isGlassTheme ? 'backdrop-blur-md' : ''} hover:border-l-4 ${user.colorTheme === 'gradient' ? 'hover:border-l-purple-500' : `hover:border-l-${user.colorTheme === 'default' ? 'blue' : user.colorTheme}-500`} ${isDarkTheme ? 'bg-gray-800/60 border-gray-700' : ''}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white shadow-lg transition-all duration-200`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={`font-medium ${
                            ['aurora', 'cosmic'].includes(user.colorTheme) 
                              ? 'text-white drop-shadow-md' 
                              : isDarkTheme 
                                ? 'text-white' 
                                : 'text-slate-900 dark:text-slate-100'
                          }`}>
                            {platform.name}
                          </h3>
                          <p className={`text-sm truncate max-w-xs ${
                            ['aurora', 'cosmic'].includes(user.colorTheme) 
                              ? 'text-white/80 drop-shadow' 
                              : isDarkTheme 
                                ? 'text-gray-400' 
                                : 'text-slate-500'
                          }`}>
                            {platform.url?.replace(/^https?:\/\//, '')}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className={`w-4 h-4 ${
                        ['aurora', 'cosmic'].includes(user.colorTheme) 
                          ? 'text-white/70' 
                          : 'text-slate-400'
                      }`} />
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
              ['aurora', 'cosmic'].includes(user.colorTheme) 
                ? 'text-white drop-shadow-lg' 
                : isDarkTheme 
                  ? 'text-white' 
                  : 'text-slate-900 dark:text-slate-100'
            }`}>
              Compétences
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {user.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${
                    user.colorTheme === 'aurora'
                      ? 'bg-white/15 backdrop-blur-xl border-white/30 text-white drop-shadow-md'
                      : user.colorTheme === 'cosmic'
                        ? 'bg-gradient-to-br from-indigo-800/40 via-purple-800/50 to-pink-800/40 backdrop-blur-xl border-indigo-400/30 text-white drop-shadow-md'
                        : colors.secondary
                  } ${colors.accent} border px-4 py-2 text-sm ${
                    isDarkTheme 
                        ? 'bg-gray-800/60 border-gray-700 text-gray-300' 
                        : ''
                  } ${isGlassTheme ? 'backdrop-blur-sm' : ''}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {user.repositories.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold text-center mb-6 ${
              ['aurora', 'cosmic'].includes(user.colorTheme) 
                ? 'text-white drop-shadow-lg' 
                : isDarkTheme 
                  ? 'text-white' 
                  : 'text-slate-900 dark:text-slate-100'
            }`}>
              Projets en vedette
            </h2>
            
            <div className="grid gap-4">
              {user.repositories.map((repo) => (
                <Link
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                    user.colorTheme === 'aurora'
                      ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl'
                      : user.colorTheme === 'cosmic'
                        ? colors.secondary
                        : colors.secondary
                  } ${
                    isDarkTheme 
                        ? 'bg-gray-800/60 border-gray-700' 
                        : ''
                  } ${isGlassTheme ? 'backdrop-blur-md' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <SiGithub className={`w-4 h-4 ${
                              ['aurora', 'cosmic'].includes(user.colorTheme) 
                                ? 'text-white/70' 
                                : 'text-slate-500'
                            }`} />
                            <h3 className={`font-medium ${
                              ['aurora', 'cosmic'].includes(user.colorTheme) 
                                ? 'text-white drop-shadow-md' 
                                : isDarkTheme 
                                  ? 'text-white' 
                                  : 'text-slate-900 dark:text-slate-100'
                            }`}>
                              {repo.name}
                            </h3>
                            {repo.language && (
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  ['aurora', 'cosmic'].includes(user.colorTheme) 
                                    ? 'border-white/40 text-white/90 bg-white/10' 
                                    : ''
                                }`}
                              >
                                {repo.language}
                              </Badge>
                            )}
                          </div>
                          
                          {repo.description && (
                            <p className={`text-sm mb-3 ${
                              ['aurora', 'cosmic'].includes(user.colorTheme) 
                                ? 'text-white/80 drop-shadow' 
                                : isDarkTheme 
                                  ? 'text-gray-400' 
                                  : 'text-slate-600 dark:text-slate-400'
                            }`}>
                              {repo.description}
                            </p>
                          )}
                          
                          <div className={`flex items-center space-x-4 text-xs ${
                            ['aurora', 'cosmic'].includes(user.colorTheme) 
                              ? 'text-white/70' 
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
              ['aurora', 'cosmic'].includes(user.colorTheme) 
                ? 'text-white drop-shadow-lg' 
                : isDarkTheme 
                  ? 'text-white' 
                  : 'text-slate-900 dark:text-slate-100'
            }`}>
              Avis clients
            </h2>
            
            {reviewStats && (
              <ReviewMetrics 
                reviews={reviews} 
                statistics={reviewStats} 
                theme={{
                  colors,
                  isDarkTheme,
                  isGlassTheme,
                  isGradientTheme,
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
                    isDarkTheme={isDarkTheme}
                    isGlassTheme={isGlassTheme}
                    isGradientTheme={isGradientTheme}
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowReviewForm(false)}
                    className={`mt-4 ${
                      ['aurora', 'cosmic'].includes(user.colorTheme) 
                        ? 'border-white/50 text-white/80 hover:bg-white/10 hover:border-white/70 backdrop-blur-sm' 
                        : ''
                    }`}
                  >
                    Annuler
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowReviewForm(true)}
                  className={`${
                    ['aurora', 'cosmic'].includes(user.colorTheme) 
                      ? `${colors.primary} shadow-2xl hover:shadow-3xl transition-shadow backdrop-blur-sm` 
                      : `${colors.primary} shadow-lg hover:shadow-xl transition-shadow`
                  }`}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Laisser un avis
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-8 text-center">
          <Card className={`${colors.secondary} border ${layout.profileCard}`}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                Intéressé par mon profil ?
              </h3>
              <Button 
                asChild 
                size="lg"
                className={`${colors.primary} shadow-lg hover:shadow-xl transition-shadow`}
              >
                <Link href={`mailto:${user.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Me contacter
                </Link>
              </Button>
              
              {/* Creative layout extra elements */}
              {user.layoutStyle === 'creative' && (
                <div className={`mt-4 h-1 w-16 mx-auto bg-gradient-to-r ${colors.gradient} rounded-full`}></div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Profil créé avec <strong>LinkFaster</strong></p>
          <Link 
            href="/create-profil" 
            className={`${colors.accent} hover:underline font-medium`}
          >
            Créer mon profil gratuitement
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default PublicProfile