import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { error: 'userId requis' },
      { status: 400 }
    )
  }

  try {
    // Get all reviews for stats calculation
    const allReviews = await prisma.review.findMany({
      where: { userId },
      select: {
        rating: true,
        isVisible: true,
        createdAt: true,
      }
    })

    const totalReviews = allReviews.length
    const totalVisible = allReviews.filter(r => r.isVisible).length
    const averageRating = totalReviews > 0 
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0

    // Count recent reviews (this month)
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const recentReviews = allReviews.filter(
      review => new Date(review.createdAt) >= startOfMonth
    ).length

    return NextResponse.json({
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      totalVisible,
      recentReviews
    })
  } catch (error) {
    console.error('Error fetching review stats:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}