import { useEffect, useState } from 'react'
import { ToolCard } from './tool-card'
import { getGlobalContent } from '@/lib/content'
import { Loader2 } from 'lucide-react'

interface ToolsGridProps {
  searchQuery: string
  selectedCategory: string
}

export function ToolsGrid({ searchQuery, selectedCategory }: ToolsGridProps) {
  const [tools, setTools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTools() {
      try {
        const res = await fetch('/api/content')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (data && data.tools) {
          setTools(data.tools)
        }
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTools()
  }, [])

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (filteredTools.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-lg text-muted-foreground">
          Waduh, tools yang kamu cari gak ada nih. Coba cari yang lain yuk! 🔍
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {filteredTools.map((tool) => (
        <ToolCard 
          key={tool.id} 
          {...tool} 
          url={`/tools/${tool.slug}`}
          icon={tool.icon === 'Users' ? '👥' : tool.icon === 'Link' ? '🔗' : tool.icon === 'TrendingUp' ? '📈' : tool.icon === 'Sparkles' ? '✨' : tool.icon === 'Zap' ? '⚡' : tool.icon || '🔍'}
        />
      ))}
    </div>
  )
}
