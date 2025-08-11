'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Edit3, Eye, Share2, Settings, MoreVertical, ExternalLink } from 'lucide-react'
import QrCodeAction from '@/components/dashboard/qr-code-action'

interface User {
  id: string
  name: string
  email: string
  profileSlug: string | null
  profileCompleted: boolean
  profilePublic: boolean
  photoUrl?: string | null
  colorTheme?: string
}

interface QuickActionsProps {
  user: User
}

const QuickActions: React.FC<QuickActionsProps> = ({ user }) => {
  const handleShare = async () => {
    if (!user.profileSlug) return
    
    const profileUrl = `${window.location.origin}/${user.profileSlug}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Profil de ${user.name}`,
          text: `Découvrez mon profil freelance`,
          url: profileUrl
        })
      } catch (error) {
        console.log('Sharing failed:', error)
      }
    } else {
      navigator.clipboard.writeText(profileUrl)
      // TODO: Add toast notification
    }
  }

  // Don't show view profile if no slug or profile not completed
  const canViewProfile = user.profileSlug && user.profileCompleted

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* QR Code Action */}
      <QrCodeAction 
        profileSlug={user.profileSlug}
        isProfilePublic={user.profilePublic}
        userPhotoUrl={user.photoUrl}
        colorTheme={user.colorTheme}
      />

      {/* View Profile */}
      {canViewProfile ? (
        <Button asChild variant="outline">
          <Link 
            href={`/${user.profileSlug}`}
            target="_blank"
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Voir le profil public</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          <Eye className="w-4 h-4 mr-2" />
          <span>Profil non disponible</span>
        </Button>
      )}

      {/* Edit Profile */}
      <Button asChild>
        <Link 
          href="/create-profil"
          className="flex items-center space-x-2"
        >
          <Edit3 className="w-4 h-4" />
          <span>Modifier</span>
        </Link>
      </Button>

      {/* More Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem 
            onClick={handleShare} 
            className="cursor-pointer"
            disabled={!canViewProfile}
          >
            <Share2 className="mr-2 h-4 w-4" />
            <span>Partager le profil</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default QuickActions