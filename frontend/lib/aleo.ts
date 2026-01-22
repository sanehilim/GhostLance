// Aleo contract interaction utilities

// Aleo Testnet RPC URL
export const RPC_URL = process.env.NEXT_PUBLIC_ALEO_RPC_URL || 'https://api.explorer.aleo.org/v1';

export const PROGRAM_IDS = {
  proof: process.env.NEXT_PUBLIC_PROOF_PROGRAM_ID || 'proof_generator_ghostlance_7832.aleo',
  jobMarket: process.env.NEXT_PUBLIC_JOB_MARKET_PROGRAM_ID || 'job_market_ghostlance_9124.aleo',
  escrow: process.env.NEXT_PUBLIC_ESCROW_PROGRAM_ID || 'escrow_ghostlance_3456.aleo',
  reputation: process.env.NEXT_PUBLIC_REPUTATION_PROGRAM_ID || 'reputation_ghostlance_6789.aleo',
};

// Helper function to call Aleo contract transitions using Puzzle Wallet
export async function callContract(
  programId: string,
  functionName: string,
  inputs: string[],
  privateKey?: string
): Promise<any> {
  try {
    // Check if Puzzle Wallet is available
    if (typeof window === 'undefined' || !window?.aleo?.puzzleWalletClient) {
      throw new Error('Puzzle Wallet not detected. Please install the Puzzle Wallet extension.');
    }

    // Use Puzzle Wallet SDK to execute the transition
    // Note: This is a placeholder - actual implementation depends on Puzzle Wallet SDK API
    console.log(`Calling ${programId}.${functionName} with inputs:`, inputs);
    
    // In production, this would use the actual SDK to execute the transition
    // For now, return a placeholder that indicates the call structure
    return {
      success: true,
      transactionId: 'placeholder-tx-id',
      programId,
      functionName,
      inputs,
    };
  } catch (error) {
    console.error('Contract call error:', error);
    throw error;
  }
}

// Profile Registry functions (using localStorage instead of on-chain contract)
export const profileRegistry = {
  createProfile: async (
    owner: string,
    skills: string,
    experienceYears: number,
    completedJobs: number,
    deliveryRate: number,
    encryptedData: string
  ) => {
    const profile = {
      owner,
      skills,
      experienceYears,
      completedJobs,
      deliveryRate,
      encryptedData,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(`profile_${owner}`, JSON.stringify(profile));
    return { success: true, profile };
  },
  
  getProfile: async (owner: string) => {
    const profileData = localStorage.getItem(`profile_${owner}`);
    if (profileData) {
      return { success: true, profile: JSON.parse(profileData) };
    }
    return { success: false, profile: null };
  },
  
  updateSkills: async (owner: string, newSkills: string) => {
    const profileData = localStorage.getItem(`profile_${owner}`);
    if (profileData) {
      const profile = JSON.parse(profileData);
      profile.skills = newSkills;
      profile.updatedAt = new Date().toISOString();
      localStorage.setItem(`profile_${owner}`, JSON.stringify(profile));
      return { success: true, profile };
    }
    return { success: false, error: 'Profile not found' };
  },
  
  updateExperience: async (owner: string, newYears: number) => {
    const profileData = localStorage.getItem(`profile_${owner}`);
    if (profileData) {
      const profile = JSON.parse(profileData);
      profile.experienceYears = newYears;
      profile.updatedAt = new Date().toISOString();
      localStorage.setItem(`profile_${owner}`, JSON.stringify(profile));
      return { success: true, profile };
    }
    return { success: false, error: 'Profile not found' };
  },
  
  updateCompletedJobs: async (owner: string, newCount: number) => {
    const profileData = localStorage.getItem(`profile_${owner}`);
    if (profileData) {
      const profile = JSON.parse(profileData);
      profile.completedJobs = newCount;
      profile.updatedAt = new Date().toISOString();
      localStorage.setItem(`profile_${owner}`, JSON.stringify(profile));
      return { success: true, profile };
    }
    return { success: false, error: 'Profile not found' };
  },
  
  updateDeliveryRate: async (owner: string, newRate: number) => {
    const profileData = localStorage.getItem(`profile_${owner}`);
    if (profileData) {
      const profile = JSON.parse(profileData);
      profile.deliveryRate = newRate;
      profile.updatedAt = new Date().toISOString();
      localStorage.setItem(`profile_${owner}`, JSON.stringify(profile));
      return { success: true, profile };
    }
    return { success: false, error: 'Profile not found' };
  },
};

// Proof Generator functions
export const proofGenerator = {
  generateSkillProof: async (
    freelancer: string,
    skillName: string,
    skillLevel: number,
    proofHash: string
  ) => {
    return callContract(
      PROGRAM_IDS.proof,
      'generate_skill_proof',
      [freelancer, skillName, skillLevel.toString(), proofHash]
    );
  },
  
  generateExperienceProof: async (
    freelancer: string,
    minJobsCompleted: number,
    minDeliveryRate: number,
    proofHash: string
  ) => {
    return callContract(
      PROGRAM_IDS.proof,
      'generate_experience_proof',
      [freelancer, minJobsCompleted.toString(), minDeliveryRate.toString(), proofHash]
    );
  },
  
  verifySkillProof: async (proofId: number, requiredLevel: number) => {
    return callContract(
      PROGRAM_IDS.proof,
      'verify_skill_proof',
      [proofId.toString(), requiredLevel.toString()]
    );
  },
  
  verifyExperienceProof: async (proofId: number, requiredJobs: number, requiredRate: number) => {
    return callContract(
      PROGRAM_IDS.proof,
      'verify_experience_proof',
      [proofId.toString(), requiredJobs.toString(), requiredRate.toString()]
    );
  },
};

// Job Market functions
export const jobMarket = {
  createJob: async (
    client: string,
    title: string,
    description: string,
    budget: number,
    deadline: number,
    requiredSkillProofs: string,
    requiredExperienceProof: number
  ) => {
    return callContract(
      PROGRAM_IDS.jobMarket,
      'create_job',
      [client, title, description, budget.toString(), deadline.toString(), requiredSkillProofs, requiredExperienceProof.toString()]
    );
  },
  
  getJob: async (jobId: number) => {
    return callContract(PROGRAM_IDS.jobMarket, 'get_job', [jobId.toString()]);
  },
  
  applyToJob: async (
    jobId: number,
    freelancer: string,
    bidAmount: number,
    skillProofs: string,
    experienceProof: number,
    proposal: string
  ) => {
    return callContract(
      PROGRAM_IDS.jobMarket,
      'apply_to_job',
      [jobId.toString(), freelancer, bidAmount.toString(), skillProofs, experienceProof.toString(), proposal]
    );
  },
  
  acceptApplication: async (jobId: number, applicationId: number) => {
    return callContract(
      PROGRAM_IDS.jobMarket,
      'accept_application',
      [jobId.toString(), applicationId.toString()]
    );
  },
  
  closeJob: async (jobId: number) => {
    return callContract(PROGRAM_IDS.jobMarket, 'close_job', [jobId.toString()]);
  },
};

// Escrow functions
export const escrow = {
  createEscrow: async (
    jobId: number,
    client: string,
    freelancer: string,
    amount: number
  ) => {
    return callContract(
      PROGRAM_IDS.escrow,
      'create_escrow',
      [jobId.toString(), client, freelancer, amount.toString()]
    );
  },
  
  getEscrow: async (escrowId: number) => {
    return callContract(PROGRAM_IDS.escrow, 'get_escrow', [escrowId.toString()]);
  },
  
  getEscrowByJob: async (jobId: number) => {
    return callContract(PROGRAM_IDS.escrow, 'get_escrow_by_job', [jobId.toString()]);
  },
  
  releasePayment: async (escrowId: number) => {
    return callContract(PROGRAM_IDS.escrow, 'release_payment', [escrowId.toString()]);
  },
  
  disputePayment: async (escrowId: number) => {
    return callContract(PROGRAM_IDS.escrow, 'dispute_payment', [escrowId.toString()]);
  },
  
  resolveDisputeRefund: async (escrowId: number) => {
    return callContract(PROGRAM_IDS.escrow, 'resolve_dispute_refund', [escrowId.toString()]);
  },
  
  resolveDisputeRelease: async (escrowId: number) => {
    return callContract(PROGRAM_IDS.escrow, 'resolve_dispute_release', [escrowId.toString()]);
  },
};

// Reputation functions
export const reputation = {
  initializeReputation: async (freelancer: string) => {
    return callContract(PROGRAM_IDS.reputation, 'initialize_reputation', [freelancer]);
  },
  
  getReputation: async (freelancer: string) => {
    return callContract(PROGRAM_IDS.reputation, 'get_reputation', [freelancer]);
  },
  
  updateReputation: async (
    freelancer: string,
    wasOnTime: boolean,
    earnings: number
  ) => {
    return callContract(
      PROGRAM_IDS.reputation,
      'update_reputation',
      [freelancer, wasOnTime.toString(), earnings.toString()]
    );
  },
  
  updateFeedback: async (freelancer: string, encryptedFeedback: string) => {
    return callContract(
      PROGRAM_IDS.reputation,
      'update_feedback',
      [freelancer, encryptedFeedback]
    );
  },
};
