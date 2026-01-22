'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';

export default function Navbar() {
  const router = useRouter();
  const { address, isConnected, disconnectWallet, role } = useWallet();

  const handleDisconnect = async () => {
    await disconnectWallet();
    router.push('/');
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 5C11 5 7 9 7 14C7 15.5 8 17 9.5 18V25C9.5 28 12 30 15 30C16 30 17 29.5 16 28.5C15 29.5 14 30 13 30C10 30 7.5 28 7.5 25V18C9 17 10 15.5 10 14C10 9 6 5 1 5" stroke="url(#logoGradient)" strokeWidth="2" fill="none"/>
              <path d="M16 5C21 5 25 9 25 14C25 15.5 24 17 22.5 18V25C22.5 28 20 30 17 30C16 30 15 29.5 16 28.5C17 29.5 18 30 19 30C22 30 24.5 28 24.5 25V18C23 17 22 15.5 22 14C22 9 26 5 31 5" stroke="url(#logoGradient)" strokeWidth="2" fill="none"/>
              <rect x="0" y="0" width="32" height="32" rx="6" fill="url(#logoGradient)" opacity="0.1"/>
              <circle cx="12" cy="14" r="1.5" fill="#8B5CF6"/>
              <circle cx="20" cy="14" r="1.5" fill="#8B5CF6"/>
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#8B5CF6",stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#6366F1",stopOpacity:1}} />
                </linearGradient>
              </defs>
            </svg>
            GhostLance
          </Link>

          <div className="flex items-center gap-4">
            {isConnected && address && (
              <>
                <span className="text-purple-200 text-sm">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                {role && (
                  <Link
                    href={`/${role}/dashboard`}
                    className="text-white hover:text-purple-200 transition"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/mining"
                  className="text-white hover:text-purple-200 transition"
                >
                  Mining
                </Link>
                <button
                  onClick={handleDisconnect}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Disconnect
                </button>
              </>
            )}
            {!isConnected && (
              <Link
                href="/auth"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition"
              >
                Connect Wallet
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
