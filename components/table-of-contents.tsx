'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Array<{ id: string; title: string; level: number }>>([]);

  useEffect(() => {
    const lines = content.split('\n');
    const extractedHeadings = lines
      .filter((line) => line.startsWith('##') && !line.startsWith('###'))
      .map((line) => ({
        id: line
          .replace('## ', '')
          .toLowerCase()
          .replace(/\s+/g, '-'),
        title: line.replace('## ', ''),
        level: 2,
      }));

    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-20 rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Table of Contents</h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className="block text-sm text-foreground/70 transition-colors hover:text-accent"
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
