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
  }
}

const ReviewMetrics = ({ reviews, statistics, theme }: ReviewMetricsProps) => {
  const { colors, colorTheme = 'default' } = theme
  const { totalReviews, averageRating, ratingDistribution } = statistics

  const isDarkTheme = colorTheme === 'midnight'
  const isGlassLikeTheme = ['midnight', 'glass', 'glass-aurora', 'glass-nebula', 'glass-cosmic', 'prisme-dark', 'prisme-grey'].includes(colorTheme)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : index < rating
            ? 'text-yellow-400 fill-yellow-400 opacity-50'
            : isDarkTheme 
              ? 'text-slate-400' 
              : 'text-gray-300'
        }`}
      />
    ))
  }

  const getRatingPercentage = (ratingCount: number) => {
    return totalReviews > 0 ? (ratingCount / totalReviews) * 100 : 0
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (totalReviews === 0) {
    return (
      <Card className={`w-full ${
        isDarkTheme 
          ? 'bg-slate-800 border border-slate-700'
          : colors.secondary
      }`}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageCircle className={`w-16 h-16 mb-4 ${
            'text-gray-500'
          }`} />
          <h3 className={`text-lg font-semibold mb-2 ${
            'text-gray-700'
          }`}>
            No reviews yet
          </h3>
          <p className={`text-sm text-center ${
            'text-gray-500'
          }`}>
            Be the first to leave a review!
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
            ? colors.secondary
          : isDarkTheme 
            ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl'
            : colors.secondary
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${
            isDarkTheme 
              ? 'text-slate-100' 
              : isGlassLikeTheme
              ? 'text-white drop-shadow-lg' 
              : 'text-slate-900'
          }`}>
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Reviews</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="text-center space-y-2">
              <div className={`text-4xl font-bold ${
                isDarkTheme 
                  ? 'text-yellow-400' 
                  : isGlassLikeTheme
                  ? 'text-white drop-shadow-lg' 
                  : 'text-yellow-400'
              }`}>
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center space-x-1">
                {renderStars(averageRating)}
              </div>
              <div className={`text-sm ${
                isDarkTheme 
                  ? 'text-slate-300' 
                  : isGlassLikeTheme
                  ? 'text-white/80 drop-shadow' 
                  : 'text-slate-600'
              }`}>
                Based on {totalReviews} reviews
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className={`text-sm ${
                      isDarkTheme 
                        ? 'text-slate-200' 
                        : isGlassLikeTheme
                        ? 'text-white/90 drop-shadow' 
                        : 'text-slate-900'
                    }`}>{rating}</span>
                    <Star className={`w-3 h-3 ${
                      isDarkTheme 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : isGlassLikeTheme
                        ? 'text-white fill-white' 
                        : 'text-yellow-400 fill-yellow-400'
                    }`} />
                  </div>
                  <Progress
                    value={getRatingPercentage(ratingDistribution[rating as keyof typeof ratingDistribution])}
                    className="flex-1 h-2"
                  />
                  <div className={`text-sm w-8 text-right ${
                    isDarkTheme 
                      ? 'text-slate-300' 
                      : isGlassLikeTheme
                      ? 'text-white/80 drop-shadow' 
                      : 'text-slate-600'
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
          isGlassLikeTheme 
            ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl' 
            : isDarkTheme
            ? 'bg-slate-800 border border-slate-700'
            : colors.secondary
        } `}>
          <CardContent className="flex items-center space-x-4 pt-6">
            <Users className={`w-8 h-8 ${
              isDarkTheme 
                ? 'text-slate-300' 
                : isGlassLikeTheme
                ? 'text-white drop-shadow' 
                : colors.accent
            }`} />
            <div>
              <div className={`text-2xl font-bold ${
                isDarkTheme 
                  ? 'text-slate-100' 
                  : isGlassLikeTheme
                  ? 'text-white drop-shadow-lg' 
                  : 'text-slate-900'
              }`}>{totalReviews}</div>
              <div className={`text-sm ${
                isDarkTheme 
                  ? 'text-slate-300' 
                  : isGlassLikeTheme
                  ? 'text-white/80 drop-shadow' 
                  : 'text-slate-600'
              }`}>Total Reviews</div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          isGlassLikeTheme 
            ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl' 
            : isDarkTheme
            ? 'bg-slate-800 border border-slate-700'
            : colors.secondary
        } `}>
          <CardContent className="flex items-center space-x-4 pt-6">
            <TrendingUp className={`w-8 h-8 ${
              isDarkTheme 
                ? 'text-slate-300' 
                : isGlassLikeTheme
                ? 'text-white drop-shadow' 
                : colors.accent
            }`} />
            <div>
              <div className={`text-2xl font-bold ${
                isDarkTheme 
                  ? 'text-slate-100' 
                  : isGlassLikeTheme
                  ? 'text-white drop-shadow-lg' 
                  : 'text-slate-900'
              }`}>{averageRating.toFixed(1)}</div>
              <div className={`text-sm ${
                isDarkTheme 
                  ? 'text-slate-300' 
                  : isGlassLikeTheme
                  ? 'text-white/80 drop-shadow' 
                  : 'text-slate-600'
              }`}>Average Rating</div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${
          isGlassLikeTheme 
            ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl' 
            : isDarkTheme
            ? 'bg-slate-800 border border-slate-700'
            : colors.secondary
        } `}>
          <CardContent className="flex items-center space-x-4 pt-6">
            <MessageCircle className={`w-8 h-8 ${
              isDarkTheme 
                ? 'text-slate-300' 
                : isGlassLikeTheme
                ? 'text-white drop-shadow' 
                : colors.accent
            }`} />
            <div>
              <div className={`text-2xl font-bold ${
                isDarkTheme 
                  ? 'text-slate-100' 
                  : isGlassLikeTheme
                  ? 'text-white drop-shadow-lg' 
                  : 'text-slate-900'
              }`}>{reviews.filter(r => r.comment && r.comment.trim()).length}</div>
              <div className={`text-sm ${
                isDarkTheme 
                  ? 'text-slate-300' 
                  : isGlassLikeTheme
                  ? 'text-white/80 drop-shadow' 
                  : 'text-slate-600'
              }`}>With Comment</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card className={`${
        isGlassLikeTheme
          ? 'bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl'
          : isDarkTheme 
            ? 'bg-slate-800 border border-slate-700'
            : colors.secondary
      } `}>
        <CardHeader>
          <CardTitle className={`${
            isDarkTheme 
              ? 'text-slate-100' 
              : isGlassLikeTheme
              ? 'text-white drop-shadow-lg' 
              : 'text-slate-900'
          }`}>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className={`border-b pb-4 last:border-b-0 ${
                isDarkTheme 
                  ? 'border-slate-600' 
                  : isGlassLikeTheme
                  ? 'border-white/20' 
                  : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`font-medium ${
                      isDarkTheme 
                        ? 'text-slate-100' 
                        : isGlassLikeTheme
                        ? 'text-white drop-shadow-md' 
                        : 'text-slate-900'
                    }`}>{review.reviewerName}</div>
                    {review.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className={`text-sm ${
                    isDarkTheme 
                      ? 'text-slate-300' 
                      : isGlassLikeTheme
                      ? 'text-white/80 drop-shadow' 
                      : 'text-slate-600'
                  }`}>
                    {formatDate(review.createdAt)}
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(review.rating)}
                  <span className={`text-sm ml-2 ${
                    isDarkTheme 
                      ? 'text-slate-300' 
                      : isGlassLikeTheme
                      ? 'text-white/80 drop-shadow' 
                      : 'text-slate-600'
                  }`}>
                    {review.rating}/5
                  </span>
                </div>
                {review.comment && review.comment.trim() && (
                  <p className={`text-sm ${
                    isDarkTheme 
                      ? 'text-slate-200' 
                      : isGlassLikeTheme
                      ? 'text-white/90 drop-shadow' 
                      : 'text-slate-700'
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