'use client'

import React from 'react'
import { Crown, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
interface PremiumBannerProps {
  onUpgrade?: () => void
  stripeCustomerId?: string | null
}

const PremiumBanner: React.FC<PremiumBannerProps> = () => {
 const router=useRouter()

  return (
    <div className="relative mb-8 p-6 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 rounded-lg shadow-lg border border-purple-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-300" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-white">
                Upgrade to Pro
              </h3>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <p className="text-purple-100 text-sm">
              Unlock customer reviews, advanced analytics and much more for only <span className="font-semibold text-yellow-300">€7.99/month</span>
            </p>
            
            <div className="flex items-center space-x-4 mt-3 text-xs text-purple-200">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Review System</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Advanced Analytics</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Priority Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 ml-4">
          <Link href="/dashboard/pricing">
          <button
            
            className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            Upgrade to Pro
          </button>
          </Link>
        </div>
      </div>

      {/* Optional: Add a small "dismiss" button */}
      <button className="absolute top-2 right-2 text-purple-200 hover:text-white opacity-70 hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default PremiumBanner