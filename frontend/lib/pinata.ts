// Pinata file upload utilities

// Server-side: use without NEXT_PUBLIC prefix
// Client-side: use with NEXT_PUBLIC prefix
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || process.env.PINATA_API_KEY || '';
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || process.env.PINATA_SECRET_KEY || '';
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'https://gateway.pinata.cloud/ipfs';

export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

// Upload file to Pinata
export async function uploadToPinata(file: File): Promise<PinataResponse> {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error('Pinata API keys not configured');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload file to Pinata');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Pinata upload error:', error);
    throw error;
  }
}

// Upload JSON metadata to Pinata
export async function uploadMetadataToPinata(metadata: any): Promise<PinataResponse> {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error('Pinata API keys not configured');
  }

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload metadata to Pinata');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Pinata metadata upload error:', error);
    throw error;
  }
}

// Get file URL from IPFS hash
export function getPinataUrl(ipfsHash: string): string {
  const gateway = PINATA_GATEWAY.endsWith('/ipfs') ? PINATA_GATEWAY : `${PINATA_GATEWAY}/ipfs`;
  return `${gateway}/${ipfsHash}`;
}

// Upload multiple files
export async function uploadMultipleFiles(files: File[]): Promise<PinataResponse[]> {
  const uploadPromises = files.map(file => uploadToPinata(file));
  return Promise.all(uploadPromises);
}
