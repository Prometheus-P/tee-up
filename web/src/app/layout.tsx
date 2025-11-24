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
