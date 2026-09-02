import Link from 'next/link';
import { Bell, Heart, LogOut, UserRound } from 'lucide-react';

import { chatGPTSignOutPath, requireChatGPTUser } from '@/app/chatgpt-auth';
import { Button } from '@/components/ui/button';
import { SimplePage } from '@/components/simple-page';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Your profile — Amazon Deals' };

export default async function ProfilePage() {
  const user = await requireChatGPTUser('/profile');
  return <SimplePage eyebrow="Your account" title="Deal center"><div className="flex items-center gap-4 rounded-2xl bg-[#f5f7f9] p-5"><span className="grid size-12 place-items-center rounded-full bg-[#16283b] text-white"><UserRound /></span><div><p className="font-black text-[#16283b]">{user.displayName}</p><p className="text-sm text-muted-foreground">{user.email}</p></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border p-5"><Heart className="size-5 text-[#d94132]" /><h2 className="mt-3">Saved products</h2><p className="mt-1 text-sm">Save products from the deal catalog to build your shortlist.</p><Button render={<Link href="/#deals" />} variant="outline" className="mt-4">Browse deals</Button></div><div className="rounded-2xl border p-5"><Bell className="size-5 text-[#d96c00]" /><h2 className="mt-3">Deal alerts</h2><p className="mt-1 text-sm">Watch categories, keywords, and discount thresholds.</p><Button render={<Link href="/" />} variant="outline" className="mt-4">Manage on home</Button></div></div><Button render={<a href={chatGPTSignOutPath('/')} target="_top" />} variant="outline"><LogOut /> Sign out</Button></SimplePage>;
}

