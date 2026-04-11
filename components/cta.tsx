import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative py-32 sm:py-48 bg-[#f8fafc] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border/20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/5 blur-[160px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[140px] rounded-full -z-10"></div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="rounded-[4rem] bg-white border border-border/40 p-12 sm:p-24 space-y-16 relative overflow-hidden text-center shadow-[0_80px_160px_-40px_rgba(29,78,216,0.1)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-primary rounded-full"></div>
          
          {/* Heading */}
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black tracking-[0.4em] uppercase mx-auto shadow-sm">
               <CheckCircle className="h-3.5 w-3.5" /> Core Integration // Active
             </div>
            <h2 className="text-6xl font-black tracking-tighter text-foreground sm:text-8xl text-balance leading-[0.85] uppercase italic">
              Ready to <br /><span className="text-primary">Ascend</span> the <span className="text-muted-foreground/20">Loop?</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium border-l-4 border-primary/10 pl-8 text-left sm:text-center sm:mx-auto">
              Initialize your architectural evolution. Join the elite network of developers building the next human-machine interface.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-black tracking-[0.3em] text-muted-foreground/40 uppercase">
            {['Quantum Auth', 'Neural Assets', 'Sync Engine', 'Tier 1 Support'].map((item) => (
              <div key={item} className="flex items-center gap-3 group">
                <div className="h-2 w-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></div>
                <span className="group-hover:text-foreground transition-colors">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-center items-center pt-8">
            <Button size="xl" asChild className="rounded-2xl bg-primary text-white hover:bg-slate-900 shadow-2xl shadow-primary/30 px-16 h-20 font-black text-xl uppercase tracking-widest italic active:scale-95 transition-all group">
              <Link href="/signup">
                <div className="flex items-center gap-3">
                  Deploy Account <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </Link>
            </Button>
            <Button size="xl" variant="ghost" asChild className="rounded-2xl h-20 px-12 font-black text-sm uppercase tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary active:scale-95 transition-all border border-transparent hover:border-primary/10">
              <Link href="/about">System Intel</Link>
            </Button>
          </div>

          {/* Footer Text */}
          <div className="pt-10 flex flex-col items-center gap-2">
             <div className="h-px w-20 bg-border/20 mb-4"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 italic">
               Verification: SUCCESS // Pulse: 60bpm // encryption: AES-256
             </p>
          </div>
        </div>
      </div>
    </section>
  )
}
