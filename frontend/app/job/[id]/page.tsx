'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import { Job } from '@/types';

export default function JobDetails() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected, role } = useWallet();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [proposal, setProposal] = useState('');

  useEffect(() => {
    fetchJob();
  }, [params.id]);

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setJob(data);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isConnected || role !== 'freelancer') {
      router.push('/auth');
      return;
    }

    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!bidAmount || !proposal) {
      alert('Please fill in all fields');
      return;
    }

    setApplying(true);
    try {
      const jobId = parseInt(params.id as string);
      const bid = parseInt(bidAmount);
      
      // Generate placeholder proofs (in production, would use actual proofs)
      const skillProofs = 'proof1,proof2'; // Placeholder
      const experienceProof = 1; // Placeholder proof ID
      
      // Call contract to apply
      const { jobMarket } = await import('@/lib/aleo');
      const contractResult = await jobMarket.applyToJob(
        jobId,
        address,
        bid,
        skillProofs,
        experienceProof,
        proposal
      );
      
      // Also save to MongoDB
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: contractResult.transactionId || Date.now().toString(),
          jobId: params.id,
          freelancer: address,
          bidAmount: bid,
          skillProofs: skillProofs.split(','),
          experienceProof: experienceProof,
          proposal: proposal,
          status: 'pending',
        }),
      });
      
      if (response.ok) {
        alert('Application submitted successfully!');
        router.push('/freelancer/dashboard');
      } else {
        throw new Error('Failed to save application');
      }
    } catch (error: any) {
      console.error('Error applying:', error);
      alert(`Failed to submit application: ${error.message || 'Unknown error'}`);
    } finally {
      setApplying(false);
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

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Job not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-6">
            <h1 className="text-4xl font-bold text-white mb-4">{job.title}</h1>
            <p className="text-purple-200 mb-6">{job.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-white">{job.budget} ALEO</div>
                <div className="text-purple-200 text-sm">Budget</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">
                  {new Date(job.deadline * 1000).toLocaleDateString()}
                </div>
                <div className="text-purple-200 text-sm">Deadline</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkillProofs.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-600/30 border border-purple-500/50 rounded-lg px-3 py-1 text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {role === 'freelancer' && isConnected && job.status === 'open' && (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Apply to This Job</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200 mb-2">Your Bid (ALEO)</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid amount"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 mb-2">Proposal</label>
                  <textarea
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    rows={6}
                    placeholder="Describe why you're the best fit for this job..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <button
                  onClick={handleApply}
                  disabled={applying || !bidAmount || !proposal}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
