'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Crown, CreditCard, Trash2, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

interface SubscriptionData {
  isPremium: boolean
  subscription: {
    id: string
    status: string
    currentPeriodStart: string
    currentPeriodEnd: string
    cancelAtPeriodEnd: boolean
    productName: string
    amount: number
    currency: string
    interval: string
  } | null
}

interface SubscriptionDetailsProps {
  stripeCustomerId: string | null
  isPremium: boolean
}

// Composant pour le bouton avec état de chargement
function ManageSubscriptionButton({ onOpenPortal }: { onOpenPortal: () => void }) {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      onClick={onOpenPortal}
      disabled={pending}
      variant="outline" 
      className="w-full"
    >
      {pending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <CreditCard className="w-4 h-4 mr-2" />
      )}
      {pending ? 'Ouverture...' : 'Gérer l\'abonnement'}
    </Button>
  )
}

export function SubscriptionDetails({ stripeCustomerId, isPremium }: SubscriptionDetailsProps) {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isPremium && stripeCustomerId) {
      fetchSubscriptionDetails()
    } else {
      setSubscriptionData({ isPremium: false, subscription: null })
      setLoading(false)
    }
  }, [isPremium, stripeCustomerId])

  const fetchSubscriptionDetails = async () => {
    try {
      const response = await fetch('/api/stripe/subscription')
      if (response.ok) {
        const data = await response.json()
        setSubscriptionData(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des détails d\'abonnement:', error)
    } finally {
      setLoading(false)
    }
  }

  const openPortal = async () => {
    try {
      if (!stripeCustomerId) {
        toast.error('ID client Stripe manquant')
        return
      }
      
      if (!isPremium) {
        toast.error('Vous n\'avez pas d\'abonnement')
        return
      }

      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: stripeCustomerId })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.url) {
          window.location.href = data.url
        } else {
          toast.error('URL du portail non reçue')
        }
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Erreur lors de l\'ouverture du portail')
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du portail:', error)
      toast.error('Erreur lors de l\'ouverture du portail')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (!subscriptionData?.isPremium) {
    return (
      <div className="text-center space-y-4">
        <div className="text-gray-600 dark:text-gray-400">
          <Crown className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Compte gratuit</p>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
          <Crown className="w-4 h-4 mr-2" />
          Passer au Premium
        </Button>
      </div>
    )
  }

  const { subscription } = subscriptionData

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </Badge>
        {subscription?.cancelAtPeriodEnd && (
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            Expire bientôt
          </Badge>
        )}
      </div>
      
      {subscription && (
        <div className="space-y-3 text-sm">
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Plan actuel
            </label>
            <p className="text-gray-600 dark:text-gray-400">
              {subscription.productName}
            </p>
          </div>

          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Prix
            </label>
            <p className="text-gray-600 dark:text-gray-400">
              {formatPrice(subscription.amount, subscription.currency)}/{subscription.interval === 'month' ? 'mois' : 'an'}
            </p>
          </div>

          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              {subscription.cancelAtPeriodEnd ? 'Expire le' : 'Prochaine facturation'}
            </label>
            <p className="text-gray-600 dark:text-gray-400">
              {formatDate(subscription.currentPeriodEnd)}
            </p>
          </div>

          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Abonnement depuis
            </label>
            <p className="text-gray-600 dark:text-gray-400">
              {formatDate(subscription.currentPeriodStart)}
            </p>
          </div>
        </div>
      )}

      <Separator />

      {/* Bouton pour ouvrir le portail Stripe */}
      <ManageSubscriptionButton onOpenPortal={openPortal} />

      {subscription && !subscription.cancelAtPeriodEnd && (
        <form 
          action="/api/stripe/cancel" 
          method="POST" 
          onSubmit={(e) => {
            if (!confirm('Êtes-vous sûr de vouloir annuler votre abonnement ? Il restera actif jusqu\'à la fin de la période de facturation.')) {
              e.preventDefault()
            }
          }}
        >
          <input type="hidden" name="customerId" value={stripeCustomerId || ''} />
          <Button 
            type="submit" 
            variant="destructive" 
            size="sm"
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Annuler l'abonnement
          </Button>
        </form>
      )}
    </div>
  )
}