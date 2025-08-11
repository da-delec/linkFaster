'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, MessageSquare, Eye, EyeOff, Crown, TrendingUp, Users, MoreHorizontal, AlertCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Review {
  id: string
  rating: number
  comment: string | null
  reviewerName: string
  reviewerEmail: string | null
  isVerified: boolean
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
}

interface ReviewsManagementProps {
  userId: string
  isPremium: boolean
}

const ReviewsManagement: React.FC<ReviewsManagementProps> = ({ userId, isPremium }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewStats, setReviewStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    totalVisible: 0,
    recentReviews: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isPremium) {
      fetchReviews()
      fetchReviewStats()
    }
  }, [userId, isPremium])

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?userId=${userId}&isOwner=true`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const fetchReviewStats = async () => {
    try {
      const response = await fetch(`/api/reviews/stats?userId=${userId}`)
      if (response.ok) {
        const stats = await response.json()
        setReviewStats(stats)
      }
    } catch (error) {
      console.error('Error fetching review stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleReviewVisibility = async (reviewId: string, isVisible: boolean) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isVisible }),
      })

      if (response.ok) {
        setReviews(prev =>
          prev.map(review =>
            review.id === reviewId ? { ...review, isVisible } : review
          )
        )
        fetchReviewStats() // Refresh stats
      }
    } catch (error) {
      console.error('Error updating review visibility:', error)
    }
  }

  const deleteReview = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setReviews(prev => prev.filter(review => review.id !== reviewId))
        fetchReviewStats() // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-500 fill-yellow-500'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  if (!isPremium) {
    return (
      <Card className="border-2 border-dashed border-amber-200 bg-amber-50/50">
        <CardHeader className="text-center py-8">
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Crown className="w-6 h-6 text-amber-600" />
          </div>
          <CardTitle className="text-amber-900">Gestion des avis - Premium</CardTitle>
          <CardDescription className="text-amber-700">
            Gérez les avis clients et suivez votre réputation avec Premium
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <ul className="text-sm text-amber-700 space-y-2 mb-6">
            <li>• Visualisation de tous vos avis</li>
            <li>• Métriques détaillées et tendances</li>
            <li>• Gestion de la visibilité des avis</li>
            <li>• Modération et réponses</li>
          </ul>
          <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
            <Crown className="w-4 h-4 mr-2" />
            Passer à Premium
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Gestion des avis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Statistiques des avis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{reviewStats.totalReviews}</div>
              <div className="text-sm text-gray-600">Total avis</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center">
                {reviewStats.averageRating.toFixed(1)}
                <Star className="w-5 h-5 ml-1 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{reviewStats.totalVisible}</div>
              <div className="text-sm text-gray-600">Avis visibles</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{reviewStats.recentReviews}</div>
              <div className="text-sm text-gray-600">Ce mois</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Tous les avis ({reviews.length})</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {reviews.filter(r => r.isVisible).length} visibles
            </Badge>
          </CardTitle>
          <CardDescription>
            Gérez la visibilité et modérez les avis de vos clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Aucun avis pour le moment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Les avis de vos clients apparaîtront ici une fois que votre profil public sera activé.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`border rounded-lg p-4 transition-all ${
                    review.isVisible ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {review.reviewerName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {review.reviewerName}
                          </p>
                          {review.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Vérifié
                            </Badge>
                          )}
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        
                        {review.comment && (
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                            {review.comment}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            {formatDistanceToNow(new Date(review.createdAt), {
                              addSuffix: true,
                              locale: fr
                            })}
                          </span>
                          {review.reviewerEmail && (
                            <span className="truncate">
                              {review.reviewerEmail}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Badge 
                        variant={review.isVisible ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {review.isVisible ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Masqué
                          </>
                        )}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => toggleReviewVisibility(review.id, !review.isVisible)}
                          >
                            {review.isVisible ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Masquer
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Afficher
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteReview(review.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ReviewsManagement