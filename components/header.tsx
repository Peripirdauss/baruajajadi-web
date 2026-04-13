'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, LogIn, User, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('user')
      setUser(null)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  useEffect(() => {
    setIsClient(true)
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/40 transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-8 lg:px-10">
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 relative overflow-hidden rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40}
                height={40}
                className="object-contain p-1.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground tracking-tight lowercase leading-none">baru<span className="text-primary">aja</span>jadi</span>
              <span className="text-[10px] font-medium text-muted-foreground/60 leading-none">sat-set & anti ribet 🔥</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center gap-10 lg:flex">
          {['tools', 'assets', 'blog', 'about'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              className="text-sm font-bold text-muted-foreground/70 transition-all hover:text-primary relative group lowercase tracking-tight"
            >
              {item === 'assets' ? 'pilihan' : item === 'blog' ? 'cerita' : item === 'about' ? 'tentang' : item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full opacity-50"></span>
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden gap-3 lg:flex items-center">
          {isClient && user ? (
            <div className="flex items-center gap-3">
              <Button size="lg" asChild className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10 font-bold px-6 h-11">
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <div className="flex items-center">
                    <LayoutDashboard className="h-4 w-4 mr-2" /> {user.role === 'admin' ? 'Pusat Kontrol Cuan' : 'Koleksi Tools'}
                  </div>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all h-11 w-11">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="lg" asChild className="font-bold text-sm lowercase tracking-tight px-6 h-11 hover:bg-primary/5 hover:text-primary">
                <Link href="/login">masuk bestie</Link>
              </Button>
              <Button size="lg" asChild className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 font-black shadow-xl shadow-accent/10 px-8 h-11 border border-accent/20 lowercase tracking-tight">
                <Link href="/signup">join circle kita</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl glass text-foreground border border-border/50"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={cn(
        "absolute top-full left-0 w-full glass lg:hidden transition-all duration-300 overflow-hidden border-b border-border/50",
        isOpen ? "max-h-screen opacity-100 py-10 px-6 shadow-2xl" : "max-h-0 opacity-0"
      )}>
        <div className="flex flex-col gap-8">
          {['Tools', 'Assets', 'Blog', 'About'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)} 
              className="text-4xl font-black text-foreground hover:text-primary flex items-center justify-between tracking-tighter italic uppercase"
            >
              {item} <ChevronRight className="h-8 w-8 text-primary opacity-20" />
            </Link>
          ))}
          
          <div className="flex flex-col gap-3 pt-8 border-t border-border/30">
            {isClient && user ? (
              <>
                <Button size="lg" asChild className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-bold text-xl">
                  <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)}>
                    {user.role === 'admin' ? 'Pusat Cuan' : 'Hub Bestie'}
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" onClick={handleLogout} className="w-full h-16 rounded-2xl text-foreground font-bold border border-border/50">
                  <LogOut className="mr-2 h-5 w-5" /> Exit Session
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="lg" asChild className="w-full h-16 rounded-2xl border-border/50 font-bold text-xl">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                 <Button size="lg" asChild className="w-full h-16 rounded-2xl bg-accent text-accent-foreground font-black text-xl shadow-xl shadow-accent/20">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>Join Hub</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
