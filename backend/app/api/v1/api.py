from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, traffic, signals, predictions, vision, incidents, emergency, routes, simulation, data_adapters, ai_copilot, analytics, health, demo
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(traffic.router, prefix="/traffic", tags=["Traffic Management"])
api_router.include_router(signals.router, prefix="/signals", tags=["Signal Optimization"])
api_router.include_router(predictions.router, prefix="/predictions", tags=["Traffic Forecast"])
api_router.include_router(vision.router, prefix="/vision", tags=["Computer Vision"])
api_router.include_router(incidents.router, prefix="/incidents", tags=["Incidents & Anomalies"])
api_router.include_router(emergency.router, prefix="/emergency", tags=["Emergency Priority"])
api_router.include_router(routes.router, prefix="/routes", tags=["Route Optimization"])
api_router.include_router(simulation.router, prefix="/simulation", tags=["SUMO Digital Twin"])
api_router.include_router(data_adapters.router, prefix="/adapters", tags=["Data Ingestion Adapters"])
api_router.include_router(ai_copilot.router, prefix="/copilot", tags=["AI Traffic Cop"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(health.router, prefix="/health", tags=["System Health"])
api_router.include_router(demo.router, prefix="/demo", tags=["Demo Mode"])
