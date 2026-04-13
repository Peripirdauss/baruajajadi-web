import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

// Allowed origins and their corresponding API key env variable
const ALLOWED_ORIGINS: Record<string, string> = {
  'https://buy.baruajajadi.com': process.env.API_KEY_BUY || '',
  'https://baruajajadi.space': process.env.API_KEY_COMMUNITY || '',
  // Allow localhost for development
  'http://localhost:3001': process.env.API_KEY_BUY || '',
  'http://localhost:3002': process.env.API_KEY_COMMUNITY || '',
};

/**
 * Get the allowed origin header value based on request origin.
 */
export function getAllowedOrigin(req: NextRequest): string | null {
  const origin = req.headers.get('origin') || '';
  return ALLOWED_ORIGINS.hasOwnProperty(origin) ? origin : null;
}

/**
 * Build standard CORS headers for a specific origin.
 */
export function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Handle OPTIONS preflight for all public API routes.
 */
export function handleOptions(req: NextRequest): NextResponse {
  const origin = getAllowedOrigin(req);
  if (!origin) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

/**
 * Validate the X-API-Key header against the expected key for the request origin.
 * Returns { valid, origin } or rejects with a 401 NextResponse.
 */
export function validateApiKey(req: NextRequest): {
  valid: true;
  origin: string;
  response?: never;
} | {
  valid: false;
  origin?: never;
  response: NextResponse;
} {
  const origin = getAllowedOrigin(req);
  if (!origin) {
    return {
      valid: false,
      response: NextResponse.json(
        { error: 'Origin not allowed' },
        { status: 403 }
      ),
    };
  }

  const apiKey = req.headers.get('X-API-Key') || '';
  const expectedKey = ALLOWED_ORIGINS[origin];

  if (!expectedKey || apiKey !== expectedKey) {
    return {
      valid: false,
      response: NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401, headers: corsHeaders(origin) }
      ),
    };
  }

  return { valid: true, origin };
}

/**
 * Wrap a response with the correct CORS headers.
 */
export function withCors(
  response: NextResponse,
  origin: string
): NextResponse {
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([key, val]) =>
    response.headers.set(key, val)
  );
  return response;
}
