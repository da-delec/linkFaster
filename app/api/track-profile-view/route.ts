import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      )
    }

    // Get visitor info
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null
    const userAgent = headersList.get('user-agent') || null
    const referrer = headersList.get('referer') || null

    // Check if the same IP has viewed this profile in the last hour to avoid spam
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    
    if (ipAddress) {
      const recentView = await prisma.profileView.findFirst({
        where: {
          userId,
          ipAddress,
          createdAt: {
            gte: oneHourAgo
          }
        }
      })

      if (recentView) {
        return NextResponse.json({ success: true, message: 'Already counted' })
      }
    }

    // Record the profile view
    await prisma.profileView.create({
      data: {
        userId,
        ipAddress,
        userAgent,
        referrer
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking profile view:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}