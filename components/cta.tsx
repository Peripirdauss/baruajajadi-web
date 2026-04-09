import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="rounded-[3rem] glass-card p-10 sm:p-20 space-y-12 relative overflow-hidden text-center">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          {/* Heading */}
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.3em] uppercase mx-auto">
               <CheckCircle className="h-3 w-3" /> System Integration Ready
             </div>
            <h2 className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl text-balance leading-none">
              Ready to <span className="text-primary italic">Ascend?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join the elite circle of builders, developers, and innovators who use BaruAjaJadi to architect their next-gen projects.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold tracking-tight text-muted-foreground uppercase opacity-80">
            {['Global Auth', 'Cloud Assets', 'Core Engine', 'Support'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                {item}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center items-center pt-4">
            <Button size="xl" asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/20 px-12 h-18 font-black text-xl active:scale-95 transition-all group">
              <Link href="/signup" className="flex items-center gap-2">
                Deploy Account <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="xl" variant="ghost" asChild className="rounded-full h-18 px-10 font-bold text-lg hover:bg-primary/5 active:scale-95 transition-all">
              <Link href="/about">System Overview</Link>
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/40 italic">
            Integrity Check: PASSED // latency: 12ms // encryption: true
          </p>
        </div>
      </div>
    </section>
  )
}
