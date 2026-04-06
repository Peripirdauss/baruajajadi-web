interface ToolsFiltersProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function ToolsFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
}: ToolsFiltersProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-20 rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Categories</h3>
        
        <div className="mt-6 space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
