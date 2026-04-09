'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarTrigger } from '@/components/ui/sidebar'
import { LayoutDashboard, Image as LucideImage, Wrench, FileText, Home, Settings, Loader2 } from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { title: 'Global Settings', icon: Settings, href: '/admin/settings' },
  { title: 'Hero Section', icon: LucideImage, href: '/admin/hero' },
  { title: 'Tools', icon: Wrench, href: '/admin/tools' },
  { title: 'Assets', icon: LucideImage, href: '/admin/assets' },
  { title: 'Blog', icon: FileText, href: '/admin/blog' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(savedUser);
    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full selection:bg-primary/30">
        <Sidebar className="border-r border-border/50 glass">
          <SidebarHeader className="p-6 border-b border-border/50">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="h-10 w-10 relative overflow-hidden rounded-xl bg-primary/20 border border-primary/20 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/10">
                <Image 
                  src="/logo.jpg" 
                  alt="Admin Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-black tracking-tighter text-lg leading-none">MISSION</span>
                <span className="text-primary font-mono text-[10px] tracking-[0.2em] font-bold">CONTROL</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 mb-4 px-2">System Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title} className="h-11 rounded-xl transition-all duration-300 hover:glass hover:translate-x-1 group">
                        <Link href={item.href} className="flex items-center gap-3 px-4">
                          <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="font-medium group-hover:text-foreground transition-colors">{item.title}</span>
                          <div className="ml-auto w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="h-11 rounded-xl hover:bg-destructive/10 group">
                      <Link href="/" className="flex items-center gap-3 px-4 text-muted-foreground group-hover:text-destructive transition-colors">
                        <Home className="h-5 w-5" />
                        <span className="font-medium">Exit Terminal</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] -z-10 pointer-events-none"></div>
          
          <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border/50 glass px-8">
            <SidebarTrigger className="mr-6 hover:text-primary transition-colors" />
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div className="font-mono text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">System: <span className="text-foreground">Online</span></div>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">Local Time</span>
                <span className="text-xs font-bold">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </header>
          <div className="p-8 lg:p-12 max-w-7xl mx-auto animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

