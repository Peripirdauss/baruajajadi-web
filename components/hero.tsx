import { Button } from '@/components/ui/button'
import Link from 'next/link'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

async function getHeroData() {
  const dataPath = path.join(process.cwd(), 'data', 'site-config.json')
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8')
    return JSON.parse(fileContents).hero
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
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-48">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-secondary/30"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
                  dangerouslySetInnerHTML={{ __html: hero.title.replace(/Creation/g, '<span class="text-accent">Creation</span>').replace(/Growth/g, '<span class="text-accent">Growth</span>') }}>
              </h1>
              <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
                {hero.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-5 sm:flex-row">
              <Button size="lg" asChild className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl shadow-accent/20 h-14 px-10 font-black text-lg active:scale-95 transition-all">
                <Link href="/signup">{hero.cta_primary}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-2xl h-14 px-10 font-black text-lg border-border hover:bg-accent/5 active:scale-95 transition-all">
                <Link href="/about">{hero.cta_secondary}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              {hero.stats.map((stat: any, i: number) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Visual */}
          <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden bg-card border border-border flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
            <div className="relative z-10 space-y-4 p-8">
              <div className="flex gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent/20"></div>
                <div className="flex-1">
                  <div className="h-4 w-24 rounded bg-muted mb-2"></div>
                  <div className="h-3 w-32 rounded bg-muted/60"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="h-20 rounded-lg bg-muted/30"></div>
                <div className="h-20 rounded-lg bg-muted/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
