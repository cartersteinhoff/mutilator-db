import { NextResponse } from 'next/server';
import { db } from '@/db';
import { mutilators } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Get a random mutilator as "featured" - changes each request
    // In production, you might want to cache this weekly
    const result = await db
      .select()
      .from(mutilators)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    
    if (result.length === 0) {
      return NextResponse.json({ featured: null });
    }
    
    return NextResponse.json({ featured: result[0] });
  } catch (error) {
    console.error('Error fetching featured mutilator:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured mutilator' },
      { status: 500 }
    );
  }
}