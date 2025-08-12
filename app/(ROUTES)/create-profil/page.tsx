'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProfilNavbar from '@/components/ui/profil-navbar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
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
  backgroundImage: File | null
  
  // Professional Details
  profession: string
  bio: string
  skills: string[]
  portfolioWebsite: string
  
  // GitHub Integration
  githubProfile: string
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
    title: 'Informations Personnelles',
    description: 'Renseignez vos informations de base'
  },
  {
    id: 2,
    title: 'Détails Professionnels',
    description: 'Parlez-nous de votre expertise'
  },
  {
    id: 3,
    title: 'Intégration GitHub',
    description: 'Connectez vos projets GitHub'
  },
  {
    id: 4,
    title: 'Projets en Production',
    description: 'Ajoutez vos projets déployés'
  },
  {
    id: 5,
    title: 'Plateformes Freelance',
    description: 'Connectez vos profils freelance'
  },
  {
    id: 6,
    title: 'Personnalisation',
    description: 'Customisez votre profil'
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
    backgroundImage: null,
    profession: '',
    bio: '',
    skills: [],
    portfolioWebsite: '',
    githubProfile: '',
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
            backgroundImage: null
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

  // Redirect to login if not authenticated
  if (isPending || isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session?.user) {
    router.push('/login')
    return null
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
      backgroundImage: formData.backgroundImage
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <ProfilNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {isEditMode ? 'Modifier votre profil' : 'Créer votre profil'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Étape {currentStep} sur {steps.length}
                {isEditMode && (
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    • Mode édition
                  </span>
                )}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Complété
              </div>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-3 mb-2" />
          
          <div className="flex justify-between text-sm">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  currentStep >= step.id
                    ? 'text-primary font-medium'
                    : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    currentStep >= step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {step.id}
                </div>
                <div className="hidden sm:block">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-xs opacity-60">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStep()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
              </Button>
              
              <div className="flex space-x-3">
                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    className="flex items-center space-x-2"
                  >
                    <span>Suivant</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Création en cours...
                      </>
                    ) : (
                      isEditMode ? 'Mettre à jour le profil' : 'Créer le profil'
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
