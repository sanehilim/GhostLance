'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import { Escrow } from '@/types';

export default function EscrowStatus() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected, role } = useWallet();
  const [escrow, setEscrow] = useState<Escrow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEscrow();
  }, [params.id]);

  const fetchEscrow = async () => {
    try {
      // TODO: Fetch escrow from contract
      console.log('Fetching escrow:', params.id);
      // Placeholder data
      setEscrow({
        escrowId: params.id as string,
        jobId: '1',
        client: 'aleo1...',
        freelancer: 'aleo1...',
        amount: 1000,
        status: 'locked',
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error('Error fetching escrow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRelease = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }
    if (!escrow) {
      alert('Escrow not found');
      return;
    }

    try {
      const escrowId = parseInt(params.id as string);
      const { escrow: escrowContract } = await import('@/lib/aleo');
      
      await escrowContract.releasePayment(escrowId);
      
      // Update escrow status
      const updatedEscrow: Escrow = { 
        ...escrow, 
        status: 'released' as const, 
        releasedAt: Date.now() 
      };
      setEscrow(updatedEscrow);
      
      alert('Payment released successfully!');
    } catch (error: any) {
      console.error('Error releasing payment:', error);
      alert(`Failed to release payment: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDispute = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }
    if (!escrow) {
      alert('Escrow not found');
      return;
    }

    try {
      const escrowId = parseInt(params.id as string);
      const { escrow: escrowContract } = await import('@/lib/aleo');
      
      await escrowContract.disputePayment(escrowId);
      
      // Update escrow status
      const updatedEscrow: Escrow = { 
        ...escrow, 
        status: 'disputed' as const 
      };
      setEscrow(updatedEscrow);
      
      alert('Dispute filed successfully!');
    } catch (error: any) {
      console.error('Error disputing payment:', error);
      alert(`Failed to file dispute: ${error.message || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navbar />
        <div className="flex items-center justify-center h-screen text-white">Loading...</div>
      </div>
    );
  }

  if (!escrow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Escrow not found</div>
        </div>
      </div>
    );
  }

  const statusColors = {
    locked: 'bg-yellow-600/30 text-yellow-200',
    released: 'bg-green-600/30 text-green-200',
    disputed: 'bg-red-600/30 text-red-200',
    refunded: 'bg-gray-600/30 text-gray-200',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h1 className="text-4xl font-bold text-white mb-6">Escrow Status</h1>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-purple-200 text-sm mb-1">Escrow ID</div>
                <div className="text-white font-mono">{escrow.escrowId}</div>
              </div>
              <div>
                <div className="text-purple-200 text-sm mb-1">Amount</div>
                <div className="text-3xl font-bold text-white">{escrow.amount} ALEO</div>
              </div>
              <div>
                <div className="text-purple-200 text-sm mb-1">Status</div>
                <div className={`inline-block px-4 py-2 rounded-lg ${statusColors[escrow.status]}`}>
                  {escrow.status.toUpperCase()}
                </div>
              </div>
              <div>
                <div className="text-purple-200 text-sm mb-1">Client</div>
                <div className="text-white font-mono">{escrow.client}</div>
              </div>
              <div>
                <div className="text-purple-200 text-sm mb-1">Freelancer</div>
                <div className="text-white font-mono">{escrow.freelancer}</div>
              </div>
            </div>

            {isConnected && (
              <div className="space-y-4">
                {role === 'client' && escrow.status === 'locked' && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleRelease}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                      Release Payment
                    </button>
                    <button
                      onClick={handleDispute}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                      File Dispute
                    </button>
                  </div>
                )}
                {role === 'freelancer' && escrow.status === 'disputed' && (
                  <div className="text-purple-200 text-sm">
                    This payment is under dispute. Please wait for resolution.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
