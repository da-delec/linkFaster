import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkFaster",
  description: "Centralize your developer profile with devLink - The ultimate link-in-bio platform for developers and digital creators",
  keywords: ["developer portfolio", "link in bio", "github portfolio", "developer profile", "freelance portfolio", "tech portfolio"],
  authors: [{ name: "LinkFaster Team" }],
  creator: "LinkFaster",
  publisher: "LinkFaster",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://linkfaster.link'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'devLink',
    title: 'devLink - Linktr.ee for Developers',
    description: 'Centralize your developer profile with devLink - The ultimate link-in-bio platform for developers and digital creators',
    images: [
      {
        url: '/mainLogo.png',
        width: 1200,
        height: 630,
        alt: 'devLink - Developer Portfolio Platform',
      },
    ],
  },
 
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "LinkFaster",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "description": "Centralize your developer profile with devLink - The ultimate link-in-bio platform for developers and digital creators",
              "url": process.env.NEXT_PUBLIC_APP_URL || "https://linkfaster.link",
              "author": {
                "@type": "Organization",
                "name": "LinkFaster Team"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>

        {children}
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
