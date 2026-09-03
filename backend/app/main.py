from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base, SessionLocal
from app.api.v1.api import api_router
from app.seed.indore_data import seed_database
from app.core.events import manager

Base.metadata.create_all(bind=engine)

db = SessionLocal()
try: seed_database(db)
finally: db.close()

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION, openapi_url=f"{settings.API_V1_STR}/openapi.json")

app.add_middleware(
    CORSMiddleware, allow_origins=settings.CORS_ORIGINS, allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root_status():
    return {"name": settings.PROJECT_NAME, "version": settings.VERSION, "primary_city": settings.PRIMARY_CITY, "status": "ONLINE"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Echo: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
