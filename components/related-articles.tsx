import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';

interface RelatedArticlesProps {
  relatedSlugs: string[];
}

// Mock related articles data
const relatedArticlesData: Record<string, any> = {
  'mastering-figma-prototyping': {
    title: 'Mastering Figma Prototyping',
    excerpt: 'Advanced techniques for creating interactive prototypes in Figma that impress stakeholders.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
    publishedAt: '2024-03-10',
    readTime: '10 min read',
    category: 'Design',
  },
  'color-theory-in-web-design': {
    title: 'Color Theory in Web Design',
    excerpt: 'Understanding color psychology and how to apply it effectively to your digital products.',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=200&fit=crop',
    publishedAt: '2024-03-05',
    readTime: '7 min read',
    category: 'Design',
  },
};

export default function RelatedArticles({ relatedSlugs }: RelatedArticlesProps) {
  const articles = relatedSlugs
    .map((slug) => relatedArticlesData[slug])
    .filter(Boolean);

  if (articles.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-8 text-2xl font-bold text-foreground">Related Articles</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article, index) => (
          <Link
            key={index}
            href={`/blog/${Object.keys(relatedArticlesData).find(
              (key) => relatedArticlesData[key].title === article.title
            )}`}
            className="group overflow-hidden rounded-lg border border-border transition-all hover:border-accent hover:shadow-md"
          >
            <div className="space-y-4 p-6">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block text-xs font-medium text-accent uppercase">
                    {article.category}
                  </span>
                </div>

                <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {article.title}
                </h4>

                <p className="text-sm text-foreground/60 line-clamp-2">{article.excerpt}</p>

                <div className="flex gap-4 text-xs text-foreground/50 pt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
