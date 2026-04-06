'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, User, Heart, Share2 } from 'lucide-react';

interface ArticleHeaderProps {
  article: {
    title: string;
    excerpt: string;
    author: string;
    authorImage: string;
    publishedAt: string;
    readTime: string;
    category: string;
    views: number;
  };
  onLike: () => void;
  liked: boolean;
  likeCount: number;
}

export default function ArticleHeader({ article, onLike, liked, likeCount }: ArticleHeaderProps) {
  const displayDate = article.publishedAt || (article as any).date;
  const publishDate = displayDate ? new Date(displayDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Recently Published';

  return (
    <div>
      {/* Category and Title */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            {article.category}
          </span>
          <span className="text-sm text-muted-foreground">{(article.views || 0).toLocaleString()} views</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground text-balance">{article.title}</h1>
        <p className="text-lg text-foreground/70">{article.excerpt}</p>
      </div>

      {/* Meta Information */}
      <div className="mt-8 space-y-6 border-y border-border py-6">
        {/* Author and Date */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src={article.authorImage}
              alt={article.author}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground">{article.author}</p>
              <div className="flex gap-4 text-sm text-foreground/60">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onLike}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
              liked
                ? 'bg-accent/20 text-accent'
                : 'bg-secondary text-foreground/70 hover:bg-secondary/80'
            }`}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-foreground/70 transition-colors hover:bg-secondary/80">
            <Share2 className="h-5 w-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
