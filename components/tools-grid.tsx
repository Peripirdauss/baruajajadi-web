import { ToolCard } from './tool-card'

const TOOLS = [
  {
    name: 'Figma',
    description: 'Collaborative design and prototyping tool for teams',
    category: 'Design',
    rating: 4.8,
    reviews: 2540,
    icon: '🎨',
    url: 'https://figma.com',
    features: ['Real-time collaboration', 'Prototyping', 'Component library'],
  },
  {
    name: 'JSON Editor',
    description: 'Advanced JSON editing and validation tool',
    category: 'JSON Tools',
    rating: 4.6,
    reviews: 1240,
    icon: '{}',
    url: '#',
    features: ['Syntax highlighting', 'Validation', 'Formatting'],
  },
  {
    name: 'ChatGPT',
    description: 'AI-powered conversational assistant for productivity',
    category: 'AI Tools',
    rating: 4.9,
    reviews: 5200,
    icon: '🤖',
    url: 'https://openai.com',
    features: ['Natural language', 'Code generation', 'Content creation'],
  },
  {
    name: 'Adobe XD',
    description: 'UI/UX design and prototyping platform',
    category: 'Design',
    rating: 4.5,
    reviews: 1890,
    icon: '✨',
    url: 'https://adobe.com/products/xd',
    features: ['Wireframing', 'Interactive prototypes', 'Handoff tools'],
  },
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, databases, and collaboration',
    category: 'Productivity',
    rating: 4.7,
    reviews: 3120,
    icon: '📝',
    url: 'https://notion.so',
    features: ['Databases', 'Templates', 'Team collaboration'],
  },
  {
    name: 'Claude AI',
    description: 'Advanced AI assistant for research and writing',
    category: 'AI Tools',
    rating: 4.8,
    reviews: 2890,
    icon: '🧠',
    url: 'https://claude.ai',
    features: ['Document analysis', 'Writing assistance', 'Code review'],
  },
  {
    name: 'JSON Formatter',
    description: 'Quick JSON beautifier and minifier online',
    category: 'JSON Tools',
    rating: 4.4,
    reviews: 890,
    icon: '⚙️',
    url: '#',
    features: ['Auto-formatting', 'Minification', 'Validation'],
  },
  {
    name: 'Canva',
    description: 'Graphic design platform with templates and elements',
    category: 'Design',
    rating: 4.6,
    reviews: 4120,
    icon: '🖼️',
    url: 'https://canva.com',
    features: ['Templates', 'Drag-and-drop', 'Millions of assets'],
  },
  {
    name: 'Slack',
    description: 'Team communication and collaboration platform',
    category: 'Productivity',
    rating: 4.7,
    reviews: 3890,
    icon: '💬',
    url: 'https://slack.com',
    features: ['Instant messaging', 'File sharing', 'App integrations'],
  },
  {
    name: 'Midjourney',
    description: 'AI image generation for creative projects',
    category: 'AI Tools',
    rating: 4.7,
    reviews: 2340,
    icon: '🎭',
    url: 'https://midjourney.com',
    features: ['Image generation', 'Style customization', 'Variations'],
  },
  {
    name: 'Framer',
    description: 'Interactive prototyping and web design tool',
    category: 'Design',
    rating: 4.5,
    reviews: 1200,
    icon: '🚀',
    url: 'https://framer.com',
    features: ['Code components', 'Interactions', 'Responsive design'],
  },
  {
    name: 'Asana',
    description: 'Project management and team workflow tool',
    category: 'Productivity',
    rating: 4.6,
    reviews: 2890,
    icon: '📊',
    url: 'https://asana.com',
    features: ['Task management', 'Timeline view', 'Team collaboration'],
  },
]

interface ToolsGridProps {
  searchQuery: string
  selectedCategory: string
}

export function ToolsGrid({ searchQuery, selectedCategory }: ToolsGridProps) {
  const filteredTools = TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (filteredTools.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-lg text-muted-foreground">
          No tools found. Try a different search or category.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {filteredTools.map((tool) => (
        <ToolCard key={tool.name} {...tool} />
      ))}
    </div>
  )
}
