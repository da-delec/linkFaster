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
}

const ReviewForm = ({ userId, onReviewSubmitted, colorTheme = 'default' }: ReviewFormProps) => {
  const getThemeColors = (theme: string) => {
    switch (theme) {
      // 3 THÈMES GRATUITS - Design Apple, simple et sobre
      case 'default':
        return {
          primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
          secondary: 'bg-white border border-slate-200 shadow-sm',
          accent: 'text-blue-600',
          text: 'text-slate-900',
          inputBg: 'bg-white border-slate-200',
          inputText: 'text-slate-900'
        }
      case 'emerald':
        return {
          primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
          secondary: 'bg-white border border-slate-200 shadow-sm',
          accent: 'text-emerald-600',
          text: 'text-slate-900',
          inputBg: 'bg-white border-slate-200',
          inputText: 'text-slate-900'
        }
      case 'purple':
        return {
          primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm',
          secondary: 'bg-white border border-slate-200 shadow-sm',
          accent: 'text-purple-600',
          text: 'text-slate-900',
          inputBg: 'bg-white border-slate-200',
          inputText: 'text-slate-900'
        }

      // 1 THÈME SOMBRE PREMIUM - Design Apple sombre
      case 'midnight':
        return {
          primary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm',
          secondary: 'bg-slate-800 border border-slate-700 shadow-sm',
          accent: 'text-slate-300',
          text: 'text-slate-100',
          inputBg: 'bg-slate-700 border-slate-600',
          inputText: 'text-slate-100'
        }

      // 1 THÈME GLASSMORPHISME PREMIUM - Design Apple moderne
      case 'glass':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-sm',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-sm',
          accent: 'text-blue-300',
          text: 'text-white',
          inputBg: 'bg-white/20 border-white/30 backdrop-blur-md',
          inputText: 'text-white'
        }

      default:
        return {
          primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
          secondary: 'bg-white border border-slate-200 shadow-sm',
          accent: 'text-blue-600',
          text: 'text-slate-900',
          inputBg: 'bg-white border-slate-200',
          inputText: 'text-slate-900'
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
              ? 'text-yellow-400'
              : colorTheme === 'midnight' 
                ? 'text-slate-400' 
                : 'text-gray-300'
          } hover:text-yellow-400`}
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
    <Card className={`w-full max-w-2xl mx-auto ${colors.secondary}`}>
      <CardHeader>
        <CardTitle className={`flex items-center space-x-2 ${colors.text}`}>
          <Star className="w-5 h-5 text-yellow-400" />
          <span>Laisser un avis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${colors.text}`}>Note *</label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className={`ml-2 text-sm ${colorTheme === 'midnight' ? 'text-slate-300' : 'text-muted-foreground'}`}>
                {rating > 0 ? `${rating}/5` : 'Cliquez pour noter'}
              </span>
            </div>
          </div>

          {/* Reviewer Name */}
          <div className="space-y-2">
            <label htmlFor="reviewerName" className={`text-sm font-medium ${colors.text}`}>
              Votre nom *
            </label>
            <Input
              id="reviewerName"
              type="text"
              placeholder="John Doe"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
              className={`${colors.inputBg} ${colors.inputText} placeholder:text-muted-foreground`}
            />
          </div>

          {/* Reviewer Email (optional) */}
          <div className="space-y-2">
            <label htmlFor="reviewerEmail" className={`text-sm font-medium ${colors.text}`}>
              Votre email (optionnel)
            </label>
            <Input
              id="reviewerEmail"
              type="email"
              placeholder="john@example.com"
              value={reviewerEmail}
              onChange={(e) => setReviewerEmail(e.target.value)}
              className={`${colors.inputBg} ${colors.inputText} placeholder:text-muted-foreground`}
            />
            <p className={`text-xs ${colorTheme === 'midnight' ? 'text-slate-300' : 'text-muted-foreground'}`}>
              Votre email ne sera pas affiché publiquement
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className={`text-sm font-medium ${colors.text}`}>
              Commentaire (optionnel)
            </label>
            <Textarea
              id="comment"
              placeholder="Partagez votre expérience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className={`${colors.inputBg} ${colors.inputText} placeholder:text-muted-foreground`}
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