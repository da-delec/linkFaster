'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProfilNotifications() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  useEffect(() => {
    const message = searchParams.get('message')
    const error = searchParams.get('error')

    if (message === 'subscription_cancelled') {
      setNotification({
        type: 'success',
        message: 'Votre abonnement a été annulé avec succès. Il restera actif jusqu\'à la fin de la période de facturation.'
      })
    } else if (error === 'cancellation_failed') {
      setNotification({
        type: 'error',
        message: 'Une erreur s\'est produite lors de l\'annulation de votre abonnement. Veuillez réessayer.'
      })
    }

    // Nettoyer l'URL
    if (message || error) {
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('message')
      newUrl.searchParams.delete('error')
      router.replace(newUrl.pathname, { scroll: false })
    }
  }, [searchParams, router])

  const handleClose = () => {
    setNotification(null)
  }

  if (!notification) return null

  return (
    <Alert className={`mb-6 ${
      notification.type === 'success' 
        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' 
        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          )}
          <AlertDescription className={
            notification.type === 'success'
              ? 'text-green-800 dark:text-green-200'
              : 'text-red-800 dark:text-red-200'
          }>
            {notification.message}
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="h-auto p-1 hover:bg-transparent"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Alert>
  )
}