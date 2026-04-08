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
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar className="border-r border-border bg-card">
          <SidebarHeader className="p-4 border-b border-border">
            <Link href="/admin" className="flex items-center gap-3 font-bold text-xl group">
              <div className="h-8 w-8 relative overflow-hidden rounded-lg bg-muted/20 border border-border group-hover:scale-105 transition-all duration-300">
                <Image 
                  src="/logo.jpg" 
                  alt="Admin Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-foreground tracking-tight">Admin <span className="text-primary/60 font-medium">Panel</span></span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link href={item.href} className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
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
                    <SidebarMenuButton asChild>
                      <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground">
                        <Home className="h-5 w-5" />
                        <span>Back to Site</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center border-b border-border bg-background/95 px-6 backdrop-blur">
            <SidebarTrigger className="mr-4" />
            <div className="font-semibold text-lg">Control Center</div>
          </header>
          <div className="p-8 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
