import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { mutilators } from '@/db/schema';
import { stackServerApp } from '@/lib/stack';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    const { name, age, hospital, profession, type, description, imageUrl } = body;
    
    if (!name || !age || !hospital || !profession || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate type
    if (!['doctor', 'nurse', 'mohel'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be doctor, nurse, or mohel' },
        { status: 400 }
      );
    }
    
    const result = await db.insert(mutilators).values({
      name,
      age: parseInt(age),
      hospital,
      profession,
      type,
      description: description || null,
      imageUrl: imageUrl || null,
      createdBy: user.id,
    }).returning();
    
    return NextResponse.json({ success: true, data: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating mutilator:', error);
    return NextResponse.json(
      { error: 'Failed to create mutilator' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await db.select().from(mutilators);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching mutilators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mutilators' },
      { status: 500 }
    );
  }
}