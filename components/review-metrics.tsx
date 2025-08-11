'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Star, MessageCircle, Users, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Review {
  id: string
  rating: number
  comment: string | null
  reviewerName: string
  createdAt: string
  isVerified: boolean
}

interface ReviewStatistics {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

interface ReviewMetricsProps {
  reviews: Review[]
  statistics: ReviewStatistics
  theme: {
    colors: any
    colorTheme?: string
    isDarkTheme?: boolean
    isGlassTheme?: boolean
    isGradientTheme?: boolean
  }
}

const ReviewMetrics = ({ reviews, statistics, theme }: ReviewMetricsProps) => {
  const { colors, colorTheme = 'blue', isDarkTheme = false, isGlassTheme = false, isGradientTheme = false } = theme
  const { totalReviews, averageRating, ratingDistribution } = statistics

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'emerald':
        return {
          primary: 'bg-emerald-600 hover:bg-emerald-700',
          secondary: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800',
          accent: 'text-emerald-600 dark:text-emerald-400'
        }
      case 'purple':
        return {
          primary: 'bg-purple-600 hover:bg-purple-700',
          secondary: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800',
          accent: 'text-purple-600 dark:text-purple-400'
        }
      case 'amber':
        return {
          primary: 'bg-amber-600 hover:bg-amber-700',
          secondary: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800',
          accent: 'text-amber-600 dark:text-amber-400'
        }
      case 'rose':
        return {
          primary: 'bg-rose-600 hover:bg-rose-700',
          secondary: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800',
          accent: 'text-rose-600 dark:text-rose-400'
        }
      case 'midnight':
      case 'obsidian':
      case 'void':
      case 'carbon':
        return {
          primary: 'bg-slate-800 hover:bg-slate-900',
          secondary: 'bg-slate-900/80 border-slate-700',
          accent: 'text-slate-300'
        }
      case 'glass-blue':
        return {
          primary: 'bg-blue-600/80 backdrop-blur-sm border border-blue-500/30',
          secondary: 'bg-blue-50/20 backdrop-blur-sm border border-blue-200/30',
          accent: 'text-blue-600 dark:text-blue-400'
        }
      case 'glass-purple':
        return {
          primary: 'bg-purple-600/80 backdrop-blur-sm border border-purple-500/30',
          secondary: 'bg-purple-50/20 backdrop-blur-sm border border-purple-200/30',
          accent: 'text-purple-600 dark:text-purple-400'
        }
      case 'glass-emerald':
        return {
          primary: 'bg-emerald-600/80 backdrop-blur-sm border border-emerald-500/30',
          secondary: 'bg-emerald-50/20 backdrop-blur-sm border border-emerald-200/30',
          accent: 'text-emerald-600 dark:text-emerald-400'
        }
      case 'aurora':
        return {
          primary: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 shadow-2xl shadow-emerald-500/20',
          secondary: 'bg-white/15 backdrop-blur-2xl border border-emerald-200/30 shadow-2xl shadow-emerald-500/20',
          accent: 'text-emerald-400'
        }
      case 'cosmic':
        return {
          primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl shadow-purple-500/40',
          secondary: 'bg-gradient-to-br from-indigo-900/40 via-purple-900/50 to-pink-900/40 backdrop-blur-xl border border-indigo-400/30 shadow-2xl shadow-purple-500/40',
          accent: 'text-indigo-400'
        }
      case 'tropical':
        return {
          primary: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg',
          secondary: 'bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl',
          accent: 'text-orange-600'
        }
      default:
        return {
          primary: 'bg-blue-600 hover:bg-blue-700',
          secondary: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
          accent: 'text-blue-600 dark:text-blue-400'
        }
    }
  }

  const themeColors = getThemeColors(colorTheme)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? isGradientTheme ? 'text-orange-400 fill-orange-400' : 'text-yellow-400 fill-yellow-400'
            : index < rating
            ? isGradientTheme ? 'text-orange-400 fill-orange-400 opacity-50' : 'text-yellow-400 fill-yellow-400 opacity-50'
            : isGradientTheme ? 'text-slate-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  const getRatingPercentage = (ratingCount: number) => {
    return totalReviews > 0 ? (ratingCount / totalReviews) * 100 : 0
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (totalReviews === 0) {
    return (
      <Card className={`w-full ${
        isGradientTheme 
          ? themeColors.secondary
          : `${themeColors.secondary} ${isDarkTheme ? 'bg-gray-800/60 border-gray-700' : ''} ${isGlassTheme ? 'backdrop-blur-md' : ''}`
      }`}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageCircle className={`w-16 h-16 mb-4 ${
            isGradientTheme ? 'text-blue-400' : isDarkTheme ? 'text-gray-400' : 'text-gray-400 dark:text-gray-600'
          }`} />
          <h3 className={`text-lg font-semibold mb-2 ${
            isGradientTheme ? 'text-white' : isDarkTheme ? 'text-white' : 'text-gray-600 dark:text-gray-400'
          }`}>
            Aucun avis pour le moment
          </h3>
          <p className={`text-sm text-center ${
            isGradientTheme ? 'text-slate-200' : isDarkTheme ? 'text-gray-400' : 'text-gray-500 dark:text-gray-500'
          }`}>
            Soyez le premier à laisser un avis !
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Overall Rating Card */}
      <Card className={`${
        colorTheme === 'aurora'
          ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl'
          : colorTheme === 'cosmic'
            ? themeColors.secondary
          : isGradientTheme 
            ? themeColors.secondary
            : `${themeColors.secondary} ${isDarkTheme ? 'bg-gray-800/60 border-gray-700' : ''} ${isGlassTheme ? 'backdrop-blur-md' : ''}`
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${
            ['aurora', 'cosmic'].includes(colorTheme) 
              ? 'text-white drop-shadow-lg' 
              : isGradientTheme 
                ? 'text-white' 
                : isDarkTheme 
                  ? 'text-white' 
                  : ''
          }`}>
            <Star className={`w-5 h-5 ${isGradientTheme ? 'text-orange-400' : 'text-yellow-400'}`} />
            <span>Évaluations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="text-center space-y-2">
              <div className={`text-4xl font-bold ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'text-white drop-shadow-lg' 
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}>
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center space-x-1">
                {renderStars(averageRating)}
              </div>
              <div className={`text-sm ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'text-white/80 drop-shadow' 
                  : isDarkTheme 
                    ? 'text-gray-400' 
                    : 'text-muted-foreground'
              }`}>
                Basé sur {totalReviews} avis
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className={`text-sm ${
                      ['aurora', 'cosmic'].includes(colorTheme) 
                        ? 'text-white/90 drop-shadow' 
                        : ''
                    }`}>{rating}</span>
                    <Star className={`w-3 h-3 ${
                      ['aurora', 'cosmic'].includes(colorTheme) 
                        ? 'text-white fill-white' 
                        : 'text-yellow-400 fill-yellow-400'
                    }`} />
                  </div>
                  <Progress
                    value={getRatingPercentage(ratingDistribution[rating as keyof typeof ratingDistribution])}
                    className="flex-1 h-2"
                  />
                  <div className={`text-sm w-8 text-right ${
                    ['aurora', 'cosmic'].includes(colorTheme) 
                      ? 'text-white/80 drop-shadow' 
                      : isDarkTheme 
                        ? 'text-gray-400' 
                        : 'text-muted-foreground'
                  }`}>
                    {ratingDistribution[rating as keyof typeof ratingDistribution]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className={`${
          ['aurora', 'cosmic'].includes(colorTheme) 
            ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl' 
            : colors.secondary
        } ${isDarkTheme ? 'bg-gray-800/60 border-gray-700' : ''} ${isGlassTheme ? 'backdrop-blur-md' : ''}`}>
          <CardContent className="flex items-center space-x-4 pt-6">
            <Users className={`w-8 h-8 ${
              ['aurora', 'cosmic'].includes(colorTheme) 
                ? 'text-white drop-shadow' 
                : colors.accent
            }`} />
            <div>
              <div className={`text-2xl font-bold ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'text-white drop-shadow-lg' 
                  : isDarkTheme 
                    ? 'text-white' 
                    : ''
              }`}>{totalReviews}</div>
              <div className={`text-sm ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'text-white/80 drop-shadow' 
                  : isDarkTheme 
                    ? 'text-gray-400' 
                    : 'text-muted-foreground'
              }`}>Avis total</div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          ['aurora', 'cosmic'].includes(colorTheme) 
            ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl' 
            : colors.secondary
        } ${isDarkTheme ? 'bg-gray-800/60 border-gray-700' : ''} ${isGlassTheme ? 'backdrop-blur-md' : ''}`}>
          <CardContent className="flex items-center space-x-4 pt-6">
            <TrendingUp className={`w-8 h-8 ${
              ['aurora', 'cosmic'].includes(colorTheme) 
                ? 'text-white drop-shadow' 
                : colors.accent
            }`} />
            <div>
              <div className={`text-2xl font-bold ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'text-white drop-shadow-lg' 
                  : isDarkTheme 
                    ? 'text-white' 
                    : ''
              }`}>{averageRating.toFixed(1)}</div>
              <div className={`text-sm ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'text-white/80 drop-shadow' 
                  : isDarkTheme 
                    ? 'text-gray-400' 
                    : 'text-muted-foreground'
              }`}>Note moyenne</div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          ['aurora', 'cosmic'].includes(colorTheme) 
            ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl' 
            : colors.secondary
        } ${isDarkTheme ? 'bg-gray-800/60 border-gray-700' : ''} ${isGlassTheme ? 'backdrop-blur-md' : ''}`}>
          <CardContent className="flex items-center space-x-4 pt-6">
            <MessageCircle className={`w-8 h-8 ${
              ['aurora', 'cosmic'].includes(colorTheme) 
                ? 'text-white drop-shadow' 
                : colors.accent
            }`} />
            <div>
              <div className={`text-2xl font-bold ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'text-white drop-shadow-lg' 
                  : isDarkTheme 
                    ? 'text-white' 
                    : ''
              }`}>
                {reviews.filter(r => r.comment && r.comment.trim()).length}
              </div>
              <div className={`text-sm ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'text-white/80 drop-shadow' 
                  : isDarkTheme 
                    ? 'text-gray-400' 
                    : 'text-muted-foreground'
              }`}>Avec commentaire</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card className={`${
        colorTheme === 'aurora'
          ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl'
          : colorTheme === 'cosmic'
            ? themeColors.secondary 
          : colors.secondary
      } ${isDarkTheme ? 'bg-gray-800/60 border-gray-700' : ''} ${isGlassTheme ? 'backdrop-blur-md' : ''}`}>
        <CardHeader>
          <CardTitle className={`${
            ['aurora', 'cosmic'].includes(colorTheme) 
              ? 'text-white drop-shadow-lg' 
              : isDarkTheme 
                ? 'text-white' 
                : ''
          }`}>Avis récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className={`border-b pb-4 last:border-b-0 ${
                ['aurora', 'cosmic'].includes(colorTheme) 
                  ? 'border-white/20' 
                  : isDarkTheme 
                    ? 'border-gray-600' 
                    : 'border-gray-200 dark:border-gray-700'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`font-medium ${
                      ['aurora', 'cosmic'].includes(colorTheme) 
                        ? 'text-white drop-shadow-md' 
                        : isDarkTheme 
                          ? 'text-white' 
                          : ''
                    }`}>{review.reviewerName}</div>
                    {review.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        Vérifié
                      </Badge>
                    )}
                  </div>
                  <div className={`text-sm ${
                    ['aurora', 'cosmic'].includes(colorTheme) 
                      ? 'text-white/80 drop-shadow' 
                      : isDarkTheme 
                        ? 'text-gray-400' 
                        : 'text-muted-foreground'
                  }`}>
                    {formatDate(review.createdAt)}
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(review.rating)}
                  <span className={`text-sm ml-2 ${
                    ['aurora', 'cosmic'].includes(colorTheme) 
                      ? 'text-white/80 drop-shadow' 
                      : isDarkTheme 
                        ? 'text-gray-400' 
                        : 'text-muted-foreground'
                  }`}>
                    {review.rating}/5
                  </span>
                </div>
                {review.comment && review.comment.trim() && (
                  <p className={`text-sm ${
                    ['aurora', 'cosmic'].includes(colorTheme) 
                      ? 'text-white/90 drop-shadow' 
                      : isDarkTheme 
                        ? 'text-gray-300' 
                        : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReviewMetrics