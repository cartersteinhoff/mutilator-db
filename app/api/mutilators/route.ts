import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { mutilators } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, age, hospital, profession } = body;
    
    if (!name || !age || !hospital || !profession) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await db.insert(mutilators).values({
      name,
      age: parseInt(age),
      hospital,
      profession,
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