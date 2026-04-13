import { NextRequest, NextResponse } from 'next/server';
import { handleOptions, validateApiKey, withCors } from '../_cors';
import { getGlobalContent } from '@/lib/content';

// GET /api/public/tools — returns full tools catalog with pricing info
export async function GET(req: NextRequest) {
  const { valid, origin, response } = validateApiKey(req);
  if (!valid) return response;

  try {
    const data = await getGlobalContent();
    const tools = (data?.tools || []).map((tool: any) => ({
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      pricing: tool.pricing || 'free', // 'free' | 'pro' or custom price object
      icon: tool.icon,
      // Include price in IDR if set, otherwise null (treated as free)
      priceIDR: tool.priceIDR || null,
    }));

    return withCors(
      NextResponse.json({ success: true, tools }),
      origin
    );
  } catch (error) {
    console.error('[Public API /tools] Error:', error);
    return withCors(
      NextResponse.json({ error: 'Failed to load tools' }, { status: 500 }),
      origin
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}
