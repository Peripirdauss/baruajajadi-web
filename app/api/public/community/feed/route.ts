import { NextRequest, NextResponse } from 'next/server';
import { handleOptions, validateApiKey, withCors } from '../../_cors';
import { getGlobalContent } from '@/lib/content';

/**
 * GET /api/public/community/feed
 * Called by baruajajadi.space to display the latest content.
 *
 * Query parameters (optional):
 *   limit   — number of items per section (default: 10)
 *   section — 'blog' | 'tools' | 'all' (default: 'all')
 *
 * Response:
 * {
 *   success: true,
 *   blog: [...],
 *   tools: [...],
 *   assets: [...]
 * }
 */
export async function GET(req: NextRequest) {
  const { valid, origin, response } = validateApiKey(req);
  if (!valid) return response;

  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
  const section = searchParams.get('section') || 'all';

  try {
    const data = await getGlobalContent();

    const result: Record<string, any> = { success: true };

    if (section === 'all' || section === 'blog') {
      result.blog = (data?.blog || []).slice(0, limit).map((post: any) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        authorImage: post.authorImage,
        date: post.date,
        readTime: post.readTime,
        category: post.category,
        image: post.image,
        tags: post.tags || [],
        // DO NOT expose full content — just teaser info
      }));
    }

    if (section === 'all' || section === 'tools') {
      result.tools = (data?.tools || []).slice(0, limit).map((tool: any) => ({
        slug: tool.slug,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        icon: tool.icon,
        pricing: tool.pricing || 'free',
        priceIDR: tool.priceIDR || null,
      }));
    }

    if (section === 'all' || section === 'assets') {
      result.assets = (data?.assets || []).slice(0, limit).map((asset: any) => ({
        slug: asset.slug,
        name: asset.name,
        description: asset.description,
        category: asset.category,
        image: asset.image,
      }));
    }

    return withCors(NextResponse.json(result), origin);
  } catch (error: any) {
    console.error('[Public API /community/feed] Error:', error);
    return withCors(
      NextResponse.json({ error: 'Failed to load feed', details: error.message }, { status: 500 }),
      origin
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}
