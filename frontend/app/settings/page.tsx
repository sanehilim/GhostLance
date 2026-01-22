'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';

export default function Settings() {
  const router = useRouter();
  const { address, isConnected, role, disconnectWallet, loading } = useWallet();

  useEffect(() => {
    if (!loading && !isConnected) {
      router.push('/auth');
    }
  }, [isConnected, loading, router]);

  const handleDisconnect = async () => {
    await disconnectWallet();
    router.push('/');
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Account</h2>
            <div className="space-y-4">
              <div>
                <div className="text-purple-200 text-sm mb-1">Wallet Address</div>
                <div className="text-white font-mono">{address}</div>
              </div>
              <div>
                <div className="text-purple-200 text-sm mb-1">Role</div>
                <div className="text-white capitalize">{role}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Danger Zone</h2>
            <button
              onClick={handleDisconnect}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
