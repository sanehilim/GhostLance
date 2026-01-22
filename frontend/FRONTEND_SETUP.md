# Frontend Setup and Deployment Guide

## Environment Variables

Create `.env.local` in the `frontend` directory with your credentials. See `ENV_SETUP.md` for details.

**Required Environment Variables:**
- `NEXT_PUBLIC_ALEO_RPC_URL` - Aleo RPC endpoint (default: https://api.explorer.aleo.org/v1)
- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_PINATA_API_KEY` - Pinata API key
- `NEXT_PUBLIC_PINATA_SECRET_API_KEY` - Pinata secret key
- `NEXT_PUBLIC_PINATA_GATEWAY` - Pinata gateway URL
- `NEXT_PUBLIC_PROOF_PROGRAM_ID` - Deployed proof generator program ID
- `NEXT_PUBLIC_JOB_MARKET_PROGRAM_ID` - Deployed job market program ID
- `NEXT_PUBLIC_ESCROW_PROGRAM_ID` - Deployed escrow program ID
- `NEXT_PUBLIC_REPUTATION_PROGRAM_ID` - Deployed reputation program ID

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Production Build

```bash
npm run build
npm start
```

## Features

### On-Chain Contracts (4 contracts)
1. **Proof Generator** - ZK proof generation for skills and experience
2. **Job Market** - Job creation, applications, and hiring
3. **Escrow** - Payment locking, release, and dispute resolution
4. **Reputation** - Private reputation tracking

### Hardcoded Features (localStorage)
- **Profile Registry** - User profiles stored in localStorage (off-chain)

## Pages

- `/` - Homepage
- `/auth` - Wallet connection and role selection
- `/freelancer/dashboard` - Freelancer dashboard
- `/freelancer/profile` - Profile management
- `/freelancer/jobs` - Browse jobs
- `/freelancer/workspace/[id]` - Job workspace
- `/client/dashboard` - Client dashboard
- `/client/post-job` - Post new job
- `/client/jobs` - View posted jobs
- `/client/applicants/[id]` - View applicants
- `/job/[id]` - View job details
- `/escrow/[id]` - Escrow management
- `/mining` - Mining dashboard
- `/test` - Contract connection testing
- `/settings` - User settings

## API Routes

- `/api/jobs` - Job CRUD operations (MongoDB)
- `/api/jobs/[id]` - Individual job operations
- `/api/applications` - Application management (MongoDB)
- `/api/applications/[id]` - Individual application operations
- `/api/pinata` - File upload to IPFS
- `/api/test-contracts` - Test contract accessibility

## Contract Integration

The frontend uses Puzzle Wallet SDK to interact with Aleo contracts:
- Wallet connection via `@puzzlehq/sdk-core`
- Contract calls through Puzzle Wallet
- All transactions are on-chain via Aleo Testnet

## MongoDB Collections

- `jobs` - Job metadata
- `applications` - Application data
- `users` - User data (optional)

## Notes

- Profile data is stored in localStorage (off-chain)
- Job metadata is stored in MongoDB (off-chain metadata only)
- All financial and proof data is on-chain via smart contracts
- File uploads use Pinata IPFS storage
