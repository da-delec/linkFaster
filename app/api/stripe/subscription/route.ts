import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function GET(request: NextRequest) {
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

    const user = session.user

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true, isPremium: true }
    })

    if (!fullUser?.stripeCustomerId || !fullUser.isPremium) {
      return NextResponse.json({
        isPremium: false,
        subscription: null
      })
    }

    // Récupérer les informations d'abonnement de Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: fullUser.stripeCustomerId,
      status: 'active',
      limit: 1,
    })

    if (subscriptions.data.length === 0) {
      return NextResponse.json({
        isPremium: false,
        subscription: null
      })
    }

    const subscription = subscriptions.data[0]
    const product = await stripe.products.retrieve(subscription.items.data[0].price.product as string)

    return NextResponse.json({
      isPremium: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        productName: product.name,
        amount: subscription.items.data[0].price.unit_amount! / 100,
        currency: subscription.items.data[0].price.currency,
        interval: subscription.items.data[0].price.recurring?.interval,
      }
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des informations d\'abonnement:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}