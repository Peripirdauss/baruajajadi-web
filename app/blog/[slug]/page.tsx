'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArticleHeader from '@/components/article-header';
import ArticleContent from '@/components/article-content';
import RelatedArticles from '@/components/related-articles';
import TableOfContents from '@/components/table-of-contents';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch('/api/content');
        const data = await response.json();
        const found = data.blog.find((a: any) => a.slug === slug);
        if (found) {
          setArticle(found);
          setLikeCount(found.likes || 0);
        }
      } catch (e) {
        console.error('Error fetching article:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-foreground/50">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground">Article Not Found</h1>
          <p className="mt-4 text-foreground/70">The article you're looking for ({slug}) doesn't exist.</p>
          <Link href="/blog" className="mt-6 inline-block">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-accent hover:text-accent/80">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <ArticleHeader article={article} onLike={handleLike} liked={liked} likeCount={likeCount} />

            {/* Article Image */}
            <div className="relative mt-8 overflow-hidden rounded-lg border border-border">
              <Image
                src={article.image}
                alt={article.title}
                width={1200}
                height={600}
                className="h-96 w-full object-cover"
              />
            </div>

            {/* Article Content */}
            <ArticleContent content={article.content} />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 border-t border-border pt-8">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?category=${tag}`}
                      className="rounded-full bg-secondary px-3 py-1 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {article.relatedArticles && (
              <div className="mt-12 border-t border-border pt-12">
                <RelatedArticles relatedSlugs={article.relatedArticles} />
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-8 lg:col-span-1">
            <TableOfContents content={article.content} />
          </aside>
        </div>
      </main>
    </div>
  );
}
