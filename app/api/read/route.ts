import { getArticlesFromNotion } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const articles = await getArticlesFromNotion();
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
