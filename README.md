# 👻 GhostLance

**A Privacy-First Freelance Marketplace Built on Aleo Blockchain**

> **Prove skills. Hide identity. Work without bias.**

[![Built on Aleo](https://img.shields.io/badge/Built%20on-Aleo-6366F1?style=flat-square)](https://aleo.org)
[![Privacy First](https://img.shields.io/badge/Privacy-First-8B5CF6?style=flat-square)](https://aleo.org)
[![Zero Knowledge](https://img.shields.io/badge/Zero-Knowledge-A78BFA?style=flat-square)](https://aleo.org)

---

 

## 📖 Table of Contents

- [What is GhostLance?](#what-is-ghostlance)
- [Why GhostLance?](#why-ghostlance)
- [How It Works](#how-it-works)
- [Key Features](#key-features)
- [Use Cases](#use-cases)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Documentation](#documentation)

---

## 🎯 What is GhostLance?

**GhostLance** is a revolutionary privacy-first freelance marketplace that eliminates bias and identity-based discrimination by leveraging **Zero-Knowledge (ZK) cryptography** and **programmable privacy** on the Aleo blockchain.

### The Problem We Solve

Traditional freelance platforms have fundamental privacy and bias issues:

- ❌ **Identity Leaks**: Your personal information (name, location, age, gender) is visible to clients
- ❌ **Bias in Hiring**: Decisions are made based on identity, not capability
- ❌ **Data Breaches**: Centralized databases expose sensitive personal data
- ❌ **Fake Resumes**: No verifiable proof of skills and experience
- ❌ **Payment Disputes**: Lack of transparent escrow mechanisms

### Our Solution

GhostLance uses **Zero-Knowledge Proofs** to enable:

- ✅ **Anonymous Profiles**: Freelancers stay completely anonymous
- ✅ **Verifiable Proofs**: Clients see verified skills and experience, not identity
- ✅ **On-Chain Privacy**: All data encrypted on-chain, no central database
- ✅ **Bias-Free Hiring**: Decisions based purely on verified capability
- ✅ **Secure Escrow**: Payments locked in smart contracts

---

## 💡 Why GhostLance?

### For Freelancers 🧑‍💻

**Get hired based on what you can do, not who you are.**

- 🔐 **Complete Anonymity**: Your identity never leaves your wallet
- ✅ **Prove Your Skills**: Generate ZK proofs for your capabilities
- 💰 **Secure Payments**: Payments locked in escrow, released on approval
- 📈 **Private Reputation**: Build reputation without revealing identity
- 🌍 **No Geographic Bias**: Work from anywhere, no location discrimination

### For Clients 🧑‍💼

**Find the best talent, not the most visible.**

- 🔍 **Verified Proofs**: See real, verifiable proofs of skills and experience
- ⚡ **No Fake Resumes**: ZK proofs can't be faked or manipulated
- 💼 **Fair Comparison**: Compare candidates based purely on capability
- 🔒 **Secure Escrow**: Funds locked until work is approved
- 🌟 **Better Talent Pool**: Access global talent without geographic bias

---

## 🚀 How It Works

### The GhostLance Flow

```
┌─────────────────────────────────────────────────────────┐
│                    USER JOURNEY                         │
└─────────────────────────────────────────────────────────┘

FREELANCER FLOW:
1. Connect Aleo Wallet (Puzzle Wallet)
2. Create Private Profile (localStorage - off-chain)
3. Generate ZK Proofs (on-chain)
   └─> Skill Proofs: Prove specific skills at certain levels
   └─> Experience Proofs: Prove minimum jobs/experience
4. Browse Jobs (on-chain + MongoDB metadata)
5. Apply Anonymously (on-chain)
   └─> Application includes: proofs, encrypted bid, encrypted proposal
6. Get Hired (on-chain)
7. Complete Work (upload files to IPFS via Pinata)
8. Get Paid (on-chain escrow release)

CLIENT FLOW:
1. Connect Aleo Wallet
2. Post Job (on-chain + MongoDB metadata)
   └─> Set proof requirements (skills, experience)
3. Receive Anonymous Applications (on-chain)
4. Compare Candidates (proof-based, no identity)
5. Hire Freelancer (on-chain)
6. Lock Payment in Escrow (on-chain)
7. Review Work (IPFS files)
8. Approve & Release Payment (on-chain)
```

### Zero-Knowledge Proofs Explained

**What is a Zero-Knowledge Proof?**

A ZK proof allows you to prove you have certain credentials (e.g., "I have 10+ years of React experience") **without revealing your identity** or the underlying data.

**In GhostLance:**

1. **Skill Proof**: Proves you have a skill at a certain level
   - Example: "I know React at expert level"
   - Client sees: ✅ Expert React Developer
   - Client doesn't see: Your name, location, or other personal info

2. **Experience Proof**: Proves minimum experience requirements
   - Example: "I've completed 50+ jobs with 95% on-time delivery"
   - Client sees: ✅ 50+ jobs, 95% delivery rate
   - Client doesn't see: Which jobs, when, or who you worked for

### Privacy vs. Verification

**What is Public (On-Chain):**
- ✅ Job listings (encrypted titles/descriptions)
- ✅ Proof verifications (skill levels, experience stats)
- ✅ Escrow status (locked/released/disputed)
- ✅ Reputation stats (delivery rate, total jobs)

**What is Private (Never Revealed):**
- ❌ Freelancer identity (name, email, location)
- ❌ Personal details (age, gender, photo)
- ❌ Full profile data (stored encrypted or in localStorage)
- ❌ Bid amounts (encrypted)
- ❌ Proposal text (encrypted)

---

## ✨ Key Features

### 🔐 Privacy Features

- **Anonymous Profiles**: No personal information required
- **Encrypted Data**: All sensitive data encrypted on-chain
- **Zero-Knowledge Proofs**: Prove credentials without revealing identity
- **Private Reputation**: Build reputation privately
- **No Central Database**: Decentralized storage, no data breaches

### ✅ Verification Features

- **ZK Skill Proofs**: Verifiable proof of skills and expertise
- **ZK Experience Proofs**: Verifiable proof of experience and track record
- **Reputation Tracking**: On-chain delivery rate and completion stats
- **Proof Verification**: Clients can verify proofs before hiring

### 💰 Payment Features

- **On-Chain Escrow**: Payments locked in smart contracts
- **Automatic Release**: Payment released on approval
- **Dispute Resolution**: On-chain dispute handling
- **Refund Mechanism**: Funds returned if work not approved

### 🌐 Platform Features

- **Decentralized**: Built on Aleo blockchain
- **No Central Authority**: No company controlling the platform
- **IPFS Storage**: Files stored on IPFS (Pinata)
- **MongoDB Metadata**: Job metadata stored off-chain for efficiency
- **Wallet Integration**: Puzzle Wallet SDK for seamless connections

---

## 🎯 Use Cases

### 1. Freelancers from Developing Countries

**Problem**: Geographic bias prevents talented freelancers from getting hired.

**GhostLance Solution**: Anonymity removes geographic bias. Clients see verified skills, not location.

### 2. Underrepresented Groups

**Problem**: Gender, age, or other identity-based discrimination.

**GhostLance Solution**: Complete anonymity ensures hiring is based purely on capability.

### 3. Confidential Projects

**Problem**: Clients need contractors but can't risk identity exposure.

**GhostLance Solution**: Both parties stay anonymous throughout the project.

### 4. High-Stakes Projects

**Problem**: Need verified skills but want to protect privacy.

**GhostLance Solution**: ZK proofs verify credentials without identity disclosure.

### 5. Global Talent Pool

**Problem**: Limited access to global talent due to platform restrictions.

**GhostLance Solution**: Decentralized platform accessible from anywhere, no geographic restrictions.

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│  Next.js 14 + TypeScript + Tailwind CSS                │
│  └─> Wallet Integration (Puzzle Wallet SDK)            │
│  └─> UI/UX (Responsive, Modern Design)                 │
└─────────────────────────────────────────────────────────┘
                        │
                        │ Contract Calls
                        │
┌─────────────────────────────────────────────────────────┐
│                  ALEO BLOCKCHAIN                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Proof Gen    │  │ Job Market   │  │ Escrow       │ │
│  │ Contract     │  │ Contract     │  │ Contract     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐                                      │
│  │ Reputation   │                                      │
│  │ Contract     │                                      │
│  └──────────────┘                                      │
└─────────────────────────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
┌───────────────────┐         ┌───────────────────┐
│   MONGODB ATLAS   │         │   PINATA IPFS     │
│  (Job Metadata)   │         │  (File Storage)   │
└───────────────────┘         └───────────────────┘
```

### Smart Contracts (Leo 3.4.0)

**1. Proof Generator (`proof_generator_ghostlance_7832.aleo`)**
- Generates ZK proofs for skills
- Generates ZK proofs for experience
- Verifies proof validity
- Stores proof metadata on-chain

**2. Job Market (`job_market_ghostlance_9124.aleo`)**
- Creates jobs with proof requirements
- Accepts anonymous applications
- Manages application status
- Handles hiring process

**3. Escrow (`escrow_ghostlance_3456.aleo`)**
- Locks payments in escrow
- Releases payments on approval
- Handles disputes
- Manages refunds

**4. Reputation (`reputation_ghostlance_6789.aleo`)**
- Tracks delivery rates
- Updates on-time delivery stats
- Maintains private reputation scores
- Calculates completion rates

**5. Profile Registry** (Hardcoded using localStorage)
- Stores user profiles (off-chain)
- Manages skills and experience data
- Note: Originally on-chain, now using localStorage for compatibility

### Data Flow

**Job Creation:**
```
Client → Frontend → MongoDB (metadata) → Aleo (on-chain job ID)
```

**Job Application:**
```
Freelancer → Frontend → Aleo (on-chain application) → MongoDB (metadata)
```

**Proof Generation:**
```
Freelancer → Frontend → Aleo (on-chain proof) → Verification
```

**File Upload:**
```
Freelancer → Frontend → Pinata API → IPFS → Hash stored on-chain
```

**Payment:**
```
Client → Aleo Escrow (lock) → Work Completion → Aleo Escrow (release)
```

---

## 🛠️ Tech Stack

### Blockchain & Smart Contracts

- **Aleo Blockchain**: Layer-1 blockchain with programmable privacy
- **Leo 3.4.0**: Smart contract language for Aleo
- **Zero-Knowledge Proofs**: Cryptography for privacy-preserving verification
- **Puzzle Wallet**: Wallet for Aleo blockchain

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Puzzle Wallet SDK**: Wallet integration library

### Backend & Storage

- **MongoDB Atlas**: Cloud database for job metadata
- **Pinata**: IPFS pinning service for file storage
- **Node.js**: Runtime environment

### Development Tools

- **Leo CLI 3.4.0**: Smart contract development
- **Git**: Version control
- **WSL**: Windows Subsystem for Linux (for deployment)

---

## 🚀 Getting Started

### Prerequisites

1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **Leo CLI 3.4.0** - [Installation Guide](https://developer.aleo.org/getting_started/installation)
3. **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/cloud/atlas)
4. **Pinata Account** - [Sign Up](https://pinata.cloud)
5. **Puzzle Wallet Extension** - [Install](https://puzzle.online)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd GhostLance
```

#### 2. Set Up Smart Contracts

```bash
# Navigate to each contract directory and build
cd contracts/proof_generator_ghostlance_7832
leo build

cd ../job_market_ghostlance_9124
leo build

cd ../escrow_ghostlance_3456
leo build

cd ../reputation_ghostlance_6789
leo build
```

#### 3. Set Up Frontend

```bash
cd frontend
npm install
```

#### 4. Configure Environment Variables

Create `frontend/.env.local`:

```env
# Aleo Network Configuration
NEXT_PUBLIC_ALEO_NETWORK=testnet
NEXT_PUBLIC_ALEO_RPC_URL=https://api.explorer.aleo.org/v1

# Puzzle Wallet Configuration
NEXT_PUBLIC_PUZZLE_WALLET_URL=https://puzzle.online

# Pinata/IPFS Configuration
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret_key
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Program IDs (Update after deployment)
NEXT_PUBLIC_PROOF_PROGRAM_ID=proof_generator_ghostlance_7832.aleo
NEXT_PUBLIC_JOB_MARKET_PROGRAM_ID=job_market_ghostlance_9124.aleo
NEXT_PUBLIC_ESCROW_PROGRAM_ID=escrow_ghostlance_3456.aleo
NEXT_PUBLIC_REPUTATION_PROGRAM_ID=reputation_ghostlance_6789.aleo
```

#### 5. Run Development Server

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to view the application.

---

## 📦 Deployment

### Deploy Smart Contracts

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

Quick deployment using WSL:

```bash
# In WSL
cd /mnt/c/Users/parth/Desktop/GhostLance
./deploy_one_by_one.sh
```

Or deploy manually:

```bash
cd contracts/proof_generator_ghostlance_7832
leo build
leo deploy --private-key $PRIVATE_KEY \
  --network testnet \
  --endpoint https://api.explorer.aleo.org/v1 \
  --broadcast \
  --yes
```

### Deploy Frontend

#### Option 1: Vercel (Recommended)

```bash
cd frontend
vercel deploy
```

#### Option 2: Build Locally

```bash
cd frontend
npm run build
npm start
```

#### Option 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 📚 Documentation

### Project Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Comprehensive deployment guide
- **[MISTAKES.md](MISTAKES.md)** - Common mistakes and how to avoid them
- **[FRONTEND_COMPLETE.md](FRONTEND_COMPLETE.md)** - Frontend setup guide
- **[CONTRACT_FIXES_SUMMARY.md](CONTRACT_FIXES_SUMMARY.md)** - Contract fixes and syntax corrections

### External Resources

- **[Aleo Documentation](https://developer.aleo.org)** - Official Aleo docs
- **[Leo Language Guide](https://docs.leo-lang.org)** - Leo programming language
- **[Puzzle Wallet](https://puzzle.online)** - Wallet documentation
- **[Pinata Docs](https://docs.pinata.cloud)** - IPFS pinning service

---

## 🎨 Features in Detail

### For Freelancers

#### Profile Management
- Create anonymous profile with skills
- Add experience details
- Generate ZK proofs for skills
- Generate ZK proofs for experience
- Update profile without revealing identity

#### Job Management
- Browse all available jobs
- Filter by proof requirements
- Apply anonymously with encrypted proposals
- Track application status
- View hired jobs in workspace

#### Work & Payments
- Upload work files to IPFS
- Track escrow status
- Receive payments automatically
- Manage disputes
- Update reputation privately

### For Clients

#### Job Posting
- Create jobs with proof requirements
- Set budget and deadline
- Require specific skill proofs
- Require minimum experience proofs
- Encrypt job details for privacy

#### Applicant Management
- View anonymous applications
- Compare candidates by proofs
- See verified skills and experience
- No access to personal information
- Hire based purely on capability

#### Payment Management
- Lock payments in escrow
- Review work before approval
- Release payments automatically
- Handle disputes if needed
- Track payment history

---

## 🔍 How It All Works Together

### 1. Profile Creation

**Freelancer:**
1. Connects Puzzle Wallet
2. Fills profile form (skills, experience)
3. Data stored in localStorage (off-chain)
4. Generates ZK proofs (on-chain)
5. Proofs stored in Proof Generator contract

**What Happens:**
- Profile data: Stored in browser localStorage (private)
- Skill proofs: Generated and stored on-chain
- Experience proofs: Generated and stored on-chain
- Identity: Never stored or revealed

### 2. Job Posting

**Client:**
1. Connects Puzzle Wallet
2. Fills job form (title, description, budget, requirements)
3. Sets required proof types (skills, experience)
4. Job created on-chain and in MongoDB

**What Happens:**
- Job metadata: Stored in MongoDB (for fast queries)
- Job record: Created on-chain in Job Market contract
- Proof requirements: Encrypted on-chain
- Client identity: Visible only to contract

### 3. Job Application

**Freelancer:**
1. Browses jobs from MongoDB/on-chain
2. Selects job to apply
3. Submits encrypted proposal
4. Includes relevant proofs
5. Application created on-chain

**What Happens:**
- Application: Created on-chain in Job Market contract
- Proposal: Encrypted and stored on-chain
- Proofs: Linked from Proof Generator contract
- Freelancer identity: Never revealed to client

### 4. Hiring Process

**Client:**
1. Views anonymous applications
2. Compares candidates by proofs
3. Selects freelancer (only sees proofs, not identity)
4. Hires via on-chain transaction

**What Happens:**
- Hiring: Recorded on-chain in Job Market contract
- Escrow: Automatically created in Escrow contract
- Payment: Locked in escrow
- Identity: Freelancer identity still unknown to client

### 5. Work Completion

**Freelancer:**
1. Completes work
2. Uploads files to Pinata (IPFS)
3. Submits work with IPFS hash
4. Client reviews work

**What Happens:**
- Files: Uploaded to IPFS via Pinata
- Hash: Stored on-chain or in MongoDB
- Work: Accessible via IPFS gateway
- Files: Encrypted and private

### 6. Payment Release

**Client:**
1. Reviews work via IPFS
2. Approves work
3. Releases payment from escrow

**What Happens:**
- Escrow: Updated on-chain (status: released)
- Payment: Transferred to freelancer
- Reputation: Updated in Reputation contract
- Transaction: Recorded permanently on-chain

---

## 🎯 Use Cases & Benefits

### Real-World Scenarios

#### Scenario 1: Developer from Developing Country

**Problem**: Highly skilled developer from a developing country struggles to get hired due to geographic bias.

**GhostLance Solution**: 
- Developer creates anonymous profile
- Generates ZK proofs for React, TypeScript, Node.js expertise
- Applies to jobs anonymously
- Gets hired based on verified skills, not location
- Earns fair wages without geographic discrimination

#### Scenario 2: Female Developer in Tech

**Problem**: Female developer faces gender bias in traditional platforms.

**GhostLance Solution**:
- Creates anonymous profile (no gender visible)
- Generates proofs for technical skills
- Gets hired purely on capability
- No gender-based discrimination possible

#### Scenario 3: Experienced Freelancer Wanting Privacy

**Problem**: Veteran freelancer wants to work but protect their identity.

**GhostLance Solution**:
- Maintains complete anonymity
- Proves 20+ years experience via ZK proofs
- Gets hired based on track record, not identity
- Protects privacy throughout career

---

## 🔐 Security & Privacy

### Privacy Guarantees

1. **Zero Identity Leaks**: Identity never stored on-chain or in databases
2. **Encrypted Communications**: All sensitive data encrypted
3. **ZK Proof Verification**: Prove credentials without revealing data
4. **Decentralized Storage**: No central database to breach
5. **Wallet-Based Auth**: No email or password required

### Security Features

1. **Smart Contract Escrow**: Payments locked in code, not promises
2. **On-Chain Verification**: Proofs verified cryptographically
3. **IPFS Storage**: Files stored on distributed network
4. **Wallet Security**: Protected by Aleo wallet encryption
5. **No Central Authority**: No single point of failure

---

## 📊 Project Statistics

- **Smart Contracts**: 4 on-chain contracts
- **Total Lines of Code**: ~2000+ (Leo + TypeScript)
- **Pages**: 15+ pages
- **API Routes**: 6 API endpoints
- **Features**: 20+ features
- **Privacy Level**: 100% anonymous

---

## 🤝 Contributing

This is a hackathon project built for the Aleo Privacy Buildathon. Contributions are welcome!

### Areas for Improvement

- [ ] Implement fully on-chain profile registry
- [ ] Add more proof types (education, certifications)
- [ ] Enhance UI/UX
- [ ] Add more payment options
- [ ] Implement advanced dispute resolution
- [ ] Add notification system
- [ ] Implement rating system (private)
- [ ] Add multi-language support

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Aleo Team** - For building an amazing privacy-preserving blockchain
- **Puzzle Wallet** - For seamless wallet integration
- **Pinata** - For IPFS storage solutions
- **MongoDB** - For flexible database hosting

---

## 🚀 Quick Links

- **Live Demo**: (Add your deployment URL here)
- **Documentation**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Smart Contracts**: `contracts/` directory
- **Frontend**: `frontend/` directory
- **Environment Setup**: See [FRONTEND_COMPLETE.md](FRONTEND_COMPLETE.md)

---

**Built with ❤️ on Aleo | Privacy by Design | Zero-Knowledge Proofs**

---

<div align="center">

### 👻 **GhostLance** - Work Without Bias. Hire Based on Proof.

[Get Started](#getting-started) • [Documentation](#documentation) • [Deploy](#deployment)

</div>
