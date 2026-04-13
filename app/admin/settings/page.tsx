'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'

const settingsSchema = z.object({
  title: z.string().min(1, 'Site title is required'),
  description: z.string().min(1, 'Site description is required'),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

export default function SettingsEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullData, setFullData] = useState<any>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema)
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/content')
        const data = await response.json()
        setFullData(data)
        
        // Use existing metadata or fallback to default
        reset({
          title: data.metadata?.title || 'BaruAjaJadi - Tools, Assets & Content Hub',
          description: data.metadata?.description || 'Discover premium tools, curated assets, insightful content, and personal projects. Your digital hub for productivity and inspiration.'
        })
        setLoading(false)
      } catch (error) {
        toast.error('Failed to load settings data')
        setLoading(false)
      }
    }
    fetchData()
  }, [reset])

  const onSubmit = async (values: SettingsFormValues) => {
    setSaving(true)
    try {
      const updatedData = { ...fullData, metadata: values }
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      if (response.ok) {
        toast.success('Settings updated successfully!')
      } else {
        throw new Error('Save failed')
      }
    } catch (error) {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
        <p className="text-muted-foreground">Manage site-wide settings like title and meta description.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>SEO & Identity</CardTitle>
            <CardDescription>Primary metadata for search engines and browser tabs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Site Title</label>
              <Input {...register('title')} placeholder="My Awesome Site" />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Site Description</label>
              <Textarea {...register('description')} rows={4} placeholder="Description of the site..." />
              {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
