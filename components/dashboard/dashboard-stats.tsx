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
  lastUpdated: Date
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getUserStats(userId)
      if (data) {
        setStats(data)
      }
      setIsLoading(false)
    }

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
      title: 'Vues du profil',
      value: stats?.profileViews || 0,
      description: 'Ce mois-ci',
      icon: Eye,
      trend: '+12%',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      title: 'Compétences',
      value: stats?.skillsCount || 0,
      description: 'Technologies maîtrisées',
      icon: Code,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20'
    },
    {
      title: 'Projets en vedette',
      value: stats?.reposCount || 0,
      description: 'Repositories GitHub',
      icon: GitBranch,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      title: 'Clics sur liens',
      value: 247,
      description: 'Cette semaine',
      icon: MousePointerClick,
      trend: '+8%',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20'
    },
    {
      title: 'Profil partagé',
      value: 34,
      description: 'Partages ce mois',
      icon: LinkIcon,
      trend: '+23%',
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20'
    },
    {
      title: 'Score de profil',
      value: 85,
      description: 'Complétude du profil',
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
            Aperçu des performances
          </h2>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
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
                        {stat.trend && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {stat.trend}
                          </Badge>
                        )}
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
            <span>Activité récente</span>
          </CardTitle>
          <CardDescription>
            Vos dernières interactions et mises à jour
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: 'Profil visité',
                details: '3 nouvelles vues depuis hier',
                time: 'Il y a 2 heures',
                icon: Eye,
                color: 'text-blue-600'
              },
              {
                action: 'Lien cliqué',
                details: 'Quelqu\'un a visité votre portfolio',
                time: 'Il y a 4 heures',
                icon: MousePointerClick,
                color: 'text-green-600'
              },
              {
                action: 'Profil partagé',
                details: 'Votre profil a été partagé sur LinkedIn',
                time: 'Il y a 1 jour',
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
            💡 Conseils pour optimiser votre profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  Ajoutez plus de projets
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Les profils avec 3+ projets reçoivent 40% de vues en plus
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  Connectez plus de plateformes
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Diversifiez vos sources de clients potentiels
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/create-profil">
                Améliorer mon profil
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardStats