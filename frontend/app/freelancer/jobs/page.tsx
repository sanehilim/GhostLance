'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Job } from '@/types';

export default function BrowseJobs() {
  const router = useRouter();
  const { address, isConnected, role, loading } = useWallet();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState('');
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    if (!loading && (!isConnected || role !== 'freelancer')) {
      router.push('/auth');
    }
  }, [isConnected, role, loading, router]);

  useEffect(() => {
    if (isConnected && role === 'freelancer') {
      fetchJobs();
    }
  }, [isConnected, role]);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        // If no jobs, set empty array
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(filter.toLowerCase()) ||
    job.description.toLowerCase().includes(filter.toLowerCase())
  );

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
          <Link href="/freelancer/dashboard" className="text-purple-300 hover:text-white mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Browse Jobs</h1>
          <p className="text-purple-200">Find opportunities that match your skills</p>
        </div>

        {/* Search/Filter */}
        <div className="mb-6">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search jobs..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-300"
          />
        </div>

        {/* Jobs List */}
        {loadingJobs ? (
          <div className="text-center text-white py-12">Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center text-purple-200 py-12">
            <p>No jobs found. Check back later!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.jobId}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-purple-200">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{job.budget} ALEO</div>
                    <div className="text-purple-200 text-sm">Budget</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-purple-200 text-sm">
                    Deadline: {new Date(job.deadline * 1000).toLocaleDateString()}
                  </div>
                  <Link
                    href={`/job/${job.jobId}`}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    View & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
