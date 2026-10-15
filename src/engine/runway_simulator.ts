/**
 * GigPulse Cash Runway Stochastic Monte-Carlo Engine
 * =================================================
 * Mathematical simulation of cash survival horizons under volatility,
 * counterparty payment delays, and monthly operational burn decay.
 */

import { RunwaySimulationResult } from '../types/treasury';

export interface RunwaySimulationParams {
  cashBalance: number;
  monthlyBurn: number;
  expectedReceivables: number;
  taxVaultLockPercent?: number; // default: 25%
  delayShockDays?: number;      // default: 0
  stochasticIterations?: number; // default: 1000
}

export class RunwayMonteCarloSimulator {
  /**
   * Runs deterministic and stochastic probabilistic simulations.
   */
  public static simulate(params: RunwaySimulationParams): RunwaySimulationResult {
    const taxRate = (params.taxVaultLockPercent ?? 25) / 100;
    const taxVaultLocked = params.cashBalance * taxRate;
    const usableCash = Math.max(0, params.cashBalance - taxVaultLocked);

    const monthlyBurn = Math.max(100, params.monthlyBurn);
    const dailyBurn = monthlyBurn / 30;

    const baseRunwayDays = Math.floor(usableCash / dailyBurn);

    // Apply delay shock decay curve on receivables
    const delayShock = params.delayShockDays ?? 0;
    const shockDiscount = Math.max(0.35, 1.0 - (delayShock * 0.022));
    const effectiveReceivables = params.expectedReceivables * shockDiscount;

    const projectedRunwayDays = baseRunwayDays + Math.floor(effectiveReceivables / dailyBurn);

    // Run 1,000-iteration Monte Carlo stochastic distribution
    const iterations = params.stochasticIterations ?? 1000;
    const simulatedHorizons: number[] = [];

    for (let i = 0; i < iterations; i++) {
      // Gaussian variance on payment timing (mean: delayShock, stdDev: 8 days)
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1 || 0.001)) * Math.cos(2.0 * Math.PI * u2);
      const simulatedDelay = Math.max(0, delayShock + (z0 * 8));

      // Variance in burn rate (± 12% operational variance)
      const burnVariance = 1.0 + ((Math.random() - 0.5) * 0.24);
      const simDailyBurn = dailyBurn * burnVariance;

      // Variance in collection probability (90% base ± 15%)
      const collectionRate = Math.min(1.0, Math.max(0.4, 0.90 + ((Math.random() - 0.5) * 0.3)));
      const simReceivables = params.expectedReceivables * collectionRate * Math.max(0.3, 1.0 - (simulatedDelay * 0.02));

      const horizon = Math.floor((usableCash + simReceivables) / simDailyBurn);
      simulatedHorizons.push(horizon);
    }

    simulatedHorizons.sort((a, b) => a - b);

    const p10 = simulatedHorizons[Math.floor(iterations * 0.10)];
    const p50 = simulatedHorizons[Math.floor(iterations * 0.50)];
    const p90 = simulatedHorizons[Math.floor(iterations * 0.90)];

    let runwayStatus: RunwaySimulationResult['runwayStatus'] = 'OPTIMAL';
    if (projectedRunwayDays >= 120) {
      runwayStatus = 'FORTRESS';
    } else if (projectedRunwayDays >= 90) {
      runwayStatus = 'OPTIMAL';
    } else if (projectedRunwayDays >= 60) {
      runwayStatus = 'VULNERABLE';
    } else {
      runwayStatus = 'CRITICAL';
    }

    return {
      currentCash: params.cashBalance,
      taxVaultLocked: Math.round(taxVaultLocked * 100) / 100,
      usableCash: Math.round(usableCash * 100) / 100,
      monthlyBurn,
      dailyBurn: Math.round(dailyBurn * 100) / 100,
      baseRunwayDays,
      projectedRunwayDays,
      p10ConservativeDays: p10,
      p50ExpectedDays: p50,
      p90OptimisticDays: p90,
      runwayStatus,
    };
  }
}
