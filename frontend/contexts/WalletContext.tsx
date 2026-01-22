'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connect, getAccount, disconnect } from '@puzzlehq/sdk-core';
import { Network } from '@puzzlehq/sdk-core';
import { PROGRAM_IDS } from '@/lib/aleo';
import { UserRole } from '@/types';

interface WalletContextType {
  address: string | null;
  network: string | null;
  isConnected: boolean;
  role: UserRole | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  setRole: (role: UserRole) => void;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window?.aleo?.puzzleWalletClient) {
        const accountResponse: any = await getAccount();
        // Handle different response structures
        const account = accountResponse?.account || accountResponse;
        if (account && (account.address || account.publicKey)) {
          setAddress(account.address || account.publicKey || null);
          setNetwork(account.network || 'AleoTestnet');
          setIsConnected(true);
          
          // Restore role from localStorage
          const savedRole = localStorage.getItem('userRole') as UserRole | null;
          if (savedRole) {
            setRole(savedRole);
          }
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window === 'undefined' || !window?.aleo?.puzzleWalletClient) {
        throw new Error('Puzzle Wallet not detected. Please install the Puzzle Wallet extension.');
      }

      const response = await connect({
        dAppInfo: {
          name: 'GhostLance',
          description: 'Privacy-First Freelance Marketplace',
          iconUrl: `${window.location.origin}/icon.svg`,
        },
        permissions: {
          programIds: {
            [Network.AleoTestnet]: [
              PROGRAM_IDS.proof,
              PROGRAM_IDS.jobMarket,
              PROGRAM_IDS.escrow,
              PROGRAM_IDS.reputation,
            ],
          },
        },
      });

      if (response?.connection?.address) {
        setAddress(response.connection.address);
        setNetwork(response.connection.network || 'AleoTestnet');
        setIsConnected(true);
      } else {
        throw new Error('Failed to connect wallet');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setAddress(null);
      setNetwork(null);
      setIsConnected(false);
      setRole(null);
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error('Wallet disconnection error:', error);
    }
  };

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        network,
        isConnected,
        role,
        connectWallet,
        disconnectWallet,
        setRole: handleSetRole,
        loading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
