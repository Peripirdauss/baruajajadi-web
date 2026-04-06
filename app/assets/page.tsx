'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import AssetHero from '@/components/asset-hero';
import AssetSearch from '@/components/asset-search';
import AssetFilters from '@/components/asset-filters';
import AssetGrid from '@/components/asset-grid';

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <AssetHero />
      
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <AssetFilters 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <AssetSearch 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            <AssetGrid 
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
