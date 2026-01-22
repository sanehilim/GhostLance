'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function PostJob() {
  const router = useRouter();
  const { address, isConnected, role, loading } = useWallet();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    requiredSkills: [] as string[],
    minExperience: '',
    minDeliveryRate: '',
  });
  const [newSkill, setNewSkill] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && (!isConnected || role !== 'client')) {
      router.push('/auth');
    }
  }, [isConnected, role, loading, router]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.requiredSkills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(s => s !== skill),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    setSubmitting(true);
    try {
      // Convert deadline to Unix timestamp
      const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);
      
      // Convert skills to encrypted field (simplified)
      const requiredSkillProofs = formData.requiredSkills.join(',');
      const requiredExperienceProof = parseInt(formData.minExperience) || 0;
      
      // Call contract to create job
      const { jobMarket } = await import('@/lib/aleo');
      const contractResult = await jobMarket.createJob(
        address,
        formData.title,
        formData.description,
        parseInt(formData.budget),
        deadlineTimestamp,
        requiredSkillProofs,
        requiredExperienceProof
      );
      
      // Also save to MongoDB for metadata
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: contractResult.transactionId || Date.now().toString(),
          client: address,
          title: formData.title,
          description: formData.description,
          budget: parseInt(formData.budget),
          deadline: deadlineTimestamp,
          requiredSkillProofs: formData.requiredSkills,
          requiredExperienceProof: requiredExperienceProof,
          status: 'open',
        }),
      });
      
      if (response.ok) {
        alert('Job posted successfully!');
        router.push('/client/dashboard');
      } else {
        throw new Error('Failed to save job metadata');
      }
    } catch (error: any) {
      console.error('Error posting job:', error);
      alert(`Failed to post job: ${error.message || 'Unknown error'}`);
    } finally {
      setSubmitting(false);
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
        <div className="mb-8">
          <Link href="/client/dashboard" className="text-purple-300 hover:text-white mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Post a Job</h1>
          <p className="text-purple-200">Create a new job listing with proof requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Job Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-purple-200 mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-200 mb-2">Budget (ALEO)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    required
                    min="0"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Proof Requirements</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-purple-200 mb-2">Required Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add required skill"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-300"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-600/30 border border-purple-500/50 rounded-lg px-3 py-1 text-white flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-red-300 hover:text-red-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-200 mb-2">Min. Experience (years)</label>
                  <input
                    type="number"
                    value={formData.minExperience}
                    onChange={(e) => setFormData({ ...formData, minExperience: e.target.value })}
                    min="0"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 mb-2">Min. Delivery Rate (%)</label>
                  <input
                    type="number"
                    value={formData.minDeliveryRate}
                    onChange={(e) => setFormData({ ...formData, minDeliveryRate: e.target.value })}
                    min="0"
                    max="100"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}
