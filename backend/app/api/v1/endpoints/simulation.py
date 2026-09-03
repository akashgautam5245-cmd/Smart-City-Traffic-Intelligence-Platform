from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import SimulationRunRequest, SimulationRunResponse
from app.services.digital_twin_engine import digital_twin_engine

router = APIRouter()

@router.post("/run", response_model=SimulationRunResponse)
def run_simulation_benchmark(payload: SimulationRunRequest, db: Session = Depends(get_db)):
    res = digital_twin_engine.run_benchmark_simulation(db, payload.scenario)
    return {
        "run_id": res["run_id"], "scenario": res["scenario"],
        "fixed_signal_metrics": res["fixed_signal_scenario"], "ai_signal_metrics": res["ai_signal_scenario"],
        "improvements": res["improvements"], "timestamp": "2026-09-04T02:20:00Z"
    }
