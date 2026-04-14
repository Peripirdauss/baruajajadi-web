'use client';

import { useState, useEffect } from 'react';

interface AssetFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function AssetFilters({
  selectedCategory,
  onCategoryChange,
}: AssetFiltersProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/admin/categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="sticky top-20 space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground lowercase">filter kategori</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition-all lowercase ${
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-card text-foreground/50 hover:bg-secondary hover:text-foreground border border-border/50'
            }`}
          >
            semua aset
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat.toLowerCase().replace(/\s+/g, '-'))}
              className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition-all lowercase ${
                selectedCategory === cat.toLowerCase().replace(/\s+/g, '-')
                  ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                  : 'bg-card text-foreground/50 hover:bg-secondary hover:text-foreground border border-border/50'
              }`}
            >
              {cat}
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
