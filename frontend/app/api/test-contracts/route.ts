import { NextRequest, NextResponse } from 'next/server';
import { PROGRAM_IDS } from '@/lib/aleo';

// GET /api/test-contracts - Test if contracts are accessible
export async function GET(request: NextRequest) {
  const RPC_URL = process.env.NEXT_PUBLIC_ALEO_RPC_URL || 'https://api.explorer.aleo.org/v1';
  
  const results: any = {
    rpcUrl: RPC_URL,
    contracts: {},
    timestamp: new Date().toISOString(),
    summary: {
      total: 0,
      deployed: 0,
      notDeployed: 0,
    },
  };

  // Test each contract (profile is now hardcoded using localStorage)
  const contracts = [
    { name: 'proof', id: PROGRAM_IDS.proof },
    { name: 'jobMarket', id: PROGRAM_IDS.jobMarket },
    { name: 'escrow', id: PROGRAM_IDS.escrow },
    { name: 'reputation', id: PROGRAM_IDS.reputation },
  ];

  results.summary.total = contracts.length;

  for (const contract of contracts) {
    try {
      // Try different RPC endpoints to check program availability
      // Try /program endpoint first
      let response = await fetch(`${RPC_URL}/program/${contract.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If that fails, try alternative endpoints or just check if we get a valid response
      if (!response.ok && response.status === 404) {
        // Try checking via transactions or other endpoints
        // For now, we'll mark 404 as "not deployed" which is expected
        results.contracts[contract.name] = {
          programId: contract.id,
          accessible: false,
          deployed: false,
          status: response.status,
          statusText: response.statusText,
          message: 'Contract not deployed yet. Deploy using `leo deploy` command.',
        };
        results.summary.notDeployed++;
      } else if (response.ok) {
        // Contract is accessible
        const data = await response.json().catch(() => null);
        results.contracts[contract.name] = {
          programId: contract.id,
          accessible: true,
          deployed: true,
          status: response.status,
          statusText: response.statusText,
          data: data ? 'Program found' : null,
        };
        results.summary.deployed++;
      } else {
        // Other error
        results.contracts[contract.name] = {
          programId: contract.id,
          accessible: false,
          deployed: false,
          status: response.status,
          statusText: response.statusText,
          message: `Unable to verify deployment: ${response.statusText}`,
        };
        results.summary.notDeployed++;
      }
    } catch (error: any) {
      // Network or other errors
      results.contracts[contract.name] = {
        programId: contract.id,
        accessible: false,
        deployed: false,
        error: error.message,
        message: 'Unable to check contract status. Check RPC URL and network connection.',
      };
      results.summary.notDeployed++;
    }
  }

  return NextResponse.json(results);
}
