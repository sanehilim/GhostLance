'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function FreelancerDashboard() {
  const router = useRouter();
  const { address, isConnected, role, loading } = useWallet();
  const [stats, setStats] = useState({
    activeJobs: 0,
    earnings: 0,
    completedJobs: 0,
    deliveryRate: 100,
  });

  useEffect(() => {
    if (!loading && (!isConnected || role !== 'freelancer')) {
      router.push('/auth');
    }
  }, [isConnected, role, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="flex items-center justify-center h-screen text-white">Loading...</div>
      </div>
    );
  }

  if (!isConnected || role !== 'freelancer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Freelancer Dashboard</h1>
          <p className="text-purple-200">Welcome back! Here's your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stats.activeJobs}</div>
            <div className="text-purple-200 text-sm">Active Jobs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stats.earnings} ALEO</div>
            <div className="text-purple-200 text-sm">Total Earnings</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stats.completedJobs}</div>
            <div className="text-purple-200 text-sm">Completed Jobs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stats.deliveryRate}%</div>
            <div className="text-purple-200 text-sm">Delivery Rate</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/freelancer/profile"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
          >
            <div className="text-3xl mb-3">👤</div>
            <h3 className="text-xl font-bold text-white mb-2">Manage Profile</h3>
            <p className="text-purple-200 text-sm">Update your skills and generate proofs</p>
          </Link>

          <Link
            href="/freelancer/jobs"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
          >
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Browse Jobs</h3>
            <p className="text-purple-200 text-sm">Find and apply to new opportunities</p>
          </Link>

          <Link
            href="/freelancer/workspace"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
          >
            <div className="text-3xl mb-3">💼</div>
            <h3 className="text-xl font-bold text-white mb-2">My Workspace</h3>
            <p className="text-purple-200 text-sm">Manage your active jobs</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="text-purple-200">
            <p>No recent activity. Start by browsing jobs or updating your profile!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
