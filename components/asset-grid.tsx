'use client';

import { useMemo } from 'react';
import AssetCard from './asset-card';

interface AssetGridProps {
  searchQuery: string;
  selectedCategory: string;
}

interface Asset {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  downloads: number;
  rating: number;
  link: string;
}

const assets: Asset[] = [
  {
    id: '1',
    title: 'Modern UI Kit 2024',
    description: 'Complete design system with 200+ components for modern applications.',
    category: 'UI Kits',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    downloads: 12500,
    rating: 4.8,
    link: '#',
  },
  {
    id: '2',
    title: 'Feather Icons Extended',
    description: '500+ minimalist SVG icons perfect for any project.',
    category: 'Icons',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    downloads: 28300,
    rating: 4.9,
    link: '#',
  },
  {
    id: '3',
    title: 'Poppins Font Family',
    description: 'Geometric sans-serif font with 18 weights and styles.',
    category: 'Fonts',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=300&fit=crop',
    downloads: 15600,
    rating: 4.7,
    link: '#',
  },
  {
    id: '4',
    title: 'SaaS Landing Page',
    description: 'Fully responsive landing page template for SaaS products.',
    category: 'Templates',
    image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop',
    downloads: 8900,
    rating: 4.6,
    link: '#',
  },
  {
    id: '5',
    title: 'Abstract Illustrations',
    description: 'Pack of 50 unique abstract illustrations for your designs.',
    category: 'Illustrations',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    downloads: 6700,
    rating: 4.5,
    link: '#',
  },
  {
    id: '6',
    title: 'High Quality Photos',
    description: '100 beautiful stock photos curated for creative projects.',
    category: 'Photos',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    downloads: 19200,
    rating: 4.8,
    link: '#',
  },
  {
    id: '7',
    title: 'Gradient Pack Pro',
    description: '200+ beautiful color gradients in multiple formats.',
    category: 'Gradients',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=300&fit=crop',
    downloads: 11400,
    rating: 4.7,
    link: '#',
  },
  {
    id: '8',
    title: 'React Component Library',
    description: 'Pre-built components for React applications with Tailwind CSS.',
    category: 'Components',
    image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop',
    downloads: 9800,
    rating: 4.9,
    link: '#',
  },
  {
    id: '9',
    title: 'Mobile App Design Kit',
    description: 'Complete design system for iOS and Android applications.',
    category: 'UI Kits',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    downloads: 14300,
    rating: 4.6,
    link: '#',
  },
  {
    id: '10',
    title: 'Business Icons Set',
    description: '300 business-related icons in multiple styles and sizes.',
    category: 'Icons',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    downloads: 22100,
    rating: 4.8,
    link: '#',
  },
  {
    id: '11',
    title: 'Creative Dashboard',
    description: 'Fully functional dashboard template with dark mode support.',
    category: 'Templates',
    image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop',
    downloads: 7500,
    rating: 4.7,
    link: '#',
  },
  {
    id: '12',
    title: 'Character Illustrations',
    description: 'Hand-drawn character pack with different poses and expressions.',
    category: 'Illustrations',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=300&fit=crop',
    downloads: 5400,
    rating: 4.5,
    link: '#',
  },
];

export default function AssetGrid({ searchQuery, selectedCategory }: AssetGridProps) {
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = searchQuery === '' || 
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        asset.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
        <AssetCard key={asset.id} {...asset} />
      ))}
    </div>
  );
}
