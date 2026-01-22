import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 5C11 5 7 9 7 14C7 15.5 8 17 9.5 18V25C9.5 28 12 30 15 30C16 30 17 29.5 16 28.5C15 29.5 14 30 13 30C10 30 7.5 28 7.5 25V18C9 17 10 15.5 10 14C10 9 6 5 1 5" stroke="url(#navLogoGradient)" strokeWidth="2" fill="none"/>
                <path d="M16 5C21 5 25 9 25 14C25 15.5 24 17 22.5 18V25C22.5 28 20 30 17 30C16 30 15 29.5 16 28.5C17 29.5 18 30 19 30C22 30 24.5 28 24.5 25V18C23 17 22 15.5 22 14C22 9 26 5 31 5" stroke="url(#navLogoGradient)" strokeWidth="2" fill="none"/>
                <rect x="0" y="0" width="32" height="32" rx="6" fill="url(#navLogoGradient)" opacity="0.1"/>
                <circle cx="12" cy="14" r="1.5" fill="#8B5CF6"/>
                <circle cx="20" cy="14" r="1.5" fill="#8B5CF6"/>
                <defs>
                  <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#8B5CF6",stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#6366F1",stopOpacity:1}} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-2xl font-bold text-white">GhostLance</div>
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
              Built on Aleo
            </span>
          </div>
          <Link
            href="/auth"
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">
            Prove skills. Hide identity.
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Work without bias.
            </span>
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            A privacy-first freelance marketplace built on Aleo. 
            Get hired based on verifiable capability, not your identity.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all border border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why GhostLance?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-white mb-2">Privacy by Default</h3>
              <p className="text-purple-200">
                Your identity stays private. Only your verified skills and experience are visible.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">ZK Proofs</h3>
              <p className="text-purple-200">
                Prove your skills and experience using zero-knowledge cryptography. No fake resumes.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Escrow</h3>
              <p className="text-purple-200">
                Payments are locked in escrow. Get paid when work is approved. No disputes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">For Freelancers</h3>
              <ol className="list-decimal list-inside space-y-2 text-purple-200">
                <li>Connect your Aleo wallet (no email required)</li>
                <li>Create a private profile with your skills and experience</li>
                <li>Generate ZK proofs for your capabilities</li>
                <li>Browse jobs and apply anonymously</li>
                <li>Get hired based on verified proofs, not identity</li>
                <li>Complete work and get paid securely</li>
              </ol>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">For Clients</h3>
              <ol className="list-decimal list-inside space-y-2 text-purple-200">
                <li>Connect your wallet and post a job</li>
                <li>Set proof requirements (skills, experience)</li>
                <li>Receive anonymous applications with verified proofs</li>
                <li>Compare candidates fairly based on proofs</li>
                <li>Hire and lock payment in escrow</li>
                <li>Approve work and release payment</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-purple-200 mb-8">
            Join the future of freelance work. Privacy-first, proof-based, bias-free.
          </p>
          <Link
            href="/auth"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg"
          >
            Connect Wallet
          </Link>
        </div>
      </div>

      {/* Technology Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Powered by Aleo</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">🔐 Zero-Knowledge Proofs</h3>
              <p className="text-purple-200">
                Prove your skills and experience without revealing your identity. 
                ZK proofs enable verifiable credentials while maintaining complete privacy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">🔒 Encrypted Storage</h3>
              <p className="text-purple-200">
                All profile data is encrypted on-chain. Only you control what information 
                is revealed, and only when you choose to reveal it.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">⚡ On-Chain Escrow</h3>
              <p className="text-purple-200">
                Payments are secured through smart contracts. Funds are locked in escrow 
                and released automatically when work is approved.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">🌐 Decentralized</h3>
              <p className="text-purple-200">
                Built on Aleo blockchain. No central authority. No data breaches. 
                Your privacy is protected by cryptography, not promises.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-purple-200">Private</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">ZK</div>
              <div className="text-purple-200">Verified</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-purple-200">Identity Leaks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-purple-200">Possibilities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">GhostLance</h3>
              <p className="text-purple-200 text-sm">
                Privacy-first freelance marketplace built on Aleo blockchain. 
                Work without bias, hire based on proof.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="/auth" className="hover:text-white transition">Get Started</a></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="https://aleo.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">About Aleo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Technology</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  Built on Aleo
                </span>
              </div>
              <p className="text-purple-200 text-sm">
                Powered by zero-knowledge cryptography and programmable privacy.
              </p>
            </div>
          </div>
          <div className="text-center text-purple-200 text-sm border-t border-white/10 pt-8">
            <p>Built on Aleo • Privacy by Design • Zero-Knowledge Proofs • 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
