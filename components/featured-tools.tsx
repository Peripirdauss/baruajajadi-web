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
    <section id="tools" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
            <Icons.Zap className="h-3 w-3" /> Core Utility
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-6xl text-balance leading-tight">
            Premium Tools <br/><span className="text-muted-foreground">& Resources</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Handpicked infrastructure designed to streamline your workflow and accelerate production across development and design cycles.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool: any, i: number) => {
            const Icon = (Icons as any)[tool.icon] || Icons.Code2
            
            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="group relative rounded-[2rem] glass-card p-10 transition-all duration-500 hover:translate-y-[-8px] hover:border-primary/30"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>
                
                <div className="relative space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-xl shadow-primary/5">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-[10px] font-mono font-bold text-muted-foreground/60 tracking-widest uppercase py-1 px-3 rounded-full border border-border group-hover:border-primary/20 group-hover:text-primary transition-colors">
                      {tool.category}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">
                      {tool.name}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-primary translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    Explore Engine <Icons.ArrowRight className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-10 text-[60px] font-black text-foreground/[0.03] select-none group-hover:text-primary/[0.05] transition-colors leading-none">
                  0{i + 1}
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="mt-20 flex justify-center">
          <Button size="xl" variant="outline" asChild className="rounded-full glass font-bold border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group">
            <Link href="/tools" className="flex items-center gap-2">
              View Deployment Hub <Icons.ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

