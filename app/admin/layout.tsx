'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarTrigger } from '@/components/ui/sidebar'
import { LayoutDashboard, Image as LucideImage, Wrench, FileText, Home, Settings, Loader2 } from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  { title: 'ringkasan', icon: LayoutDashboard, href: '/admin' },
  { title: 'pengaturan', icon: Settings, href: '/admin/settings' },
  { title: 'halaman utama', icon: LucideImage, href: '/admin/hero' },
  { title: 'tools sakti', icon: Wrench, href: '/admin/tools' },
  { title: 'pilihan aset', icon: LucideImage, href: '/admin/assets' },
  { title: 'cerita blog', icon: FileText, href: '/admin/blog' },
];

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
      <div className="flex min-h-screen bg-[#f8fafc] w-full selection:bg-primary/30 font-outfit">
        <Sidebar className="border-r border-border/40 bg-white/80 backdrop-blur-2xl">
          <SidebarHeader className="p-8 border-b border-border/20">
            <Link href="/admin" className="group block">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 relative overflow-hidden rounded-2xl bg-primary group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-primary/20 flex items-center justify-center">
                  <Image 
                    src="/perip/logo.png" 
                    alt="Logo" 
                    width={48}
                    height={48}
                    className="object-contain p-2"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground font-black tracking-tighter text-2xl leading-none lowercase">admin</span>
                  <span className="text-primary font-bold text-[9px] tracking-[0.3em] lowercase leading-tight">bestie hub</span>
                </div>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-6">
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] lowercase tracking-widest font-bold text-primary/40 mb-8 px-4 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
                navigasi
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-3">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title} className="h-14 rounded-2xl transition-all duration-300 hover:bg-primary/5 hover:translate-x-2 group border border-transparent hover:border-primary/5">
                        <Link href={item.href}>
                          <div className="flex items-center gap-4 px-4">
                            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                            <span className="font-bold text-sm tracking-tight text-muted-foreground group-hover:text-foreground transition-colors lowercase">{item.title}</span>
                            <div className="ml-auto h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent className="space-y-6">
                <div className="px-5 py-4 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest">Security Link</span>
                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Active</span>
                  </div>
                  <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[92%]"></div>
                  </div>
                </div>

                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="h-14 rounded-2xl bg-slate-900 border border-white/5 hover:bg-destructive hover:text-white group transition-all duration-500 active:scale-95 shadow-xl shadow-black/10">
                      <Link href="/">
                        <div className="flex items-center gap-4 px-5 text-white/50 group-hover:text-white">
                          <Home className="h-5 w-5" />
                          <span className="font-black text-[10px] uppercase tracking-[0.2em] italic">Exit Terminal</span>
                        </div>
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
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] -z-10 pointer-events-none opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] -z-10 pointer-events-none opacity-50"></div>
          
          <header className="sticky top-0 z-30 flex h-20 items-center border-b border-border/30 bg-white/70 backdrop-blur-xl px-10">
            <SidebarTrigger className="mr-8 hover:text-primary transition-colors h-10 w-10 border border-border rounded-xl" />
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <div className="font-bold text-[10px] tracking-widest text-emerald-600 lowercase">status: <span className="font-black">aman</span></div>
              </div>
              <div className="hidden md:flex items-center gap-2 font-mono text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                Protocol / <span className="text-primary/60">Quantum_V2</span>
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Deployment Cycle</span>
                <span className="text-xs font-black italic uppercase text-foreground">Active // {new Date().toLocaleDateString()}</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-100 border border-border flex items-center justify-center font-black text-xs text-primary shadow-inner">
                AD
              </div>
            </div>
          </header>
          
          <div className="p-10 lg:p-16 w-full animate-in fade-in duration-700 max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

