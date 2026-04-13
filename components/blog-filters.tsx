import { Button } from '@/components/ui/button';

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogFilters({ categories, selectedCategory, onCategoryChange }: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category)}
          size="sm"
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
