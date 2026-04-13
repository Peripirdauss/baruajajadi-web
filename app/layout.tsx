import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});

import { getGlobalContent } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getGlobalContent()
  const defaultTitle = 'BaruAjaJadi - Tools, Assets & Content Hub'
  const defaultDescription = 'Discover premium tools, curated assets, insightful content, and personal projects. Your digital hub for productivity and inspiration.'

  return {
    title: content?.metadata?.title || defaultTitle,
    description: content?.metadata?.description || defaultDescription,

    icons: {
      icon: [
        {
          url: '/logo.png',
        },
      ],
      apple: '/logo.png',
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        <div className="relative min-h-screen">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
