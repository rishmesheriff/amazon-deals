import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BadgeCheck, Check, ExternalLink, Flame, ShieldCheck, Star, Truck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { affiliateUrl, deals } from '@/lib/deals';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return deals.map((deal) => ({ id: deal.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const deal = deals.find((item) => item.id === id);
  if (!deal) return { title: 'Deal not found — Amazon Deals' };
  const title = `${deal.discount}% off ${deal.title} — Amazon Deals`;
  const description = `${deal.title} is listed at $${deal.price.toFixed(2)}, a ${deal.discount}% demonstration discount.`;
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: deal.image, alt: deal.title }] },
    twitter: { card: 'summary_large_image', title, description, images: [deal.image] },
  };
}

export default async function DealPage({ params }: Props) {
  const { id } = await params;
  const deal = deals.find((item) => item.id === id);
  if (!deal) notFound();
  const savings = deal.originalPrice - deal.price;
  const outboundUrl = affiliateUrl(deal);
  const productSchema = {
    '@context': 'https://schema.org', '@type': 'Product', name: deal.title, image: [deal.image, ...deal.gallery], description: deal.description,
    brand: { '@type': 'Brand', name: deal.brand }, aggregateRating: { '@type': 'AggregateRating', ratingValue: deal.rating, reviewCount: deal.reviews },
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: deal.price, availability: 'https://schema.org/InStock', url: outboundUrl },
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <header className="bg-[#16283b] text-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-black"><span className="grid size-9 place-items-center rounded-xl bg-[#ff9f1c] text-[#16283b]"><Flame className="size-5 fill-current" /></span>Amazon <span className="text-[#ffb341]">Deals</span></Link>
          <Button render={<Link href="/#deals" />} variant="ghost" className="text-white hover:bg-white/10 hover:text-white"><ArrowLeft /> Back to deals</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <nav className="mb-6 text-sm text-muted-foreground"><Link href="/" className="hover:text-[#d96c00]">Home</Link> / <Link href="/#deals" className="hover:text-[#d96c00]">Deals</Link> / {deal.category}</nav>
        <div className="grid gap-8 rounded-[1.6rem] border bg-white p-5 shadow-sm md:p-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-3 sm:grid-cols-[5fr_2fr]">
            <div className="relative min-h-96 overflow-hidden rounded-2xl bg-[#eef2f5]"><img src={deal.image} alt={deal.title} className="h-full w-full object-cover" /><span className="absolute left-4 top-4 rounded-xl bg-[#d94132] px-4 py-2 font-black text-white">{deal.discount}% OFF</span></div>
            <div className="hidden overflow-hidden rounded-2xl bg-[#eef2f5] sm:block"><img src={deal.gallery[0]} alt={`${deal.title} alternate view`} className="h-full w-full object-cover" /></div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2"><Badge className="bg-[#fff3df] text-[#9a4d00]">{deal.badge}</Badge><span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{deal.category}</span></div>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-[-0.03em] text-[#16283b] sm:text-4xl">{deal.title}</h1>
            <p className="mt-2 font-semibold text-[#5e7182]">by {deal.brand}</p>
            <div className="mt-4 flex items-center gap-2"><Star className="size-5 fill-[#ff9f1c] text-[#ff9f1c]" /><span className="font-black">{deal.rating}</span><span className="text-sm text-muted-foreground">{deal.reviews.toLocaleString()} ratings</span>{deal.prime && <BadgeCheck className="ml-2 size-5 text-[#13a67c]" />}</div>
            <p className="mt-6 leading-7 text-slate-600">{deal.description}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">{deal.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm font-semibold text-[#294158]"><Check className="mt-0.5 size-4 shrink-0 text-[#13a67c]" />{feature}</li>)}</ul>
            <div className="mt-7 rounded-2xl bg-[#f5f7f9] p-5">
              <div className="flex flex-wrap items-end gap-x-3 gap-y-1"><span className="text-4xl font-black tracking-tight text-[#16283b]">${deal.price.toFixed(2)}</span><span className="pb-1 text-lg text-muted-foreground line-through">${deal.originalPrice.toFixed(2)}</span><Badge className="mb-1 bg-[#e7f8f2] text-[#116a53]">Save ${savings.toFixed(2)}</Badge></div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-[#294158]"><span className="flex items-center gap-1.5"><Truck className="size-4 text-[#13a67c]" />{deal.availability}</span><span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-[#13a67c]" />Price checked today</span></div>
            </div>
            <Button render={<a href={outboundUrl} target="_blank" rel="sponsored noopener noreferrer" />} className="mt-5 h-13 rounded-xl bg-[#ff9f1c] text-base font-black text-[#16283b] hover:bg-[#f28b00]">Buy on Amazon <ExternalLink /></Button>
            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">Demonstration listing. Amazon pricing and availability may change. This link is configured to include the site&apos;s Associate tracking tag.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

