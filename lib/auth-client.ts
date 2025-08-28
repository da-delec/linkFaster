import { createAuthClient } from "better-auth/react"
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://linkfaster.link')
        : "http://localhost:3000",
    plugins: [
        magicLinkClient()
    ]
})