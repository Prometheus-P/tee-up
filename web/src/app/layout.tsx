import './global.css'
import '@fontsource/pretendard/400.css'
import '@fontsource/pretendard/500.css'
import '@fontsource/pretendard/600.css'
import '@fontsource/pretendard/700.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TEE:UP | Premium Golf Lesson Matching Platform',
  description:
    'Connect with verified golf professionals through our sophisticated platform. Data-driven matching for VIP golfers in Seoul.',
  keywords: ['golf lessons', 'golf pro', 'golf coach', 'Seoul golf', 'premium golf', '골프 레슨', '골프 프로', '강남 골프'],
  authors: [{ name: 'TEE:UP' }],
  creator: 'TEE:UP',
  publisher: 'TEE:UP',
  metadataBase: new URL('https://teeup.golf'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://teeup.golf',
    title: 'TEE:UP | Premium Golf Lesson Matching Platform',
    description: 'Connect with verified golf professionals through our sophisticated platform. Data-driven matching for VIP golfers in Seoul.',
    siteName: 'TEE:UP',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TEE:UP - Premium Golf Lesson Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEE:UP | Premium Golf Lesson Matching Platform',
    description: 'Connect with verified golf professionals through our sophisticated platform.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
