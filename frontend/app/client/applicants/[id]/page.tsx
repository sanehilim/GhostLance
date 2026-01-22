'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import { Application } from '@/types';

export default function ViewApplicants() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected, role, loading } = useWallet();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    if (!loading && (!isConnected || role !== 'client')) {
      router.push('/auth');
    }
  }, [isConnected, role, loading, router]);

  useEffect(() => {
    if (isConnected && role === 'client') {
      fetchApplications();
    }
  }, [isConnected, role, params.id]);

  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const response = await fetch(`/api/applications?jobId=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoadingApps(false);
    }
  };

  const handleHire = async (applicationId: string) => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const jobId = parseInt(params.id as string);
      const appId = parseInt(applicationId);
      
      // Call contract to accept application
      const { jobMarket, escrow: escrowContract } = await import('@/lib/aleo');
      
      // Accept the application
      await jobMarket.acceptApplication(jobId, appId);
      
      // Find the application to get freelancer and bid amount
      const app = applications.find(a => a.applicationId === applicationId);
      if (app) {
        // Create escrow
        await escrowContract.createEscrow(
          jobId,
          address,
          app.freelancer,
          app.bidAmount
        );
      }
      
      // Update application status in MongoDB
      await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' }),
      });
      
      alert('Applicant hired and escrow created!');
      router.push('/client/dashboard');
    } catch (error: any) {
      console.error('Error hiring applicant:', error);
      alert(`Failed to hire applicant: ${error.message || 'Unknown error'}`);
    }
  };

  if (loading || loadingApps) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navbar />
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
          <h1 className="text-4xl font-bold text-white mb-2">Applicants</h1>
          <p className="text-purple-200">Review and compare applicants for this job</p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center text-purple-200 py-12">
            <p>No applications yet. Check back later!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div
                key={app.applicationId}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-purple-300 mb-2">
                      Freelancer: {app.freelancer.slice(0, 10)}...{app.freelancer.slice(-8)}
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {app.bidAmount} ALEO
                    </div>
                    <p className="text-purple-200">{app.proposal}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-200 mb-2">Status</div>
                    <div className={`px-3 py-1 rounded-lg text-sm ${
                      app.status === 'accepted' ? 'bg-green-600/30 text-green-200' :
                      app.status === 'rejected' ? 'bg-red-600/30 text-red-200' :
                      'bg-yellow-600/30 text-yellow-200'
                    }`}>
                      {app.status}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Proofs</h4>
                  <div className="flex flex-wrap gap-2">
                    {app.skillProofs.map((proof, index) => (
                      <span
                        key={index}
                        className="bg-purple-600/30 border border-purple-500/50 rounded-lg px-3 py-1 text-white text-sm"
                      >
                        ✓ Proof {index + 1}
                      </span>
                    ))}
                  </div>
                </div>

                {app.status === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleHire(app.applicationId)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg transition"
                    >
                      Hire
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
