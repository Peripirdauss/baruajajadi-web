import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Twitter, Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/50 glass py-20 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 relative overflow-hidden rounded-xl bg-primary/20 border border-primary/20">
                <Image 
                  src="/logo.jpg" 
                  alt="Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-black text-foreground tracking-tighter uppercase italic">Baru<span className="text-primary">Aja</span>Jadi</span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
              Architecting the next generation of digital infrastructure for high-performance creators.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-[0.3em]">Services</h3>
            <ul className="space-y-3">
              {['All Tools', 'Developer Hub', 'Design Core', 'AI Research'].map((item) => (
                <li key={item}>
                  <Link href="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-[0.3em]">Resources</h3>
            <ul className="space-y-3">
              {['Visual Assets', 'Digital Blog', 'System Docs', 'Community'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Visual Assets' ? '/assets' : '/blog'} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-[0.2em]">Infrastructure</h3>
            <ul className="space-y-3">
              {['About OS', 'Privacy Policy', 'System Terms', 'Direct Mail'].map((item) => (
                <li key={item}>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-border/30 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between relative">
          <div className="flex flex-col gap-1">
             <p className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">
               © {currentYear} BaruAjaJadi Terminal. All signals verified.
             </p>
             <p className="text-[10px] text-muted-foreground/40 font-medium">
               Build version: 2026.04.Quantum // Latency: Checked
             </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
              <Link key={i} href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <Icon size={22} strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>

  )
}
