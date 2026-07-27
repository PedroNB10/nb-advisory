import type { APIRoute } from 'astro';
import { env } from '../lib/env';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${env.PUBLIC_SITE_URL}/sitemap-index.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
