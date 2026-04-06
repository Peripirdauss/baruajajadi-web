'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Asset {
  slug: string;
  name: string;
  category: string;
  image?: string;
}

export function AssetGallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch('/api/content')
        const data = await res.json()
        setAssets(data.assets || [])
      } catch (e) {
        console.error('Error fetching assets:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchAssets()
  }, [])

  const categories = ['All', ...new Set(assets.map(a => a.category))]

  const filteredAssets = activeCategory === 'All'
    ? assets
    : assets.filter((asset) => asset.category === activeCategory)

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-pulse text-foreground/50">Loading assets...</div>
      </div>
    )
  }

  return (
    <section id="assets" className="py-20 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
            <span className="text-sm font-semibold text-accent">Curated Assets</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Design & Development Assets
          </h2>
          <p className="max-w-2xl text-lg text-foreground/70">
            Free and premium design resources, UI kits, icons, and code templates to accelerate your projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <Link
              key={asset.slug}
              href={`/assets/${asset.slug}`}
              className="group relative rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="space-y-4">
                {/* Image Placeholder or Image */}
                <div className="h-40 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden flex items-center justify-center">
                  {asset.image ? (
                    <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="text-3xl mb-2">📦</div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {asset.name}
                      </h3>
                      <p className="text-xs text-foreground/60 mt-1">{asset.category}</p>
                    </div>
                  </div>
                </div>

                {/* Download Badge */}
                <div className="flex items-center gap-2 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  View Detail →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <Button size="lg" variant="outline" asChild className="rounded-2xl h-14 px-10 font-bold border-accent/20 hover:border-accent hover:bg-accent/5 active:scale-95 transition-all shadow-sm">
            <Link href="/assets">Browse All Assets →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
