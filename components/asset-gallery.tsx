'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
      <div className="py-24 flex flex-col justify-center items-center gap-4 bg-[#fcfcfd]">
        <div className="h-12 w-12 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase">Mounting Assets...</div>
      </div>
    )
  }

  return (
    <section id="assets" className="py-24 sm:py-40 bg-[#f8fafc] relative overflow-hidden">
       {/* Background Ornamental */}
       <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border/30 -z-10"></div>
       <div className="absolute top-0 left-1/4 w-[1px] h-full bg-border/20 -z-10"></div>
       <div className="absolute top-0 right-1/4 w-[1px] h-full bg-border/20 -z-10"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-24 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 text-accent text-[10px] font-black tracking-[0.3em] uppercase">
             Archives / Storage
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl leading-[0.9] uppercase italic">
              Design <span className="text-muted-foreground/30">&</span> <br /><span className="text-primary">Dev</span> Assets
            </h2>
            <div className="h-1 w-20 bg-primary/20 rounded-full"></div>
          </div>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed font-medium border-l-4 border-primary/20 pl-6">
            High-fidelity blueprints, functional UI kits, and professional technical assets audited for direct production deployment.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-16 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[10px] transition-all duration-300",
                activeCategory === category 
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105 border-primary" 
                  : "bg-white/80 border-border hover:bg-primary/5 hover:text-primary hover:border-primary/30"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <Link
              key={asset.slug}
              href={`/assets/${asset.slug}`}
              className="group relative rounded-[2.5rem] glass-card p-5 transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] bg-white/40 border-white/60"
            >
              <div className="space-y-8">
                {/* Asset Image/Visual */}
                <div className="aspect-[16/11] rounded-[2rem] bg-slate-50 overflow-hidden relative border border-border group-hover:border-primary/20 transition-all duration-500">
                  {asset.image ? (
                    <img src={asset.image} alt={asset.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative">
                       <div className="absolute w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                       <div className="text-5xl relative z-10 group-hover:rotate-12 transition-transform duration-500">💎</div>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full border-white/50 text-[10px] font-black uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
                     {asset.category}
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 pb-6 space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors tracking-tighter uppercase italic">
                      {asset.name}
                    </h3>
                    <div className="h-0.5 w-6 bg-primary/20 group-hover:w-12 transition-all duration-500"></div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary transition-colors">
                    Initialize Deployment <div className="h-4 w-4 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                       <div className="h-1 w-1 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-28 flex justify-center">
          <Button size="xl" variant="outline" asChild className="rounded-2xl h-16 sm:h-20 px-12 font-black text-xs uppercase tracking-[0.3em] border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all group shadow-xl shadow-black/5 active:scale-95">
            <Link href="/assets" className="flex items-center gap-3">
              Explore Vault <div className="h-5 w-5 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                 <div className="h-1 w-1 bg-current rounded-full"></div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

