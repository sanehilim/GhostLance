'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { UserRole } from '@/types';

export default function AuthPage() {
  const router = useRouter();
  const { address, isConnected, connectWallet, setRole, loading } = useWallet();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already connected and has role, redirect to appropriate dashboard
    if (isConnected && address) {
      const savedRole = localStorage.getItem('userRole') as UserRole | null;
      if (savedRole) {
        router.push(`/${savedRole}/dashboard`);
      }
    }
  }, [isConnected, address, router]);

  const handleConnect = async () => {
    try {
      setConnecting(true);
      setError(null);
      await connectWallet();
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    router.push(`/${role}/dashboard`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">GhostLance</h1>
              <p className="text-purple-200">Privacy-First Freelance Marketplace</p>
              <p className="text-sm text-purple-300 mt-2">Prove skills. Hide identity. Work without bias.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleConnect}
              disabled={connecting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {connecting ? 'Connecting...' : 'Connect Puzzle Wallet'}
            </button>

            <p className="text-center text-purple-200 text-sm mt-4">
              Don't have Puzzle Wallet?{' '}
              <a
                href="https://puzzle.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white underline"
              >
                Install it here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Role selection
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Role</h2>
            <p className="text-purple-200">How would you like to use GhostLance?</p>
            <p className="text-sm text-purple-300 mt-2">Connected: {address?.slice(0, 10)}...{address?.slice(-8)}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleRoleSelect('freelancer')}
              className="bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-8 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="text-4xl mb-3">👨‍💻</div>
              <h3 className="text-xl font-bold mb-2">Freelancer</h3>
              <p className="text-sm text-green-100">
                Work anonymously, prove your skills with ZK proofs, and get hired based on capability
              </p>
            </button>

            <button
              onClick={() => handleRoleSelect('client')}
              className="bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-8 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="text-4xl mb-3">👔</div>
              <h3 className="text-xl font-bold mb-2">Client</h3>
              <p className="text-sm text-blue-100">
                Post jobs, hire based on verified proofs, and pay securely through escrow
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
