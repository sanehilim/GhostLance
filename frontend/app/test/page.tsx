'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import Navbar from '@/components/Navbar';
import { PROGRAM_IDS, RPC_URL } from '@/lib/aleo';

export default function TestPage() {
  const { address, isConnected } = useWallet();
  const [testResults, setTestResults] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    try {
      const response = await fetch('/api/test-contracts');
      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      console.error('Test error:', error);
      setTestResults({ error: 'Failed to run tests' });
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      runTests();
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Contract Connection Test</h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Configuration</h2>
          <div className="space-y-2 text-purple-200">
            <p><strong className="text-white">RPC URL:</strong> {RPC_URL}</p>
            <p><strong className="text-white">Wallet:</strong> {address || 'Not connected'}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Program IDs</h2>
          <div className="space-y-2 text-purple-200 font-mono text-sm">
            <p><strong className="text-white">Profile:</strong> <span className="text-yellow-400">(Using localStorage - hardcoded)</span></p>
            <p><strong className="text-white">Proof:</strong> {PROGRAM_IDS.proof}</p>
            <p><strong className="text-white">Job Market:</strong> {PROGRAM_IDS.jobMarket}</p>
            <p><strong className="text-white">Escrow:</strong> {PROGRAM_IDS.escrow}</p>
            <p><strong className="text-white">Reputation:</strong> {PROGRAM_IDS.reputation}</p>
          </div>
        </div>

        <button
          onClick={runTests}
          disabled={testing}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition disabled:opacity-50 mb-6"
        >
          {testing ? 'Testing...' : 'Test Contract Connections'}
        </button>

        {testResults && (
          <div className="space-y-6">
            {/* Summary */}
            {testResults.summary && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{testResults.summary.total}</div>
                    <div className="text-purple-200 text-sm">Total Contracts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{testResults.summary.deployed}</div>
                    <div className="text-purple-200 text-sm">Deployed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{testResults.summary.notDeployed}</div>
                    <div className="text-purple-200 text-sm">Not Deployed</div>
                  </div>
                </div>
              </div>
            )}

            {/* Contract Status */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Contract Status</h2>
              <div className="space-y-4">
                {testResults.contracts && Object.entries(testResults.contracts).map(([name, contract]: [string, any]) => (
                  <div
                    key={name}
                    className={`p-4 rounded-lg border ${
                      contract.deployed
                        ? 'bg-green-600/20 border-green-500/50'
                        : 'bg-yellow-600/20 border-yellow-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white capitalize">
                        {name === 'jobMarket' ? 'Job Market' : name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          contract.deployed
                            ? 'bg-green-600 text-white'
                            : 'bg-yellow-600 text-white'
                        }`}
                      >
                        {contract.deployed ? '✓ Deployed' : '⚠ Not Deployed'}
                      </span>
                    </div>
                    <div className="text-purple-200 text-sm font-mono mb-2">{contract.programId}</div>
                    {contract.message && (
                      <div className="text-yellow-200 text-sm mt-2">{contract.message}</div>
                    )}
                    {contract.status && (
                      <div className="text-purple-300 text-xs mt-1">
                        Status: {contract.status} {contract.statusText}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment Instructions */}
            {testResults.summary && testResults.summary.notDeployed > 0 && (
              <div className="bg-blue-600/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/50">
                <h2 className="text-2xl font-bold text-white mb-4">🚀 Deploy Contracts</h2>
                <p className="text-purple-200 mb-4">
                  {testResults.summary.notDeployed} contract(s) need to be deployed to the Aleo testnet.
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  <div className="mb-2"># In WSL, navigate to contract directory:</div>
                  <div className="mb-2">cd contracts/&lt;contract_name&gt;</div>
                  <div className="mb-2"># Build the contract:</div>
                  <div className="mb-2">leo build</div>
                  <div className="mb-2"># Deploy to testnet:</div>
                  <div>
                    leo deploy --private-key $PRIVATE_KEY --network testnet --endpoint{' '}
                    {testResults.rpcUrl} --broadcast --yes
                  </div>
                </div>
                <p className="text-purple-200 text-sm mt-4">
                  Or use the provided script: <code className="bg-black/30 px-2 py-1 rounded">./deploy_one_by_one.sh</code>
                </p>
              </div>
            )}

            {/* Raw JSON (Collapsible) */}
            <details className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <summary className="text-2xl font-bold text-white cursor-pointer mb-4">
                Raw JSON Results
              </summary>
              <pre className="text-purple-200 text-sm overflow-auto mt-4">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
