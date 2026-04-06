import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function BlogSearch({ query, onQueryChange }: BlogSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
