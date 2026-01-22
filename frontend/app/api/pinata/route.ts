import { NextRequest, NextResponse } from 'next/server';

// Server-side Pinata upload (uses server env vars)
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || '';
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || '';

// POST /api/pinata - Upload file to Pinata
export async function POST(request: NextRequest) {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Pinata API keys not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Upload to Pinata
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: uploadFormData,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to upload file' }));
      throw new Error(error.error || 'Failed to upload file to Pinata');
    }
    
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error uploading to Pinata:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}
