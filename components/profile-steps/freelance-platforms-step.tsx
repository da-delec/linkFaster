'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Star, TrendingUp, Users, Award, Palette } from 'lucide-react'

interface FreelancePlatformsStepProps {
  data: {
    upworkProfile: string
    fiverProfile: string
    freelancerProfile: string
    maltProfile: string
    linkedin: string
    behance: string
    dribbble: string
  }
  onUpdate: (data: any) => void
}

const platforms = [
  {
    id: 'upworkProfile',
    name: 'Upwork',
    icon: '💼',
    color: 'bg-green-500',
    description: 'Plateforme #1 mondiale pour freelances',
    placeholder: 'https://www.upwork.com/freelancers/~votre-profil',
    category: 'Généraliste',
    tips: 'Très populaire pour développement, design et marketing'
  },
  {
    id: 'fiverProfile',
    name: 'Fiverr',
    icon: '🎯',
    color: 'bg-green-400',
    description: 'Marketplace de services créatifs',
    placeholder: 'https://www.fiverr.com/votre-username',
    category: 'Services',
    tips: 'Excellent pour services packagés et créatifs'
  },
  {
    id: 'freelancerProfile',
    name: 'Freelancer',
    icon: '🚀',
    color: 'bg-blue-500',
    description: 'Plateforme internationale de freelance',
    placeholder: 'https://www.freelancer.com/u/votre-username',
    category: 'Généraliste',
    tips: 'Forte présence internationale, bon pour projets techniques'
  },
  {
    id: 'maltProfile',
    name: 'Malt',
    icon: '🇫🇷',
    color: 'bg-red-500',
    description: 'Leader français du freelance',
    placeholder: 'https://www.malt.fr/profile/votre-nom',
    category: 'France',
    tips: 'Incontournable en France, clientèle qualité'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-600',
    description: 'Réseau professionnel mondial',
    placeholder: 'https://www.linkedin.com/in/votre-profil',
    category: 'Réseau',
    tips: 'Essentiel pour networking et opportunités B2B'
  },
  {
    id: 'behance',
    name: 'Behance',
    icon: '🎨',
    color: 'bg-blue-700',
    description: 'Portfolio créatif Adobe',
    placeholder: 'https://www.behance.net/votre-username',
    category: 'Design',
    tips: 'Parfait pour designers et créatifs'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    icon: '🏀',
    color: 'bg-pink-500',
    description: 'Communauté de designers',
    placeholder: 'https://dribbble.com/votre-username',
    category: 'Design',
    tips: 'Showcase premium pour designers UI/UX'
  }
]

const FreelancePlatformsStep: React.FC<FreelancePlatformsStepProps> = ({ data, onUpdate }) => {
  const handleInputChange = (platformId: string, value: string) => {
    onUpdate({ [platformId]: value })
  }

  const getFilledPlatformsCount = () => {
    return platforms.filter(platform => data[platform.id as keyof typeof data]?.trim()).length
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Généraliste': return <Users className="w-4 h-4" />
      case 'Services': return <Star className="w-4 h-4" />
      case 'France': return <Award className="w-4 h-4" />
      case 'Réseau': return <TrendingUp className="w-4 h-4" />
      case 'Design': return <Palette className="w-4 h-4" />
      default: return <ExternalLink className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Section */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Connectez vos plateformes freelance
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Centralisez tous vos profils pour maximiser votre visibilité
        </p>
        <Badge variant="outline" className="mt-2">
          {getFilledPlatformsCount()}/{platforms.length} plateformes connectées
        </Badge>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform) => {
          const isConnected = data[platform.id as keyof typeof data]?.trim()
          
          return (
            <Card
              key={platform.id}
              className={`transition-all hover:shadow-lg border-l-4 ${
                isConnected 
                  ? 'border-l-green-500 bg-green-50/50 dark:bg-green-950/10' 
                  : 'border-l-slate-300 dark:border-l-slate-600'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white text-lg`}>
                      {platform.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center space-x-2">
                        <span>{platform.name}</span>
                        {isConnected && (
                          <Badge className="bg-green-600 text-xs">
                            ✓ Connecté
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {platform.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    {getCategoryIcon(platform.category)}
                    <span>{platform.category}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={platform.id} className="text-sm font-medium">
                    URL de votre profil
                  </Label>
                  <Input
                    id={platform.id}
                    type="url"
                    value={data[platform.id as keyof typeof data] || ''}
                    onChange={(e) => handleInputChange(platform.id, e.target.value)}
                    placeholder={platform.placeholder}
                    className="h-10"
                  />
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <strong>Astuce:</strong> {platform.tips}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Benefits Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span>Pourquoi connecter vos plateformes ?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-purple-900 dark:text-purple-200">Visibilité maximale</strong>
                  <p className="text-purple-700 dark:text-purple-300">Centralisez tous vos profils en un seul lien</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-purple-900 dark:text-purple-200">Crédibilité renforcée</strong>
                  <p className="text-purple-700 dark:text-purple-300">Prouvez votre expertise sur différentes plateformes</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-purple-900 dark:text-purple-200">Opportunités multiples</strong>
                  <p className="text-purple-700 dark:text-purple-300">Diversifiez vos sources de clients</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-purple-900 dark:text-purple-200">Partage simplifié</strong>
                  <p className="text-purple-700 dark:text-purple-300">Un seul lien à partager avec vos contacts</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {getFilledPlatformsCount() > 0 && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/10 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <h4 className="font-medium text-green-900 dark:text-green-200">
                {getFilledPlatformsCount()} plateforme{getFilledPlatformsCount() > 1 ? 's' : ''} connectée{getFilledPlatformsCount() > 1 ? 's' : ''}
              </h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Excellent ! Vous maximisez vos chances d'être trouvé par des clients potentiels.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Optional Note */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
        <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
          💡 <strong>Astuce :</strong> Vous n'êtes pas obligé de remplir toutes les plateformes. 
          Concentrez-vous sur celles où vous êtes le plus actif et où vous avez le meilleur profil.
        </p>
      </div>
    </div>
  )
}

export default FreelancePlatformsStep