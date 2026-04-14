'use client';

import { use } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, ArrowLeft, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AssetData {
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  downloads?: number;
  rating?: number;
  author?: string;
  fileSize?: string;
  type?: string;
}

export default function AssetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [asset, setAsset] = useState<AssetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAsset() {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        const foundAsset = data.assets?.find((a: any) => a.slug === slug);
        
        if (foundAsset) {
          setAsset(foundAsset);
        }
      } catch (e) {
        console.error("Error fetching asset:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchAsset();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div className="text-foreground/50 font-medium lowercase">sedang memuat aset sakti...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-24 text-center">
          <h1 className="text-3xl font-bold lowercase">waduh, aset nggak ketemu! 🕵️‍♂️</h1>
          <p className="mt-4 text-muted-foreground lowercase">mungkin kodenya salah atau asetnya sudah ditarik.</p>
          <Button asChild className="mt-8 rounded-full">
            <Link href="/assets">
              <ArrowLeft className="mr-2 h-4 w-4" /> kembali ke galeri
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs / Back */}
        <div className="mb-8">
          <Link href="/assets" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors lowercase">
            <ArrowLeft className="mr-2 h-4 w-4" /> kembali ke galeri aset
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Image Showcase */}
          <div className="space-y-6">
            <div className="aspect-video overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl">
              <img 
                src={asset.image} 
                alt={asset.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted overflow-hidden border border-border opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src={asset.image} alt="" className="h-full w-full object-cover grayscale" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Asset Details */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-4 py-1 rounded-full lowercase font-bold">
                {asset.category}
              </Badge>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-bold">{asset.rating || 5.0}</span>
              </div>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-foreground lg:text-5xl mb-4">
              {asset.name}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {asset.description}
            </p>

            <div className="space-y-6 flex-grow">
              {/* Asset Stats/Meta */}
              <div className="grid grid-cols-2 gap-4 rounded-3xl bg-secondary/50 p-6 border border-border">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground lowercase">ukuran file</p>
                  <p className="font-bold">{asset.fileSize || '12.4 MB'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground lowercase">tipe file</p>
                  <p className="font-bold">{asset.type || 'Figma/PNG'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground lowercase">total download</p>
                  <p className="font-bold">{(asset.downloads || 0).toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground lowercase">lisensi</p>
                  <div className="flex items-center gap-1 text-green-500">
                    <ShieldCheck className="h-4 w-4" />
                    <p className="font-bold">Personal Use</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 h-16 rounded-2xl bg-primary text-white hover:bg-primary/90 text-lg font-black lowercase gap-3 shadow-xl shadow-primary/20">
                <Download className="h-6 w-6" /> download aset sekarang
              </Button>
              <Button variant="outline" className="h-16 w-16 rounded-2xl border-2 flex items-center justify-center">
                <Share2 className="h-6 w-6" />
              </Button>
            </div>
            
            <p className="mt-6 text-center text-xs text-muted-foreground lowercase italic">
              *aset ini telah melalui proses kurasi ketat oleh team baruajajadi.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
