'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Github, Chrome, CheckCircle2, Loader2, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: false
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) {
      toast({ title: 'Terms Required', description: 'Please agree to the Terms and Conditions to continue.', variant: 'destructive' });
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: 'Welcome!', description: 'Your account has been created successfully.' });
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        toast({ title: 'Signup Failed', description: data.error || 'Something went wrong', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Connection Error', description: 'Failed to connect to server. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row selection:bg-primary/30 font-sans">
      {/* Left Side: Information */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 via-white to-accent/5 p-16 flex-col justify-between border-r border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <Link href="/" className="group relative z-10 block">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 relative overflow-hidden rounded-2xl bg-primary shadow-2xl shadow-primary/20 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={56}
                height={56}
                className="object-contain p-2"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground tracking-tighter lowercase">baru<span className="text-primary">aja</span>jadi</span>
              <span className="text-[10px] font-bold text-muted-foreground/60 leading-none">udah ready gaskeun ✨</span>
            </div>
          </div>
        </Link>
        
        <div className="max-w-md space-y-10 relative z-10">
          <div className="space-y-6">
            <h1 className="text-7xl font-black tracking-tight text-foreground leading-[0.85] lowercase">
              kerja dikit, <br /> <span className="text-primary italic">cuan selangit 💸</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              gabung di circle pejuang cuan, affiliate, dan seller yang kerjanya sat-set pake tools sakti.
            </p>
          </div>
          
          <div className="grid gap-4">
            {[
              "Tools Sakti Buat Bisnis Kamu",
              "Template Jualan Auto-Laris",
              "Update Tren Pasar Tiap Minggu",
              "Akses Khusus Circle Bestie"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-white/60 backdrop-blur-md border border-white/50 shadow-sm hover:translate-x-1 transition-all group">
                <div className="h-2 w-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
                <span className="font-bold text-foreground/80 tracking-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 relative z-10">
          <span>{new Date().getFullYear()} BaruAjaJadi HQ</span>
          <span>•</span>
          <span>Status: Verified</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center py-20 px-6 sm:px-12 lg:px-24 bg-white/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full opacity-50"></div>

        <div className="mx-auto w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-right-4 duration-1000">
          <div className="mb-12 text-center lg:text-left space-y-2">
            <h2 className="text-5xl font-black text-foreground tracking-tighter leading-none lowercase">
              join <br /><span className="text-primary">circle kita</span>
            </h2>
            <p className="text-sm text-muted-foreground font-medium">
              udah punya akun?{' '}
              <Button variant="link" asChild className="text-primary hover:text-primary/80 font-black underline decoration-primary/30 underline-offset-4 p-0 h-auto lowercase">
                <Link href="/login">masuk disini</Link>
              </Button>
            </p>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>

              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nama Depan</Label>
                      <Input id="first-name" name="firstName" type="text" placeholder="Contoh: Budi" value={formData.firstName} onChange={handleChange} required className="h-12 rounded-xl bg-white/50 focus-visible:ring-primary font-bold transition-all" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nama Belakang</Label>
                      <Input id="last-name" name="lastName" type="text" placeholder="Contoh: Santoso" value={formData.lastName} onChange={handleChange} required className="h-12 rounded-xl bg-white/50 focus-visible:ring-primary font-bold transition-all" />
                    </div>
                  </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Kamu</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="kamu@kreatif.com" value={formData.email} onChange={handleChange} required className="h-12 rounded-xl bg-white/50 focus-visible:ring-primary font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Kunci Rahasia (Password)</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required className="h-12 rounded-xl bg-white/50 focus-visible:ring-primary font-bold transition-all" />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 group hover:border-primary/30 transition-all cursor-pointer">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-5 w-5 rounded-lg border-primary/20 text-primary focus:ring-primary/20 bg-white cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-tight cursor-pointer">
                    Saya setuju sama <Link href="#" className="text-primary hover:underline">Aturan Bestie</Link> dan <Link href="#" className="text-primary hover:underline">Privasi Data</Link>
                  </label>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-8 text-xl font-black rounded-2xl shadow-xl shadow-accent/20 active:scale-[0.98] transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                      <>
                        <UserPlus className="h-5 w-5" /> gasken daftar!
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </div>

            <div className="space-y-8 pt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="px-4 bg-[#fcfcfd] text-muted-foreground/40">External Auth Sync</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-2xl border-border hover:bg-primary/5 hover:text-primary font-bold active:scale-95 transition-all text-sm">
                  <Chrome className="mr-2 h-5 w-5" /> Google Sync
                </Button>
                <Button variant="outline" className="h-14 rounded-2xl border-border hover:bg-primary/5 hover:text-primary font-bold active:scale-95 transition-all text-sm">
                  <Github className="mr-2 h-5 w-5" /> GitHub Sync
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
