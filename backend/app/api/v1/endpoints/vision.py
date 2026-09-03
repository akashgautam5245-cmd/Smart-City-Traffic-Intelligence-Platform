from fastapi import APIRouter, Query
from app.schemas.schemas import VisionFrameResponse
from app.services.vision_engine import vision_engine

router = APIRouter()

@router.get("/frame-metadata", response_model=VisionFrameResponse)
def get_live_frame_metadata(camera_id: str = Query("CAM-IND-12")):
    return vision_engine.process_frame_metadata(camera_id)
