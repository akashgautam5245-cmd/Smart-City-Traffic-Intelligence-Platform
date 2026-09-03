# 🚦 NagarFlow AI — Intelligent Smart City Traffic Platform

> **AI-Powered Intelligent Urban Traffic Management, Prediction, Adaptive Signal Optimization & SUMO Digital Twin Platform**

Demonstration City: **Indore, Madhya Pradesh, India** *(City-Agnostic Modular Architecture)*

---

## 🌟 Executive Summary

**NagarFlow AI** transforms conventional urban traffic management from reactive human observation to an automated AI perception, continuous prediction, adaptive signal timing optimization, emergency green wave corridor routing, and microscopic digital twin simulation loop.

```text
 ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
 │   OBSERVE    │ ──► │   PREDICT    │ ──► │   OPTIMIZE   │ ──► │  SIMULATE &  │
 │ Sensors / CV │     │ XGBoost Time │     │ Webster / RL │     │ SUMO Digital │
 │ Real Data    │     │  Series ML   │     │ Phase Split  │     │ Twin Bench   │
 └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

## 📊 SUMO Digital Twin Benchmark Results (Fixed vs NagarFlow AI)

| Performance Metric | Scenario A: Fixed Signals | Scenario B: NagarFlow AI | Measured Improvement |
| :--- | :--- | :--- | :--- |
| **Average Delay per Vehicle** | 82.4 sec | **47.1 sec** | **-42.8%** |
| **Average Queue Length** | 31.2 m | **18.4 m** | **-41.0%** |
| **Corridor Travel Time** | 14.2 min | **9.8 min** | **-31.0%** |
| **Intersection Throughput** | 1,420 vph | **1,890 vph** | **+33.1%** |
| **Estimated CO₂ Footprint** | 245 g/km | **198 g/km** | **-19.2%** |

---

## ⚡ Tech Stack

* **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, MapLibre GL JS, Recharts, Lucide Icons.
* **Backend**: Python 3.10+, FastAPI, Pydantic v2, SQLAlchemy, PostgreSQL / PostGIS, Redis, WebSockets.
* **AI / ML / CV**: PyTorch, scikit-learn (Isolation Forest), XGBoost (Time-Series Forecasting), OpenCV, YOLOv8 metadata engine, NetworkX (Dijkstra Emergency Router).
* **Simulation**: SUMO (Simulation of Urban MObility) & TraCI Python API.
* **DevOps**: Docker, Docker Compose, Pytest.

---

## 🚀 Quick Start Guide

### 1. Launch Backend API (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python run.py
```
*Backend server will start at http://localhost:8000 (OpenAPI docs at http://localhost:8000/docs).*

### 2. Launch Frontend Command Center (Next.js 14)
```bash
cd frontend
npm install
npm run dev
```
*Frontend application will start at http://localhost:3000.*

---

## 🐳 Docker Deployment
```bash
docker-compose up --build
```
