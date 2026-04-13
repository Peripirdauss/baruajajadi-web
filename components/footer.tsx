import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Twitter, Github, Linkedin, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/30 glass py-24 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 relative overflow-hidden rounded-2xl bg-primary shadow-xl shadow-primary/10 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={48}
                  height={48}
                  className="object-contain p-2"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-foreground tracking-tighter lowercase">baru<span className="text-primary">aja</span>jadi</span>
                <span className="text-[10px] font-bold text-muted-foreground/60 leading-none">sat-set & anti ribet 🔥</span>
              </div>
            </div>
            <p className="text-base text-muted-foreground/70 font-medium lowercase">
              bestie bisnis kamu buat urusan admin & cuan sat-set. gaskeun kembangin brand kamu bareng kita!
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-bold text-foreground uppercase tracking-[0.4em] opacity-40">koleksi / tools</h3>
            <ul className="space-y-4">
              {['semua tools', 'khusus affiliate', 'buat brand owner', 'kols spesial'].map((item) => (
                <li key={item}>
                  <Link href="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold tracking-tight lowercase">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-bold text-foreground uppercase tracking-[0.4em] opacity-40">aset / cerita</h3>
            <ul className="space-y-4">
              {['pilihan aset', 'cerita cuan', 'tutorial sat-set', 'komunitas'].map((item) => (
                <li key={item}>
                  <Link href={item === 'pilihan aset' ? '/assets' : '/blog'} className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold tracking-tight lowercase">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-bold text-foreground uppercase tracking-[0.4em] opacity-40">info / sosmed</h3>
            <ul className="space-y-4">
              {['tentang kita', 'privasi', 'aturan main', 'bantuan'].map((item) => (
                <li key={item}>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold tracking-tight lowercase">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-border/30 mb-12" />

        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between relative">
          <div className="flex flex-col gap-2">
             <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.3em] flex items-center gap-2">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               © {currentYear} baruajajadi. gaskeun cuan!
             </p>
             <p className="text-[10px] text-muted-foreground/30 font-bold uppercase tracking-widest">
               Platform v1.0 // Made with 🔥 for Specialists
             </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-8">
            {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
              <Link key={i} href="#" className="text-muted-foreground/60 hover:text-primary transition-all hover:scale-125">
                <Icon size={20} strokeWidth={2} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
