'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import ProfilNavbar from '@/components/ui/profil-navbar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Loader2, User, Briefcase, Github, Globe, Users, Palette } from 'lucide-react'
import { useProfileForm } from '@/hooks/use-profile-form'
import { authClient } from '@/lib/auth-client'
import { getUserForForm } from '@/lib/actions/user-actions'

import PersonalInfoStep from '@/components/profile-steps/personal-info-step'
import ProfessionalDetailsStep from '@/components/profile-steps/professional-details-step'
import GitHubIntegrationStep from '@/components/profile-steps/github-integration-step'
import ProductionProjectsStep from '@/components/profile-steps/production-projects-step'
import FreelancePlatformsStep from '@/components/profile-steps/freelance-platforms-step'
import DesignCustomizationStep from '@/components/profile-steps/design-customization-step'



interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  age: string
  email: string
  photo: File | null
  
  // Professional Details
  profession: string
  bio: string
  skills: string[]
  portfolioWebsite: string
  
  // GitHub Integration
  githubProfile: string
  githubCalendar: boolean
  selectedRepos: Array<{
    name: string
    url: string
    image: string
    description: string
  }>
  
  // Production Projects
  projects: Array<{
    id?: string
    title: string
    description: string
    url: string
    previewUrl: string
    technologies: string[]
  }>
  
  // Freelance Platforms
  upworkProfile: string
  fiverProfile: string
  freelancerProfile: string
  maltProfile: string
  linkedin: string
  behance: string
  dribbble: string
  
  // Design Customization
  colorTheme: string
  layoutStyle: string
  enableReviews: boolean
}

const steps = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Enter your basic information',
    icon: User,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'Professional Details',
    description: 'Tell us about your expertise',
    icon: Briefcase,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    title: 'GitHub Integration',
    description: 'Connect your GitHub projects',
    icon: Github,
    color: 'from-gray-700 to-gray-800'
  },
  {
    id: 4,
    title: 'Production Projects',
    description: 'Add your deployed projects',
    icon: Globe,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 5,
    title: 'Freelance Platforms',
    description: 'Connect your freelance profiles',
    icon: Users,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 6,
    title: 'Customization',
    description: 'Customize your profile',
    icon: Palette,
    color: 'from-pink-500 to-pink-600'
  }
]

const CreateProfilePage = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [stripeCustomerId, setStripeCustomerId] = useState<string>('')
  const { submitProfile, isSubmitting } = useProfileForm()
  const { data: session, isPending } = authClient.useSession()
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    photo: null,
    profession: '',
    bio: '',
    skills: [],
    portfolioWebsite: '',
    githubProfile: '',
    githubCalendar: false,
    selectedRepos: [],
    projects: [],
    upworkProfile: '',
    fiverProfile: '',
    freelancerProfile: '',
    maltProfile: '',
    linkedin: '',
    behance: '',
    dribbble: '',
    colorTheme: 'default',
    layoutStyle: 'modern',
    enableReviews: false
  })

  // Handle authentication and redirection
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login')
    }
  }, [session, isPending, router])

  // Load existing user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      if (!session?.user?.id) return
      
      try {
        const userData = await getUserForForm(session.user.id)
        
        if (userData) {
          setIsEditMode(true)
          setIsPremium(userData.isPremium || false)
          setStripeCustomerId(userData.stripeCustomerId || '')
          setFormData(prev => ({
            ...prev,
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            email: userData.email,
            profession: userData.profession,
            bio: userData.bio,
            skills: userData.skills,
            portfolioWebsite: userData.portfolioWebsite,
            githubProfile: userData.githubProfile,
            githubCalendar: userData.githubCalendar,
            selectedRepos: userData.selectedRepos,
            projects: userData.projects || [],
            upworkProfile: userData.upworkProfile,
            fiverProfile: userData.fiverProfile,
            freelancerProfile: userData.freelancerProfile,
            maltProfile: userData.maltProfile,
            linkedin: userData.linkedin,
            behance: userData.behance,
            dribbble: userData.dribbble,
            colorTheme: userData.colorTheme,
            layoutStyle: userData.layoutStyle,
            enableReviews: userData.enableReviews,
            // Keep existing files as null, they'll need to be re-uploaded if changed
            photo: null,
          }))
        } else {
          // New user, pre-fill with session data
          setFormData(prev => ({
            ...prev,
            email: session.user.email || '',
            firstName: session.user.name?.split(' ')[0] || '',
            lastName: session.user.name?.split(' ').slice(1).join(' ') || ''
          }))
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setIsLoadingData(false)
      }
    }

    if (session?.user?.id) {
      loadUserData()
    } else if (!isPending) {
      setIsLoadingData(false)
    }
  }, [session, isPending])

  // Show loading state
  if (isPending || isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show loading state while redirecting
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const progressPercentage = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const handleSubmit = async () => {
    if (!session?.user?.id) return
    
    const result = await submitProfile(formData, {
      photo: formData.photo,
    }, session.user.id)
    
    if (result.success) {
      // Success handled in the hook with toast and redirect
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData}
            onUpdate={updateFormData}
          />
        )
      case 2:
        return (
          <ProfessionalDetailsStep
            data={formData}
            onUpdate={updateFormData}
          />
        )
      case 3:
        return (
          <GitHubIntegrationStep
            data={formData}
            onUpdate={updateFormData}
          />
        )
      case 4:
        return (
          <ProductionProjectsStep
            data={formData}
            onUpdate={updateFormData}
          />
        )
      case 5:
        return (
          <FreelancePlatformsStep
            data={formData}
            onUpdate={updateFormData}
            isPremium={isPremium}
          />
        )
      case 6:
        return (
          <DesignCustomizationStep
            data={formData}
            onUpdate={updateFormData}
            isPremium={isPremium}
            userStripeCustomerId={stripeCustomerId}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>
      
      <ProfilNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Progress Section */}
        <div className="mb-12 transition-all duration-700 ease-in-out">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600/50 to-pink-600/50 bg-clip-text text-transparent mb-4 animate-fade-in">
              {isEditMode ? 'Edit Your Profile' : 'Create Your Profile'}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Step {currentStep} of {steps.length} - Let's build your perfect online presence together
             
            </p>
          </div>

          {/* Circular Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-200 dark:text-slate-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - progressPercentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {Math.round(progressPercentage)}%
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modern Step Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              const isUpcoming = currentStep < step.id
              
              return (
                <div
                  key={step.id}
                  className={`group relative flex flex-col items-center p-4 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 cursor-pointer ${
                    isActive
                      ? 'bg-white/80 dark:bg-slate-800/80 border-purple-200 dark:border-purple-600 shadow-lg shadow-purple-500/20'
                      : isCompleted
                      ? 'bg-green-50/80 dark:bg-green-950/30 border-green-200 dark:border-green-600 shadow-md'
                      : 'bg-white/40 dark:bg-slate-800/40 border-slate-200 dark:border-slate-600 hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    <StepIcon className={`w-6 h-6 ${isActive ? 'animate-bounce' : ''}`} />
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold text-sm mb-1 ${
                      isActive ? 'text-purple-700 dark:text-purple-300' : 
                      isCompleted ? 'text-green-700 dark:text-green-300' : 
                      'text-slate-600 dark:text-slate-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className={`text-xs opacity-70 max-w-32 ${
                      isActive ? 'text-purple-600 dark:text-purple-400' : 
                      'text-slate-500 dark:text-slate-500'
                    }`}>
                      {step.description}
                    </div>
                  </div>
                  
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className={`hidden lg:block absolute top-8 left-full w-8 h-0.5 transition-colors duration-300 ${
                      isCompleted ? 'bg-green-400' : 'bg-slate-200 dark:bg-slate-600'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Section */}
        <Card className="shadow-2xl border-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl transition-all duration-700 hover:shadow-3xl">
          <CardHeader className="bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${steps[currentStep - 1].color} flex items-center justify-center text-white shadow-lg`}>
                {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {steps[currentStep - 1].description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 p-8">
            <div className="transition-all duration-500 ease-in-out">
              {renderStep()}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-300/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              <div className="flex space-x-3">
                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        <span className="animate-pulse">
                          {isEditMode ? 'Updating...' : 'Creating...'}
                        </span>
                      </>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <span>{isEditMode ? '🔄 Update Profile' : '🚀 Create Profile'}</span>
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreateProfilePage
