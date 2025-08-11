import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion:'2025-07-30.basil'
})

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

    // Récupérer les données JSON de la requête
    const body = await request.json()
    const customerId = body.customerId

    if (!customerId) {
      return NextResponse.json(
        { error: 'ID client Stripe manquant' },
        { status: 400 }
      )
    }

    // Construire l'URL de retour dynamiquement
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const returnUrl = `${protocol}://${host}/profil`

    console.log('[returnUrl]', returnUrl)
    
    // Créer une session pour le portail client Stripe
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    // Retourner l'URL du portail au lieu de rediriger
    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Erreur lors de la création de la session portail Stripe:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}