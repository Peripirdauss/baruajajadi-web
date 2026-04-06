import { Search } from 'lucide-react'

interface ToolsSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function ToolsSearch({ searchQuery, setSearchQuery }: ToolsSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search tools..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-12 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      />
    </div>
  )
}
