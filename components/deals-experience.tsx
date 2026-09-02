'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  ChevronDown,
  Flame,
  Headphones,
  Heart,
  Home,
  Laptop,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Truck,
  X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { categories, deals, type Deal } from '@/lib/deals';

type User = { name: string; email: string } | null;
type DiscountFilter = 0 | 15 | 25 | 50;

const categoryIcons = [Headphones, Laptop, Home, ShoppingBag, Sparkles];

function DealCard({
  deal,
  saved,
  onSave,
}: {
  deal: Deal;
  saved: boolean;
  onSave: (deal: Deal) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.35rem] border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2f5]">
        <img
          src={deal.image}
          alt={deal.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <Badge className="absolute left-4 top-4 h-7 bg-white/95 px-3 text-[#16283b] shadow-sm backdrop-blur">
          {deal.badge}
        </Badge>
        <button
          type="button"
          aria-label={saved ? `Remove ${deal.title} from saved deals` : `Save ${deal.title}`}
          aria-pressed={saved}
          onClick={() => onSave(deal)}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/95 text-[#16283b] shadow-sm transition hover:bg-[#fff3df] hover:text-[#d96c00]"
        >
          <Heart className={`size-4 ${saved ? 'fill-[#d94132] text-[#d94132]' : ''}`} />
        </button>
        <span className="absolute bottom-4 left-4 rounded-lg bg-[#d94132] px-3 py-1.5 text-sm font-black text-white shadow-md">
          {deal.discount}% OFF
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{deal.category}</p>
        <h3 className="mt-2 min-h-12 text-base font-bold leading-6 text-[#16283b]">{deal.title}</h3>
        <div className="mt-3 flex items-center gap-1.5 text-sm">
          <Star className="size-4 fill-[#ff9f1c] text-[#ff9f1c]" />
          <span className="font-bold">{deal.rating}</span>
          <span className="text-muted-foreground">({deal.reviews.toLocaleString()})</span>
          {deal.prime && (
            <>
              <BadgeCheck className="ml-1 size-4 text-[#13a67c]" />
              <span className="text-xs font-semibold text-[#137e62]">Prime</span>
            </>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight text-[#16283b]">${deal.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${deal.originalPrice.toFixed(2)}</span>
            </div>
            <p className="mt-0.5 text-xs font-semibold text-[#137e62]">Save ${(deal.originalPrice - deal.price).toFixed(2)}</p>
          </div>
          <Button nativeButton={false} render={<a href={`/deals/${deal.id}`} />} className="h-10 rounded-xl bg-[#ff9f1c] px-4 font-bold text-[#16283b] hover:bg-[#f28b00]">
            View deal
          </Button>
        </div>
      </div>
    </article>
  );
}

function AlertDialog() {
  const [created, setCreated] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreated(true);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" className="h-10 border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white" />}>
        <Bell /> Deal alerts
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[#16283b]">Create a deal alert</DialogTitle>
          <DialogDescription>Choose what you want to watch. Delivery activates when the live Amazon feed and notification provider are connected.</DialogDescription>
        </DialogHeader>
        {created ? (
          <div className="rounded-xl bg-[#e7f8f2] p-5 text-[#116a53]">
            <BadgeCheck className="mb-2 size-6" />
            <p className="font-bold">Alert preference saved</p>
            <p className="mt-1 text-sm">This preview is ready for the production notification connection.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm font-bold text-[#294158]">
              Product or keyword
              <Input required placeholder="e.g. noise-cancelling headphones" className="mt-2 h-11" />
            </label>
            <label className="block text-sm font-bold text-[#294158]">
              Minimum discount
              <select className="mt-2 h-11 w-full rounded-lg border bg-white px-3 font-medium" defaultValue="25">
                <option value="15">15% or more</option>
                <option value="25">25% or more</option>
                <option value="50">50% or more</option>
              </select>
            </label>
            <label className="block text-sm font-bold text-[#294158]">
              Email
              <Input required type="email" placeholder="you@example.com" className="mt-2 h-11" />
            </label>
            <Button type="submit" className="h-11 w-full bg-[#16283b] font-bold text-white">Save alert</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function DealsExperience({ user, signInPath }: { user: User; signInPath: string }) {
  const [query, setQuery] = useState('');
  const [discount, setDiscount] = useState<DiscountFilter>(0);
  const [category, setCategory] = useState('All categories');
  const [rating, setRating] = useState(0);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [sort, setSort] = useState('popular');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch('/api/saved')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { dealIds: string[] }) => setSavedIds(data.dealIds))
      .catch(() => undefined);
  }, [user]);

  const filteredDeals = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const next = deals.filter((deal) => {
      const matchesText = !normalized || [deal.title, deal.brand, deal.category, deal.description].join(' ').toLowerCase().includes(normalized);
      return matchesText && deal.discount >= discount && (category === 'All categories' || deal.category === category) && deal.rating >= rating && (!primeOnly || deal.prime) && (!savedOnly || savedIds.includes(deal.id));
    });
    return [...next].sort((a, b) => {
      if (sort === 'discount') return b.discount - a.discount;
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'rating') return b.rating - a.rating;
      return b.engagement - a.engagement;
    });
  }, [category, discount, primeOnly, query, rating, savedIds, savedOnly, sort]);

  const toggleSave = async (deal: Deal) => {
    const wasSaved = savedIds.includes(deal.id);
    setSavedIds((current) => wasSaved ? current.filter((id) => id !== deal.id) : [...current, deal.id]);
    if (user) {
      await fetch('/api/saved', {
        method: wasSaved ? 'DELETE' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ dealId: deal.id }),
      }).catch(() => undefined);
    }
  };

  const clearFilters = () => {
    setQuery(''); setDiscount(0); setCategory('All categories'); setRating(0); setPrimeOnly(false); setSavedOnly(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#16283b]/95 text-white shadow-lg shadow-[#16283b]/10 backdrop-blur-xl">
        <div className="mx-auto flex min-h-18 max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex shrink-0 items-center gap-2" aria-label="Amazon Deals home">
            <span className="grid size-9 place-items-center rounded-xl bg-[#ff9f1c] text-[#16283b]"><Flame className="size-5 fill-current" /></span>
            <span className="text-lg font-black tracking-tight sm:text-xl">Amazon <span className="text-[#ffb341]">Deals</span></span>
          </a>
          <div className="relative mx-auto hidden max-w-2xl flex-1 md:block">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search deals" placeholder="Search products, brands, or categories" className="h-11 rounded-xl border-0 bg-white pl-11 text-[#16283b] shadow-sm" />
          </div>
          <nav className="ml-auto flex items-center gap-2">
            <AlertDialog />
            <Button onClick={() => setSavedOnly((value) => !value)} variant="ghost" className={`hidden h-10 text-white hover:bg-white/10 hover:text-white sm:inline-flex ${savedOnly ? 'bg-white/15' : ''}`}>
              <Heart className={savedOnly ? 'fill-[#ff9f1c] text-[#ff9f1c]' : ''} /> Saved {savedIds.length ? `(${savedIds.length})` : ''}
            </Button>
            {user ? (
              <Button nativeButton={false} render={<a href="/profile" />} className="h-10 rounded-xl bg-white px-4 font-bold text-[#16283b] hover:bg-slate-100">{user.name.split('@')[0]}</Button>
            ) : (
              <Button nativeButton={false} render={<a href={signInPath} target="_top" />} className="h-10 rounded-xl bg-white px-4 font-bold text-[#16283b] hover:bg-slate-100">Sign in</Button>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b bg-[#fff7e9]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-12">
            <div className="flex flex-col justify-center">
              <Badge className="h-7 w-fit bg-[#16283b] px-3 text-white"><Sparkles className="size-3.5" /> Fresh deals, checked today</Badge>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-[#16283b] sm:text-5xl">Better prices, without the endless scroll.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Explore Amazon discounts of 15% or more, compare savings, and jump straight to the deal.</p>
              <div className="relative mt-6 md:hidden">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search deals" placeholder="Search deals" className="h-13 rounded-xl bg-white pl-12" />
              </div>
              <div className="mt-7 flex flex-wrap gap-3" aria-label="Discount filters">
                {([0, 15, 25, 50] as DiscountFilter[]).map((value) => (
                  <button type="button" key={value} onClick={() => setDiscount(value)} aria-pressed={discount === value} className={`rounded-xl border border-black/5 px-4 py-2.5 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 ${discount === value ? (value === 50 ? 'bg-[#d94132] text-white' : 'bg-[#16283b] text-white') : 'bg-white text-[#16283b]'}`}>
                    {value === 0 ? 'All deals' : `${value}%+ off`}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 self-center" aria-label="Deal tiers">
              {[
                ['15%+', 'Everyday wins', '#ffb341'], ['25%+', 'Worth the click', '#13a67c'], ['50%+', 'Biggest drops', '#d94132'],
              ].map(([value, label, color], index) => (
                <button type="button" key={value} onClick={() => setDiscount(Number.parseInt(value) as DiscountFilter)} className={`rounded-[1.4rem] p-4 text-left text-white shadow-lg transition hover:-translate-y-1 sm:p-5 ${index === 1 ? 'translate-y-5 hover:translate-y-4' : ''}`} style={{ backgroundColor: color }}>
                  <span className={`block text-3xl font-black sm:text-4xl ${index === 0 ? 'text-[#16283b]' : ''}`}>{value}</span>
                  <span className={`mt-8 block text-xs font-bold sm:text-sm ${index === 0 ? 'text-[#16283b]' : ''}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.slice(1, 6).map((label, index) => {
              const Icon = categoryIcons[index];
              return <button type="button" key={label} onClick={() => setCategory(label)} className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold shadow-sm transition ${category === label ? 'border-[#ff9f1c] bg-[#fff3df] text-[#16283b]' : 'bg-white text-[#294158] hover:border-[#ffb341]'}`}><Icon className="size-4 text-[#d96c00]" />{label}</button>;
            })}
          </div>
        </section>

        <section id="deals" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#d96c00]">Live preview catalog</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#16283b] sm:text-3xl">{savedOnly ? 'Your saved deals' : 'Deals worth opening'}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{filteredDeals.length} result{filteredDeals.length === 1 ? '' : 's'} · demonstration listings</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setMobileFilters((value) => !value)} className="lg:hidden"><SlidersHorizontal /> Filters</Button>
              <label className="text-sm font-bold text-[#294158]">
                <span className="sr-only">Sort deals</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 rounded-lg border bg-white px-3">
                  <option value="popular">Most popular</option><option value="discount">Biggest discount</option><option value="price-low">Lowest price</option><option value="rating">Top rated</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <aside className={`${mobileFilters ? 'block' : 'hidden'} h-fit rounded-2xl border bg-white p-5 shadow-sm lg:block`}>
              <div className="flex items-center justify-between"><h3 className="font-black text-[#16283b]">Refine deals</h3><button type="button" onClick={clearFilters} className="text-xs font-bold text-[#d96c00]">Clear</button></div>
              <div className="mt-5 space-y-5">
                <label className="block text-sm font-bold text-[#294158]">Category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 h-10 w-full rounded-lg border bg-white px-3 font-medium">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
                <fieldset><legend className="text-sm font-bold text-[#294158]">Minimum rating</legend><div className="mt-2 space-y-2">{[0, 4, 4.5].map((value) => <label key={value} className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" checked={rating === value} onChange={() => setRating(value)} className="accent-[#ff9f1c]" />{value === 0 ? 'Any rating' : `${value} stars & up`}</label>)}</div></fieldset>
                <label className="flex cursor-pointer items-center justify-between rounded-xl bg-[#f5f7f9] p-3 text-sm font-bold text-[#294158]">Prime eligible<input type="checkbox" checked={primeOnly} onChange={(event) => setPrimeOnly(event.target.checked)} className="size-4 accent-[#13a67c]" /></label>
                {savedIds.length > 0 && <button type="button" onClick={() => setSavedOnly((value) => !value)} className="flex w-full items-center justify-between rounded-xl border p-3 text-sm font-bold"><span className="flex items-center gap-2"><Heart className="size-4 text-[#d94132]" />Saved only</span><span>{savedIds.length}</span></button>}
              </div>
            </aside>

            {filteredDeals.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredDeals.map((deal) => <DealCard key={deal.id} deal={deal} saved={savedIds.includes(deal.id)} onSave={toggleSave} />)}</div>
            ) : (
              <div className="grid min-h-80 place-items-center rounded-2xl border border-dashed bg-white p-8 text-center"><div><Search className="mx-auto size-8 text-slate-400" /><h3 className="mt-3 text-xl font-black text-[#16283b]">No matching deals</h3><p className="mt-2 text-sm text-muted-foreground">Try a broader search or clear a filter.</p><Button onClick={clearFilters} className="mt-4 bg-[#16283b]">Clear filters</Button></div></div>
            )}
          </div>
        </section>

        <section className="bg-[#16283b] text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
            {[ [ShieldCheck, 'Policy-aware listings', 'Prepared for approved Amazon data sources and clear affiliate disclosure.'], [Tag, 'Discounts that qualify', 'Every displayed deal meets the selected 15%, 25%, or 50% threshold.'], [Truck, 'Availability signals', 'Prime and stock indicators help you decide before opening Amazon.'] ].map(([Icon, title, copy]) => {
              const FeatureIcon = Icon as typeof ShieldCheck;
              return <div key={title as string} className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10"><FeatureIcon className="size-5 text-[#ffb341]" /></span><div><h3 className="font-black">{title as string}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{copy as string}</p></div></div>;
            })}
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div><div className="flex items-center gap-2 font-black text-[#16283b]"><Flame className="size-5 fill-[#ff9f1c] text-[#ff9f1c]" />Amazon Deals</div><p className="mt-3 max-w-xl text-xs leading-5 text-muted-foreground">Amazon Deals is an independent deal-discovery site. As an Amazon Associate, the site may earn from qualifying purchases. Prices and availability can change after you leave this site.</p></div>
            <nav className="flex flex-wrap gap-5 text-sm font-bold text-[#294158]"><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#deals">Browse deals</a></nav>
          </div>
          <p className="mt-8 border-t pt-5 text-xs text-muted-foreground">© 2026 Amazon Deals. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.</p>
        </div>
      </footer>
    </div>
  );
}

