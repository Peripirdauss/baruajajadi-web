'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogSearch } from '@/components/blog-search';
import { BlogFilters } from '@/components/blog-filters';
import { ArticleGrid } from '@/components/article-grid';
import { FeaturedArticle } from '@/components/featured-article';

const BLOG_CATEGORIES = ['All', 'Design', 'Development', 'AI', 'Productivity', 'Business'];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-balance text-4xl font-extrabold text-foreground sm:text-5xl lowercase tracking-tighter">
              cerita cuan & tips sakti ✨
            </h1>
            <p className="mt-4 text-lg text-foreground/60">
              Discover articles, guides, and stories about design, development, and digital innovation.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <FeaturedArticle />
          </div>
        </section>

        {/* Search and Filters */}
        <section className="border-b border-border px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <BlogSearch query={searchQuery} onQueryChange={setSearchQuery} />
              </div>
              <div className="lg:col-span-1">
                <BlogFilters 
                  categories={BLOG_CATEGORIES}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <ArticleGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
