import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const reviewId = id
    const { isVisible } = await request.json()

    if (typeof isVisible !== 'boolean') {
      return NextResponse.json(
        { error: 'isVisible doit être un booléen' },
        { status: 400 }
      )
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { isVisible },
      select: {
        id: true,
        isVisible: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      message: 'Avis mis à jour avec succès',
      review: updatedReview
    })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'avis' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const reviewId = id

    await prisma.review.delete({
      where: { id: reviewId }
    })

    return NextResponse.json({
      message: 'Avis supprimé avec succès'
    })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'avis' },
      { status: 500 }
    )
  }
}