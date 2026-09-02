import Link from 'next/link';
import { ArrowLeft, Flame } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SimplePage({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f7f9]">
      <header className="bg-[#16283b] text-white"><div className="mx-auto flex h-18 max-w-5xl items-center justify-between px-4 sm:px-6"><Link href="/" className="flex items-center gap-2 font-black"><span className="grid size-9 place-items-center rounded-xl bg-[#ff9f1c] text-[#16283b]"><Flame className="size-5 fill-current" /></span>Amazon <span className="text-[#ffb341]">Deals</span></Link><Button render={<Link href="/" />} variant="ghost" className="text-white hover:bg-white/10 hover:text-white"><ArrowLeft /> Home</Button></div></header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16"><p className="text-sm font-black uppercase tracking-[0.14em] text-[#d96c00]">{eyebrow}</p><h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#16283b] sm:text-5xl">{title}</h1><div className="prose-content mt-8 space-y-6 rounded-2xl border bg-white p-6 text-slate-600 shadow-sm sm:p-9">{children}</div></main>
    </div>
  );
}

