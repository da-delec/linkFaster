'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfilNavbar from '@/components/ui/profil-navbar'
import DashboardStats from '@/components/dashboard/dashboard-stats'
import ProfilePreview from '@/components/dashboard/profile-preview'
import QuickActions from '@/components/dashboard/quick-actions'
import PremiumBanner from '@/components/dashboard/premium-banner'
import ReviewsManagement from '@/components/dashboard/reviews-management'
import { authClient } from '@/lib/auth-client'
import { getCurrentUserProfile } from '@/lib/actions/user-actions'

interface UserProfile {
  id: string
  name: string
  firstName: string | null
  lastName: string | null
  email: string
  photoUrl: string | null
  profileSlug: string | null
  profileCompleted: boolean
  profilePublic: boolean
  profession: string | null
  isPremium: boolean
  stripeCustomerId?: string | null
  colorTheme?: string
  skillsCount?: number
  repositoriesCount?: number
  githubProfile?: string | null
  githubCalendar?: boolean
}

const DashboardPage = () => {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  
  const { 
    data: session, 
    isPending,
    error
  } = authClient.useSession() 

  // Handle authentication and redirection
  useEffect(() => {
    if (!isPending && (error || !session)) {
      router.push('/login')
    }
  }, [error, session, isPending, router])

  // Fetch user profile data when session is loaded
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.id) {
        const profile = await getCurrentUserProfile(session.user.id)
        if (profile) {
          setUserProfile({
            id: profile.id,
            name: profile.name,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            photoUrl: profile.photoUrl,
            profileSlug: profile.profileSlug,
            profileCompleted: profile.profileCompleted,
            profilePublic: profile.profilePublic,
            profession: profile.profession,
            isPremium: profile.isPremium,
            stripeCustomerId: profile.stripeCustomerId,
            colorTheme: profile.colorTheme || 'blue',
            skillsCount: profile.skills?.length || 0,
            repositoriesCount: profile.repositories?.length || 0,
            githubProfile: profile.githubProfile || null,
            githubCalendar: profile.githubCalendar || false
          })
        } else {
          // User doesn't have a profile yet, create basic info from session
          setUserProfile({
            id: session.user.id,
            name: session.user.name || 'User',
            firstName: null,
            lastName: null,
            email: session.user.email,
            photoUrl: session.user.image || null,
            profileSlug: null,
            profileCompleted: false,
            profilePublic: false,
            profession: null,
            isPremium: false,
            stripeCustomerId: null,
            colorTheme: 'blue',
            skillsCount: 0,
            repositoriesCount: 0,
            githubProfile: null,
            githubCalendar: false
          })
        }
      }
      setIsLoadingProfile(false)
    }

    if (session?.user?.id) {
      fetchUserProfile()
    }
  }, [session])

  if (isPending || isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !session) {
    return null
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <ProfilNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Premium Banner for non-premium users */}
        {!userProfile.isPremium && (
          <PremiumBanner 
            stripeCustomerId={userProfile.stripeCustomerId}
            onUpgrade={() => {
              // Handle upgrade logic - redirect to checkout
              fetch('/api/create-checkout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  stripeCustomerId: userProfile.stripeCustomerId
                })
              })
              .then(response => response.json())
              .then(data => {
                if (data.url) {
                  window.location.href = data.url
                }
              })
              .catch(error => {
                console.error('Error creating checkout:', error)
              })
            }} />
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your freelance profile and track your performance
              </p>
            </div>
            
            <QuickActions user={userProfile} />
          </div>
        </div>

        {/* Profile Incomplete Warning */}
        {!userProfile.profileCompleted && (
          <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-yellow-600 dark:text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-200">
                  Incomplete Profile
                </h4>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  Complete your profile to make it visible to the public and start attracting clients.
                </p>
              </div>
              <a
                href="/create-profil"
                className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 transition-colors"
              >
                Complete My Profile
              </a>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Actions */}
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats userId={userProfile.id} />
            
            {/* Reviews Management Section */}
            <ReviewsManagement 
              userId={userProfile.id}
              isPremium={userProfile.isPremium}
            />
          </div>

          {/* Right Column - Profile Preview */}
          <div className="lg:col-span-1">
            <ProfilePreview user={userProfile} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
