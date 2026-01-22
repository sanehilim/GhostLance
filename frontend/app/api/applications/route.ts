import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, COLLECTIONS } from '@/lib/mongodb';

// GET /api/applications - Get applications (with optional jobId filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    
    const { db } = await connectToDatabase();
    const query = jobId ? { jobId } : {};
    const applications = await db.collection(COLLECTIONS.applications).find(query).toArray();
    
    return NextResponse.json(applications);
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST /api/applications - Create a new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const application = {
      ...body,
      createdAt: Date.now(),
      status: 'pending',
    };
    
    const result = await db.collection(COLLECTIONS.applications).insertOne(application);
    return NextResponse.json({ ...application, _id: result.insertedId });
  } catch (error: any) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}
