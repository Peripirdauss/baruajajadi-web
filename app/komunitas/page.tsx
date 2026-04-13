'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Users, MessageCircle, Zap, Star, Trophy, Heart,
  ArrowRight, Sparkles, Globe, Flame, TrendingUp, Shield
} from 'lucide-react';

const FEATURES = [
  {
    icon: MessageCircle,
    title: 'Forum Diskusi Aktif',
    desc: 'Tanya, jawab, dan sharing tips cuan bareng ribuan member aktif setiap hari.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Zap,
    title: 'Tools Eksklusif Member',
    desc: 'Akses tools premium yang cuma ada buat komunitas. Update rutin, gratis selamanya.',
    color: 'text-accent',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Trophy,
    title: 'Leaderboard & Reward',
    desc: 'Aktif di komunitas, dapet poin, naik rank, dan menangkan hadiah menarik tiap bulan.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: Star,
    title: 'Konten Eksklusif',
    desc: 'Artikel, studi kasus, dan tutorial mendalam yang gak ada di tempat lain.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Shield,
    title: 'Komunitas Aman & Positif',
    desc: 'Moderasi ketat, zero spam, zero toxik. Fokus belajar dan berkembang bareng.',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
  },
  {
    icon: TrendingUp,
    title: 'Live Event & Workshop',
    desc: 'Webinar, live QnA, dan sesi mentoring langsung dari para kreator top.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
];

const STATS = [
  { value: '12K+', label: 'Member aktif' },
  { value: '500+', label: 'Diskusi per bulan' },
  { value: '50+', label: 'Event digelar' },
  { value: '4.9★', label: 'Rating komunitas' },
];

const TESTIMONIALS = [
  {
    name: 'Dina Rahayu',
    role: 'Affiliate Specialist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    quote: 'Dari komunitas ini gue dapet strategi affiliate yang langsung hasilin 20 juta bulan pertama. Worth banget!',
  },
  {
    name: 'Rizky Pratama',
    role: 'Brand Owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    quote: 'Tools eksklusifnya gila sih. Hemat waktu banget, sekarang bisa ngurusin 3 brand sekaligus.',
  },
  {
    name: 'Sari Wulandari',
    role: 'Content Creator',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    quote: 'Forumnya friendly banget, pertanyaan newbie pun dijawab serius. Komunitas paling supportif yang pernah gue ikutin.',
  },
];

export default function KomunitasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative border-b border-border overflow-hidden px-4 py-20 sm:py-32">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              <Flame className="h-4 w-4" />
              Komunitas Kreator & Pebisnis Digital
            </div>

            <h1 className="text-balance text-5xl font-extrabold tracking-tighter text-foreground sm:text-6xl lg:text-7xl lowercase">
              gabung{' '}
              <span className="text-accent">komunitas</span>{' '}
              cuan kita 🔥
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60 leading-relaxed">
              Satu tempat buat kamu belajar, sharing, dan berkembang bareng ribuan pebisnis digital, kreator konten, dan spesialis affiliate Indonesia.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 font-black shadow-xl shadow-accent/20 px-8 h-12 lowercase tracking-tight text-base"
                asChild
              >
                <Link href="https://baruajajadi.space" target="_blank" rel="noopener noreferrer">
                  <Sparkles className="mr-2 h-5 w-5" />
                  gabung sekarang — gratis!
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl h-12 px-8 font-bold lowercase tracking-tight text-base"
                asChild
              >
                <Link href="https://baruajajadi.space" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-5 w-5" />
                  lihat komunitas
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
                  <div className="text-3xl font-black text-foreground tracking-tight">{stat.value}</div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-border px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground lowercase">
                kenapa harus join? 🤔
              </h2>
              <p className="mt-3 text-foreground/60">
                Bukan komunitas biasa — ini rumah buat kamu yang serius mau cuan.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg"
                  >
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b border-border px-4 py-20 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground lowercase">
                kata mereka yang udah join 💬
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed italic">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-bold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
              <Heart className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground lowercase">
              siap join komunitas terbaik? 🚀
            </h2>
            <p className="mt-4 text-foreground/60 text-lg">
              Gratis selamanya. Daftar sekarang dan langsung akses semua fitur komunitas di <strong>baruajajadi.space</strong>.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 font-black shadow-xl shadow-accent/20 px-10 h-14 lowercase tracking-tight text-lg"
                asChild
              >
                <Link href="https://baruajajadi.space" target="_blank" rel="noopener noreferrer">
                  gaskeun gabung sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Tidak perlu kartu kredit · Langsung aktif · 12.000+ member sudah bergabung
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
