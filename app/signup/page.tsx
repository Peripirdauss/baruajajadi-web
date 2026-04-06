'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <div className="min-h-screen bg-background flex flex-col lg:flex-row selection:bg-accent/30">
      {/* Left Side: Information */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-accent/10 to-primary/5 p-16 flex-col justify-between border-r border-border">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/20"></div>
          <span className="text-2xl font-black text-foreground tracking-tighter">BaruAjaJadi</span>
        </Link>
        
        <div className="max-w-md space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tight text-foreground leading-[0.9]">
              Start your <br /> <span className="text-accent underline decoration-accent/20">journey</span> here.
            </h1>
            <p className="text-xl text-foreground/40 font-medium leading-relaxed">
              Join the elite ecosystem of creators, developers, and visionaries. 
            </p>
          </div>
          
          <div className="grid gap-4 pt-10">
            {[
              "50+ Specialized Developer Tools",
              "200+ Premium Design Blueprints",
              "Bi-weekly Deep Tech Artifacts",
              "Direct Access to the Founders Hub"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm hover:border-accent/30 transition-all">
                <CheckCircle2 className="text-accent h-6 w-6 shrink-0" />
                <span className="font-bold text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 text-xs font-black uppercase tracking-widest text-foreground/20">
          <span>{new Date().getFullYear()} BaruAjaJadi</span>
          <span>•</span>
          <span>Privacy</span>
          <span>•</span>
          <span>Terms</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center py-16 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-foreground tracking-tighter mb-3">
              Get Started
            </h2>
            <p className="text-lg text-foreground/40 font-medium">
              Already a member?{' '}
              <Button variant="link" asChild className="text-accent hover:text-accent/80 font-black underline decoration-accent/30 underline-offset-4 active:scale-95 transition-all p-0 h-auto">
                <Link href="/login">Sign in</Link>
              </Button>
            </p>
          </div>

          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-1">First name</Label>
                  <Input id="first-name" name="firstName" type="text" placeholder="John" value={formData.firstName} onChange={handleChange} required className="h-12 rounded-xl focus-visible:ring-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-1">Last name</Label>
                  <Input id="last-name" name="lastName" type="text" placeholder="Doe" value={formData.lastName} onChange={handleChange} required className="h-12 rounded-xl focus-visible:ring-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-1">Email address</Label>
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required className="h-12 rounded-xl focus-visible:ring-accent" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-foreground/40 ml-1">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required className="h-12 rounded-xl focus-visible:ring-accent" />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/50 group hover:border-accent/30 transition-all">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="h-5 w-5 rounded-lg border-border text-accent focus:ring-accent/20 bg-background cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm font-bold text-foreground/60 leading-tight cursor-pointer">
                  I agree to the <Link href="#" className="text-accent hover:underline">Terms</Link> and <Link href="#" className="text-accent hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-7 text-xl font-black rounded-2xl shadow-xl shadow-accent/20 active:scale-[0.98] transition-all">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" /> Start Generating
                  </span>
                )}
              </Button>
            </form>

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="px-4 bg-background text-foreground/30">Or integrate with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-2xl border-border hover:bg-accent/5 hover:border-accent/30 font-bold active:scale-95 transition-all">
                  <Chrome className="mr-2 h-5 w-5" /> Google
                </Button>
                <Button variant="outline" className="h-14 rounded-2xl border-border hover:bg-accent/5 hover:border-accent/30 font-bold active:scale-95 transition-all">
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
