import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/markdown';

export function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type') as 'articles' | 'writeups' | null;

  if (type !== 'articles' && type !== 'writeups') {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const posts = getAllPosts(type);
  return NextResponse.json(posts);
}
