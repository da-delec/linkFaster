'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { QrCode } from 'lucide-react'
import QRCode from 'qrcode'

interface QrCodeActionProps {
  profileSlug: string | null
  isProfilePublic: boolean
  disabled?: boolean
  userPhotoUrl?: string | null
  colorTheme?: string
}

const QrCodeAction = ({ profileSlug, isProfilePublic, disabled, userPhotoUrl, colorTheme = 'blue' }: QrCodeActionProps) => {
  const [qrCode, setQrCode] = useState<string>('')
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false)

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'emerald': return { dark: '#059669', light: '#ecfdf5' }
      case 'purple': return { dark: '#7c3aed', light: '#faf5ff' }
      case 'amber': return { dark: '#d97706', light: '#fefbeb' }
      case 'rose': return { dark: '#e11d48', light: '#fff1f2' }
      case 'teal': return { dark: '#0d9488', light: '#f0fdfa' }
      case 'orange': return { dark: '#ea580c', light: '#fff7ed' }
      case 'midnight':
      case 'obsidian':
      case 'void':
      case 'carbon': return { dark: '#1e293b', light: '#f8fafc' }
      case 'glass-blue': return { dark: '#2563eb', light: '#eff6ff' }
      case 'glass-purple': return { dark: '#7c3aed', light: '#faf5ff' }
      case 'glass-emerald': return { dark: '#059669', light: '#ecfdf5' }
      case 'sunset': return { dark: '#ea580c', light: '#fff7ed' }
      case 'ocean': return { dark: '#0891b2', light: '#f0f9ff' }
      case 'forest': return { dark: '#16a34a', light: '#f0fdf4' }
      default: return { dark: '#2563eb', light: '#eff6ff' }
    }
  }

  const generateCustomQrCode = async () => {
    if (!profileSlug) return
    
    const publicUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${profileSlug}`
    const colors = getThemeColors(colorTheme)
    
    try {
      // Generate base QR code with theme colors
      const qr = await QRCode.toDataURL(publicUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: colors.dark,
          light: colors.light
        },
        errorCorrectionLevel: 'H' // High level to allow adding an image
      })
      
      // If we have a profile photo, create a custom QR code
      if (userPhotoUrl) {
        const customQr = await createCustomQrWithProfileImage(qr, userPhotoUrl, colors)
        setQrCode(customQr)
      } else {
        setQrCode(qr)
      }
      
      setIsQrDialogOpen(true)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const createCustomQrWithProfileImage = (qrDataUrl: string, profileImageUrl: string, colors: {dark: string, light: string}): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject('Canvas context not available')
        return
      }

      const qrImage = new Image()
      qrImage.crossOrigin = 'anonymous'
      
      qrImage.onload = () => {
        canvas.width = qrImage.width
        canvas.height = qrImage.height
        
        // Draw the QR code
        ctx.drawImage(qrImage, 0, 0)
        
        // Prepare profile image
        const profileImage = new Image()
        profileImage.crossOrigin = 'anonymous'
        
        profileImage.onload = () => {
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const profileSize = canvas.width * 0.15 // 15% of QR code size
          
          // Create a white circular background for the profile image
          ctx.save()
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(centerX, centerY, profileSize + 8, 0, Math.PI * 2)
          ctx.fill()
          
          // Create a circular mask for the profile image
          ctx.beginPath()
          ctx.arc(centerX, centerY, profileSize, 0, Math.PI * 2)
          ctx.clip()
          
          // Draw the profile image
          ctx.drawImage(
            profileImage,
            centerX - profileSize,
            centerY - profileSize,
            profileSize * 2,
            profileSize * 2
          )
          
          ctx.restore()
          
          // Add a circular border
          ctx.strokeStyle = colors.dark
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(centerX, centerY, profileSize + 6, 0, Math.PI * 2)
          ctx.stroke()
          
          resolve(canvas.toDataURL())
        }
        
        profileImage.onerror = () => {
          // If profile image cannot be loaded, return simple QR code
          resolve(qrDataUrl)
        }
        
        profileImage.src = profileImageUrl
      }
      
      qrImage.onerror = () => reject('Failed to load QR code image')
      qrImage.src = qrDataUrl
    })
  }

  const generateQrCode = generateCustomQrCode

  const isEnabled = profileSlug && isProfilePublic && !disabled

  return (
    <>
      <Button
        onClick={generateQrCode}
        disabled={!isEnabled}
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
      >
        <QrCode className="w-5 h-5 mr-2" />
        Generate QR Code
      </Button>

      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center">Custom QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6 pt-4">
            {qrCode && (
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 shadow-lg">
                  <img src={qrCode} alt="Custom QR Code" className="w-72 h-72 rounded-xl" />
                </div>
                {userPhotoUrl && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            )}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {userPhotoUrl ? 'QR Code with your profile photo' : 'QR Code of your public profile'}
              </p>
              <p className="text-xs text-muted-foreground">
                Scan this code to access your profile
              </p>
            </div>
            {profileSlug && (
              <div className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border">
                <p className="text-xs font-mono text-center break-all text-gray-600 dark:text-gray-400">
                  {typeof window !== 'undefined' && `${window.location.origin}/${profileSlug}`}
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  if (qrCode) {
                    const link = document.createElement('a')
                    link.download = `qrcode-${profileSlug}.png`
                    link.href = qrCode
                    link.click()
                  }
                }}
                variant="outline"
                size="sm"
              >
                Download
              </Button>
              <Button
                onClick={() => {
                  if (navigator.share && qrCode) {
                    // Convert data URL to blob for sharing
                    fetch(qrCode)
                      .then(res => res.blob())
                      .then(blob => {
                        const file = new File([blob], `qrcode-${profileSlug}.png`, { type: 'image/png' })
                        navigator.share({
                          title: 'My LinkFaster QR Code',
                          text: 'Scan this QR code to see my profile!',
                          files: [file]
                        })
                      })
                  }
                }}
                variant="default"
                size="sm"
                disabled={!navigator.share}
              >
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default QrCodeAction