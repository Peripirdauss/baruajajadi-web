import { Button } from '@/components/ui/button';

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogFilters({ categories, selectedCategory, onCategoryChange }: BlogFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-foreground">Categories</h3>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => onCategoryChange(category)}
            className="justify-start"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
