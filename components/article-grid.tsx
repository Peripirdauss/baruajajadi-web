'use client';

import { ArticleCard } from '@/components/article-card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

interface ArticleGridProps {
  searchQuery: string;
  selectedCategory: string;
}

export function ArticleGrid({ searchQuery, selectedCategory }: ArticleGridProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/perip/api/content');
        const data = await res.json();
        setArticles(data.blog || []);
      } catch (e) {
        console.error('Error fetching blog articles:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 rounded-xl bg-muted animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <Search className="size-8 text-muted-foreground" />
          <EmptyTitle>No articles found</EmptyTitle>
          <EmptyDescription>
            We couldn't find any articles matching your search. Try adjusting your filters or search terms.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredArticles.map((article) => (
        <ArticleCard key={article.slug} {...article} />
      ))}
    </div>
  );
}
