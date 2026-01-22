'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function FreelancerProfile() {
  const router = useRouter();
  const { address, isConnected, role, loading } = useWallet();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [experienceYears, setExperienceYears] = useState(0);
  const [completedJobs, setCompletedJobs] = useState(0);
  const [deliveryRate, setDeliveryRate] = useState(100);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!isConnected || role !== 'freelancer')) {
      router.push('/auth');
    }
  }, [isConnected, role, loading, router]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    setSaving(true);
    try {
      // Convert skills array to encrypted field (simplified - in production would use proper encryption)
      const skillsField = skills.join(',');
      const encryptedData = '0field'; // Placeholder - would be encrypted in production
      
      // Call contract to save profile
      const { profileRegistry } = await import('@/lib/aleo');
      await profileRegistry.createProfile(
        address,
        skillsField,
        experienceYears,
        completedJobs,
        deliveryRate,
        encryptedData
      );
      
      alert('Profile saved successfully!');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      alert(`Failed to save profile: ${error.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateProof = async (type: 'skill' | 'experience') => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const { proofGenerator } = await import('@/lib/aleo');
      
      if (type === 'skill') {
        if (skills.length === 0) {
          alert('Please add at least one skill first');
          return;
        }
        // Generate proof for first skill (in production, would generate for all)
        const skillName = skills[0];
        const skillLevel = 5; // Default level
        const proofHash = `0x${Math.random().toString(16).substr(2, 64)}`; // Placeholder hash
        
        await proofGenerator.generateSkillProof(address, skillName, skillLevel, proofHash);
        alert(`Skill proof generated for ${skillName}!`);
      } else {
        // Generate experience proof
        const minJobs = completedJobs;
        const minRate = deliveryRate;
        const proofHash = `0x${Math.random().toString(16).substr(2, 64)}`; // Placeholder hash
        
        await proofGenerator.generateExperienceProof(address, minJobs, minRate, proofHash);
        alert('Experience proof generated!');
      }
    } catch (error: any) {
      console.error('Error generating proof:', error);
      alert(`Failed to generate proof: ${error.message || 'Unknown error'}`);
    }
  };

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
          <h1 className="text-4xl font-bold text-white mb-2">Private Profile</h1>
          <p className="text-purple-200">Manage your skills and generate ZK proofs</p>
        </div>

        <div className="max-w-3xl">
          {/* Skills Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Add a skill (e.g., React, Rust, Design)"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-300"
              />
              <button
                onClick={handleAddSkill}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-purple-600/30 border border-purple-500/50 rounded-lg px-3 py-1 text-white flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-300 hover:text-red-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={() => handleGenerateProof('skill')}
              className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg transition"
            >
              Generate Skill Proof
            </button>
          </div>

          {/* Experience Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-purple-200 mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Completed Jobs</label>
                <input
                  type="number"
                  value={completedJobs}
                  onChange={(e) => setCompletedJobs(parseInt(e.target.value) || 0)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Delivery Rate (%)</label>
                <input
                  type="number"
                  value={deliveryRate}
                  onChange={(e) => setDeliveryRate(parseInt(e.target.value) || 0)}
                  min="0"
                  max="100"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
            <button
              onClick={() => handleGenerateProof('experience')}
              className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg transition"
            >
              Generate Experience Proof
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
