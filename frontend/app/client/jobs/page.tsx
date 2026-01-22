'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Job } from '@/types';

export default function ClientJobs() {
  const router = useRouter();
  const { address, isConnected, role, loading } = useWallet();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    if (!loading && (!isConnected || role !== 'client')) {
      router.push('/auth');
    }
  }, [isConnected, role, loading, router]);

  useEffect(() => {
    if (isConnected && role === 'client') {
      fetchJobs();
    }
  }, [isConnected, role]);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        // Filter jobs by client address
        const clientJobs = data.filter((job: Job) => job.client === address);
        setJobs(clientJobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Link href="/client/dashboard" className="text-purple-300 hover:text-white mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">My Jobs</h1>
            <p className="text-purple-200">Manage your posted jobs</p>
          </div>
          <Link
            href="/client/post-job"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            + Post New Job
          </Link>
        </div>

        {loadingJobs ? (
          <div className="text-center text-white py-12">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center text-purple-200 py-12">
            <p className="mb-4">No jobs posted yet.</p>
            <Link
              href="/client/post-job"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
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
                  <div className="flex gap-4 text-purple-200 text-sm">
                    <span>Status: <span className={`font-semibold ${
                      job.status === 'open' ? 'text-green-300' :
                      job.status === 'filled' ? 'text-blue-300' :
                      'text-gray-300'
                    }`}>{job.status}</span></span>
                    <span>Deadline: {new Date(job.deadline * 1000).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/client/applicants/${job.jobId}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
                    >
                      View Applicants
                    </Link>
                    <Link
                      href={`/job/${job.jobId}`}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
