import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ReviewPilot AI — Turn Customer Scans Into Google Reviews',
  description: 'Generate AI-powered QR codes that help customers leave Google reviews in seconds. Built for local businesses.',
  keywords: 'google reviews, QR code, AI reviews, review automation, local business',
  openGraph: {
    title: 'ReviewPilot AI',
    description: 'Turn Customer Scans Into Google Reviews',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
