import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { getGlobalContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

async function getToolsData() {
  try {
    const data = await getGlobalContent()
    if (data && data.tools) {
      return data.tools
    }
    return []
  } catch (e) {
    return []
  }
}

export async function FeaturedTools() {
  const tools = await getToolsData()
  
  return (
    <section id="tools" className="py-24 sm:py-40 relative overflow-hidden bg-white/50">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] -z-10 rounded-full opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] -z-10 rounded-full opacity-60"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-24 space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-semibold tracking-widest">
            <Icons.Zap className="h-3.5 w-3.5" /> KOLEKSI / TOOLS
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-bold tracking-tighter text-foreground sm:text-7xl leading-[0.9]">
              tools <span className="text-primary">sakti</span> <span>&</span> apps
            </h2>
            <div className="h-1 w-20 bg-primary/20 rounded-full"></div>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed font-normal border-l-4 border-accent/20 pl-6">
            Kumpulan tools micro yang dibuat khusus buat bantu kerjaan admin kamu biar makin sat-set. Buat para affiliate, KOL specialist, dan brand owner, gaskeun!
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool: any, i: number) => {
            const Icon = (Icons as any)[tool.icon] || Icons.Code2
            
            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group relative rounded-[2.5rem] glass-card p-10 transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_40px_80px_-15px_rgba(29,78,216,0.1)] border-white/80"
              >
                {/* Hover Reveal Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]"></div>
                
                <div className="relative space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-slate-50 border border-border group-hover:border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm relative">
                      <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                      {tool.pricing === 'pro' && (
                        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[8px] font-black px-2 py-1 rounded-md shadow-lg border border-white/20">PRO</div>
                      )}
                      {tool.pricing === 'free' && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-md shadow-lg border border-white/20">FREE</div>
                      )}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-muted-foreground/40 tracking-[0.2em] uppercase py-1.5 px-4 rounded-full border border-border/50 bg-white/50 group-hover:border-primary/20 group-hover:text-primary transition-all">
                      {tool.category}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight lowercase group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground font-medium line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    Buka Tools <Icons.ArrowRight className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Ornamental Index */}
                <div className="absolute bottom-6 right-10 text-[80px] font-black text-primary/[0.02] select-none group-hover:text-primary/[0.04] transition-colors leading-none italic">
                  0{i + 1}
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="mt-24 flex justify-center">
          <Button size="xl" variant="outline" asChild className="rounded-2xl h-16 sm:h-20 px-12 font-bold text-xs lowercase tracking-widest border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all group shadow-xl shadow-black/5 active:scale-95">
            <Link href="/tools" className="flex items-center gap-3">
              cek semua tools <Icons.ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

