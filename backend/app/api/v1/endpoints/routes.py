from fastapi import APIRouter
from app.schemas.schemas import RouteOptimizationRequest
from app.services.route_engine import route_engine

router = APIRouter()

@router.post("/optimize")
def optimize_route(payload: RouteOptimizationRequest):
    return route_engine.optimize_route(origin=payload.origin, destination=payload.destination, origin_lat=payload.origin_lat, origin_lng=payload.origin_lng, dest_lat=payload.dest_lat, dest_lng=payload.dest_lng)
