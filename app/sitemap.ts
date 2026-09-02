import type { MetadataRoute } from 'next';
import { deals } from '@/lib/deals';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'http://localhost:3000';
  return [
    { url: base, changeFrequency: 'hourly', priority: 1 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    ...deals.map((deal) => ({ url: `${base}/deals/${deal.id}`, changeFrequency: 'hourly' as const, priority: 0.8 })),
  ];
}

