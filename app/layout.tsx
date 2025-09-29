import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { COMPANY_BRANDING } from '@/config/branding'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: COMPANY_BRANDING.seo.title,
  description: COMPANY_BRANDING.seo.description,
  keywords: COMPANY_BRANDING.seo.keywords,
  authors: [{ name: COMPANY_BRANDING.seo.author }],
  openGraph: {
    title: COMPANY_BRANDING.seo.title,
    description: COMPANY_BRANDING.seo.description,
    type: 'website',
    locale: 'en_US',
    siteName: COMPANY_BRANDING.name.full,
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY_BRANDING.seo.title,
    description: COMPANY_BRANDING.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}