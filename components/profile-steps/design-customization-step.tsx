'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Palette, Layout, Crown, Eye, Sparkles, Monitor, MessageSquare, Moon, Zap, Flame, Droplets } from 'lucide-react'
import ProfilePreview from '@/components/profile-preview'

interface DesignCustomizationStepProps {
  data: {
    colorTheme: string
    layoutStyle: string
    enableReviews: boolean
    firstName: string
    lastName: string
    profession: string
    bio: string
    skills: string[]
    portfolioWebsite: string
    githubProfile: string
    linkedin: string
    photo?: File | null
    backgroundImage?: File | null
  }
  onUpdate: (data: any) => void
  isPremium?: boolean
  userStripeCustomerId?: string
}

const colorThemes = [
  // 3 Thèmes gratuits
  {
    id: 'default',
    name: 'Bleu',
    description: 'Thème classique et professionnel',
    colors: ['#3B82F6', '#1E40AF', '#DBEAFE'],
    isPremium: false,
    category: 'free'
  },
  {
    id: 'emerald',
    name: 'Vert',
    description: 'Thème moderne et naturel',
    colors: ['#10B981', '#047857', '#D1FAE5'],
    isPremium: false,
    category: 'free'
  },
  {
    id: 'purple',
    name: 'Violet',
    description: 'Thème créatif et artistique',
    colors: ['#8B5CF6', '#5B21B6', '#EDE9FE'],
    isPremium: false,
    category: 'free'
  },
  
  // Thème sombre premium
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Thème sombre élégant et professionnel',
    colors: ['#0F172A', '#1E293B', '#475569'],
    isPremium: true,
    category: 'dark'
  },
  
  // Thème glassmorphisme premium
  {
    id: 'glass',
    name: 'Glass',
    description: 'Effet verre moderne sur fond sombre élégant',
    colors: ['#1E293B', '#3B82F6', '#4338CA'],
    isPremium: true,
    category: 'glass',
    background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
  }
]

const layoutStyles = [
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Design épuré et moderne',
    preview: '/api/placeholder/200/120',
    isPremium: false
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Mise en page artistique',
    preview: '/api/placeholder/200/120',
    isPremium: true
  },
  {
    id: 'professional',
    name: 'Professionnel',
    description: 'Style corporate et sobre',
    preview: '/api/placeholder/200/120',
    isPremium: false
  },
  {
    id: 'minimal',
    name: 'Minimaliste',
    description: 'Design ultra-épuré',
    preview: '/api/placeholder/200/120',
    isPremium: true
  }
]

const DesignCustomizationStep: React.FC<DesignCustomizationStepProps> = ({ data, onUpdate, isPremium = false, userStripeCustomerId }) => {
  const selectedTheme = colorThemes.find(theme => theme.id === data.colorTheme) || colorThemes[0]
  const selectedLayout = layoutStyles.find(layout => layout.id === data.layoutStyle) || layoutStyles[0]

  // Handle Stripe checkout upgrade
  const handleUpgrade = async () => {
    if (!userStripeCustomerId) {
      console.error('No Stripe customer ID available')
      return
    }

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: userStripeCustomerId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      // Optionally show a toast notification here
    }
  }

  // Create preview URLs for uploaded images
  const [photoPreview, setPhotoPreview] = React.useState<string>('')
  const [backgroundPreview, setBackgroundPreview] = React.useState<string>('')

  React.useEffect(() => {
    if (data.photo) {
      const url = URL.createObjectURL(data.photo)
      setPhotoPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPhotoPreview('')
    }
  }, [data.photo])

  React.useEffect(() => {
    if (data.backgroundImage) {
      const url = URL.createObjectURL(data.backgroundImage)
      setBackgroundPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setBackgroundPreview('')
    }
  }, [data.backgroundImage])

  const ColorPreview = ({ theme }: { theme: any }) => {
    if (theme.background) {
      return (
        <div className={`w-12 h-8 rounded-md ${theme.background}`} />
      )
    }
    
    if (theme.category === 'gradient') {
      return (
        <div 
          className="w-12 h-8 rounded-md bg-gradient-to-r"
          style={{ 
            backgroundImage: `linear-gradient(to right, ${theme.colors[0]}, ${theme.colors[1]})`
          }}
        />
      )
    }
    
    return (
      <div className="flex space-x-1">
        {theme.colors.slice(0, 3).map((color: string, index: number) => (
          <div
            key={index}
            className="w-4 h-8 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Color Theme Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-medium">Thème de couleurs</h3>
          </div>
          {/* Mode test pour développement */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">Mode test :</span>
            <Badge 
              variant={isPremium ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => {
                // Toggle du mode premium pour test (seulement en développement)
                console.log(`Basculer mode premium : ${!isPremium}`)
                // Cette fonction devrait être passée en props dans un vrai environnement
              }}
            >
              {isPremium ? 'Premium ✓' : 'Gratuit'}
            </Badge>
          </div>
        </div>

        {/* Thèmes gratuits */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Thèmes gratuits
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {colorThemes.filter(theme => !theme.isPremium).map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.colorTheme === theme.id
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:border-slate-300'
                }`}
                onClick={() => onUpdate({ colorTheme: theme.id })}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-sm">{theme.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {theme.description}
                      </CardDescription>
                    </div>
                    <ColorPreview theme={theme} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {data.colorTheme === theme.id && (
                    <Badge className="bg-green-600 text-xs">Sélectionné</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Thèmes sombres premium */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Moon className="w-4 h-4 mr-2" />
            Thèmes sombres premium
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {colorThemes.filter(theme => theme.category === 'dark').map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.colorTheme === theme.id
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:border-slate-300'
                } ${!isPremium ? 'opacity-75' : ''}`}
                onClick={() => {
                  if (isPremium || !theme.isPremium) {
                    onUpdate({ colorTheme: theme.id })
                  }
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-sm flex items-center space-x-1">
                        <span>{theme.name}</span>
                        <Badge className="text-xs bg-gradient-to-r from-slate-600 to-slate-800">
                          <Crown className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {theme.description}
                      </CardDescription>
                    </div>
                    <ColorPreview theme={theme} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {data.colorTheme === theme.id && (
                    <Badge className="bg-green-600 text-xs">Sélectionné</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Nécessite Premium</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Thèmes glassmorphisme premium */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Droplets className="w-4 h-4 mr-2" />
            Glassmorphisme premium
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {colorThemes.filter(theme => theme.category === 'glass').map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-lg backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 ${
                  data.colorTheme === theme.id
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:border-slate-300'
                } ${!isPremium ? 'opacity-75' : ''}`}
                onClick={() => {
                  if (isPremium || !theme.isPremium) {
                    onUpdate({ colorTheme: theme.id })
                  }
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-sm flex items-center space-x-1">
                        <span>{theme.name}</span>
                        <Badge className="text-xs bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-sm">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Glass
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {theme.description}
                      </CardDescription>
                    </div>
                    <div className="w-12 h-8 rounded-md backdrop-blur-sm bg-gradient-to-r from-white/30 to-white/10 border border-white/20"></div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {data.colorTheme === theme.id && (
                    <Badge className="bg-green-600 text-xs">Sélectionné</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Nécessite Premium</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* Thèmes gradients premium */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Flame className="w-4 h-4 mr-2" />
            Gradients premium
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {colorThemes.filter(theme => theme.category === 'gradient').map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.colorTheme === theme.id
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:border-slate-300'
                } ${!isPremium ? 'opacity-75' : ''}`}
                onClick={() => {
                  if (isPremium || !theme.isPremium) {
                    onUpdate({ colorTheme: theme.id })
                  }
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-sm flex items-center space-x-1">
                        <span>{theme.name}</span>
                        <Badge className="text-xs bg-gradient-to-r from-orange-500 to-red-500">
                          <Flame className="w-3 h-3 mr-1" />
                          Gradient
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {theme.description}
                      </CardDescription>
                    </div>
                    <ColorPreview theme={theme} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {data.colorTheme === theme.id && (
                    <Badge className="bg-green-600 text-xs">Sélectionné</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Nécessite Premium</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Thèmes colorés premium */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Crown className="w-4 h-4 mr-2" />
            Couleurs premium
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {colorThemes.filter(theme => theme.category === 'color').map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.colorTheme === theme.id
                    ? 'ring-2 ring-primary border-primary'
                    : 'hover:border-slate-300'
                } ${!isPremium ? 'opacity-75' : ''}`}
                onClick={() => {
                  if (isPremium || !theme.isPremium) {
                    onUpdate({ colorTheme: theme.id })
                  }
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-sm flex items-center space-x-1">
                        <span>{theme.name}</span>
                        <Badge className="text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                          <Crown className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {theme.description}
                      </CardDescription>
                    </div>
                    <ColorPreview theme={theme} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {data.colorTheme === theme.id && (
                    <Badge className="bg-green-600 text-xs">Sélectionné</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Nécessite Premium</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Layout Style Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Layout className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Style de mise en page</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {layoutStyles.map((layout) => (
            <Card
              key={layout.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                data.layoutStyle === layout.id
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-slate-300'
              }`}
              onClick={() => onUpdate({ layoutStyle: layout.id })}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <span>{layout.name}</span>
                      {layout.isPremium && (
                        <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500">
                          <Crown className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {layout.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded border flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-slate-400" />
                  <span className="text-xs text-slate-500 ml-2">Aperçu {layout.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  {data.layoutStyle === layout.id ? (
                    <Badge className="bg-green-600">Sélectionné</Badge>
                  ) : (
                    <span className="text-xs text-slate-500">
                      {layout.isPremium ? 'Nécessite Pro' : 'Gratuit'}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Aperçu en temps réel</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Votre profil avec le thème <strong className={selectedTheme.id === 'neon' || selectedTheme.id === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600' : `text-${selectedTheme.id === 'default' ? 'blue' : selectedTheme.id}-600`}>
                {selectedTheme.name}
              </strong> et le style <strong>{selectedLayout.name}</strong>
            </p>
            <div className="space-y-2 text-xs text-slate-500">
              <p>• Adaptation automatique aux couleurs choisies</p>
              <p>• Mise en page responsive selon le style</p>
              <p>• Preview mise à jour en temps réel</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ProfilePreview 
              formData={data}
              photoPreview={photoPreview}
              backgroundPreview={backgroundPreview}
            />
          </div>
        </div>
      </div>

      {/* Upgrade to Pro Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="text-amber-600 dark:text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-medium text-amber-900 dark:text-amber-200 mb-2">
              Débloquez plus de possibilités avec Pro
            </h4>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 mb-4">
              <li>• Accès à tous les thèmes premium</li>
              <li>• Layouts avancés avec animations</li>
              <li>• Domaine personnalisé (votre-nom.devlink.pro)</li>
              <li>• Analytics détaillées de votre profil</li>
              <li>• Support prioritaire</li>
            </ul>
            <div className="flex items-center space-x-3">
              <Button 
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                onClick={handleUpgrade}
                disabled={!userStripeCustomerId}
              >
                <Crown className="w-4 h-4 mr-1" />
                Passer à Pro - 7.99€/mois
              </Button>
              <span className="text-xs text-amber-600 dark:text-amber-400">
                7 jours d'essai gratuit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Paramètres des avis clients</h3>
        </div>

        <Card className="border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center space-x-2">
                  <span>Permettre aux visiteurs de laisser des avis</span>
                  {!isPremium && (
                    <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  Activez cette option pour que les clients puissent laisser des avis et notes sur votre profil public. 
                  Cela vous aidera à construire votre réputation et la confiance des futurs clients.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {!isPremium ? (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-amber-600 dark:text-amber-400">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-amber-900 dark:text-amber-200 mb-1">
                      Fonctionnalité Premium requise
                    </h5>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                      La gestion des avis clients est une fonctionnalité exclusive aux comptes Premium. 
                      Passez au plan Premium pour permettre à vos clients de laisser des avis sur votre profil.
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      onClick={handleUpgrade}
                      disabled={!userStripeCustomerId}
                    >
                      <Crown className="w-4 h-4 mr-1" />
                      Passer à Premium
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Formulaire d'avis {data.enableReviews ? 'activé' : 'désactivé'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {data.enableReviews 
                      ? 'Les visiteurs peuvent laisser des avis avec une note de 1 à 5 étoiles' 
                      : 'Les visiteurs ne verront pas l\'option pour laisser un avis'
                    }
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={!data.enableReviews ? "default" : "outline"}
                    size="sm"
                    onClick={() => onUpdate({ enableReviews: false })}
                  >
                    Désactivé
                  </Button>
                  <Button
                    variant={data.enableReviews ? "default" : "outline"}
                    size="sm"
                    onClick={() => onUpdate({ enableReviews: true })}
                  >
                    Activé
                  </Button>
                </div>
              </div>
            )}
            
            {data.enableReviews && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-2">
                  <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">
                    <p className="font-medium mb-1">Bonnes pratiques pour les avis :</p>
                    <ul className="space-y-0.5">
                      <li>• Encouragez vos clients satisfaits à laisser un avis</li>
                      <li>• Répondez de manière professionnelle aux commentaires</li>
                      <li>• Utilisez les avis pour améliorer vos services</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
        <h4 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-4">
          Récapitulatif de votre configuration
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">Thème de couleurs:</span>
            <div className="flex items-center space-x-2 mt-1">
              <ColorPreview theme={selectedTheme} />
              <span className="font-medium">{selectedTheme.name}</span>
              {selectedTheme.isPremium && (
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              )}
            </div>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Style de layout:</span>
            <div className="flex items-center space-x-2 mt-1">
              <Layout className="w-4 h-4 text-slate-500" />
              <span className="font-medium">{selectedLayout.name}</span>
              {selectedLayout.isPremium && (
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              )}
            </div>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Avis clients:</span>
            <div className="flex items-center space-x-2 mt-1">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span className="font-medium">
                {data.enableReviews ? 'Activés' : 'Désactivés'}
              </span>
              {data.enableReviews && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  Actif
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignCustomizationStep