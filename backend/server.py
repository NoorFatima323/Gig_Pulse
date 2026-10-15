"""
GigPulse Autonomous Treasury & Agent REST API Server
====================================================
FastAPI production application exposing endpoints for cash runway simulation,
autonomous payment chaser recovery, and machine learning credit underwriting.
"""

from typing import Dict, List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .agents.chaser_autopilot import (
    ChaserAutopilotAgent,
    ChaserTone,
    DispatchChannel,
    InvoiceRecoveryPayload,
)
from .ml.credit_underwriting import (
    ClientCreditProfile,
    CreditScorecardModel,
    UnderwritingRecommendation,
)

app = FastAPI(
    title="GigPulse Autonomous Financial OS - Core API",
    description="High-performance backend for predictive cash runway forecasting, autonomous payment chaser sentinel, and counterparty credit scoring.",
    version="1.0.0",
)

# Enable CORS for local and cloud dashboard interfaces
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Agent and ML model singletons
chaser_agent = ChaserAutopilotAgent(studio_name="Apex Creative Labs", founder_name="Zain Malik")
credit_model = CreditScorecardModel()


# -----------------------------------------------------------------------------
# Pydantic Request / Response Models
# -----------------------------------------------------------------------------
class RunwaySimulationRequest(BaseModel):
    current_cash_balance: float = Field(..., example=14850.0)
    monthly_burn_rate: float = Field(..., example=3500.0)
    expected_receivables_30d: float = Field(default=8400.0)
    client_delay_scenario_days: int = Field(default=0, example=15)
    tax_reserve_rate: float = Field(default=0.25, example=0.25)


class RunwaySimulationResponse(BaseModel):
    survival_runway_days: int
    unsecured_runway_days: int
    monthly_net_burn: float
    tax_vault_locked_amount: float
    safety_buffer_status: str
    percentiles: Dict[str, int]


class DispatchRequest(BaseModel):
    invoice_id: str
    client_name: str
    client_email: str
    amount_due: float
    days_overdue: int
    milestone_name: Optional[str] = "Milestone Deliverable"
    channel: DispatchChannel = DispatchChannel.EMAIL
    forced_tone: Optional[ChaserTone] = None


# -----------------------------------------------------------------------------
# Endpoints
# -----------------------------------------------------------------------------
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "GigPulse Autonomous Financial Engine",
        "version": "1.0.0",
        "sentinel_status": "active_monitoring",
    }


@app.post("/api/runway/simulate", response_model=RunwaySimulationResponse)
def simulate_cash_runway(req: RunwaySimulationRequest):
    """Calculates survival runway days under burn rates and delayed receivable shocks."""
    tax_locked = req.current_cash_balance * req.tax_reserve_rate
    effective_cash = max(0.0, req.current_cash_balance - tax_locked)

    daily_burn = req.monthly_burn_rate / 30.0
    if daily_burn <= 0:
        daily_burn = 100.0

    # Base runway from current cash
    base_runway_days = int(effective_cash / daily_burn)

    # Adjust for receivables with scenario delay penalties
    discount_factor = max(0.4, 1.0 - (req.client_delay_scenario_days * 0.02))
    effective_receivables = req.expected_receivables_30d * discount_factor
    projected_total_runway = base_runway_days + int(effective_receivables / daily_burn)

    # Status classification
    if projected_total_runway >= 90:
        buffer_status = "OPTIMAL_FORTRESS"
    elif projected_total_runway >= 60:
        buffer_status = "STABLE"
    else:
        buffer_status = "CRITICAL_RUNWAY_DEFICIT"

    return RunwaySimulationResponse(
        survival_runway_days=projected_total_runway,
        unsecured_runway_days=base_runway_days,
        monthly_net_burn=req.monthly_burn_rate,
        tax_vault_locked_amount=round(tax_locked, 2),
        safety_buffer_status=buffer_status,
        percentiles={
            "p10_conservative_days": max(15, projected_total_runway - 22),
            "p50_expected_days": projected_total_runway,
            "p90_accelerated_days": projected_total_runway + 35,
        },
    )


@app.post("/api/chaser/dispatch")
def trigger_chaser_dispatch(req: DispatchRequest):
    """Triggers the autonomous chaser sentinel to recover overdue receivables."""
    payload = InvoiceRecoveryPayload(
        invoice_id=req.invoice_id,
        client_name=req.client_name,
        client_email=req.client_email,
        amount_due=req.amount_due,
        days_overdue=req.days_overdue,
        milestone_name=req.milestone_name or "Milestone Deliverable",
    )

    result = chaser_agent.dispatch_autonomous_recovery(payload, channel=req.channel)
    return {
        "status": "dispatched",
        "dispatch_id": result.dispatch_id,
        "tone": result.tone,
        "channel": result.channel,
        "recovery_probability": result.recovery_probability,
        "escalation_action": result.escalation_next_action,
        "preview_subject": result.subject,
        "timestamp": result.timestamp,
    }


@app.post("/api/credit/scorecard", response_model=UnderwritingRecommendation)
def evaluate_client_credit(profile: ClientCreditProfile):
    """Predicts counterparty credit grade and required escrow structure."""
    return credit_model.evaluate_credit(profile)


# -----------------------------------------------------------------------------
# Static Frontend UI Serving
# -----------------------------------------------------------------------------
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
if os.path.exists(frontend_path):
    app.mount("/frontend", StaticFiles(directory=frontend_path, html=True), name="frontend")
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_path, "assets")), name="assets")

    @app.get("/")
    def serve_frontend_root():
        index_file = os.path.join(frontend_path, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"status": "online", "message": "GigPulse Autonomous Financial Engine"}

