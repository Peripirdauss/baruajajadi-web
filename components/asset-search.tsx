import { Search } from 'lucide-react';

interface AssetSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function AssetSearch({ searchQuery, onSearchChange }: AssetSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
      <input
        type="text"
        placeholder="Search assets, templates, icons..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-4 py-3 pl-10 text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
