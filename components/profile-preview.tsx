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
import Link from 'next/link'

interface ProfilePreviewProps {
  formData: {
    firstName: string
    lastName: string
    profession: string
    bio: string
    skills: string[]
    portfolioWebsite: string
    githubProfile: string
    githubCalendar: boolean
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
      // 3 FREE THEMES - Apple design, simple and refined
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

      // 1 PREMIUM DARK THEME - Apple dark design with background image
      case 'midnight':
        return {
          primary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm',
          secondary: 'bg-slate-800/80 backdrop-blur-sm border border-slate-600/30 shadow-xl',
          accent: 'text-blue-400',
          text: 'text-slate-100',
          textCard: 'text-slate-100',
          background: 'midnight-background',
          cardBorder: 'border-slate-600/30',
          cardShadow: 'shadow-xl shadow-slate-900/50',
          darkBackground: true
        }

      // PREMIUM GLASSMORPHISM THEMES - Modern Apple design with abstract backgrounds
      case 'glass-aurora':
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
      case 'glass-nebula':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg hover:shadow-xl transition-all duration-300',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300',
          accent: 'text-purple-300',
          text: 'text-white',
          textCard: 'text-white',
          background: 'glass-nebula-background',
          cardBorder: 'border-white/20',
          cardShadow: 'shadow-lg backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-white/10 border-white/20 shadow-lg',
          abstractOrbs: true
        }
      case 'glass-cosmic':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-lg hover:shadow-xl transition-all duration-300',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300',
          accent: 'text-cyan-300',
          text: 'text-white',
          textCard: 'text-white',
          background: 'glass-cosmic-background',
          cardBorder: 'border-white/20',
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
          accent: 'text-indigo-300',
          text: 'text-white',
          textCard: 'text-white',
          background: 'prisme-dark-background',
          cardBorder: 'border-white/25',
          cardShadow: 'shadow-xl backdrop-blur-md',
          glassEffect: 'backdrop-blur-md bg-white/15 border-white/25 shadow-xl',
          prismeTheme: true
        }
      case 'prisme-grey':
        return {
          primary: 'bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-md border border-slate-600/50 text-white shadow-xl hover:shadow-2xl transition-all duration-300',
          secondary: 'bg-slate-800/70 backdrop-blur-md border border-slate-600/40 shadow-xl hover:shadow-2xl transition-all duration-300',
          accent: 'text-slate-300',
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

  const colors = getThemeColors(formData.colorTheme)
  const layout = getLayoutStyles(formData.layoutStyle)
  
  // Détection des thèmes glass et prisme pour le texte dans les cards
  const isGlassTheme = ['glass', 'glass-aurora', 'glass-nebula', 'glass-cosmic'].includes(formData.colorTheme)
  const isPrismeTheme = ['prisme-dark', 'prisme-grey'].includes(formData.colorTheme)
  const isDarkTheme = ['midnight'].includes(formData.colorTheme)
  const isGradientTheme = false // No gradient themes in the new design

  const fullName = `${formData.firstName} ${formData.lastName}`.trim()
  const displayProfession = formData.profession || 'Freelance Developer'
  const displayBio = formData.bio || 'Passionate about web development and new technologies.'

  const platforms = [
    { name: 'Portfolio', icon: Globe, url: formData.portfolioWebsite },
    { name: 'GitHub', icon: Github, url: formData.githubProfile },
    { name: 'LinkedIn', icon: Briefcase, url: formData.linkedin }
  ].filter(platform => platform.url)

  return (
    <div className={`min-h-screen ${colors.abstractOrbs || colors.darkBackground || colors.prismeTheme ? colors.background : colors.background ? `bg-gradient-to-br ${colors.background}` : 'bg-white'} ${colors.text} relative overflow-hidden`}>
      {/* Glass theme background overlay */}
      {colors.abstractOrbs && (
        <div className={`absolute inset-0 z-0 ${
          formData.colorTheme === 'glass-nebula' ? 'bg-black/10' : 
          formData.colorTheme === 'glass-cosmic' ? 'bg-black/25' : 
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
          formData.colorTheme === 'prisme-dark' ? 'bg-black/40' : 
          'bg-black/30'
        }`}></div>
      )}

      <div className={`${layout.container} mx-auto relative z-10`}>
        <div className={`
          bg-gradient-to-br ${colors.background} 
          ${isGlassTheme || isPrismeTheme ? colors.textCard : colors.text}
          rounded-lg p-6 border shadow-lg
          ${(colors as any).special || ''}
        `}>
          
          <div>
          
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
              <h3 className={`text-lg font-bold ${
                isGlassTheme || isPrismeTheme ? colors.textCard : colors.text
              }`}>
                {fullName}
              </h3>
              {displayProfession && (
                <p className={`text-sm font-medium ${colors.accent}`}>
                  {displayProfession}
                </p>
              )}
              <p className={`text-xs leading-relaxed ${
                isGlassTheme || isPrismeTheme ? colors.textCard : colors.text + ' opacity-80'
              }`}>
                {displayBio}
              </p>
            </div>
          </div>

          {/* Links Preview */}
          {platforms.length > 0 && (
            <div className={`mt-4 ${layout.spacing} relative z-10`}>
              <p className={`text-xs font-medium mb-3 ${
                isGlassTheme || isPrismeTheme ? colors.textCard : colors.text
              }`}>
                My Links
              </p>
              {platforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer ${colors.secondary} ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassTheme || isPrismeTheme ? 'border-white/30 shadow-xl backdrop-blur-md' : ''}`}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-900 flex items-center justify-center text-white shadow-lg transition-all duration-200">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`font-medium ${isGlassTheme || isPrismeTheme ? colors.textCard : colors.text}`}>
                              {platform.name}
                            </h3>
                            <p className={`text-sm truncate max-w-xs ${isGlassTheme || isPrismeTheme ? colors.textCard : colors.text} opacity-70`}>
                              {platform.url.replace(/^https?:\/\//, '')}
                            </p>
                          </div>
                        </div>
                        <ExternalLink className={`w-4 h-4 ${isGlassTheme || isPrismeTheme ? colors.textCard : colors.text} opacity-60`} />
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Skills Preview */}
          {formData.skills.length > 0 && (
            <div className="mt-4 relative z-10">
              <p className={`text-xs font-medium mb-2 ${
                isGlassTheme || isPrismeTheme ? colors.textCard : colors.text
              }`}>
                Skills
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {formData.skills.slice(0, 4).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${colors.secondary} ${isGlassTheme || isPrismeTheme ? colors.textCard : colors.accent} border px-3 py-1 text-xs ${colors.cardBorder || ''} ${colors.cardShadow || ''} ${isGlassTheme || isPrismeTheme ? 'border-white/30 shadow-lg backdrop-blur-md' : ''}`}
                  >
                    {skill}
                  </Badge>
                ))}
                {formData.skills.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{formData.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Contact Button */}
          <div className="mt-4 text-center relative z-10">
            <Button 
              size="sm"
              className={`${colors.primary} text-xs shadow-md text-white shadow-lg hover:shadow-xl transition-shadow`}
            >
              <Mail className="w-3 h-3 mr-1" />
              Contact Me
            </Button>
          </div>

          {/* Layout specific elements */}
          {formData.layoutStyle === 'creative' && (
            <div className={`mt-3 h-0.5 w-8 mx-auto ${colors.primary} rounded-full`}></div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePreview