import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      )
    }

    const now = new Date()
    const currentWeekStart = getWeekStart(now)

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { weekStart: true }
      })

      if (!user) {
        throw new Error('User not found')
      }

      const shouldResetWeekly = !user.weekStart || user.weekStart.getTime() !== currentWeekStart.getTime()

      await tx.user.update({
        where: { id: userId },
        data: {
          totalLinkClicks: { increment: 1 },
          weeklyClicks: shouldResetWeekly ? 1 : { increment: 1 },
          weekStart: shouldResetWeekly ? currentWeekStart : undefined
        }
      })
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