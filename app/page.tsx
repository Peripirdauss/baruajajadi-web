import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { FeaturedTools } from '@/components/featured-tools'
import { AssetGallery } from '@/components/asset-gallery'
import { BlogPreview } from '@/components/blog-preview'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground">
      <Header />
      <Hero />
      <FeaturedTools />
      <AssetGallery />
      <BlogPreview />
      <CTA />
      <Footer />
    </main>
  )
}
