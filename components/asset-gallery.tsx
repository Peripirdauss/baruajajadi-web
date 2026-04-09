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
      <div className="py-24 flex flex-col justify-center items-center gap-4">
        <div className="h-12 w-12 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase">Mounting Assets...</div>
      </div>
    )
  }

  return (
    <section id="assets" className="py-24 sm:py-32 bg-secondary/30 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
            📦 CURATED STORAGE
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-6xl text-balance">
            Design & Development <span className="text-primary italic">Assets</span>
          </h2>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
            High-fidelity design resources, UI kits, and functional templates audited for production-ready performance.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full h-10 px-6 font-bold transition-all",
                activeCategory === category 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                  : "glass hover:bg-primary/5"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <Link
              key={asset.slug}
              href={`/assets/${asset.slug}`}
              className="group relative rounded-[2rem] glass p-4 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5 border-white/5"
            >
              <div className="space-y-6">
                {/* Asset Image/Visual */}
                <div className="aspect-[16/10] rounded-[1.5rem] bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative border border-white/5">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                  {asset.image ? (
                    <img src={asset.image} alt={asset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative">
                       <div className="absolute w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                       <div className="text-4xl relative z-10 group-hover:scale-125 transition-transform duration-500">📦</div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="px-4 pb-4 space-y-4">
                  <div>
                    <div className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em] mb-1">{asset.category}</div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {asset.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                    Access Resource <div className="w-6 h-[1px] bg-muted-foreground group-hover:bg-primary transition-all group-hover:w-10"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 flex justify-center">
          <Button size="xl" variant="outline" asChild className="rounded-full glass font-bold border-border/50 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all">
            <Link href="/assets">Browse Terminal Assets →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

