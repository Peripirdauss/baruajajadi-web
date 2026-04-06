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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash, Save } from 'lucide-react'

const toolSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  icon: z.string().min(1, 'Icon name is required')
})

type Tool = z.infer<typeof toolSchema>

export default function ToolsManager() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tools, setTools] = useState<Tool[]>([])
  const [fullData, setFullData] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Tool>({
    resolver: zodResolver(toolSchema)
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setFullData(data)
      setTools(data.tools || [])
      setLoading(false)
    } catch (error) {
      toast.error('Failed to load tools data')
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
        toast.success('Tools updated successfully!')
      } else {
        throw new Error('Save failed')
      }
    } catch (error) {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

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
    reset({ name: '', description: '', category: '', icon: 'Code2' })
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
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Tools Management</h1>
          <p className="text-muted-foreground">Manage the featured collection of tools and resources.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingTool(null); reset({ name: '', description: '', category: '', icon: 'Code2' }) }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Tool
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingTool ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tool Name</label>
                <Input {...register('name')} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input {...register('category')} />
                {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon (Lucide name)</label>
                <Input {...register('icon')} placeholder="e.g. Code2, LayoutGrid" />
                {errors.icon && <p className="text-xs text-destructive">{errors.icon.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea {...register('description')} rows={3} />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingTool ? 'Update Tool' : 'Create Tool'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell>{tool.category}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground line-clamp-1 max-w-[300px]">
                    {tool.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => startEdit(tool)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => tool.id && deleteTool(tool.id)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {tools.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No tools found. Add your first tool to get started.
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
