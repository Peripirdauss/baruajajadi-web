'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const fetchData = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setFullData(data);
      setAssets(data.assets || []);
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

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Asset Management</h1>
          <p className="text-muted-foreground">Manage your design and development assets.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Asset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    value={formData.slug} 
                    onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                    disabled={!!editingAsset}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-accent">Save Asset</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Hero Configuration Section */}
      <Card className="border-primary/20 bg-primary/[0.02]">
        <CardHeader>
          <CardTitle className="text-xl font-bold lowercase">konfigurasi header halaman 🎨</CardTitle>
          <CardDescription className="lowercase">atur judul, subtitle, dan statistik di halaman pilihan aset sakti.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hero-title" className="lowercase">judul utama</Label>
              <Input 
                id="hero-title" 
                value={heroData.title} 
                onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                placeholder="pilihan aset sakti ✨"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle" className="lowercase">subtitle</Label>
              <Textarea 
                id="hero-subtitle" 
                value={heroData.subtitle} 
                onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                placeholder="koleksi template & desain..."
                className="h-20"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-primary/10">
            <Label className="lowercase block mb-4 font-bold text-primary/60">statistik (opsional)</Label>
            <div className="grid gap-4 md:grid-cols-3">
              {heroData.stats.map((stat: any, i: number) => (
                <div key={i} className="space-y-3 p-4 rounded-2xl bg-white border border-border shadow-sm">
                  <div className="space-y-1">
                    <Label className="text-[10px] lowercase text-muted-foreground">nilai (e.g. 500+)</Label>
                    <Input 
                      value={stat.value} 
                      onChange={(e) => {
                        const newStats = [...heroData.stats];
                        newStats[i].value = e.target.value;
                        setHeroData({...heroData, stats: newStats});
                      }}
                      className="font-bold text-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] lowercase text-muted-foreground">label (e.g. aset ready)</Label>
                    <Input 
                      value={stat.label} 
                      onChange={(e) => {
                        const newStats = [...heroData.stats];
                        newStats[i].label = e.target.value;
                        setHeroData({...heroData, stats: newStats});
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveHero} className="bg-primary text-white hover:bg-primary/90 px-8 rounded-xl font-bold lowercase">
              <Save className="mr-2 h-4 w-4" /> simpan perubahan header
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Assets</CardTitle>
          <CardDescription>A list of all curated assets available for download.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.slug}>
                  <TableCell>
                    <div className="w-10 h-10 rounded overflow-hidden bg-muted">
                      <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell className="text-muted-foreground">{asset.slug}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => {
                        setEditingAsset(asset);
                        setFormData(asset);
                        setIsDialogOpen(true);
                      }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(asset.slug)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {assets.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No assets found. Add your first resource!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
