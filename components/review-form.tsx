'use client'

import { useState } from 'react'
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
  const isGlassLikeTheme = ['midnight', 'glass', 'glass-aurora', 'glass-nebula', 'glass-cosmic', 'prisme-dark', 'prisme-grey'].includes(colorTheme)
  const getThemeColors = (theme: string) => {
    switch (theme) {
      // 3 FREE THEMES - Apple design, simple and refined
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

      // 1 PREMIUM DARK THEME - Apple dark design with glassmorphism
      case 'midnight':
        return {
          primary: 'bg-sky-500 hover:bg-slate-700/80 backdrop-blur-md border border-slate-600/50 text-white shadow-xl hover:shadow-2xl transition-all duration-300',
          secondary: 'bg-white/20 backdrop-blur-md border border-slate-600/40 shadow-xl hover:shadow-2xl transition-all duration-300',
          accent: 'text-sky-500',
          text: 'text-slate-100',
          inputBg: 'bg-slate-800/50 border-slate-600/40 backdrop-blur-md',
          inputText: 'text-slate-100'
        }

      // PREMIUM GLASSMORPHISM THEMES - Modern Apple design
      case 'glass':
      case 'glass-aurora':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-xl',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
          accent: 'text-blue-300',
          text: 'text-white',
          inputBg: 'bg-white/20 border-white/30 backdrop-blur-md',
          inputText: 'text-white'
        }
      case 'glass-nebula':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-xl',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
          accent: 'text-purple-300',
          text: 'text-white',
          inputBg: 'bg-white/20 border-white/30 backdrop-blur-md',
          inputText: 'text-white'
        }
      case 'glass-cosmic':
        return {
          primary: 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-xl',
          secondary: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
          accent: 'text-fuchsia-300',
          text: 'text-white',
          inputBg: 'bg-white/20 border-white/30 backdrop-blur-md',
          inputText: 'text-white'
        }

      // PREMIUM PRISME THEMES
      case 'prisme-dark':
        return {
          primary: 'bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white shadow-xl',
          secondary: 'bg-white/15 backdrop-blur-md border border-white/25 shadow-xl',
          accent: 'text-emerald-300',
          text: 'text-white',
          inputBg: 'bg-white/20 border-white/30 backdrop-blur-md',
          inputText: 'text-white'
        }
      case 'prisme-grey':
        return {
          primary: 'bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-md border border-slate-600/50 text-white shadow-xl',
          secondary: 'bg-slate-800/70 backdrop-blur-md border border-slate-600/40 shadow-xl',
          accent: 'text-amber-400',
          text: 'text-slate-100',
          inputBg: 'bg-slate-800/50 border-slate-600/40 backdrop-blur-md',
          inputText: 'text-slate-100'
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
      toast.error('Please enter your name')
      return
    }
    
    if (rating === 0) {
      toast.error('Please provide a rating')
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
        throw new Error('Error sending review')
      }

      toast.success('Your review has been sent successfully!')
      
      // Reset form
      setRating(0)
      setReviewerName('')
      setReviewerEmail('')
      setComment('')
      
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }
    } catch (error) {
      console.error('Error sending review:', error)
      toast.error('An error occurred while sending your review')
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
          <span>Leave a Review</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${colors.text}`}>Rating *</label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className={`ml-2 text-sm ${colors.text} opacity-70`}>
                {rating > 0 ? `${rating}/5` : 'Click to rate'}
              </span>
            </div>
          </div>

          {/* Reviewer Name */}
          <div className="space-y-2">
            <label htmlFor="reviewerName" className={`text-sm font-medium ${colors.text}`}>
              Your Name *
            </label>
            <Input
              id="reviewerName"
              type="text"
              placeholder="John Doe"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
              className={`${colors.inputBg} ${colors.inputText} placeholder:opacity-50`}
            />
          </div>

          {/* Reviewer Email (optional) */}
          <div className="space-y-2">
            <label htmlFor="reviewerEmail" className={`text-sm font-medium ${colors.text}`}>
              Your Email (optional)
            </label>
            <Input
              id="reviewerEmail"
              type="email"
              placeholder="john@example.com"
              value={reviewerEmail}
              onChange={(e) => setReviewerEmail(e.target.value)}
              className={`${colors.inputBg} ${colors.inputText} placeholder:opacity-50`}
            />
            <p className={`text-xs ${colors.text} opacity-60`}>
              Your email will not be displayed publicly
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className={`text-sm font-medium ${colors.text}`}>
              Comment (optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className={`${colors.inputBg} ${colors.inputText} placeholder:opacity-50`}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0 || !reviewerName.trim()}
            className={`w-full ${colors.primary}`}
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReviewForm