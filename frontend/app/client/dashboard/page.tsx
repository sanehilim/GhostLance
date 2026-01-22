'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function ClientDashboard() {
  const router = useRouter();
  const { address, isConnected, role, loading } = useWallet();
  const [stats, setStats] = useState({
    postedJobs: 0,
    activeJobs: 0,
    totalSpent: 0,
    pendingApplicants: 0,
  });

  useEffect(() => {
    if (!loading && (!isConnected || role !== 'client')) {
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

  if (!isConnected || role !== 'client') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Client Dashboard</h1>
          <p className="text-purple-200">Manage your jobs and find the best talent</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stats.postedJobs}</div>
            <div className="text-purple-200 text-sm">Posted Jobs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stats.activeJobs}</div>
            <div className="text-purple-200 text-sm">Active Jobs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stats.totalSpent} ALEO</div>
            <div className="text-purple-200 text-sm">Total Spent</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stats.pendingApplicants}</div>
            <div className="text-purple-200 text-sm">Pending Applicants</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/client/post-job"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
          >
            <div className="text-3xl mb-3">➕</div>
            <h3 className="text-xl font-bold text-white mb-2">Post a Job</h3>
            <p className="text-purple-200 text-sm">Create a new job listing</p>
          </Link>

          <Link
            href="/client/jobs"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-xl font-bold text-white mb-2">My Jobs</h3>
            <p className="text-purple-200 text-sm">View and manage your jobs</p>
          </Link>

          <Link
            href="/client/applicants"
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-xl font-bold text-white mb-2">Applicants</h3>
            <p className="text-purple-200 text-sm">Review and compare applicants</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="text-purple-200">
            <p>No recent activity. Post your first job to get started!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
