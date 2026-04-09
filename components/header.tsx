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
    <header className="sticky top-0 z-50 glass transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 relative overflow-hidden rounded-lg bg-primary/20 border border-primary/20 group-hover:scale-110 transition-all duration-300">
            <Image 
              src="/logo.jpg" 
              alt="Logo" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">BaruAjaJadi</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-center gap-8 lg:flex">
          {['Tools', 'Assets', 'Blog', 'About'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              className="text-sm font-medium text-muted-foreground transition-all hover:text-primary relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden gap-4 lg:flex items-center">
          {isClient && user ? (
            <div className="flex items-center gap-3">
              <Button size="lg" asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold px-6">
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <LayoutDashboard className="h-4 w-4 mr-2" /> {user.role === 'admin' ? 'Control Center' : 'Dashboard'}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="lg" asChild className="font-bold text-sm px-6">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="lg" asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold shadow-xl shadow-foreground/10 px-8">
                <Link href="/signup">Get Access</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg glass text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={cn(
        "absolute top-full left-0 w-full glass lg:hidden transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-screen opacity-100 py-8 px-6" : "max-h-0 opacity-0"
      )}>
        <div className="flex flex-col gap-6">
          {['Tools', 'Assets', 'Blog', 'About'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)} 
              className="text-2xl font-bold text-foreground hover:text-primary flex items-center justify-between"
            >
              {item} <ChevronRight className="h-5 w-5" />
            </Link>
          ))}
          
          <div className="flex flex-col gap-3 pt-6 border-t border-border/50">
            {isClient && user ? (
              <>
                <Button size="lg" asChild className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold">
                  <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)}>
                    {user.role === 'admin' ? 'Admin Control Center' : 'User Dashboard'}
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" onClick={handleLogout} className="w-full h-14 rounded-xl text-foreground font-bold border border-border">
                  <LogOut className="mr-2 h-5 w-5" /> Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="lg" asChild className="w-full h-14 rounded-xl border-border font-bold">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                <Button size="lg" asChild className="w-full h-14 rounded-xl bg-foreground text-background font-bold shadow-xl shadow-foreground/10">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
