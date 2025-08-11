import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const createReviewSchema = z.object({
  userId: z.string().min(1, 'L\'identifiant utilisateur est requis'),
  rating: z.number().int().min(1).max(5),
  reviewerName: z.string().min(1).max(100),
  reviewerEmail: z.string().email().optional().or(z.literal('')),
  comment: z.string().max(1000).optional().or(z.literal('')),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validatedData = createReviewSchema.parse({
      ...body,
      reviewerEmail: body.reviewerEmail || undefined,
      comment: body.comment || undefined,
    })

    // Check if the user exists and has reviews enabled
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId },
      select: { id: true, enableReviews: true, profilePublic: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      )
    }

    if (!user.enableReviews) {
      return NextResponse.json(
        { error: 'Les avis ne sont pas activés pour ce profil' },
        { status: 403 }
      )
    }

    if (!user.profilePublic) {
      return NextResponse.json(
        { error: 'Le profil doit être public pour recevoir des avis' },
        { status: 403 }
      )
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        userId: validatedData.userId,
        rating: validatedData.rating,
        reviewerName: validatedData.reviewerName,
        reviewerEmail: validatedData.reviewerEmail || null,
        comment: validatedData.comment || null,
      },
    })

    return NextResponse.json(
      { 
        message: 'Avis créé avec succès',
        review: {
          id: review.id,
          rating: review.rating,
          reviewerName: review.reviewerName,
          comment: review.comment,
          createdAt: review.createdAt
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur lors de la création de l\'avis:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const isOwner = searchParams.get('isOwner') === 'true'

  if (!userId) {
    return NextResponse.json(
      { error: 'userId requis' },
      { status: 400 }
    )
  }

  try {
    // Get reviews for the user
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId,
        // Show all reviews if the owner is requesting, otherwise only visible ones
        ...(isOwner ? {} : { isVisible: true }),
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        reviewerName: true,
        reviewerEmail: isOwner ? true : false,
        createdAt: true,
        updatedAt: true,
        isVerified: true,
        isVisible: isOwner ? true : false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Calculate statistics
    const totalReviews = reviews.length
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0

    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    }

    return NextResponse.json({
      reviews,
      statistics: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
      },
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}