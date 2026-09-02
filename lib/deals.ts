export type Deal = {
  id: string;
  title: string;
  brand: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  prime: boolean;
  availability: 'In stock' | 'Limited stock';
  badge: string;
  engagement: number;
};

export const categories = [
  'All categories',
  'Beauty & Personal Care',
  'Health & Household',
  'Toys & Games',
  'Sports & Outdoors',
  'Pet Supplies',
  'Grocery & Gourmet Food',
  'Baby Products',
  'Electronics',
  'Computers',
  'Home & Kitchen',
  'Clothing, Shoes & Jewelry',
  'Beauty',
  'Office',
] as const;

export const deals: Deal[] = [
  {
    id: 'sonic-pro-headphones',
    title: 'Sonic Pro Wireless Noise-Cancelling Headphones',
    brand: 'Sonic Pro',
    description: 'Immersive over-ear headphones with adaptive noise cancellation, clear calls, and all-day comfort.',
    features: ['Adaptive noise cancellation', 'Up to 40-hour battery', 'Multipoint Bluetooth', 'Quick-charge support'],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=85'],
    category: 'Electronics', price: 79.99, originalPrice: 159.99, discount: 50, rating: 4.7, reviews: 8240,
    prime: true, availability: 'In stock', badge: 'Best price', engagement: 98,
  },
  {
    id: 'barista-coffee-maker',
    title: 'Barista Touch Compact Espresso & Coffee Maker',
    brand: 'Barista Touch',
    description: 'A compact countertop brewer for espresso-style drinks, rich coffee, and silky milk foam at home.',
    features: ['15-bar pressure', 'Fast thermoblock heating', 'Milk frothing wand', 'Removable water tank'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=900&q=85'],
    category: 'Home & Kitchen', price: 118.49, originalPrice: 179.99, discount: 34, rating: 4.6, reviews: 3518,
    prime: true, availability: 'Limited stock', badge: 'Trending', engagement: 94,
  },
  {
    id: 'everyday-sneakers',
    title: 'Everyday Cloud-Knit Walking Sneakers',
    brand: 'Cloudstep',
    description: 'Lightweight knit walking shoes with a cushioned sole and flexible everyday fit.',
    features: ['Breathable knit upper', 'Cushioned footbed', 'Flexible traction sole', 'Machine-washable design'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85'],
    category: 'Clothing, Shoes & Jewelry', price: 41.25, originalPrice: 54.99, discount: 25, rating: 4.5, reviews: 12904,
    prime: true, availability: 'In stock', badge: 'Popular', engagement: 91,
  },
  {
    id: 'smart-watch-active',
    title: 'Active Series GPS Smart Watch with Health Tracking',
    brand: 'Pulse',
    description: 'A bright, swim-ready GPS watch that keeps workouts, sleep, and everyday notifications close.',
    features: ['Built-in GPS', 'Heart-rate and sleep tracking', 'Swim-ready design', 'Seven-day battery'],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=85'],
    category: 'Electronics', price: 89.95, originalPrice: 149.95, discount: 40, rating: 4.4, reviews: 6179,
    prime: true, availability: 'In stock', badge: '40% drop', engagement: 88,
  },
  {
    id: 'mechanical-keyboard',
    title: 'Compact Wireless Mechanical Keyboard',
    brand: 'Keyline',
    description: 'A space-saving mechanical keyboard with tactile switches and seamless multi-device pairing.',
    features: ['Hot-swappable switches', 'Bluetooth and USB-C', 'Three-device pairing', 'White backlight'],
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=85'],
    category: 'Computers', price: 62.99, originalPrice: 89.99, discount: 30, rating: 4.8, reviews: 2241,
    prime: true, availability: 'In stock', badge: 'Top rated', engagement: 86,
  },
  {
    id: 'air-fryer',
    title: 'Family-Size Digital Air Fryer with Viewing Window',
    brand: 'CrispHaus',
    description: 'A roomy, easy-clean air fryer with one-touch presets and a clear cooking window.',
    features: ['Eight-quart basket', 'Eight cooking presets', 'Dishwasher-safe parts', 'Low-oil crisping'],
    image: 'https://images.unsplash.com/photo-1585515656973-a3457a5e50e9?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85'],
    category: 'Home & Kitchen', price: 69.99, originalPrice: 139.99, discount: 50, rating: 4.6, reviews: 9871,
    prime: false, availability: 'Limited stock', badge: 'Half price', engagement: 95,
  },
  {
    id: 'skin-care-set',
    title: 'Daily Hydration Skin Care Essentials Set',
    brand: 'Luma Botanics',
    description: 'A gentle four-piece daily routine designed to cleanse, hydrate, and support the skin barrier.',
    features: ['Four full-size products', 'Fragrance-free formulas', 'All skin types', 'Travel-ready pouch'],
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85'],
    category: 'Beauty', price: 28.0, originalPrice: 39.99, discount: 30, rating: 4.5, reviews: 4203,
    prime: true, availability: 'In stock', badge: 'Clean beauty', engagement: 80,
  },
  {
    id: 'yoga-mat',
    title: 'Extra-Thick Non-Slip Fitness & Yoga Mat',
    brand: 'Movewell',
    description: 'A supportive exercise mat with a grippy surface, alignment marks, and a carry strap.',
    features: ['Extra cushioning', 'Double-sided grip', 'Alignment guide', 'Carry strap included'],
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1601925228008-faa2f1f23698?auto=format&fit=crop&w=900&q=85'],
    category: 'Sports & Outdoors', price: 22.49, originalPrice: 29.99, discount: 25, rating: 4.7, reviews: 7390,
    prime: true, availability: 'In stock', badge: 'Fitness pick', engagement: 76,
  },
  {
    id: 'desk-lamp',
    title: 'Adjustable LED Desk Lamp with Wireless Charging',
    brand: 'Lumen Desk',
    description: 'A slim task light with adjustable warmth, dimming, and a built-in wireless charging pad.',
    features: ['Five brightness levels', 'Adjustable color temperature', 'Wireless charging pad', 'Fold-flat arm'],
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    gallery: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85'],
    category: 'Office', price: 33.99, originalPrice: 39.99, discount: 15, rating: 4.4, reviews: 1857,
    prime: true, availability: 'In stock', badge: 'Desk upgrade', engagement: 70,
  },
];

export function affiliateUrl(deal: Deal) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG ?? 'YOUR_TAG_HERE';
  const query = encodeURIComponent(`${deal.brand} ${deal.title}`);
  return `https://www.amazon.com/s?k=${query}&tag=${encodeURIComponent(tag)}`;
}

