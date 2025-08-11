'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Send } from 'lucide-react'
import { toast } from 'sonner'

interface ReviewFormProps {
  userId: string
  onReviewSubmitted?: () => void
  colorTheme?: string
  isDarkTheme?: boolean
  isGlassTheme?: boolean
  isGradientTheme?: boolean
}

const ReviewForm = ({ userId, onReviewSubmitted, colorTheme = 'blue', isDarkTheme = false, isGlassTheme = false, isGradientTheme = false }: ReviewFormProps) => {
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
  
  const colors = getThemeColors(colorTheme)
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerEmail, setReviewerEmail] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reviewerName.trim()) {
      toast.error('Veuillez saisir votre nom')
      return
    }
    
    if (rating === 0) {
      toast.error('Veuillez donner une note')
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          rating,
          reviewerName,
          reviewerEmail: reviewerEmail || null,
          comment: comment || null,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'avis')
      }

      toast.success('Votre avis a été envoyé avec succès !')
      
      // Reset form
      setRating(0)
      setReviewerName('')
      setReviewerEmail('')
      setComment('')
      
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'avis:', error)
      toast.error('Une erreur est survenue lors de l\'envoi de votre avis')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1
      return (
        <button
          key={index}
          type="button"
          className={`text-2xl transition-colors ${
            starNumber <= (hoveredRating || rating)
              ? isGradientTheme ? 'text-orange-400' : 'text-yellow-400'
              : isGradientTheme ? 'text-slate-500' : 'text-gray-300 dark:text-gray-600'
          } hover:${isGradientTheme ? 'text-orange-400' : 'text-yellow-400'}`}
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(starNumber)}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      )
    })
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${
      isGradientTheme 
        ? colors.secondary
        : `${colors.secondary} ${isDarkTheme ? 'bg-gray-800/60 border-gray-700' : ''} ${isGlassTheme ? 'backdrop-blur-md' : ''}`
    }`}>
      <CardHeader>
        <CardTitle className={`flex items-center space-x-2 ${
          isGradientTheme ? 'text-white' : isDarkTheme ? 'text-white' : ''
        }`}>
          <Star className={`w-5 h-5 ${isGradientTheme ? 'text-orange-400' : 'text-yellow-400'}`} />
          <span>Laisser un avis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${
              isGradientTheme ? 'text-white' : isDarkTheme ? 'text-white' : ''
            }`}>Note *</label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className={`ml-2 text-sm ${
                isGradientTheme ? 'text-slate-200' : isDarkTheme ? 'text-gray-400' : 'text-muted-foreground'
              }`}>
                {rating > 0 ? `${rating}/5` : 'Cliquez pour noter'}
              </span>
            </div>
          </div>

          {/* Reviewer Name */}
          <div className="space-y-2">
            <label htmlFor="reviewerName" className={`text-sm font-medium ${
              isGradientTheme ? 'text-white' : isDarkTheme ? 'text-white' : ''
            }`}>
              Votre nom *
            </label>
            <Input
              id="reviewerName"
              type="text"
              placeholder="John Doe"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
            />
          </div>

          {/* Reviewer Email (optional) */}
          <div className="space-y-2">
            <label htmlFor="reviewerEmail" className={`text-sm font-medium ${
              isGradientTheme ? 'text-white' : isDarkTheme ? 'text-white' : ''
            }`}>
              Votre email (optionnel)
            </label>
            <Input
              id="reviewerEmail"
              type="email"
              placeholder="john@example.com"
              value={reviewerEmail}
              onChange={(e) => setReviewerEmail(e.target.value)}
            />
            <p className={`text-xs ${
              isGradientTheme ? 'text-slate-200' : isDarkTheme ? 'text-gray-400' : 'text-muted-foreground'
            }`}>
              Votre email ne sera pas affiché publiquement
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className={`text-sm font-medium ${
              isGradientTheme ? 'text-white' : isDarkTheme ? 'text-white' : ''
            }`}>
              Commentaire (optionnel)
            </label>
            <Textarea
              id="comment"
              placeholder="Partagez votre expérience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0 || !reviewerName.trim()}
            className={`w-full ${colors.primary}`}
          >
            {isSubmitting ? (
              'Envoi en cours...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Envoyer l'avis
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReviewForm