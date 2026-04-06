'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, LogIn, User, LayoutDashboard, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-primary group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
          </div>
          <span className="text-2xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors">BaruAjaJadi</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center gap-10 lg:flex">
          <Link href="/tools" className="text-sm font-black uppercase tracking-widest text-foreground/40 transition-all hover:text-accent hover:translate-y-[-1px]">
            Tools
          </Link>
          <Link href="/assets" className="text-sm font-black uppercase tracking-widest text-foreground/40 transition-all hover:text-accent hover:translate-y-[-1px]">
            Assets
          </Link>
          <Link href="/blog" className="text-sm font-black uppercase tracking-widest text-foreground/40 transition-all hover:text-accent hover:translate-y-[-1px]">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-black uppercase tracking-widest text-foreground/40 transition-all hover:text-accent hover:translate-y-[-1px]">
            About
          </Link>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden gap-4 lg:flex items-center">
          {isClient && user ? (
            <Button size="lg" asChild className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20 font-black gap-2 active:scale-95 transition-all px-8">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="lg" asChild className="font-black uppercase tracking-widest text-xs hover:bg-accent/5 active:scale-95 transition-all">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="lg" asChild className="rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-black shadow-xl shadow-foreground/10 active:scale-95 transition-all px-8">
                <Link href="/signup">Get Early Access</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl bg-secondary/50 border border-border text-foreground hover:bg-accent/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={cn(
        "absolute top-full left-0 w-full bg-background border-b border-border lg:hidden transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-[500px] opacity-100 py-8 px-6 shadow-2xl" : "max-h-0 opacity-0 py-0 px-0"
      )}>
        <div className="flex flex-col gap-6">
          <Link href="/tools" onClick={() => setIsOpen(false)} className="text-xl font-black text-foreground/40 hover:text-accent flex items-center justify-between">
            Tools <ChevronRight className="h-5 w-5" />
          </Link>
          <Link href="/assets" onClick={() => setIsOpen(false)} className="text-xl font-black text-foreground/40 hover:text-accent flex items-center justify-between">
            Assets <ChevronRight className="h-5 w-5" />
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="text-xl font-black text-foreground/40 hover:text-accent flex items-center justify-between">
            Blog <ChevronRight className="h-5 w-5" />
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-xl font-black text-foreground/40 hover:text-accent flex items-center justify-between">
            About <ChevronRight className="h-5 w-5" />
          </Link>
          
          <div className="flex flex-col gap-3 pt-6 border-t border-border">
            {isClient && user ? (
              <Button size="lg" asChild className="w-full h-14 rounded-2xl bg-accent text-accent-foreground font-black shadow-xl shadow-accent/20">
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard Hub</Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" size="lg" asChild className="w-full h-14 rounded-2xl border-border font-black uppercase tracking-widest text-xs">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                <Button size="lg" asChild className="w-full h-14 rounded-2xl bg-foreground text-background font-black shadow-xl shadow-foreground/10">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>Get Access Now</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
