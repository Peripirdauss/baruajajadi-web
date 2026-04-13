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

const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  image: z.string().optional(),
  cta_primary: z.string().min(1, 'Primary CTA is required'),
  cta_secondary: z.string().min(1, 'Secondary CTA is required'),
  stats: z.array(z.object({
    label: z.string().min(1, 'Label is required'),
    value: z.string().min(1, 'Value is required')
  }))
})

type HeroFormValues = z.infer<typeof heroSchema>

export default function HeroEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullData, setFullData] = useState<any>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema)
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/content')
        const data = await response.json()
        setFullData(data)
        reset(data.hero)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to load hero data')
        setLoading(false)
      }
    }
    fetchData()
  }, [reset])

  const onSubmit = async (values: HeroFormValues) => {
    setSaving(true)
    try {
      const updatedData = { ...fullData, hero: values }
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      if (response.ok) {
        toast.success('Hero section updated successfully!')
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
        <h1 className="text-3xl font-bold tracking-tight">Hero Editor</h1>
        <p className="text-muted-foreground">Manage the main headline and calls to action.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Settings</CardTitle>
            <CardDescription>Primary text content for the hero section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input {...register('title')} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtitle</label>
              <Textarea {...register('subtitle')} rows={4} />
              {errors.subtitle && <p className="text-xs text-destructive">{errors.subtitle.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary CTA</label>
                <Input {...register('cta_primary')} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Secondary CTA</label>
                <Input {...register('cta_secondary')} />
              </div>
            </div>
            <div className="space-y-2 pt-4">
              <label className="text-sm font-medium">Hero Image URL (Optional)</label>
              <Input {...register('image')} placeholder="https://images.unsplash.com/..." />
              <p className="text-[10px] text-muted-foreground uppercase font-mono font-bold tracking-widest">Replacing this URL will override the abstract visual background.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Manage the key performance indicators shown in the hero section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="grid grid-cols-2 gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Label {index + 1}</label>
                  <Input {...register(`stats.${index}.label` as any)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Value {index + 1}</label>
                  <Input {...register(`stats.${index}.value` as any)} />
                </div>
              </div>
            ))}
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
