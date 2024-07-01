import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/store/cart-store'
import { AuthProvider } from '@/components/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rubik Store - Premium Rubik\'s Cubes & Speedcubes',
  description: 'Discover the world\'s best Rubik\'s cubes, speedcubes, and puzzle accessories. From beginner 3x3 cubes to professional speedcubing gear.',
  keywords: 'rubiks cube, speedcube, puzzle, 3x3, 4x4, speedcubing, gan, moyu, qiyi',
  authors: [{ name: 'Rubik Store' }],
  creator: 'Rubik Store',
  publisher: 'Rubik Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rubik-store.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rubik Store - Premium Rubik\'s Cubes & Speedcubes',
    description: 'Discover the world\'s best Rubik\'s cubes, speedcubes, and puzzle accessories.',
    url: 'https://rubik-store.vercel.app',
    siteName: 'Rubik Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rubik Store - Premium Cubes',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubik Store - Premium Rubik\'s Cubes',
    description: 'Discover the world\'s best Rubik\'s cubes and speedcubes.',
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <div className="relative flex min-h-screen flex-col">
                <div className="flex-1">{children}</div>
              </div>
              <Toaster />
            </CartProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}