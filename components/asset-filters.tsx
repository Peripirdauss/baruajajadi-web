interface AssetFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All Assets' },
  { id: 'ui-kits', label: 'UI Kits' },
  { id: 'icons', label: 'Icons' },
  { id: 'fonts', label: 'Fonts' },
  { id: 'templates', label: 'Templates' },
  { id: 'illustrations', label: 'Illustrations' },
  { id: 'photos', label: 'Photos' },
  { id: 'gradients', label: 'Gradients' },
  { id: 'components', label: 'Components' },
];

export default function AssetFilters({
  selectedCategory,
  onCategoryChange,
}: AssetFiltersProps) {
  return (
    <div className="sticky top-20 space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground/70 hover:bg-secondary hover:text-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Filter by Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded border-primary" />
            <span className="text-sm text-foreground/70">Free</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded border-primary" />
            <span className="text-sm text-foreground/70">Premium</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded border-primary" />
            <span className="text-sm text-foreground/70">Open Source</span>
          </label>
        </div>
      </div>
    </div>
  );
}
