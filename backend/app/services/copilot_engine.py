from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.domain import Intersection, TrafficIncident, EmergencyVehicle

class CopilotEngine:
    def answer_operator_query(self, db: Session, query: str) -> Dict[str, Any]:
        q_lower = query.lower()
        tool_used = "SELECT * FROM intersections WHERE ..."
        data_sources = ["PostgreSQL Table: intersections"]

        if "highest queue" in q_lower or "queue" in q_lower or "congested" in q_lower:
            worst = db.query(Intersection).order_by(Intersection.queue_length_m.desc()).first()
            if worst:
                answer = f"The intersection with the highest queue length is **{worst.name} ({worst.code})** with a queue length of **{worst.queue_length_m:.1f} meters** and average vehicle delay of **{worst.avg_delay_sec:.1f} seconds**."
            else:
                answer = "No active intersection data available."

        elif "incident" in q_lower or "accident" in q_lower:
            tool_used = "SELECT * FROM traffic_incidents WHERE status='ACTIVE'"
            data_sources.append("PostgreSQL Table: traffic_incidents")
            incidents = db.query(TrafficIncident).filter(TrafficIncident.status == "ACTIVE").all()
            if incidents:
                answer = f"There are currently {len(incidents)} active incident(s): **{incidents[0].title}**. Recommended action: {incidents[0].recommended_action}"
            else:
                answer = "There are currently no active traffic incidents reported in the network."

        else:
            answer = f"NagarFlow AI query status: Operational state active for **Indore Traffic Command Center**. Monitored intersections: **{db.query(Intersection).count()}**."

        return {
            "query": query, "answer": answer, "data_sources_cited": data_sources, "sql_tool_used": tool_used, "confidence": 0.96
        }

copilot_engine = CopilotEngine()
