'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
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
        
        // We still store basic role info for UI state, but sensitive data is now in the secure cookie
        localStorage.setItem('user', JSON.stringify({ role: data.role }));
        
        if (data.role === 'admin') {
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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 selection:bg-primary/30">
      <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="text-center space-y-4">
          <Link href="/" className="group inline-block">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 relative overflow-hidden rounded-2xl bg-primary shadow-2xl shadow-primary/20 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={64}
                  height={64}
                  className="object-contain p-2"
                  priority
                />
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-foreground tracking-tighter uppercase italic">Baru<span className="text-primary">Aja</span>Jadi</span>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Temen Cuan Kamu // v1.0</p>
              </div>
            </div>
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-foreground leading-none lowercase">masuk <span className="text-primary">dulu yuk</span></h1>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                <Mail className="h-3 w-3" /> Email Kamu
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
                className="h-14 rounded-2xl border-border bg-white/50 focus-visible:ring-primary font-medium px-5 transition-all" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Key className="h-3 w-3" /> Kunci Rahasia
                </Label>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
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
                className="h-14 rounded-2xl border-border bg-white/50 focus-visible:ring-primary font-medium px-5 transition-all" 
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 text-xl font-black rounded-2xl shadow-xl shadow-accent/20 active:scale-[0.98] transition-all group overflow-hidden relative">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>gaskeun masuk <LogIn className="h-5 w-5" /></>}
              </span>
            </Button>
          </form>

          <div className="mt-10 space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
                <span className="px-4 bg-white/5 backdrop-blur-sm text-muted-foreground/40">Credential Sync</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="h-14 rounded-2xl border-border hover:bg-primary/5 hover:text-primary font-bold active:scale-95 transition-all">
                <Chrome className="mr-2 h-5 w-5" /> Google
              </Button>
              <Button variant="outline" size="lg" className="h-14 rounded-2xl border-border hover:bg-primary/5 hover:text-primary font-bold active:scale-95 transition-all">
                <Github className="mr-2 h-5 w-5" /> GitHub
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <p className="text-sm text-muted-foreground font-medium">
            belum punya akun?{' '}
            <Button variant="link" asChild className="text-primary hover:text-primary/80 font-black underline decoration-primary/30 underline-offset-4 p-0 h-auto lowercase">
              <Link href="/signup">daftar dulu</Link>
            </Button>
          </p>
          <div className="pt-8 flex flex-col items-center gap-2">
            <div className="h-px w-8 bg-border"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">
              © {new Date().getFullYear()} BaruAjaJadi HQ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
