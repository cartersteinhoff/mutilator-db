import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { mutilators } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { stackServerApp } from '@/lib/stack';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const mutilatorId = parseInt(id);
    
    // First check if the mutilator exists and belongs to the user
    const existing = await db
      .select()
      .from(mutilators)
      .where(eq(mutilators.id, mutilatorId))
      .limit(1);
    
    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Mutilator not found' },
        { status: 404 }
      );
    }
    
    if (existing[0].createdBy !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this mutilator' },
        { status: 403 }
      );
    }
    
    // Delete the mutilator
    await db
      .delete(mutilators)
      .where(and(
        eq(mutilators.id, mutilatorId),
        eq(mutilators.createdBy, user.id)
      ));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting mutilator:', error);
    return NextResponse.json(
      { error: 'Failed to delete mutilator' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const mutilatorId = parseInt(id);
    const body = await request.json();
    
    // Check if the mutilator exists and belongs to the user
    const existing = await db
      .select()
      .from(mutilators)
      .where(eq(mutilators.id, mutilatorId))
      .limit(1);
    
    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Mutilator not found' },
        { status: 404 }
      );
    }
    
    if (existing[0].createdBy !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to update this mutilator' },
        { status: 403 }
      );
    }
    
    // Update the mutilator
    const result = await db
      .update(mutilators)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(and(
        eq(mutilators.id, mutilatorId),
        eq(mutilators.createdBy, user.id)
      ))
      .returning();
    
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error updating mutilator:', error);
    return NextResponse.json(
      { error: 'Failed to update mutilator' },
      { status: 500 }
    );
  }
}