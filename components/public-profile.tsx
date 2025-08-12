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
  projects: Array<{
    id: string
    title: string
    description: string
    url: string
    previewUrl: string | null
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
      // 3 THÈMES GRATUITS - Design Apple, simple et sobre
      case 'default':
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

      // 1 THÈME SOMBRE PREMIUM - Design Apple sombre
      case 'midnight':
        return {
          primary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm',
          secondary: 'bg-slate-800 border border-slate-700 shadow-sm',
          accent: 'text-slate-300',
          text: 'text-slate-100',
          textCard: 'text-slate-100',
          background: 'from-slate-900 to-slate-800',
          cardBorder: 'border-slate-700',
          cardShadow: 'shadow-sm'
        }

      // 1 THÈME GLASSMORPHISME PREMIUM - Design Apple moderne avec orbes abstraites
      case 'glass':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg hover:shadow-xl transition-all duration-300',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300',
          accent: 'text-blue-300',
          text: 'text-white',
          textCard: 'text-white',
          background: 'from-slate-900 via-slate-800 to-slate-900',
          cardBorder: 'border-white/20',
          cardShadow: 'shadow-lg backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-white/10 border-white/20 shadow-lg',
          abstractOrbs: true
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
  
  // Détection des thèmes glass pour le texte dans les cards
  const isGlassTheme = ['glass'].includes(user.colorTheme)
  const isDarkTheme = ['midnight'].includes(user.colorTheme)
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



  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.background} ${colors.text} relative overflow-hidden`}>
      {/* Orbes abstraites pour le thème glass */}
      {colors.abstractOrbs && (
        <>
          {/* Orbe bleue floutée */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          {/* Orbe indigo floutée */}
          <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-400/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
          {/* Orbe cyan floutée */}
          <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-cyan-300/35 rounded-full blur-3xl animate-pulse delay-500"></div>
        </>
      )}

      {/* Background Image */}
      {user.backgroundImage && (
        <div 
          className="h-64 sm:h-80 lg:h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${user.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      <div className={`container mx-auto px-4 py-8 ${layout.container}`}>
        <div>
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
              <h1 className={`text-3xl font-bold ${colors.text}`}>
                {user.name}
              </h1>
              {user.profession && (
                <p className={`text-lg font-medium ${colors.accent}`}>
                  {user.profession}
                </p>
              )}
            </div>

            {user.bio && (
              <p className={`max-w-md mx-auto ${colors.text} opacity-80`}>
                {user.bio}
              </p>
            )}

            <div className={`flex items-center justify-center space-x-4 text-sm text-slate-500`}>
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
              className={`mt-4 border ${colors.accent} hover:bg-white/10`}
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
              isDarkTheme ? 'text-slate-100' : colors.text
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
                  <Card className={`${layout.linkCard} ${colors.secondary} ${colors.cardBorder || ''} ${colors.cardShadow || ''} transition-all duration-300 hover:scale-[1.02] ${isGlassTheme ? 'border-white/30 shadow-xl backdrop-blur-md' : ''}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white shadow-lg transition-all duration-200 ${isGlassTheme ? 'shadow-white/20' : ''}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={`font-medium ${isGlassTheme ? colors.textCard : colors.text}`}>
                            {platform.name}
                          </h3>
                          <p className={`text-sm truncate max-w-xs ${isGlassTheme ? colors.textCard : colors.text} opacity-70`}>
                            {platform.url?.replace(/^https?:\/\//, '')}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className={`w-4 h-4 ${isGlassTheme ? colors.textCard : colors.text} opacity-60`} />
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
              isDarkTheme ? 'text-slate-100' : colors.text
            }`}>
              Compétences
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {user.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${colors.secondary} ${
                    isGlassTheme ? colors.textCard : 
                    isDarkTheme ? 'text-slate-100 bg-slate-700/80 border-slate-600' :
                    colors.accent
                  } border px-4 py-2 text-sm ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassTheme ? 'border-white/30 shadow-lg backdrop-blur-md' : ''}`}
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
              isDarkTheme ? 'text-slate-100' : colors.text
            }`}>
              Projets en production
            </h2>
            
            <div className="grid gap-4">
              {user.projects.map((project) => (
                <Link
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer ${colors.secondary} ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassTheme ? 'border-white/30 shadow-xl backdrop-blur-md' : ''}`}>
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
                              isGlassTheme ? colors.textCard : colors.text
                            }`}>
                              {project.title}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${isGlassTheme ? 'border-white/30 text-white/90 bg-white/10' : ''}`}
                            >
                              En production
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
                                  className={`text-xs ${colors.secondary} ${colors.cardBorder || ''}`}
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
                        
                        {project.previewUrl && (
                          <div className="ml-4">
                            <img
                              src={project.previewUrl}
                              alt={project.title}
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

        {/* GitHub Projects Section */}
        {user.repositories.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold text-center mb-6 ${
              isDarkTheme ? 'text-slate-100' : colors.text
            }`}>
              Projets GitHub
            </h2>
            
            <div className="grid gap-4">
              {user.repositories.map((repo) => (
                <Link
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer ${colors.secondary} ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassTheme ? 'border-white/30 shadow-xl backdrop-blur-md' : ''}`}>
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
                              isGlassTheme ? colors.textCard : colors.text
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
              isDarkTheme ? 'text-slate-100' : colors.text
            }`}>
              Avis clients
            </h2>
            
            {reviewStats && (
              <ReviewMetrics 
                reviews={reviews} 
                statistics={reviewStats} 
                theme={{
                  colors,
                  colorTheme: user.colorTheme,
                  isDarkTheme,
                  isGlassTheme
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
                    Annuler
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowReviewForm(true)}
                  className={`${colors.primary} shadow-lg hover:shadow-xl transition-shadow`}
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
          <Card className={`${colors.secondary} border ${layout.profileCard} ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassTheme ? 'border-white/30 shadow-xl backdrop-blur-md' : ''}`}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${colors.text}`}>
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
                <div className={`mt-4 h-1 w-16 mx-auto ${colors.primary} rounded-full`}></div>
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