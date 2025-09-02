import { NextResponse } from 'next/server';
import { db } from '@/db';
import { mutilators } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(mutilators);
    
    // Get counts by type
    const typeResults = await db
      .select({
        type: mutilators.type,
        count: sql<number>`count(*)`
      })
      .from(mutilators)
      .groupBy(mutilators.type);
    
    const stats = {
      total: Number(totalResult[0].count),
      doctors: 0,
      nurses: 0,
      mohels: 0
    };
    
    typeResults.forEach(row => {
      if (row.type === 'doctor') stats.doctors = Number(row.count);
      if (row.type === 'nurse') stats.nurses = Number(row.count);
      if (row.type === 'mohel') stats.mohels = Number(row.count);
    });
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}