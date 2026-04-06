'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Chrome, Loader2, LogIn, Key, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: 'Welcome Back!', description: 'Accessing your dashboard...' });
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        toast({ title: 'Login Failed', description: data.error || 'Invalid credentials', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Connection Error', description: 'Failed to sync with server. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-accent/30">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-2xl bg-primary group-hover:scale-110 transition-transform shadow-xl shadow-primary/20 flex items-center justify-center">
              <LogIn className="text-primary-foreground h-6 w-6" />
            </div>
            <span className="text-3xl font-black text-foreground tracking-tighter">BaruAjaJadi</span>
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-foreground">Sign In</h1>
            <p className="text-lg text-foreground/40 font-medium">
              Don&apos;t have an account?{' '}
              <Button variant="link" asChild className="text-accent hover:text-accent/80 font-black underline decoration-accent/30 underline-offset-4 active:scale-95 transition-all p-0 h-auto">
                <Link href="/signup">Sign up</Link>
              </Button>
            </p>
          </div>
        </div>

        <div className="bg-card border border-border p-10 rounded-[2.5rem] shadow-2xl shadow-accent/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1 flex items-center gap-2">
                <Mail className="h-3 w-3" /> Email Address
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                placeholder="john@example.com" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="h-14 rounded-2xl border-border bg-background focus-visible:ring-accent font-medium px-5" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                  <Key className="h-3 w-3" /> Password
                </Label>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Forgot?</Link>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="h-14 rounded-2xl border-border bg-background focus-visible:ring-accent font-medium px-5" 
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 text-xl font-black rounded-2xl shadow-xl shadow-accent/20 active:scale-[0.98] transition-all">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Enter Workspace'}
            </Button>
          </form>

          <div className="mt-10 space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
                <span className="px-4 bg-card text-foreground/30">Or fast connect</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="h-14 rounded-2xl border-border hover:bg-accent/5 hover:border-accent/30 font-bold active:scale-95 transition-all">
                <Chrome className="mr-2 h-5 w-5" /> Google
              </Button>
              <Button variant="outline" size="lg" className="h-14 rounded-2xl border-border hover:bg-accent/5 hover:border-accent/30 font-bold active:scale-95 transition-all">
                <Github className="mr-2 h-5 w-5" /> GitHub
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-foreground/10">
          © {new Date().getFullYear()} BaruAjaJadi HQ
        </p>
      </div>
    </div>
  );
}
