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
        <h2 className="text-2xl font-bold tracking-tight mb-2">Initializing Workspace...</h2>
        <p className="text-foreground/50 max-w-xs mx-auto">Syncing with our creative engine. This won't take long.</p>
      </div>
    );
  }

  if (!user) return null;

  const recentTools = content.tools.slice(0, 3);
  const recentArticles = content.blog.slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex selection:bg-accent/30">
      {/* Sidebar - Enhanced for clickability with asChild pattern */}
      <aside className="w-64 border-r border-border bg-card/60 backdrop-blur-3xl p-6 flex flex-col justify-between sticky top-0 h-screen z-20">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer w-full text-left outline-none">
            <div className="h-8 w-8 rounded-lg bg-primary group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-primary/20"></div>
            <span className="text-xl font-bold group-hover:text-primary transition-colors">BaruAjaJadi</span>
          </Link>
          
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20 active:scale-95 transition-all font-bold">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start gap-3 text-foreground/60 hover:text-foreground hover:bg-accent/5 active:scale-95 transition-all">
              <Link href="/tools">
                <Package className="h-4 w-4" /> Tools
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start gap-3 text-foreground/60 hover:text-foreground hover:bg-accent/5 active:scale-95 transition-all">
              <Link href="/assets">
                <Star className="h-4 w-4" /> Assets
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start gap-3 text-foreground/60 hover:text-foreground hover:bg-accent/5 active:scale-95 transition-all">
              <Link href="/blog">
                <FileText className="h-4 w-4" /> Blog
              </Link>
            </Button>
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-3xl bg-background border border-border shadow-inner group hover:border-accent/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center font-black shrink-0 text-xl group-hover:rotate-6 transition-transform">
              {user.firstName?.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold truncate text-foreground">{user.firstName} {user.lastName}</div>
              <div className="text-[10px] text-accent/80 font-black tracking-widest uppercase truncate">{user.role}</div>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 text-destructive/70 hover:bg-destructive/10 hover:text-destructive active:scale-95 transition-all">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-border pb-10">
          <div className="space-y-2 group cursor-help transition-all duration-300" onClick={handleDebugClick}>
            <h1 className="text-5xl font-black tracking-tighter text-foreground leading-none">
              Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">{user.firstName}</span>!
            </h1>
            <p className="text-lg text-foreground/40 font-medium flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent" /> System Status: Operational <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </p>
          </div>
          <Button variant="outline" size="lg" asChild className="rounded-2xl border-accent/20 hover:border-accent hover:bg-accent/5 group px-8 active:scale-95 transition-all shadow-sm">
            <Link href="/">
              Explore Platform <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </header>

        {error ? (
          <div className="p-20 text-center bg-destructive/5 border border-destructive/20 rounded-[3rem] shadow-2xl">
            <AlertCircle className="h-16 w-16 mx-auto text-destructive mb-6 animate-bounce" />
            <h2 className="text-3xl font-black mb-3">Sync Error</h2>
            <p className="text-foreground/50 mb-8 max-w-sm mx-auto text-lg">{error}</p>
            <Button onClick={fetchContent} size="lg" className="rounded-2xl px-10 font-bold shadow-xl shadow-accent/20">Try Reconnecting</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Account & Support */}
            <div className="space-y-10">
              <Card className="border-border/50 shadow-2xl shadow-accent/5 rounded-[2.5rem] overflow-hidden border-t-accent/20">
                <CardHeader className="bg-accent/5 pb-6 pt-8 text-center">
                  <div className="h-16 w-16 rounded-3xl bg-accent/20 flex items-center justify-center mx-auto mb-4 text-accent ring-4 ring-accent/10">
                    <Settings className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-black">Account Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-10 px-8 pb-10">
                  <div className="space-y-2 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                    <span className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.2em] block">Active Email</span>
                    <p className="text-sm font-bold text-foreground overflow-hidden text-ellipsis">{user.email}</p>
                  </div>
                  <div className="space-y-2 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                    <span className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.2em] block">Member Since</span>
                    <p className="text-sm font-bold text-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'April 2026'}
                    </p>
                  </div>
                  <Button variant="outline" asChild className="w-full mt-4 rounded-2xl h-14 font-black text-sm uppercase tracking-widest border-border hover:bg-accent hover:text-accent-foreground hover:shadow-xl hover:shadow-accent/20 transition-all active:scale-95">
                    <Link href="/dashboard/settings">Account Portal</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-foreground text-background rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-accent/40 transition-colors"></div>
                <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground shadow-xl shadow-accent/30 group-hover:rotate-6 transition-transform">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-3">Questions?</h3>
                  <p className="text-background/60 text-lg leading-relaxed font-medium">Our curators are standing by to assist with your creative workflow.</p>
                </div>
                <Button asChild className="w-full bg-white text-black hover:bg-accent hover:text-white rounded-2xl h-14 font-black transition-all active:scale-95 shadow-lg">
                  <Link href="/about">Support Center</Link>
                </Button>
              </Card>
            </div>

            {/* Right Column: Platform Updates */}
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-4">
                  Latest Insights <span className="text-xs font-black text-accent bg-accent/10 px-3 py-1 rounded-full">{content.blog.length} Posts</span>
                </h2>
          <Button variant="link" asChild className="text-accent text-lg font-black hover:no-underline hover:translate-x-2 transition-transform h-auto p-0">
            <Link href="/blog">Browse All</Link>
          </Button>
              </div>

              <div className="grid gap-8">
                {recentArticles.length > 0 ? recentArticles.map((article: any) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="block group w-full text-left outline-none cursor-pointer active:scale-[0.98] transition-transform">
                    <Card className={cn(
                      "border-border/50 shadow-lg hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] hover:border-accent/30 transition-all rounded-[2.5rem] overflow-hidden bg-card/40 backdrop-blur-md",
                      "hover:bg-card/80"
                    )}>
                      <CardContent className="p-0 flex flex-col md:flex-row min-h-48">
                        <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute top-4 left-4">
                            <span className="text-white text-[10px] font-black uppercase tracking-widest bg-accent px-3 py-1.5 rounded-full shadow-lg">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-8 flex flex-col justify-center flex-1">
                          <div className="flex items-center gap-4 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-4">
                            <span className="flex items-center gap-2"><Clock className="h-3 w-3" /> {article.readTime}</span>
                            <span className="w-2 h-2 rounded-full bg-accent/20"></span>
                            <span className="text-accent/60">New Update</span>
                          </div>
                          <h3 className="font-black text-2xl leading-tight mb-4 group-hover:text-accent transition-colors">{article.title}</h3>
                          <p className="text-foreground/50 line-clamp-2 leading-relaxed font-medium">{article.excerpt}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )) : (
                  <div className="p-32 text-center border-4 border-dashed border-border rounded-[4rem] bg-accent/5 flex flex-col items-center justify-center space-y-6">
                    <div className="h-20 w-20 rounded-3xl bg-accent/10 flex items-center justify-center text-accent/30 rotate-12">
                      <FileText className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-foreground/40 tracking-tight">Feed Currently Loading...</p>
                      <p className="text-foreground/30 font-medium mt-1">If this persists, try refreshing the page.</p>
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
