'use client';

import { useMemo, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import AssetCard from './asset-card';

interface AssetGridProps {
  searchQuery: string;
  selectedCategory: string;
}

interface Asset {
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  downloads?: number;
  rating?: number;
}

// Hardcoded assets removed. Data now fetched from /api/content

export default function AssetGrid({ searchQuery, selectedCategory }: AssetGridProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        setAssets(data.assets || []);
      } catch (e) {
        console.error('Error fetching assets:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = searchQuery === '' || 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        asset.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory.toLowerCase().replace(/\s+/g, '-');
      
      return matchesSearch && matchesCategory;
    });
  }, [assets, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-foreground/60 uppercase font-black tracking-widest">Loading assets...</p>
      </div>
    );
  }

  if (filteredAssets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-8 py-16 text-center">
        <h3 className="text-xl font-semibold text-foreground">No assets found</h3>
        <p className="mt-2 text-foreground/60">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {filteredAssets.map((asset) => (
        <AssetCard 
          key={asset.slug} 
          id={asset.slug}
          title={asset.name}
          description={asset.description}
          category={asset.category}
          image={asset.image}
          downloads={asset.downloads}
          rating={asset.rating}
        />
      ))}
    </div>
  );
}
