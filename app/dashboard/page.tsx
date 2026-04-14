'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings, LogOut, Package, Star, MessageSquare, ArrowRight, Clock, FileText, AlertCircle, Loader2, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export default function UserDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [content, setContent] = useState<any>({ tools: [], blog: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/content');
      if (!res.ok) throw new Error('Failed to fetch content');
      const data = await res.json();
      setContent({
        tools: data.tools || [],
        blog: data.blog || []
      });
    } catch (e) {
      const msg = 'Could not load your dashboard content. Please try again.';
      setError(msg);
      toast({ title: 'Fetch Error', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);
    fetchContent();
  }, [router, fetchContent]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({ title: 'Logged Out', description: 'See you again soon!' });
    router.push('/login');
  };

  const handleDebugClick = () => {
    toast({ 
      title: 'JS Connection Verified', 
      description: 'Your browser is successfully executing JavaScript events!', 
      variant: 'default' 
    });
  };

  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="relative mb-8">
          <div className="h-24 w-24 rounded-full border-4 border-accent/20 border-t-accent animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-accent animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Sabar ya, lagi siapin pusat cuan kamu...</h2>
        <p className="text-foreground/50 max-w-xs mx-auto">Lagi ngetrack data cuan biar kamu tinggal gas aja.</p>
      </div>
    );
  }

  if (!user) return null;

  const recentTools = content.tools.slice(0, 3);
  const recentArticles = content.blog.slice(0, 3);

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 font-sans">
      {/* Top Navigation - Distinguishes User Hub from Admin Sidebar */}
      <header className="sticky top-0 z-40 w-full glass border-b border-border/40 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-accent group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-accent/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-black italic tracking-tighter uppercase">Baru<span className="text-accent">Aja</span>Jadi</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {[
                { name: 'Workspace', href: '/dashboard', icon: LayoutDashboard, active: true },
                { name: 'Tools', href: '/tools', icon: Package },
                { name: 'Assets', href: '/assets', icon: Star },
                { name: 'Articles', href: '/blog', icon: FileText },
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl",
                    item.active 
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/10" 
                      : "text-foreground/50 hover:text-accent hover:bg-accent/5"
                  )}
                >
                  <item.icon className="h-4 w-4" /> {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-foreground leading-none">{user.firstName} {user.lastName}</span>
              <span className="text-[9px] font-black text-accent uppercase tracking-widest">{user.role} workspace</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-xl text-foreground/40 hover:text-destructive hover:bg-destructive/5 h-10 w-10">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-6 lg:p-12">
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-border/40 pb-10">
          <div className="space-y-2" onClick={handleDebugClick}>
            <h1 className="text-6xl font-black tracking-tighter text-foreground leading-none lowercase">
              halo bestie, <span className="text-accent italic">{user.firstName}</span> !
            </h1>
            <p className="text-lg text-foreground/40 font-medium flex items-center gap-2 mt-4 ml-1">
              Gimana? Semangat jualan hari ini? Gaskeun!
            </p>
          </div>
          <Button size="lg" asChild className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 group px-8 active:scale-95 transition-all shadow-xl shadow-accent/10 h-14 font-black italic uppercase tracking-tight">
            <Link href="/">
              Explore Ecosystem <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </header>

        {error ? (
          <div className="p-20 text-center bg-destructive/5 border border-destructive/20 rounded-[3rem] shadow-2xl">
            <AlertCircle className="h-16 w-16 mx-auto text-destructive mb-6 animate-bounce" />
            <h2 className="text-3xl font-black mb-3 italic">Sync Error</h2>
            <p className="text-foreground/50 mb-8 max-w-sm mx-auto text-lg">{error}</p>
            <Button onClick={fetchContent} size="lg" className="rounded-2xl px-10 font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20">Try Reconnecting</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Account & Support */}
            <div className="space-y-10">
              <Card className="border-border/40 shadow-2xl shadow-accent/5 rounded-[2.5rem] overflow-hidden border-t-accent/20 bg-white/40 backdrop-blur-xl">
                <CardHeader className="bg-accent/5 pb-6 pt-8 text-center border-b border-border/20">
                  <div className="h-16 w-16 rounded-3xl bg-accent/20 flex items-center justify-center mx-auto mb-4 text-accent ring-8 ring-accent/5 group-hover:rotate-12 transition-all">
                    <Settings className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">Profile Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-10 px-8 pb-10">
                  <div className="space-y-2 p-5 rounded-[1.5rem] bg-accent/5 border border-accent/10">
                    <span className="text-[10px] text-accent font-black uppercase tracking-[0.3em] block">ID LOGIN</span>
                    <p className="text-sm font-bold text-foreground overflow-hidden text-ellipsis">{user.email}</p>
                  </div>
                  <div className="space-y-2 p-5 rounded-[1.5rem] bg-accent/5 border border-accent/10">
                    <span className="text-[10px] text-accent font-black uppercase tracking-[0.3em] block">MEMBER SEJAK</span>
                    <p className="text-sm font-bold text-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'April 2026'}
                    </p>
                  </div>
                  <Button variant="outline" asChild className="w-full mt-4 rounded-2xl h-14 font-black text-sm uppercase tracking-[0.2em] border-accent/20 hover:bg-accent hover:text-accent-foreground transition-all active:scale-95 shadow-lg shadow-accent/5 italic">
                    <Link href="/dashboard/settings">Access Portal</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 text-white rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 h-32 w-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-accent/20 transition-colors"></div>
                <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground shadow-xl shadow-accent/30 group-hover:rotate-6 transition-transform">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-3 italic uppercase tracking-tighter">Need Help?</h3>
                  <p className="text-white/40 text-lg leading-relaxed font-medium">Our tactical support team is ready to optimize your workflow.</p>
                </div>
                <Button asChild className="w-full bg-white text-slate-950 hover:bg-accent hover:text-white rounded-2xl h-14 font-black transition-all active:scale-95 shadow-lg uppercase tracking-widest text-xs italic">
                  <Link href="/about">Open Service Channel</Link>
                </Button>
              </Card>
            </div>

            {/* Right Column: Platform Updates */}
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h2 className="text-4xl font-black tracking-tighter text-foreground flex items-center gap-4 italic uppercase">
                  Latest Insights <span className="text-xs font-black text-accent bg-accent/10 px-4 py-1.5 rounded-full ring-1 ring-accent/20">{content.blog.length} Updates</span>
                </h2>
                <Button variant="link" asChild className="text-accent text-lg font-black hover:no-underline hover:translate-x-2 transition-transform h-auto p-0 uppercase italic tracking-tighter">
                  <Link href="/blog">View Full Stream</Link>
                </Button>
              </div>

              <div className="grid gap-8">
                {recentArticles.length > 0 ? recentArticles.map((article: any) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="block group w-full text-left outline-none cursor-pointer active:scale-[0.98] transition-transform">
                    <Card className={cn(
                      "border-border/40 shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-accent/40 transition-all rounded-[3rem] overflow-hidden bg-white/40 backdrop-blur-md",
                      "hover:bg-white/80"
                    )}>
                      <CardContent className="p-0 flex flex-col md:flex-row min-h-48">
                        <div className="w-full md:w-72 h-48 md:h-auto shrink-0 relative overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute top-6 left-6">
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] bg-accent/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-2xl">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-10 flex flex-col justify-center flex-1">
                          <div className="flex items-center gap-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-4">
                            <span className="flex items-center gap-2"><Clock className="h-3 w-3 text-accent" /> {article.readTime} reading</span>
                            <span className="w-2 h-2 rounded-full bg-accent/30 animate-pulse"></span>
                            <span className="text-accent">Available Now</span>
                          </div>
                          <h3 className="font-black text-3xl leading-[1.1] mb-6 group-hover:text-accent transition-colors italic tracking-tighter">{article.title}</h3>
                          <p className="text-foreground/40 line-clamp-2 leading-relaxed font-medium text-lg">{article.excerpt}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )) : (
                  <div className="p-32 text-center border-4 border-dashed border-accent/10 rounded-[4rem] bg-accent/5 flex flex-col items-center justify-center space-y-6">
                    <div className="h-24 w-24 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent/30 rotate-12 ring-8 ring-accent/5">
                      <FileText className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-foreground/40 tracking-tighter italic uppercase">Feed Offline</p>
                      <p className="text-foreground/30 font-medium mt-1">Establishing link with content database...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
