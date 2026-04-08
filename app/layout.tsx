import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

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
          url: '/logo.jpg',
        },
      ],
      apple: '/logo.jpg',
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Toaster />

      </body>
    </html>
  )
}
