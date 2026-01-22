import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, COLLECTIONS } from '@/lib/mongodb';

// GET /api/jobs - Get all jobs
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const jobs = await db.collection(COLLECTIONS.jobs).find({}).toArray();
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const job = {
      ...body,
      createdAt: Date.now(),
      status: 'open',
    };
    
    const result = await db.collection(COLLECTIONS.jobs).insertOne(job);
    return NextResponse.json({ ...job, _id: result.insertedId });
  } catch (error: any) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
