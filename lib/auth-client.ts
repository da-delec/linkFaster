import { createAuthClient } from "better-auth/react"
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_APP_URL || window.location.origin
        : "http://localhost:3000",
    plugins: [
        magicLinkClient()
    ]
})