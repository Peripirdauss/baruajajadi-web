'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Save, X, ImageIcon, Search, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSlug } from '@/lib/utils/slug';

interface Asset {
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

export default function AdminAssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [fullData, setFullData] = useState<any>(null);
  const [heroData, setHeroData] = useState<any>({
    title: '',
    subtitle: '',
    stats: [
      { label: '', value: '' },
      { label: '', value: '' },
      { label: '', value: '' }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  const [formData, setFormData] = useState<Asset>({
    slug: '',
    name: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (autoSlug && !editingAsset && formData.name) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.name) }));
    }
  }, [formData.name, autoSlug, editingAsset]);

  const fetchData = async () => {
    try {
      const [contentRes, categoriesRes] = await Promise.all([
        fetch('/api/content'),
        fetch('/api/admin/categories')
      ]);
      
      const data = await contentRes.json();
      const categoriesData = await categoriesRes.json();
      
      setFullData(data);
      setAssets(data.assets || []);
      setCategories(categoriesData.categories || []);
      
      if (data.assetsHero) {
        setHeroData(data.assetsHero);
      }
    } catch (e) {
      console.error('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug || !formData.category) {
      toast({ title: 'Validation Error', description: 'Please fill name, slug, and category.', variant: 'destructive' });
      return;
    }

    const newAssets = editingAsset
      ? assets.map((a) => (a.slug === editingAsset.slug ? formData : a))
      : [...assets, formData];

    const updatedData = { ...fullData, assets: newAssets };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast({ title: 'Success', description: 'Asset saved successfully' });
        setAssets(newAssets);
        setFullData(updatedData);
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to save asset', variant: 'destructive' });
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return;

    const newAssets = assets.filter((a) => a.slug !== slug);
    const updatedData = { ...fullData, assets: newAssets };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast({ title: 'Deleted', description: 'Asset removed' });
        setAssets(newAssets);
        setFullData(updatedData);
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to delete asset', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      name: '',
      description: '',
      category: '',
      image: ''
    });
    setAutoSlug(true);
  };

  const handleSaveHero = async () => {
    const updatedData = { ...fullData, assetsHero: heroData };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast({ title: 'Success', description: 'Hero section updated successfully' });
        setFullData(updatedData);
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to update hero section', variant: 'destructive' });
    }
  };

  const handleSaveCategories = async (newCategories: string[]) => {
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: newCategories }),
      });

      if (res.ok) {
        setCategories(newCategories);
        toast({ title: 'Success', description: 'Categories updated' });
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to update categories', variant: 'destructive' });
    }
  };

  const addCategory = () => {
    if (!newCategory || categories.includes(newCategory)) return;
    const updated = [...categories, newCategory];
    handleSaveCategories(updated);
    setNewCategory('');
  };

  const deleteCategory = (cat: string) => {
    const updated = categories.filter(c => c !== cat);
    handleSaveCategories(updated);
  };

  if (loading) return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-xs font-black text-primary/40 uppercase tracking-widest">Memuat Aset...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter lowercase italic">pilihan aset 🎨</h1>
          <p className="text-muted-foreground font-medium lowercase">kelola koleksi template & desain sakti kita.</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-border/40 font-bold lowercase hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                manage kategori
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <div className="p-8 pb-0">
                <DialogHeader>
                  <DialogTitle className="lowercase font-black text-2xl tracking-tighter italic">kategori aset 📦</DialogTitle>
                </DialogHeader>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex gap-2">
                  <Input 
                    placeholder="nama kategori baru..." 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="rounded-xl lowercase font-bold bg-slate-50 border-none h-12"
                  />
                  <Button onClick={addCategory} className="rounded-xl bg-primary h-12 px-6 font-black">tambah</Button>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-auto pr-2 custom-scrollbar">
                  {categories.map(cat => (
                    <div key={cat} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white group hover:border-primary/30 transition-all">
                      <span className="font-bold text-sm lowercase tracking-tight">{cat}</span>
                      <Button variant="ghost" size="icon" onClick={() => deleteCategory(cat)} className="h-8 w-8 text-destructive group-hover:scale-110 transition-transform">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <div className="text-center py-10 opacity-20 italic text-sm font-bold lowercase">belum ada kategori.</div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 rounded-2xl font-black shadow-xl shadow-accent/20 lowercase h-12 transition-all active:scale-95">
                <Plus className="mr-2 h-5 w-5" /> tambah aset baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] rounded-[3.5rem] border-none shadow-2xl overflow-hidden p-0">
              <div className="absolute top-0 right-0 p-12 text-accent/5 pointer-events-none">
                <ImageIcon className="h-64 w-64 rotate-12" />
              </div>
              <div className="p-10 space-y-8">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black lowercase italic tracking-tighter">
                    {editingAsset ? 'edit aset pilihan 🎨' : 'tambah aset baru 🎨'}
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground lowercase font-bold tracking-widest leading-relaxed opacity-60">pastikan semua detail aset sudah benar biar bestie gak bingung.</p>
                </DialogHeader>
                <div className="grid gap-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40 pl-2">nama aset</Label>
                      <Input 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        placeholder="e.g. Kit Branding UMKM"
                        className="rounded-2xl h-14 bg-slate-50 border-none font-black placeholder:font-medium placeholder:text-muted-foreground/20 px-6 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40 pl-2 flex justify-between items-center">
                        slug URL
                        <button type="button" onClick={() => setAutoSlug(!autoSlug)} className={`text-[9px] px-2 py-0.5 rounded-full border ${autoSlug ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                          {autoSlug ? 'auto ✨' : 'manual ✍️'}
                        </button>
                      </Label>
                      <Input 
                        value={formData.slug} 
                        onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                        placeholder="e.g. kit-branding-umkm"
                        className="rounded-2xl h-14 bg-slate-50 border-none font-mono text-sm px-6 opacity-70"
                        disabled={!!editingAsset}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40 pl-2">kategori</Label>
                      <select 
                        className="flex h-14 w-full rounded-2xl border-none bg-slate-50 px-6 py-2 text-sm font-black lowercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="">pilih kategori</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40 pl-2">preview image URL</Label>
                      <Input 
                        value={formData.image} 
                        onChange={(e) => setFormData({...formData, image: e.target.value})} 
                        placeholder="https://images.unsplash.com/..."
                        className="rounded-2xl h-14 bg-slate-50 border-none font-bold px-6 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40 pl-2">deskripsi aset</Label>
                    <Textarea 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                      rows={4}
                      placeholder="jelaskan kegunaan aset ini buat tim bestie..."
                      className="rounded-[2.5rem] bg-slate-50 border-none font-bold resize-none p-8 text-sm leading-relaxed"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="bg-slate-50/50 p-10 mt-0">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 rounded-2xl font-bold h-14 lowercase">batal</Button>
                  <Button onClick={handleSave} className="flex-1 bg-primary text-white rounded-2xl font-black h-14 shadow-xl shadow-primary/20 lowercase italic text-base">simpan aset sakti ✨</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Hero Configuration Section */}
      <Card className="rounded-[4rem] border-none shadow-2xl shadow-primary/10 bg-primary/[0.03] overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-24 text-primary/5 pointer-events-none transition-transform group-hover:scale-110 duration-1000">
          <Settings className="h-80 w-80 -rotate-12" />
        </div>
        <CardHeader className="p-12 pb-0 relative z-10">
          <CardTitle className="text-3xl font-black lowercase italic tracking-tighter">konfigurasi header halaman 🎨</CardTitle>
          <CardDescription className="lowercase font-bold text-muted-foreground/40 tracking-[0.2em] text-[10px]">atur judul, subtitle, dan statistik di halaman pilihan aset sakti.</CardDescription>
        </CardHeader>
        <CardContent className="p-12 space-y-12 relative z-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/30 pl-4">judul utama</Label>
              <Input 
                value={heroData.title} 
                onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                placeholder="pilihan aset sakti ✨"
                className="h-16 rounded-[2rem] bg-white border-none shadow-xl shadow-primary/5 font-black lowercase text-xl px-8"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/30 pl-4">subtitle</Label>
              <Textarea 
                value={heroData.subtitle} 
                onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                placeholder="koleksi template & desain..."
                className="h-16 rounded-[2rem] bg-white border-none shadow-xl shadow-primary/5 font-bold lowercase px-8 py-5 resize-none"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/30 pl-4">statistik performa</Label>
            <div className="grid gap-8 md:grid-cols-3">
              {heroData.stats.map((stat: any, i: number) => (
                <div key={i} className="space-y-6 p-8 rounded-[3.5rem] bg-white border-none shadow-xl shadow-primary/5 group/stat hover:scale-105 transition-all duration-700">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/20">nilai (misal: 500+)</Label>
                    <Input 
                      value={stat.value} 
                      onChange={(e) => {
                        const newStats = [...heroData.stats];
                        newStats[i].value = e.target.value;
                        setHeroData({...heroData, stats: newStats});
                      }}
                      className="font-black text-4xl text-primary border-none p-0 h-auto bg-transparent focus-visible:ring-0 tracking-tighter"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/20">label (misal: aset ready)</Label>
                    <Input 
                      value={stat.label} 
                      onChange={(e) => {
                        const newStats = [...heroData.stats];
                        newStats[i].label = e.target.value;
                        setHeroData({...heroData, stats: newStats});
                      }}
                      className="font-black text-[10px] border-none p-0 h-auto bg-transparent focus-visible:ring-0 lowercase tracking-widest opacity-60"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-6">
            <Button onClick={handleSaveHero} className="bg-primary text-white hover:bg-primary/90 px-12 h-16 rounded-[2.5rem] font-black lowercase shadow-2xl shadow-primary/30 italic text-base transition-all active:scale-95">
              <Save className="mr-3 h-6 w-6" /> simpan perubahan header sakti
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[4rem] border-none shadow-2xl bg-white overflow-hidden relative group/list">
        <CardHeader className="px-14 py-12">
          <CardTitle className="text-3xl font-black lowercase tracking-tighter italic">daftar aset sakti 📦</CardTitle>
          <CardDescription className="font-bold lowercase text-muted-foreground/30 tracking-[0.3em] text-[10px]">semua koleksi aset pilihan yang bisa diakses user.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-slate-50/50 border-b border-border/10">
                  <TableHead className="pl-14 py-8 font-black text-[11px] uppercase tracking-[0.3em] text-primary/20">preview & info</TableHead>
                  <TableHead className="font-black text-[11px] uppercase tracking-[0.3em] text-primary/20">slug & kategori</TableHead>
                  <TableHead className="hidden lg:table-cell font-black text-[11px] uppercase tracking-[0.3em] text-primary/20">deskripsi</TableHead>
                  <TableHead className="text-right pr-14 font-black text-[11px] uppercase tracking-[0.3em] text-primary/20">aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.slug} className="group transition-all hover:bg-slate-50/80">
                    <TableCell className="pl-14 py-10">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border-4 border-white transition-transform group-hover:scale-110 duration-700">
                          <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter lowercase italic group-hover:text-primary transition-colors">{asset.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <span className="px-4 py-2 rounded-full text-[10px] font-black bg-primary/5 text-primary w-fit lowercase tracking-widest">{asset.category}</span>
                        <span className="font-mono text-[10px] text-muted-foreground/30 pl-2">{asset.slug}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-sm text-muted-foreground/50 font-black line-clamp-2 max-w-[350px] leading-relaxed lowercase italic">
                        {asset.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-right pr-14">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                        <Button variant="ghost" size="icon" onClick={() => {
                          setEditingAsset(asset);
                          setFormData(asset);
                          setIsDialogOpen(true);
                        }} className="h-12 w-12 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all">
                          <Pencil className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-destructive/10 hover:text-destructive transition-all" onClick={() => handleDelete(asset.slug)}>
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {assets.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-80 text-center bg-slate-50/10">
                      <div className="flex flex-col items-center gap-4 opacity-5">
                        <Search className="h-24 w-24" />
                        <p className="font-black text-2xl lowercase tracking-widest italic">Aset Masih Kosong...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
