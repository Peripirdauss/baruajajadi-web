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
    <section id="tools" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
            <span className="text-sm font-semibold text-accent">Featured Collection</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Premium Tools & Resources
          </h2>
          <p className="max-w-2xl text-lg text-foreground/70">
            Handpicked tools designed to streamline your workflow and boost productivity across development, design, and content creation.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool: any) => {
            // Dynamically get the icon from lucide-react
            const Icon = (Icons as any)[tool.icon] || Icons.Code2
            
            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-accent/10 p-3">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      {tool.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Explore →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <Button size="lg" variant="outline" asChild className="rounded-2xl h-14 px-10 font-bold border-accent/20 hover:border-accent hover:bg-accent/5 active:scale-95 transition-all shadow-sm">
            <Link href="/tools">View All Tools →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
