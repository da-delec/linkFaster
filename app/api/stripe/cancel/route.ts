import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import {stripe} from '@/lib/stripe'


export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const customerId = formData.get('customerId') as string

    if (!customerId) {
      return NextResponse.json(
        { error: 'ID client Stripe manquant' },
        { status: 400 }
      )
    }

    // Récupérer les abonnements actifs du client
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    })

    // Annuler tous les abonnements actifs
    const cancelPromises = subscriptions.data.map(subscription =>
      stripe.subscriptions.cancel(subscription.id)
    )

    await Promise.all(cancelPromises)

    // Rediriger vers le profil avec un message de succès
    const redirectUrl = new URL('/profil', process.env.NEXT_PUBLIC_APP_URL!)
    redirectUrl.searchParams.set('message', 'subscription_cancelled')
    
    return NextResponse.redirect(redirectUrl.toString())
  } catch (error) {
    console.error('Erreur lors de l\'annulation de l\'abonnement:', error)
    
    // Rediriger vers le profil avec un message d'erreur
    const redirectUrl = new URL('/profil', process.env.NEXT_PUBLIC_APP_URL!)
    redirectUrl.searchParams.set('error', 'cancellation_failed')
    
    return NextResponse.redirect(redirectUrl.toString())
  }
}