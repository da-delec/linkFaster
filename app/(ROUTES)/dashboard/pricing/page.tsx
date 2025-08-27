
'use client'

export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic';
import React, { ReactNode } from 'react'

const SimplePricingDashboard = dynamicImport(() => import("@/components/dashboard/pricing-section-dashboard"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-[50vh]">Loading...</div>
});

const page = () => {
  return (
    <div className=" min-h-[90vh]">
      <SimplePricingDashboard />
    </div>
  )
}

export default page
