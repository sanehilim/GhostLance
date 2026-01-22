'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import { uploadToPinata } from '@/lib/pinata';

export default function JobWorkspace() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected, role, loading } = useWallet();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && (!isConnected || role !== 'freelancer')) {
      router.push('/auth');
    }
  }, [isConnected, role, loading, router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/pinata', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          return data.IpfsHash;
        }
        throw new Error('Upload failed');
      });

      const hashes = await Promise.all(uploadPromises);
      setUploadedFiles([...uploadedFiles, ...hashes]);
      setFiles([]);
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitWork = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    if (uploadedFiles.length === 0) {
      alert('Please upload at least one file');
      return;
    }

    try {
      // In production, this would update job status and notify client
      // For now, we'll just show a success message
      console.log('Submitting work with files:', uploadedFiles);
      
      // Update job status (would be done through contract in production)
      const jobId = params.id as string;
      await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'completed',
          submittedFiles: uploadedFiles,
        }),
      });
      
      alert('Work submitted successfully! Waiting for client approval.');
      router.push('/freelancer/dashboard');
    } catch (error: any) {
      console.error('Error submitting work:', error);
      alert(`Failed to submit work: ${error.message || 'Unknown error'}`);
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

  if (!isConnected || role !== 'freelancer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Job Workspace</h1>
            <p className="text-purple-200">Upload your work and manage deliverables</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Upload Files</h2>
            <div className="space-y-4">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
              />
              {files.length > 0 && (
                <div className="text-purple-200 text-sm">
                  {files.length} file(s) selected
                </div>
              )}
              <button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </button>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Uploaded Files</h2>
              <div className="space-y-2">
                {uploadedFiles.map((hash, index) => (
                  <div key={index} className="text-purple-200 text-sm">
                    ✓ File {index + 1}: {hash.slice(0, 20)}...
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmitWork}
            disabled={uploadedFiles.length === 0}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
          >
            Submit Work
          </button>
        </div>
      </div>
    </div>
  );
}
