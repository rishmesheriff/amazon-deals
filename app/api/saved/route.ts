import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';

import { getChatGPTUser } from '@/app/chatgpt-auth';

async function ensureSavedDealsTable() {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS saved_deals (
      user_id TEXT NOT NULL,
      deal_id TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      PRIMARY KEY (user_id, deal_id)
    )
  `).run();
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  await ensureSavedDealsTable();
  const result = await env.DB.prepare('SELECT deal_id FROM saved_deals WHERE user_id = ? ORDER BY created_at DESC').bind(user.userId).all<{ deal_id: string }>();
  return NextResponse.json({ dealIds: result.results.map((row) => row.deal_id) });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  const { dealId } = (await request.json()) as { dealId?: string };
  if (!dealId) return NextResponse.json({ error: 'dealId is required' }, { status: 400 });
  await ensureSavedDealsTable();
  await env.DB.prepare('INSERT OR IGNORE INTO saved_deals (user_id, deal_id) VALUES (?, ?)').bind(user.userId, dealId).run();
  return NextResponse.json({ saved: true });
}

export async function DELETE(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  const { dealId } = (await request.json()) as { dealId?: string };
  if (!dealId) return NextResponse.json({ error: 'dealId is required' }, { status: 400 });
  await ensureSavedDealsTable();
  await env.DB.prepare('DELETE FROM saved_deals WHERE user_id = ? AND deal_id = ?').bind(user.userId, dealId).run();
  return NextResponse.json({ saved: false });
}

