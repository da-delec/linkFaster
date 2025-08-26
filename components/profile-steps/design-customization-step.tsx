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
    githubCalendar: boolean
    linkedin: string
    photo?: File | null
  }
  onUpdate: (data: any) => void
  isPremium?: boolean
  userStripeCustomerId?: string
}

const colorThemes = [
  // 3 Free themes
  {
    id: 'default',
    name: 'Blue',
    description: 'Classic and professional theme',
    colors: ['#3B82F6', '#1E40AF', '#DBEAFE'],
    isPremium: false,
    category: 'free'
  },
  {
    id: 'emerald',
    name: 'Green',
    description: 'Modern and natural theme',
    colors: ['#10B981', '#047857', '#D1FAE5'],
    isPremium: false,
    category: 'free'
  },
  {
    id: 'purple',
    name: 'Purple',
    description: 'Creative and artistic theme',
    colors: ['#8B5CF6', '#5B21B6', '#EDE9FE'],
    isPremium: false,
    category: 'free'
  },
  
  // Premium dark theme
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Elegant and professional dark theme',
    colors: ['#0F172A', '#1E293B', '#475569'],
    isPremium: true,
    category: 'dark'
  },
  
  // Premium glassmorphism themes
  {
    id: 'glass-aurora',
    name: 'Glass Aurora',
    description: 'Glassmorphism with abstract aurora background',
    colors: ['#1E293B', '#3B82F6', '#4338CA'],
    isPremium: true,
    category: 'glass',
    background: 'glass-aurora-background'
  },
  {
    id: 'glass-nebula',
    name: 'Glass Nebula',
    description: 'Glassmorphism with nebula space background',
    colors: ['#1E293B', '#8B5CF6', '#7C3AED'],
    isPremium: true,
    category: 'glass',
    background: 'glass-nebula-background'
  },
  {
    id: 'glass-cosmic',
    name: 'Glass Cosmic',
    description: 'Glassmorphism with cosmic abstract background',
    colors: ['#1E293B', '#06B6D4', '#0891B2'],
    isPremium: true,
    category: 'glass',
    background: 'glass-cosmic-background'
  },
  // Backward compatibility
  {
    id: 'glass',
    name: 'Glass Classic',
    description: 'Original glass theme with aurora background',
    colors: ['#1E293B', '#3B82F6', '#4338CA'],
    isPremium: true,
    category: 'glass',
    background: 'glass-aurora-background'
  },

  // Premium prisme themes
  {
    id: 'prisme-dark',
    name: 'Prisme Dark',
    description: 'Elegant dark prisme background with premium effects',
    colors: ['#111827', '#4F46E5', '#7C3AED'],
    isPremium: true,
    category: 'prisme',
    background: 'prisme-dark-background'
  },
  {
    id: 'prisme-grey',
    name: 'Prisme Grey',
    description: 'Sophisticated grey prisme with modern aesthetics',
    colors: ['#374151', '#6B7280', '#9CA3AF'],
    isPremium: true,
    category: 'prisme',
    background: 'prisme-grey-background'
  }
]

const layoutStyles = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean design with subtle gradients and elegant hover effects',
    preview: '/api/placeholder/200/120',
    isPremium: false
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Dynamic rotations, fluid animations and shine effects',
    preview: '/api/placeholder/200/120',
    isPremium: true
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Large format with sophisticated header and colored borders',
    preview: '/api/placeholder/200/120',
    isPremium: false
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    description: 'Compact with glassmorphism and backdrop-blur effect',
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

  React.useEffect(() => {
    if (data.photo) {
      const url = URL.createObjectURL(data.photo)
      setPhotoPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPhotoPreview('')
    }
  }, [data.photo])

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
            <h3 className="text-lg font-medium">Color Theme</h3>
          </div>
          {/* Mode test pour développement */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">Test mode:</span>
            <Badge 
              variant={isPremium ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => {
                // Toggle premium mode for testing (development only)
                console.log(`Toggle premium mode: ${!isPremium}`)
                // This function should be passed as props in a real environment
              }}
            >
              {isPremium ? 'Premium ✓' : 'Free'}
            </Badge>
          </div>
        </div>

        {/* Free themes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Free themes
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
                    <Badge className="bg-green-600 text-xs">Selected</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium dark themes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Moon className="w-4 h-4 mr-2" />
            Premium dark themes
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
                    <Badge className="bg-green-600 text-xs">Selected</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Requires Premium</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium glassmorphism themes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Droplets className="w-4 h-4 mr-2" />
            Premium glassmorphism
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
                    <Badge className="bg-green-600 text-xs">Selected</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Requires Premium</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* Premium gradient themes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Flame className="w-4 h-4 mr-2" />
            Premium gradients
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
                    <Badge className="bg-green-600 text-xs">Selected</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Requires Premium</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium prisme themes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Premium prisme
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {colorThemes.filter(theme => theme.category === 'prisme').map((theme) => (
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
                        <Badge className="text-xs bg-gradient-to-r from-indigo-500 to-purple-600">
                          <Zap className="w-3 h-3 mr-1" />
                          Prisme
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
                    <Badge className="bg-green-600 text-xs">Selected</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Requires Premium</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium colored themes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center">
            <Crown className="w-4 h-4 mr-2" />
            Premium colors
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
                    <Badge className="bg-green-600 text-xs">Selected</Badge>
                  )}
                  {!isPremium && theme.isPremium && (
                    <p className="text-xs text-slate-500 mt-2">Requires Premium</p>
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
          <h3 className="text-lg font-medium">Layout Style</h3>
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
                  <span className="text-xs text-slate-500 ml-2">Preview {layout.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  {data.layoutStyle === layout.id ? (
                    <Badge className="bg-green-600">Selected</Badge>
                  ) : (
                    <span className="text-xs text-slate-500">
                      {layout.isPremium ? 'Requires Pro' : 'Free'}
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
          <h3 className="text-lg font-medium">Live Preview</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Your profile with the <strong className={selectedTheme.id === 'neon' || selectedTheme.id === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600' : `text-${selectedTheme.id === 'default' ? 'blue' : selectedTheme.id}-600`}>
                {selectedTheme.name}
              </strong> theme and <strong>{selectedLayout.name}</strong> style
            </p>
            <div className="space-y-2 text-xs text-slate-500">
              <p>• Automatic adaptation to chosen colors</p>
              <p>• Responsive layout according to style</p>
              <p>• Real-time updated preview</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ProfilePreview 
              formData={data}
              photoPreview={photoPreview}
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
              Unlock More Possibilities with Pro
            </h4>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 mb-4">
              <li>• Access to all premium themes</li>
              <li>• Advanced layouts with animations</li>
              <li>• Custom domain (your-name.linkfaster.pro)</li>
              <li>• Detailed analytics of your profile</li>
              <li>• Priority support</li>
            </ul>
            <div className="flex items-center space-x-3">
              <Button 
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                onClick={handleUpgrade}
                disabled={!userStripeCustomerId}
              >
                <Crown className="w-4 h-4 mr-1" />
                Upgrade to Pro - €7.99/month
              </Button>
              <span className="text-xs text-amber-600 dark:text-amber-400">
                7-day free trial
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-slate-500" />
          <h3 className="text-lg font-medium">Client Reviews Settings</h3>
        </div>

        <Card className="border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center space-x-2">
                  <span>Allow visitors to leave reviews</span>
                  {!isPremium && (
                    <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  Enable this option so clients can leave reviews and ratings on your public profile. 
                  This will help you build your reputation and trust with future clients.
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
                      Premium Feature Required
                    </h5>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                      Client review management is an exclusive feature for Premium accounts. 
                      Upgrade to Premium to allow your clients to leave reviews on your profile.
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      onClick={handleUpgrade}
                      disabled={!userStripeCustomerId}
                    >
                      <Crown className="w-4 h-4 mr-1" />
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Review form {data.enableReviews ? 'enabled' : 'disabled'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {data.enableReviews 
                      ? 'Visitors can leave reviews with a rating from 1 to 5 stars' 
                      : 'Visitors will not see the option to leave a review'
                    }
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={!data.enableReviews ? "default" : "outline"}
                    size="sm"
                    onClick={() => onUpdate({ enableReviews: false })}
                  >
                    Disabled
                  </Button>
                  <Button
                    variant={data.enableReviews ? "default" : "outline"}
                    size="sm"
                    onClick={() => onUpdate({ enableReviews: true })}
                  >
                    Enabled
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
                    <p className="font-medium mb-1">Best practices for reviews:</p>
                    <ul className="space-y-0.5">
                      <li>• Encourage satisfied clients to leave a review</li>
                      <li>• Respond professionally to comments</li>
                      <li>• Use reviews to improve your services</li>
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
          Configuration Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">Color theme:</span>
            <div className="flex items-center space-x-2 mt-1">
              <ColorPreview theme={selectedTheme} />
              <span className="font-medium">{selectedTheme.name}</span>
              {selectedTheme.isPremium && (
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              )}
            </div>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Layout style:</span>
            <div className="flex items-center space-x-2 mt-1">
              <Layout className="w-4 h-4 text-slate-500" />
              <span className="font-medium">{selectedLayout.name}</span>
              {selectedLayout.isPremium && (
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              )}
            </div>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Client reviews:</span>
            <div className="flex items-center space-x-2 mt-1">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span className="font-medium">
                {data.enableReviews ? 'Enabled' : 'Disabled'}
              </span>
              {data.enableReviews && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  Active
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