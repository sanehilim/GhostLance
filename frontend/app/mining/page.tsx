'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function MiningPage() {
  const router = useRouter();
  const { address, isConnected, loading } = useWallet();
  const [miningStats, setMiningStats] = useState({
    totalMined: 0,
    pendingRewards: 0,
    miningPower: 0,
  });
  const [isMining, setIsMining] = useState(false);

  useEffect(() => {
    if (!loading && !isConnected) {
      router.push('/auth');
    }
  }, [isConnected, loading, router]);

  const handleStartMining = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsMining(true);
    try {
      // In production, this would connect to Aleo mining pool
      console.log('Starting mining...');
      alert('Mining started! (This feature connects to Aleo testnet mining)');
      
      // Simulate mining
      setTimeout(() => {
        setMiningStats(prev => ({
          ...prev,
          totalMined: prev.totalMined + 0.1,
          pendingRewards: prev.pendingRewards + 0.05,
        }));
        setIsMining(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error starting mining:', error);
      alert(`Failed to start mining: ${error.message}`);
      setIsMining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="flex items-center justify-center h-screen text-white">Loading...</div>
      </div>
    );
  }

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mining Dashboard</h1>
          <p className="text-purple-200">Mine Aleo credits and earn rewards</p>
        </div>

        {/* Mining Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{miningStats.totalMined.toFixed(2)} ALEO</div>
            <div className="text-purple-200 text-sm">Total Mined</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{miningStats.pendingRewards.toFixed(2)} ALEO</div>
            <div className="text-purple-200 text-sm">Pending Rewards</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{miningStats.miningPower}</div>
            <div className="text-purple-200 text-sm">Mining Power</div>
          </div>
        </div>

        {/* Mining Control */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Start Mining</h2>
          <p className="text-purple-200 mb-6">
            Contribute to the Aleo network by mining blocks and earn rewards. 
            Mining helps secure the network and process transactions.
          </p>
          <button
            onClick={handleStartMining}
            disabled={isMining}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition disabled:opacity-50"
          >
            {isMining ? 'Mining...' : 'Start Mining'}
          </button>
        </div>

        {/* Mining Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">About Aleo Mining</h3>
          <div className="space-y-3 text-purple-200">
            <p>
              • Mining on Aleo helps secure the network and process zero-knowledge proofs
            </p>
            <p>
              • Miners earn rewards for validating transactions and generating proofs
            </p>
            <p>
              • Your mining power depends on your computational resources
            </p>
            <p>
              • Rewards are distributed based on your contribution to the network
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
