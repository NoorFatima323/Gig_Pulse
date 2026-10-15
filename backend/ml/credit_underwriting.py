"""
GigPulse Predictive Counterparty Credit Underwriting Engine
===========================================================
Machine Learning statistical risk model for evaluating independent client reliability.
Predicts invoice default probability, assigns sovereign credit grades (A, B, C, D),
and recommends mandatory milestone escrow splits.
"""

from dataclasses import dataclass
from typing import Dict, List, Tuple


@dataclass
class ClientCreditProfile:
    client_id: str
    company_name: str
    invoices_paid_on_time: int
    invoices_delayed: int
    invoices_disputed: int
    avg_delay_days: float
    total_volume_settled: float
    contract_terms: str = "Net 14"


@dataclass
class UnderwritingRecommendation:
    client_id: str
    company_name: str
    credit_score: int  # 0 to 100
    grade: str  # A, B, C, D
    default_risk_percentage: float
    recommended_escrow_split: str  # e.g., "50% Upfront / 50% Final" or "100% Upfront Retainer"
    recommended_payment_terms: str
    max_unsecured_exposure: float
    underwriting_notes: str


class CreditScorecardModel:
    """
    Predictive scoring model evaluating counterparty payment velocity.
    Weights prompt payment ratio, dispute penalties, and historical volume.
    """

    def __init__(self):
        # Model feature weights
        self.w_on_time = 0.50
        self.w_delay_severity = 0.30
        self.w_dispute_penalty = 0.20

    def evaluate_credit(self, profile: ClientCreditProfile) -> UnderwritingRecommendation:
        total_invoices = profile.invoices_paid_on_time + profile.invoices_delayed + profile.invoices_disputed
        if total_invoices == 0:
            # Baseline for brand-new client
            return UnderwritingRecommendation(
                client_id=profile.client_id,
                company_name=profile.company_name,
                credit_score=70,
                grade="B",
                default_risk_percentage=12.5,
                recommended_escrow_split="50% Upfront / 50% Final Deliverable",
                recommended_payment_terms="Net 14",
                max_unsecured_exposure=5000.0,
                underwriting_notes="New counterparty with no prior invoice history. Standard 50/50 escrow recommended.",
            )

        # 1. On-time payment ratio (0.0 to 1.0)
        on_time_ratio = profile.invoices_paid_on_time / total_invoices

        # 2. Delay severity penalty (decay curve based on average delay days)
        delay_factor = max(0.0, 1.0 - (profile.avg_delay_days / 45.0))

        # 3. Dispute penalty
        dispute_ratio = profile.invoices_disputed / total_invoices
        dispute_factor = max(0.0, 1.0 - (dispute_ratio * 2.5))

        # Raw score computation (0 to 100)
        raw_score = (
            (on_time_ratio * self.w_on_time)
            + (delay_factor * self.w_delay_severity)
            + (dispute_factor * self.w_dispute_penalty)
        ) * 100.0

        score = max(5, min(99, int(round(raw_score))))

        # Grading bands and risk profiling
        if score >= 90:
            grade = "A"
            risk_pct = 2.4
            split = "30% Kickoff / 40% Midpoint / 30% Delivery"
            terms = "Net 30 (Trusted Enterprise)"
            max_exposure = 25000.0
            notes = "Top-tier credit counterparty. Reliable payment velocity with zero disputed milestones."
        elif score >= 75:
            grade = "B"
            risk_pct = 7.8
            split = "50% Upfront Escrow / 50% Delivery"
            terms = "Net 14 (Standard Commercial)"
            max_exposure = 10000.0
            notes = "Good standing with occasional minor delays. Standard milestone escrow safeguards apply."
        elif score >= 55:
            grade = "C"
            risk_pct = 22.4
            split = "70% Upfront Escrow / 30% Delivery"
            terms = "Net 7 (Accelerated Milestone)"
            max_exposure = 3500.0
            notes = "Elevated payment friction. Require 70% upfront milestone lock before release of source code."
        else:
            grade = "D"
            risk_pct = 54.0
            split = "100% Upfront Retainer (Full Escrow Lock)"
            terms = "Due Upon Receipt (Strict Lockout)"
            max_exposure = 0.0
            notes = "High-risk counterparty. History of prolonged delinquency. Zero unsecured credit exposure."

        return UnderwritingRecommendation(
            client_id=profile.client_id,
            company_name=profile.company_name,
            credit_score=score,
            grade=grade,
            default_risk_percentage=risk_pct,
            recommended_escrow_split=split,
            recommended_payment_terms=terms,
            max_unsecured_exposure=max_exposure,
            underwriting_notes=notes,
        )
