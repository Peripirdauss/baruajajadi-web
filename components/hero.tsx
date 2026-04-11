import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
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
      image: "",
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
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-48 min-h-[95vh] flex items-center bg-[#f8fafc]">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(29,78,216,0.05),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d4ed808_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed808_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="relative z-10 space-y-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm text-primary text-[10px] font-black tracking-[0.2em] uppercase animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              sat-set & anti ribet 🔥
            </div>
            
            <div className="space-y-8">
              <h1 className="text-6xl font-extrabold tracking-tighter text-foreground sm:text-7xl lg:text-8xl leading-[0.85] lowercase">
                kerja dikit, <br />
                <span className="text-primary animate-pulse">cuan selangit 💸</span>
              </h1>
              <p className="text-xl leading-relaxed text-muted-foreground max-w-xl font-medium border-l-4 border-primary/20 pl-6 lowercase">
                {hero.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-5 sm:flex-row pt-4">
              <Button size="xl" asChild className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl shadow-accent/20 px-10 h-16 sm:h-20 font-bold text-xl group active:scale-95 transition-all relative overflow-hidden">
                <Link href="/signup">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {hero.cta_primary} <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="rounded-2xl h-16 sm:h-20 px-10 font-bold text-xl border-border bg-white hover:bg-primary hover:text-white hover:border-primary active:scale-95 transition-all text-muted-foreground tracking-widest text-xs">
                <Link href="/about"><span>{hero.cta_secondary}</span></Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-12 pt-12 border-t border-border/50">
              {hero.stats.map((stat: any, i: number) => (
                <div key={i} className="group cursor-default">
                  <div className="text-4xl font-black text-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">{stat.value}</div>
                  <p className="text-[10px] font-bold lowercase tracking-widest text-muted-foreground/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Abstract Tech Visual or Custom Image */}
          <div className="relative group perspective-1000">
            <div className="absolute inset-x-10 -bottom-10 h-20 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden glass-card flex items-center justify-center p-12 border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group-hover:rotate-1 transition-transform duration-1000">
              {hero.image ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={hero.image} 
                    alt="Hero Visual" 
                    fill 
                    className="object-cover rounded-[2rem]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                </div>
              ) : (
                <div className="w-full h-full relative border border-primary/5 rounded-[2rem] bg-slate-50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,78,216,0.05),transparent)]"></div>
                  
                  {/* Floating UI Elements */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute top-10 left-10 p-8 glass rounded-[2.5rem] border-white/50 shadow-2xl animate-float">
                      <Zap className="h-10 w-10 text-accent mb-6" />
                      <div className="h-3 w-24 bg-accent/10 rounded-full mb-3"></div>
                      <div className="h-2 w-16 bg-accent/5 rounded-full"></div>
                    </div>
                    
                    <div className="absolute bottom-10 right-10 p-8 glass-card rounded-[2.5rem] border-white/50 shadow-2xl animate-float delay-1000">
                      <Shield className="h-10 w-10 text-primary mb-6" />
                      <div className="h-3 w-28 bg-primary/10 rounded-full mb-3"></div>
                      <div className="h-2 w-20 bg-primary/5 rounded-full"></div>
                    </div>
    
                    {/* Central "Orb" */}
                    <div className="relative w-64 h-64 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/5 rounded-full blur-[80px] animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full border border-primary/10 border-dashed animate-slow-spin"></div>
                      <div className="absolute inset-10 rounded-full border border-primary/5 border-dashed animate-slow-spin [animation-direction:reverse]"></div>
                      <div className="w-32 h-32 rounded-full glass border-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                         <div className="w-16 h-16 rounded-full bg-primary/20 blur-2xl"></div>
                         <div className="relative h-6 w-6 bg-primary rounded-full shadow-[0_0_20px_rgba(29,78,216,0.4)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 p-6 glass-card rounded-3xl border-white shadow-xl animate-float delay-300">
               <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-black text-primary">A+</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">System Rating</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

