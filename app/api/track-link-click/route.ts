import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { userId, linkType, linkUrl } = await request.json()

    if (!userId || !linkType || !linkUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get visitor info
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null
    const userAgent = headersList.get('user-agent') || null

    // Record the link click
    await prisma.linkClick.create({
      data: {
        userId,
        linkType,
        linkUrl,
        ipAddress,
        userAgent
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking link click:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}