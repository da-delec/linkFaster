'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Star, TrendingUp, Users, Award, Palette, Lock, Crown } from 'lucide-react'

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
  isPremium?: boolean
}

const platforms = [
  {
    id: 'upworkProfile',
    name: 'Upwork',
    icon: '💼',
    color: 'bg-green-500',
    description: 'World #1 platform for freelancers',
    placeholder: 'https://www.upwork.com/freelancers/~your-profile',
    category: 'General',
    tips: 'Very popular for development, design and marketing'
  },
  {
    id: 'fiverProfile',
    name: 'Fiverr',
    icon: '🎯',
    color: 'bg-green-400',
    description: 'Creative services marketplace',
    placeholder: 'https://www.fiverr.com/your-username',
    category: 'Services',
    tips: 'Excellent for packaged and creative services'
  },
  {
    id: 'freelancerProfile',
    name: 'Freelancer',
    icon: '🚀',
    color: 'bg-blue-500',
    description: 'International freelance platform',
    placeholder: 'https://www.freelancer.com/u/your-username',
    category: 'General',
    tips: 'Strong international presence, good for technical projects'
  },
  {
    id: 'maltProfile',
    name: 'Malt',
    icon: '🇫🇷',
    color: 'bg-red-500',
    description: 'French freelance leader',
    placeholder: 'https://www.malt.fr/profile/your-name',
    category: 'France',
    tips: 'Essential in France, quality clientele'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-600',
    description: 'Global professional network',
    placeholder: 'https://www.linkedin.com/in/your-profile',
    category: 'Network',
    tips: 'Essential for networking and B2B opportunities'
  },
  {
    id: 'behance',
    name: 'Behance',
    icon: '🎨',
    color: 'bg-blue-700',
    description: 'Adobe creative portfolio',
    placeholder: 'https://www.behance.net/your-username',
    category: 'Design',
    tips: 'Perfect for designers and creatives'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    icon: '🏀',
    color: 'bg-pink-500',
    description: 'Designers community',
    placeholder: 'https://dribbble.com/your-username',
    category: 'Design',
    tips: 'Premium showcase for UI/UX designers'
  }
]

const FreelancePlatformsStep: React.FC<FreelancePlatformsStepProps> = ({ data, onUpdate, isPremium = false }) => {
  const handleInputChange = (platformId: string, value: string) => {
    onUpdate({ [platformId]: value })
  }

  const getFilledPlatformsCount = () => {
    return platforms.filter(platform => data[platform.id as keyof typeof data]?.trim()).length
  }

  const isFieldDisabled = (platformIndex: number) => {
    if (isPremium) return false
    
    const filledFields = platforms.slice(0, platformIndex).filter(platform => 
      data[platform.id as keyof typeof data]?.trim()
    )
    
    const currentFieldFilled = data[platforms[platformIndex].id as keyof typeof data]?.trim()
    
    return filledFields.length >= 2 && !currentFieldFilled
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'General': return <Users className="w-4 h-4" />
      case 'Services': return <Star className="w-4 h-4" />
      case 'France': return <Award className="w-4 h-4" />
      case 'Network': return <TrendingUp className="w-4 h-4" />
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
            Connect your freelance platforms
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Centralize all your profiles to maximize your visibility
        </p>
        <Badge variant="outline" className="mt-2">
          {getFilledPlatformsCount()}/{isPremium ? platforms.length : 2} platforms connected
          {!isPremium && getFilledPlatformsCount() >= 2 && (
            <span className="ml-2 text-orange-600">• Limit reached</span>
          )}
        </Badge>
      </div>

      {/* Premium Limitation Warning */}
      {!isPremium && getFilledPlatformsCount() >= 2 && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-1">
                  Unlock more platforms with Premium
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  You've reached the limit of 2 platforms. Upgrade to Premium to connect all your freelance platforms.
                </p>
              </div>
              <Link href="/dashboard/pricing">
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all">
                Upgrade
              </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform, index) => {
          const isConnected = data[platform.id as keyof typeof data]?.trim()
          const isDisabled = isFieldDisabled(index)
          
          return (
            <Card
              key={platform.id}
              className={`transition-all hover:shadow-lg border-l-4 ${
                isConnected 
                  ? 'border-l-green-500 bg-green-50/50 dark:bg-green-950/10' 
                  : isDisabled
                  ? 'border-l-orange-300 bg-orange-50/30 dark:bg-orange-950/10 opacity-60'
                  : 'border-l-slate-300 dark:border-l-slate-600'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white text-lg ${isDisabled ? 'opacity-50' : ''}`}>
                      {isDisabled ? <Lock className="w-5 h-5" /> : platform.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center space-x-2">
                        <span className={isDisabled ? 'opacity-60' : ''}>{platform.name}</span>
                        {isConnected && (
                          <Badge className="bg-green-600 text-xs">
                            ✓ Connected
                          </Badge>
                        )}
                        {isDisabled && (
                          <Badge className="bg-orange-500 text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className={`text-sm ${isDisabled ? 'opacity-60' : ''}`}>
                        {isDisabled ? 'Requires Premium to unlock' : platform.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 text-xs text-slate-500 ${isDisabled ? 'opacity-50' : ''}`}>
                    {getCategoryIcon(platform.category)}
                    <span>{platform.category}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={platform.id} className="text-sm font-medium">
                    Your profile URL
                  </Label>
                  <Input
                    id={platform.id}
                    type="url"
                    value={data[platform.id as keyof typeof data] || ''}
                    onChange={(e) => handleInputChange(platform.id, e.target.value)}
                    placeholder={platform.placeholder}
                    className="h-10"
                    disabled={isDisabled}
                  />
                </div>
                
                {isDisabled ? (
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Crown className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5" />
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        <strong>Premium required:</strong> Upgrade to Premium to connect more than 2 freelance platforms.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        <strong>Tip:</strong> {platform.tips}
                      </p>
                    </div>
                  </div>
                )}
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
            <span>Why connect your platforms?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-purple-900 dark:text-purple-200">Maximum visibility</strong>
                  <p className="text-purple-700 dark:text-purple-300">Centralize all your profiles in one link</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-purple-900 dark:text-purple-200">Enhanced credibility</strong>
                  <p className="text-purple-700 dark:text-purple-300">Prove your expertise on different platforms</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-purple-900 dark:text-purple-200">Multiple opportunities</strong>
                  <p className="text-purple-700 dark:text-purple-300">Diversify your client sources</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-purple-900 dark:text-purple-200">Simplified sharing</strong>
                  <p className="text-purple-700 dark:text-purple-300">One link to share with your contacts</p>
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
                {getFilledPlatformsCount()} platform{getFilledPlatformsCount() > 1 ? 's' : ''} connected
              </h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Excellent! You maximize your chances of being found by potential clients.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Optional Note */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
        <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
          💡 <strong>Tip:</strong> {isPremium 
            ? "You don't have to fill out all platforms. Focus on those where you are most active and where you have the best profile."
            : "In the free version, you can connect up to 2 platforms. Choose the ones where you are most active."
          }
        </p>
      </div>
    </div>
  )
}

export default FreelancePlatformsStep