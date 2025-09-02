import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { mutilators } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    
    // Fetch mutilators created by this user
    const userMutilators = await db
      .select()
      .from(mutilators)
      .where(eq(mutilators.createdBy, userId))
      .orderBy(desc(mutilators.createdAt));
    
    return NextResponse.json({ mutilators: userMutilators });
  } catch (error) {
    console.error('Error fetching user mutilators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user mutilators' },
      { status: 500 }
    );
  }
}