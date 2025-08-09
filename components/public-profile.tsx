'use client'

import React from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ExternalLink, 
  Github, 
  Globe, 
  MapPin,
  Calendar,
  Star,
  GitFork,
  Briefcase,
  Mail,
  Share2
} from 'lucide-react'

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
  skills: Array<{
    id: string
    name: string
    category: string | null
    level: string
  }>
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

interface PublicProfileProps {
  user: User
}

const PublicProfile: React.FC<PublicProfileProps> = ({ user }) => {
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

  const platforms = [
    { key: 'portfolioWebsite', name: 'Portfolio', icon: Globe, url: user.portfolioWebsite },
    { key: 'githubProfile', name: 'GitHub', icon: Github, url: user.githubProfile },
    { key: 'linkedin', name: 'LinkedIn', icon: Briefcase, url: user.linkedin },
    { key: 'upworkProfile', name: 'Upwork', icon: Briefcase, url: user.upworkProfile },
    { key: 'fiverProfile', name: 'Fiverr', icon: Star, url: user.fiverProfile },
    { key: 'freelancerProfile', name: 'Freelancer', icon: Briefcase, url: user.freelancerProfile },
    { key: 'maltProfile', name: 'Malt', icon: Briefcase, url: user.maltProfile },
    { key: 'behance', name: 'Behance', icon: ExternalLink, url: user.behance },
    { key: 'dribbble', name: 'Dribbble', icon: ExternalLink, url: user.dribbble },
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
    <div className={`min-h-screen bg-gradient-to-br ${colors.background}`}>
      {/* Background Image */}
      {user.backgroundImage && (
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${user.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      <div className={`container mx-auto px-4 py-8 ${layout.container}`}>
        {/* Profile Header */}
        <div className={`${user.backgroundImage ? '-mt-24' : ''} relative z-10 text-center space-y-6`}>
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
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {user.name}
              </h1>
              {user.profession && (
                <p className={`text-lg font-medium ${colors.accent}`}>
                  {user.profession}
                </p>
              )}
            </div>

            {user.bio && (
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {user.bio}
              </p>
            )}

            <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
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
              className="mt-4"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager le profil
            </Button>
          </div>
        </div>

        {/* Links Section */}
        {platforms.length > 0 && (
          <div className={`mt-8 ${layout.spacing}`}>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 text-center mb-6">
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
                  <Card className={`${layout.linkCard} hover:border-l-4 ${user.colorTheme === 'gradient' ? 'hover:border-l-purple-500' : `hover:border-l-${user.colorTheme === 'default' ? 'blue' : user.colorTheme}-500`}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${colors.primary} flex items-center justify-center text-white`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900 dark:text-slate-100">
                            {platform.name}
                          </h3>
                          <p className="text-sm text-slate-500 truncate max-w-xs">
                            {platform.url?.replace(/^https?:\/\//, '')}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
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
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 text-center mb-6">
              Compétences
            </h2>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {user.skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className={`${colors.secondary} ${colors.accent} border`}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {user.repositories.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 text-center mb-6">
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
                  <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Github className="w-4 h-4 text-slate-500" />
                            <h3 className="font-medium text-slate-900 dark:text-slate-100">
                              {repo.name}
                            </h3>
                            {repo.language && (
                              <Badge variant="outline" className="text-xs">
                                {repo.language}
                              </Badge>
                            )}
                          </div>
                          
                          {repo.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                              {repo.description}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
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

        {/* Contact Section */}
        <div className="mt-8 text-center">
          <Card className={`${colors.secondary} border ${layout.profileCard}`}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
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
          <p>Profil créé avec <strong>CraftLink</strong></p>
          <Link 
            href="/create-profil" 
            className={`${colors.accent} hover:underline font-medium`}
          >
            Créer mon profil gratuitement
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PublicProfile