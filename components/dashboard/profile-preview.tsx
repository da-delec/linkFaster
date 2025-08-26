'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Eye, 
  ExternalLink, 
  Edit3, 
  Settings, 
  Globe,
  Users,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'
import { getProfileCompletionDetails, type ProfileCompletionDetail } from '@/lib/actions/profile-completion'

interface User {
  id: string
  name: string
  email: string
  photoUrl: string | null
  profileSlug: string | null
  profileCompleted: boolean
  profilePublic: boolean
  profession?: string | null
  skillsCount?: number
  repositoriesCount?: number
}

interface ProfilePreviewProps {
  user: User
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ user }) => {
  const profileUrl = user.profileSlug ? `/${user.profileSlug}` : null
  const [completionDetails, setCompletionDetails] = useState<ProfileCompletionDetail | null>(null)

  useEffect(() => {
    const fetchCompletionDetails = async () => {
      const details = await getProfileCompletionDetails(user.id)
      setCompletionDetails(details)
    }

    fetchCompletionDetails()
  }, [user.id])
  
  const getProfileStatus = () => {
    if (!user.profileCompleted) {
      return {
        status: 'incomplete',
        text: 'Profile Incomplete',
        description: 'Complete your profile to make it public',
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
        icon: Clock
      }
    }
    
    if (!user.profilePublic) {
      return {
        status: 'private',
        text: 'Private Profile',
        description: 'Your profile is only visible to you',
        color: 'text-gray-600 dark:text-gray-400',
        bgColor: 'bg-gray-50 dark:bg-gray-950/20',
        icon: AlertCircle
      }
    }
    
    return {
      status: 'public',
      text: 'Public Profile',
      description: 'Your profile is visible to everyone',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      icon: CheckCircle
    }
  }

  const profileStatus = getProfileStatus()
  const StatusIcon = profileStatus.icon

  return (
    <div className="space-y-6">
      {/* Profile Status Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Profile Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg ${profileStatus.bgColor} border`}>
            <div className="flex items-center space-x-3">
              <StatusIcon className={`w-5 h-5 ${profileStatus.color}`} />
              <div>
                <p className={`font-medium ${profileStatus.color}`}>
                  {profileStatus.text}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {profileStatus.description}
                </p>
              </div>
            </div>
          </div>
          
          {user.profileCompleted && user.profileSlug && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Your public link:
              </p>
              <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-800 rounded text-sm">
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600 dark:text-slate-400 truncate flex-1">
                  linkfaster.com/{user.profileSlug}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Preview */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Profile Preview</CardTitle>
            {user.profileSlug && user.profileCompleted ? (
              <Button asChild size="sm" variant="outline">
                <Link 
                  href={`/${user.profileSlug}`}
                  target="_blank"
                  className="flex items-center space-x-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </Button>
            ) : (
              <Button size="sm" variant="outline" disabled>
                <Eye className="w-3 h-3 mr-1" />
                <span>Unavailable</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mini Profile Preview */}
          <div className="text-center space-y-3 p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg">
            <Avatar className="w-16 h-16 mx-auto">
              <AvatarImage src={user.photoUrl || undefined} alt={user.name} />
              <AvatarFallback className="bg-blue-600 text-white">
                {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {user.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {user.profession || 'Freelance'}
              </p>
            </div>
            
            {user.skillsCount && user.skillsCount > 0 ? (
              <div className="flex justify-center space-x-2">
                <Badge variant="secondary" className="text-xs">{user.skillsCount} skills</Badge>
                {user.repositoriesCount && user.repositoriesCount > 0 && (
                  <Badge variant="secondary" className="text-xs">{user.repositoriesCount} projects</Badge>
                )}
              </div>
            ) : (
              <div className="flex justify-center">
                <Badge variant="outline" className="text-xs text-slate-400">
                  Profile to complete
                </Badge>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded">
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {user.skillsCount || 0}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Skills</p>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded">
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {user.repositoriesCount || 0}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Projects</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/create-profil">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
          
          <Button className="w-full justify-start" variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Invite Contacts
          </Button>
        </CardContent>
      </Card>

      {/* Profile Completion */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Profile Completion</CardTitle>
          <CardDescription>
            Optimize your visibility by completing these sections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {completionDetails ? (
            <>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{completionDetails.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${completionDetails.percentage}%` }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    {completionDetails.basicInfo ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                    <span>Basic Information</span>
                  </div>
                  <Badge variant="secondary" className={completionDetails.basicInfo ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                    {completionDetails.basicInfo ? "Complete" : "To Do"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    {completionDetails.skillsProjects ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                    <span>Skills & Projects</span>
                  </div>
                  <Badge variant="secondary" className={completionDetails.skillsProjects ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                    {completionDetails.skillsProjects ? "Complete" : "To Do"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    {completionDetails.customBio ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                    <span>Custom Bio</span>
                  </div>
                  <Badge variant="secondary" className={completionDetails.customBio ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                    {completionDetails.customBio ? "Complete" : "To Do"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    {completionDetails.platforms ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                    <span>Platforms</span>
                  </div>
                  <Badge variant="secondary" className={completionDetails.platforms ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                    {completionDetails.platforms ? "Complete" : "To Do"}
                  </Badge>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePreview