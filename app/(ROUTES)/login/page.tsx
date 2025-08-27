export const dynamic = 'force-dynamic'

import { GalleryVerticalEnd } from "lucide-react"
import { Metadata } from "next"

import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Sign In - linkFaster",
  description: "Sign in to your linkFaster account to manage your developer profile and projects.",
  alternates: {
    canonical: '/login',
  },
  openGraph: {
    title: "Sign In - linkFaster",
    description: "Sign in to your linkFaster account to manage your developer profile and projects.",
    url: '/login',
  },
  twitter: {
    title: "Sign In - linkFaster",
    description: "Sign in to your linkFaster account to manage your developer profile and projects.",
  },
}

export default function LoginPage() {
  return (
    <div className=" flex min-h-svh  bg-background flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
       
        <LoginForm />
      </div>
    </div>
  )
}
