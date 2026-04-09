import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getGlobalContent } from '@/lib/content'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getHeroData() {
  try {
    const data = await getGlobalContent()
    if (data && data.hero) {
      return data.hero
    }
    throw new Error('No hero data')
  } catch (e) {
    return {
      title: "Your Digital Hub for Creation & Growth",
      subtitle: "Discover premium tools, curated assets, insightful content, and personal projects all in one place. Designed for creators, developers, and innovators.",
      cta_primary: "Explore Tools",
      cta_secondary: "Learn More",
      stats: [
        { label: "Premium Tools", value: "50+" },
        { label: "Design Assets", value: "200+" },
        { label: "Blog Articles", value: "100+" }
      ]
    }
  }
}

export async function Hero() {
  const hero = await getHeroData()
  
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-48 min-h-[90vh] flex items-center">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse delay-700"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="relative z-10 space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase animate-fade-in">
              <Sparkles className="h-3 w-3" /> Reimagined for 2026
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.1]"
                  dangerouslySetInnerHTML={{ __html: hero.title.replace(/Creation/g, '<span class="premium-gradient bg-clip-text text-transparent">Creation</span>').replace(/Growth/g, '<span class="text-accent underline decoration-accent/30 underline-offset-8">Growth</span>') }}>
              </h1>
              <p className="text-xl leading-relaxed text-muted-foreground max-w-xl">
                {hero.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="xl" asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/20 px-10 h-16 font-bold text-lg group active:scale-95 transition-all">
                <Link href="/signup" className="flex items-center gap-2">
                  {hero.cta_primary} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="rounded-full h-16 px-10 font-bold text-lg border-border hover:bg-accent/5 glass active:scale-95 transition-all">
                <Link href="/about">{hero.cta_secondary}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-10 border-t border-border/50">
              {hero.stats.map((stat: any, i: number) => (
                <div key={i} className="group">
                  <div className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">{stat.value}</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Abstract Tech Visual */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden glass-card flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent)]"></div>
              
              {/* Floating UI Elements */}
              <div className="relative w-full h-full">
                <div className="absolute top-10 left-10 p-6 glass rounded-2xl border border-white/10 shadow-2xl animate-float">
                  <Zap className="h-8 w-8 text-accent mb-4" />
                  <div className="h-2 w-20 bg-accent/20 rounded mb-2"></div>
                  <div className="h-2 w-12 bg-accent/10 rounded"></div>
                </div>
                
                <div className="absolute bottom-20 right-10 p-6 glass-card rounded-2xl border border-white/10 shadow-2xl animate-float delay-700">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <div className="h-2 w-24 bg-primary/20 rounded mb-2"></div>
                  <div className="h-2 w-16 bg-primary/10 rounded"></div>
                </div>

                {/* Central "Orb" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-primary/30 border-dashed animate-slow-spin"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-accent/40 flex items-center justify-center glass">
                   <div className="w-12 h-12 rounded-full bg-primary/40 blur-lg"></div>
                   <div className="relative h-4 w-4 bg-accent rounded-full shadow-[0_0_15px_#22d3ee]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

