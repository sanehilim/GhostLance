// Type definitions for GhostLance

export type UserRole = 'freelancer' | 'client';

export interface WalletConnection {
  address: string;
  network: string;
  isConnected: boolean;
}

export interface Profile {
  owner: string;
  skills: string[];
  experienceYears: number;
  completedJobs: number;
  deliveryRate: number;
  encryptedData?: string;
}

export interface Job {
  jobId: string;
  client: string;
  title: string;
  description: string;
  budget: number;
  deadline: number;
  requiredSkillProofs: string[];
  requiredExperienceProof?: number;
  status: 'open' | 'filled' | 'closed';
  createdAt: number;
  _id?: string; // MongoDB ID
}

export interface Application {
  applicationId: string;
  jobId: string;
  freelancer: string;
  bidAmount: number;
  skillProofs: string[];
  experienceProof: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: number;
  _id?: string; // MongoDB ID
}

export interface Escrow {
  escrowId: string;
  jobId: string;
  client: string;
  freelancer: string;
  amount: number;
  status: 'locked' | 'released' | 'disputed' | 'refunded';
  createdAt: number;
  releasedAt?: number;
}

export interface Reputation {
  freelancer: string;
  totalJobsCompleted: number;
  onTimeDeliveries: number;
  lateDeliveries: number;
  deliveryRate: number;
  totalEarnings: number;
}

export interface SkillProof {
  proofId: string;
  freelancer: string;
  skillName: string;
  skillLevel: number;
  proofHash: string;
}

export interface ExperienceProof {
  proofId: string;
  freelancer: string;
  minJobsCompleted: number;
  minDeliveryRate: number;
  proofHash: string;
}
