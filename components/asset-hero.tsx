'use client';

import { useState, useEffect } from 'react';

export default function AssetHero() {
  const [hero, setHero] = useState<any>({
    title: "pilihan aset sakti ✨",
    subtitle: "koleksi template & desain biar tampilan brand kamu makin kece & profesional. gaskeun!",
    stats: [
      { label: "aset ready", value: "500+" },
      { label: "kategori", value: "15" },
      { label: "sat-set", value: "gratis" }
    ]
  });

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch('/perip/api/content');
        const data = await res.json();
        if (data.assetsHero) {
          setHero(data.assetsHero);
        }
      } catch (e) {
        console.error('Error fetching hero data:', e);
      }
    }
    fetchHero();
  }, []);

  return (
    <section className="border-b border-border bg-card px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl lg:text-6xl lowercase">
            {hero.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70 lowercase font-normal">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-8">
            {hero?.stats?.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm font-medium text-foreground/60 lowercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
