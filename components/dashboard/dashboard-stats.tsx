'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Eye, 
  Users, 
  Star, 
  TrendingUp, 
  Code, 
  GitBranch, 
  Calendar,
  BarChart3,
  MousePointerClick,
  Link as LinkIcon,
  RefreshCw
} from 'lucide-react'
import { getUserStats } from '@/lib/actions/user-actions'
import Link from 'next/link'

interface DashboardStatsProps {
  userId: string
}

interface Stats {
  skillsCount: number
  reposCount: number
  profileViews: number
  monthlyViews: number
  linkClicks: number
  monthlyClicks: number
  weeklyClicks: number
  lastUpdated: Date
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchStats = async () => {
    const data = await getUserStats(userId)
    if (data) {
      setStats(data)
    }
    setIsLoading(false)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchStats()
    setIsRefreshing(false)
  }

  useEffect(() => {
    fetchStats()
  }, [userId])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      title: 'Profile Views',
      value: stats?.monthlyViews || 0,
      description: 'This month',
      icon: Eye,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      title: 'Skills',
      value: stats?.skillsCount || 0,
      description: 'Technologies mastered',
      icon: Code,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20'
    },
    {
      title: 'Featured Projects',
      value: stats?.reposCount || 0,
      description: 'GitHub Repositories',
      icon: GitBranch,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      title: 'Link Clicks',
      value: stats?.weeklyClicks || 0,
      description: 'This week',
      icon: MousePointerClick,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20'
    },
    {
      title: 'Total Link Clicks',
      value: stats?.linkClicks || 0,
      description: 'All time',
      icon: LinkIcon,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20'
    },
    {
      title: 'Total Profile Views',
      value: stats?.profileViews || 0,
      description: 'All time views',
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Performance Overview
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                          {stat.value}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>
            Your latest interactions and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: 'Profile Visited',
                details: '3 new views since yesterday',
                time: '2 hours ago',
                icon: Eye,
                color: 'text-blue-600'
              },
              {
                action: 'Link Clicked',
                details: 'Someone visited your portfolio',
                time: '4 hours ago',
                icon: MousePointerClick,
                color: 'text-green-600'
              },
              {
                action: 'Profile Shared',
                details: 'Your profile was shared on LinkedIn',
                time: '1 day ago',
                icon: LinkIcon,
                color: 'text-purple-600'
              }
            ].map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className={`p-2 rounded-full bg-white dark:bg-slate-700`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {activity.action}
                    </p>
                    <p className="text-xs text-slate-500">
                      {activity.details}
                    </p>
                  </div>
                  <div className="text-xs text-slate-400">
                    {activity.time}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-200">
            💡 Tips to optimize your profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  Add more projects
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Profiles with 3+ projects receive 40% more views
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  Connect more platforms
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Diversify your potential client sources
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/create-profil">
                Improve my profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardStats