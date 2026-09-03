from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import CopilotQueryRequest, CopilotQueryResponse
from app.services.copilot_engine import copilot_engine

router = APIRouter()

@router.post("/chat", response_model=CopilotQueryResponse)
def chat_with_copilot(payload: CopilotQueryRequest, db: Session = Depends(get_db)):
    return copilot_engine.answer_operator_query(db, payload.query)
