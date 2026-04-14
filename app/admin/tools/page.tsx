'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Plus, Pencil, Trash, Save, X, ExternalLink } from 'lucide-react'
import { generateSlug } from '@/lib/utils/slug'

const toolSchema = z.object({
  id: z.number().optional(),
  slug: z.string().min(1, 'Slug is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  icon: z.string().min(1, 'Icon name is required'),
  pricing: z.string().optional()
})

type Tool = z.infer<typeof toolSchema>

export default function ToolsManager() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [fullData, setFullData] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [autoSlug, setAutoSlug] = useState(true)
  const { toast } = useToast()

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Tool>({
    resolver: zodResolver(toolSchema),
    defaultValues: {
      icon: 'Code2',
      pricing: 'free'
    }
  })

  const toolName = watch('name')

  useEffect(() => {
    if (autoSlug && !editingTool && toolName) {
      setValue('slug', generateSlug(toolName))
    }
  }, [toolName, autoSlug, editingTool, setValue])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [contentRes, catsRes] = await Promise.all([
        fetch('/api/content'),
        fetch('/api/admin/tool-categories')
      ])
      const data = await contentRes.json()
      const catsData = await catsRes.json()
      
      setFullData(data)
      setTools(data.tools || [])
      setCategories(catsData.categories || [])
      setLoading(false)
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load tools data', variant: 'destructive' })
      setLoading(false)
    }
  }

  const saveAll = async (newTools: Tool[]) => {
    setSaving(true)
    try {
      const updatedData = { ...fullData, tools: newTools }
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      if (response.ok) {
        setTools(newTools)
        setFullData(updatedData)
        toast({ title: 'Success', description: 'Tools updated successfully!' })
      } else {
        throw new Error('Save failed')
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save changes', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveCategories = async (newCats: string[]) => {
    try {
      const res = await fetch('/api/admin/tool-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: newCats })
      });
      if (res.ok) {
        setCategories(newCats);
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

  const onSubmit = (values: Tool) => {
    let newTools: Tool[]
    if (editingTool) {
      newTools = tools.map(t => t.id === editingTool.id ? { ...values, id: editingTool.id } : t)
    } else {
      const newId = tools.length > 0 ? Math.max(...tools.map(t => t.id || 0)) + 1 : 1
      newTools = [...tools, { ...values, id: newId }]
    }
    saveAll(newTools)
    setIsDialogOpen(false)
    setEditingTool(null)
    reset({ name: '', slug: '', description: '', category: '', icon: 'Code2', pricing: 'free' })
    setAutoSlug(true)
  }

  const deleteTool = (id: number) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      const newTools = tools.filter(t => t.id !== id)
      saveAll(newTools)
    }
  }

  const startEdit = (tool: Tool) => {
    setEditingTool(tool)
    reset(tool)
    setIsDialogOpen(true)
    setAutoSlug(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter lowercase">tools sakti 🛠️</h1>
          <p className="text-muted-foreground text-sm lowercase font-medium">kelola koleksi tools sakti buat para bestie.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-xl font-bold lowercase">
                kelola kategori
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="lowercase font-black">kategori tools</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="nama kategori baru..." 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="rounded-xl lowercase font-medium"
                  />
                  <Button onClick={addCategory} className="rounded-xl bg-primary">tambah</Button>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-auto pr-2">
                  {categories.map(cat => (
                    <div key={cat} className="flex items-center justify-between p-3 border rounded-xl bg-slate-50">
                      <span className="font-bold text-sm lowercase">{cat}</span>
                      <Button variant="ghost" size="icon" onClick={() => deleteCategory(cat)} className="h-8 w-8 text-destructive">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-center py-8 text-xs text-muted-foreground italic">belum ada kategori tool.</p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingTool(null);
              reset({ name: '', slug: '', description: '', category: '', icon: 'Code2', pricing: 'free' });
              setAutoSlug(true);
            }
          }}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-6 font-bold shadow-lg shadow-accent/20 lowercase">
                <Plus className="mr-2 h-4 w-4" /> tambah tool
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-[3rem] overflow-hidden border-none shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>
              <DialogHeader className="pt-6">
                <DialogTitle className="text-2xl font-black lowercase italic tracking-tighter">
                  {editingTool ? 'edit tool sakti 🛠️' : 'tambah tool baru 🛠️'}
                </DialogTitle>
                <p className="text-xs text-muted-foreground lowercase">isi detail tools biar bestie makin terbantu.</p>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60">nama tool</label>
                    <Input {...register('name')} placeholder="e.g. Kalkulator Cuan" className="rounded-xl bg-slate-50 border-none font-bold placeholder:font-medium placeholder:text-muted-foreground/30" />
                    {errors.name && <p className="text-[10px] text-destructive font-bold">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex justify-between items-center">
                      slug URL
                      <button type="button" onClick={() => setAutoSlug(!autoSlug)} className={`text-[9px] px-2 py-0.5 rounded-full border ${autoSlug ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                        {autoSlug ? 'auto ✨' : 'manual ✍️'}
                      </button>
                    </label>
                    <Input {...register('slug')} placeholder="e.g. kalkulator-cuan" className="rounded-xl bg-slate-50 border-none font-mono text-sm" />
                    {errors.slug && <p className="text-[10px] text-destructive font-bold">{errors.slug.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60">kategori</label>
                    <select 
                      {...register('category')}
                      className="flex h-12 w-full rounded-xl border-none bg-slate-50 px-3 py-2 text-sm font-bold lowercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    >
                      <option value="">pilih kategori</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-[10px] text-destructive font-bold">{errors.category.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60">pricing</label>
                    <select 
                      {...register('pricing')}
                      className="flex h-12 w-full rounded-xl border-none bg-slate-50 px-3 py-2 text-sm font-bold lowercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    >
                      <option value="free">gratis ✨</option>
                      <option value="pro">pro / vip 🔥</option>
                      <option value="limited">terbatas ⏱️</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/60">icon (lucide name)</label>
                  <Input {...register('icon')} placeholder="e.g. Wrench, Sparkles, TrendingUp" className="rounded-xl bg-slate-50 border-none font-medium" />
                  {errors.icon && <p className="text-[10px] text-destructive font-bold">{errors.icon.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/60">deskripsi singkat</label>
                  <Textarea {...register('description')} rows={3} placeholder="jelaskan fungsi tool ini buat bestie..." className="rounded-2xl bg-slate-50 border-none font-medium resize-none" />
                  {errors.description && <p className="text-[10px] text-destructive font-bold">{errors.description.message}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <Button variant="ghost" type="button" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold lowercase h-12 px-6">batal</Button>
                  <Button type="submit" disabled={saving} className="rounded-xl bg-primary text-white h-12 px-8 font-black shadow-xl shadow-primary/20 lowercase">
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingTool ? 'update tool sakti' : 'buat tool sakti'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="rounded-[2.5rem] border-border/40 shadow-xl shadow-slate-200/50 overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50 border-b border-border/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] font-black text-[10px] uppercase tracking-widest text-primary/40 pl-8">tool & slug</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-primary/40">kategori & pricing</TableHead>
                <TableHead className="hidden md:table-cell font-black text-[10px] uppercase tracking-widest text-primary/40">deskripsi</TableHead>
                <TableHead className="text-right pr-8 font-black text-[10px] uppercase tracking-widest text-primary/40">aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => (
                <TableRow key={tool.id} className="group transition-colors hover:bg-primary/[0.02]">
                  <TableCell className="pl-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-foreground lowercase text-base">{tool.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground/60">{tool.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-primary/5 text-primary w-fit lowercase">{tool.category}</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider ${tool.pricing === 'pro' ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {tool.pricing || 'free'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <p className="text-sm text-muted-foreground/80 line-clamp-2 max-w-[400px] font-medium leading-relaxed">
                      {tool.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(tool)} className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => tool.id && deleteTool(tool.id)} className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {tools.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center bg-slate-50/20">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <Wrench className="h-12 w-12" />
                      <p className="text-sm lowercase font-black tracking-tight">belum ada tool sakti.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
