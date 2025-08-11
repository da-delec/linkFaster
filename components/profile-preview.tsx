'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ExternalLink, 
  Github, 
  Globe, 
  Briefcase,
  Mail,
  Star
} from 'lucide-react'

interface ProfilePreviewProps {
  formData: {
    firstName: string
    lastName: string
    profession: string
    bio: string
    skills: string[]
    portfolioWebsite: string
    githubProfile: string
    linkedin: string
    colorTheme: string
    layoutStyle: string
  }
  photoPreview?: string
  backgroundPreview?: string
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ 
  formData, 
  photoPreview, 
  backgroundPreview 
}) => {
  const getThemeColors = (theme: string) => {
    switch (theme) {
      // Thèmes gratuits
      case 'emerald':
        return {
          primary: 'bg-emerald-600 hover:bg-emerald-700',
          secondary: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800',
          accent: 'text-emerald-600 dark:text-emerald-400',
          gradient: 'from-emerald-400 to-emerald-600',
          background: 'from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800',
          special: ''
        }
      case 'slate':
        return {
          primary: 'bg-slate-700 hover:bg-slate-800',
          secondary: 'bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700',
          accent: 'text-slate-700 dark:text-slate-300',
          gradient: 'from-slate-600 to-slate-800',
          background: 'from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800',
          special: ''
        }
      case 'teal':
        return {
          primary: 'bg-teal-600 hover:bg-teal-700',
          secondary: 'bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800',
          accent: 'text-teal-600 dark:text-teal-400',
          gradient: 'from-teal-400 to-teal-600',
          background: 'from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800',
          special: ''
        }

      // Thèmes sombres premium
      case 'midnight':
        return {
          primary: 'bg-slate-800 hover:bg-slate-900',
          secondary: 'bg-slate-900/80 border-slate-700',
          accent: 'text-slate-300',
          gradient: 'from-slate-700 to-slate-900',
          background: 'from-slate-900 to-black',
          special: 'dark-theme'
        }
      case 'obsidian':
        return {
          primary: 'bg-stone-900 hover:bg-black',
          secondary: 'bg-stone-900/60 border-stone-700',
          accent: 'text-purple-400',
          gradient: 'from-stone-800 to-stone-900',
          background: 'from-stone-900 to-black',
          special: 'dark-theme'
        }
      case 'void':
        return {
          primary: 'bg-black hover:bg-gray-900',
          secondary: 'bg-gray-900/40 border-gray-800',
          accent: 'text-cyan-400',
          gradient: 'from-gray-900 to-black',
          background: 'from-black to-gray-950',
          special: 'dark-theme'
        }
      case 'carbon':
        return {
          primary: 'bg-zinc-800 hover:bg-zinc-900',
          secondary: 'bg-zinc-900/60 border-zinc-700',
          accent: 'text-zinc-300',
          gradient: 'from-zinc-800 to-zinc-900',
          background: 'from-zinc-900 to-zinc-950',
          special: 'dark-theme'
        }

      // Thèmes glassmorphisme premium
      case 'glass-blue':
        return {
          primary: 'bg-blue-600/80 hover:bg-blue-700/80 backdrop-blur-sm border border-blue-500/30',
          secondary: 'bg-white/20 backdrop-blur-md border border-white/30',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-blue-400/40 to-blue-600/40',
          background: 'glass-blue-bg',
          special: 'glass'
        }
      case 'glass-purple':
        return {
          primary: 'bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm border border-purple-500/30',
          secondary: 'bg-white/20 backdrop-blur-md border border-white/30',
          accent: 'text-purple-600 dark:text-purple-400',
          gradient: 'from-purple-400/40 to-purple-600/40',
          background: 'glass-purple-bg',
          special: 'glass'
        }
      case 'glass-emerald':
        return {
          primary: 'bg-emerald-600/80 hover:bg-emerald-700/80 backdrop-blur-sm border border-emerald-500/30',
          secondary: 'bg-white/20 backdrop-blur-md border border-white/30',
          accent: 'text-emerald-600 dark:text-emerald-400',
          gradient: 'from-emerald-400/40 to-emerald-600/40',
          background: 'glass-emerald-bg',
          special: 'glass'
        }

      // Thèmes élégants premium
      case 'sunset':
        return {
          primary: 'bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600',
          secondary: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800',
          accent: 'text-orange-600 dark:text-orange-400',
          gradient: 'from-red-400 to-orange-500',
          background: 'from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-red-900',
          special: ''
        }
      case 'ocean':
        return {
          primary: 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600',
          secondary: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-blue-500 to-teal-500',
          background: 'from-blue-50 to-teal-50 dark:from-blue-900 dark:to-teal-900',
          special: ''
        }
      case 'forest':
        return {
          primary: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
          secondary: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800',
          accent: 'text-green-600 dark:text-green-400',
          gradient: 'from-green-600 to-emerald-600',
          background: 'from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900',
          special: ''
        }

      // Thèmes classiques premium
      case 'purple':
        return {
          primary: 'bg-purple-600 hover:bg-purple-700',
          secondary: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800',
          accent: 'text-purple-600 dark:text-purple-400',
          gradient: 'from-purple-400 to-purple-600',
          background: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800',
          special: ''
        }
      case 'rose':
        return {
          primary: 'bg-rose-600 hover:bg-rose-700',
          secondary: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800',
          accent: 'text-rose-600 dark:text-rose-400',
          gradient: 'from-rose-400 to-rose-600',
          background: 'from-rose-50 to-rose-100 dark:from-rose-900 dark:to-rose-800',
          special: ''
        }

      default:
        return {
          primary: 'bg-blue-600 hover:bg-blue-700',
          secondary: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
          accent: 'text-blue-600 dark:text-blue-400',
          gradient: 'from-blue-400 to-blue-600',
          background: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800',
          special: ''
        }
    }
  }

  const getLayoutStyles = (layoutStyle: string) => {
    switch (layoutStyle) {
      case 'creative':
        return {
          container: 'max-w-lg',
          linkCard: 'transform hover:scale-105 transition-all duration-300 border-l-4',
          profileCard: 'transform rotate-1 hover:rotate-0 transition-transform duration-300',
          spacing: 'space-y-3'
        }
      case 'professional':
        return {
          container: 'max-w-md',
          linkCard: 'border border-slate-200 dark:border-slate-700 hover:shadow-md',
          profileCard: '',
          spacing: 'space-y-2'
        }
      case 'minimal':
        return {
          container: 'max-w-xs',
          linkCard: 'border-0 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700',
          profileCard: 'border-0',
          spacing: 'space-y-2'
        }
      default: // modern
        return {
          container: 'max-w-sm',
          linkCard: 'hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-l-2 border-l-transparent',
          profileCard: '',
          spacing: 'space-y-3'
        }
    }
  }

  const colors = getThemeColors(formData.colorTheme)
  const layout = getLayoutStyles(formData.layoutStyle)
  
  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Nom Prénom'
  const displayBio = formData.bio || 'Votre bio professionnelle apparaîtra ici...'
  const displayProfession = formData.profession || 'Votre profession'
  
  const platforms = [
    { name: 'Portfolio', icon: Globe, url: formData.portfolioWebsite },
    { name: 'GitHub', icon: Github, url: formData.githubProfile },
    { name: 'LinkedIn', icon: Briefcase, url: formData.linkedin }
  ].filter(platform => platform.url)

  const isGlassTheme = colors.special === 'glass'
  const isDarkTheme = colors.special === 'dark-theme'
  const isGradientBorder = colors.special?.includes('gradient-border')
  
  const getGlassBackground = () => {
    switch (formData.colorTheme) {
      case 'glass-blue':
        return (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute top-4 left-4 w-20 h-20 bg-blue-400/60 rounded-full blur-xl"></div>
            <div className="absolute bottom-6 right-6 w-16 h-16 bg-indigo-500/50 rounded-full blur-lg"></div>
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-sky-300/40 rounded-full blur-md transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )
      case 'glass-purple':
        return (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute top-4 right-4 w-18 h-18 bg-purple-400/60 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-6 w-14 h-14 bg-pink-500/50 rounded-full blur-lg"></div>
            <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-violet-300/40 rounded-full blur-md"></div>
          </div>
        )
      case 'glass-emerald':
        return (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute top-6 left-6 w-16 h-16 bg-emerald-400/60 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-4 w-20 h-20 bg-teal-500/50 rounded-full blur-lg"></div>
            <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-green-300/40 rounded-full blur-md"></div>
          </div>
        )
      default:
        return null
    }
  }
  
  return (
    <div className={`${layout.container} mx-auto`}>
      <div className={`
        ${isGlassTheme ? 'relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900' : `bg-gradient-to-br ${colors.background}`} 
        ${isDarkTheme ? 'text-white' : ''} 
        ${isGradientBorder ? 'relative overflow-hidden' : ''}
        rounded-lg p-6 border shadow-lg
        ${colors.special || ''}
      `}>
        {isGlassTheme && getGlassBackground()}
        
        <div className={`${isGlassTheme ? 'relative backdrop-blur-md bg-white/20 dark:bg-gray-900/20 rounded-lg p-4 border border-white/30' : ''}`}>
        {isGradientBorder && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg opacity-30 animate-gradient-x"></div>
        )}
        
        {/* Background preview */}
        {backgroundPreview && (
          <div 
            className="h-20 bg-cover bg-center rounded-t-lg -m-6 mb-4 relative"
            style={{ backgroundImage: `url(${backgroundPreview})` }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-t-lg"></div>
          </div>
        )}

        {/* Profile Header */}
        <div className={`${backgroundPreview ? 'mt-2' : ''} text-center space-y-4 relative z-10`}>
          <Avatar className="w-16 h-16 mx-auto border-2 border-white dark:border-gray-700 shadow-lg">
            <AvatarImage src={photoPreview} alt={fullName} />
            <AvatarFallback className={`text-sm font-bold ${colors.primary} text-white`}>
              {fullName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h3 className={`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
              {fullName}
            </h3>
            {displayProfession && (
              <p className={`text-sm font-medium ${colors.accent}`}>
                {displayProfession}
              </p>
            )}
            <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-slate-600 dark:text-slate-400'}`}>
              {displayBio}
            </p>
          </div>
        </div>

        {/* Links Preview */}
        {platforms.length > 0 && (
          <div className={`mt-4 ${layout.spacing} relative z-10`}>
            <p className={`text-xs font-medium mb-3 ${isDarkTheme ? 'text-gray-200' : 'text-slate-700 dark:text-slate-300'}`}>
              Mes liens
            </p>
            {platforms.slice(0, 2).map((platform) => {
              const Icon = platform.icon
              return (
                <Card key={platform.name} className={`${layout.linkCard} cursor-pointer ${colors.secondary}`}>
                  <CardContent className="flex items-center space-x-3 p-3">
                    <div className={`w-6 h-6 rounded ${colors.primary} flex items-center justify-center text-white`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-medium ${isDarkTheme ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                        {platform.name}
                      </p>
                      <p className={`text-xs truncate ${isDarkTheme ? 'text-gray-400' : 'text-slate-500'}`}>
                        {platform.url?.replace(/^https?:\/\//, '')?.slice(0, 20)}...
                      </p>
                    </div>
                    <ExternalLink className={`w-3 h-3 ${isDarkTheme ? 'text-gray-400' : 'text-slate-400'}`} />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Skills Preview */}
        {formData.skills.length > 0 && (
          <div className="mt-4 relative z-10">
            <p className={`text-xs font-medium mb-2 ${isDarkTheme ? 'text-gray-200' : 'text-slate-700 dark:text-slate-300'}`}>
              Compétences
            </p>
            <div className="flex flex-wrap gap-1">
              {formData.skills.slice(0, 4).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`text-xs ${colors.secondary} ${colors.accent} border`}
                >
                  {skill}
                </Badge>
              ))}
              {formData.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{formData.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Contact Button */}
        <div className="mt-4 text-center relative z-10">
          <Button 
            size="sm"
            className={`${colors.primary} text-xs shadow-md text-white`}
          >
            <Mail className="w-3 h-3 mr-1" />
            Me contacter
          </Button>
        </div>

        {/* Layout specific elements */}
        {formData.layoutStyle === 'creative' && (
          <div className={`mt-3 h-0.5 w-8 mx-auto bg-gradient-to-r ${colors.gradient} rounded-full`}></div>
        )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePreview