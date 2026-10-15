/**
 * GigPulse Enterprise Treasury & Telemetry Type Definitions
 * ==========================================================
 * Strict TypeScript domain models for cash runways, milestone escrows,
 * counterparty underwriting, and autonomous chaser operations.
 */

export type CurrencyCode =
  | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CHF'
  | 'PKR' | 'INR' | 'AED' | 'SAR' | 'SGD' | 'USDC' | 'USDT';

export type PaymentTerms = 'Net 7' | 'Net 14' | 'Net 30' | 'Due Upon Receipt';

export type ClientRiskGrade = 'A' | 'B' | 'C' | 'D';

export interface MilestoneEscrowItem {
  id: string;
  milestoneTitle: string;
  deliverableScope: string;
  percentageSplit: number; // e.g. 50 for 50%
  amount: number;
  currency: CurrencyCode;
  dueDate: string;
  isEscrowLocked: boolean;
  status: 'pending' | 'funded' | 'released' | 'disputed';
}

export interface TreasuryAccountFeed {
  id: string;
  institutionName: string; // e.g., "Mercury Checking", "Stripe Treasury"
  accountMask: string;     // e.g., "···4891"
  availableBalance: number;
  reservedTaxBalance: number;
  rollingReceivables30d: number;
  monthlyBurnRate: number;
  currency: CurrencyCode;
  lastSyncTimestamp: string;
}

export interface ClientCounterparty {
  id: string;
  companyName: string;
  primaryContact: string;
  billingEmail: string;
  settlementChannel: string; // "Stripe Direct", "Mercury Wire", "Upwork Escrow"
  monthlyRetainerVolume: number;
  paymentTerms: PaymentTerms;
  creditGrade: ClientRiskGrade;
  reliabilityScore: number;  // 0 - 100
  activeContractScope: string;
}

export interface AutonomousChaserConfig {
  autoDispatchEnabled: boolean;
  gentleNudgeThresholdDays: number;   // default: 3
  firmCommercialThresholdDays: number; // default: 14
  formalLegalNoticeThresholdDays: number; // default: 30
  activeChannels: ('email' | 'whatsapp' | 'sms')[];
  safetyHoldForDisputes: boolean;
}

export interface RunwaySimulationResult {
  currentCash: number;
  taxVaultLocked: number;
  usableCash: number;
  monthlyBurn: number;
  dailyBurn: number;
  baseRunwayDays: number;
  projectedRunwayDays: number;
  p10ConservativeDays: number;
  p50ExpectedDays: number;
  p90OptimisticDays: number;
  runwayStatus: 'FORTRESS' | 'OPTIMAL' | 'VULNERABLE' | 'CRITICAL';
}
