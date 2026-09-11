from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langgraph.types import Command

from graph import app


class InvokeRequest(BaseModel):
    messages: Optional[List[Dict[str, Any]]] = None
    user_id: Optional[str] = "demo_user"
    user_query: Optional[str] = ""
    flight_results: Optional[str] = ""
    hotel_results: Optional[str] = ""
    weather_results: Optional[str] = ""
    budget_results: Optional[str] = ""
    itinerary: Optional[str] = ""
    final_response: Optional[str] = ""
    llm_calls: Optional[int] = 0
    thread_id: Optional[str] = None


class ResumeRequest(BaseModel):
    thread_id: Optional[str] = None
    approved: bool
    feedback: Optional[str] = ""


app_api = FastAPI(title="TripWeaver API")

app_api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app_api.get("/health")
def health():
    return {"status": "ok"}


@app_api.post("/invoke")
def invoke(req: InvokeRequest):
    payload = {
        "messages": req.messages or [],
        "user_id": req.user_id,
        "user_query": req.user_query,
        "flight_results": req.flight_results,
        "hotel_results": req.hotel_results,
        "weather_results": req.weather_results,
        "budget_results": req.budget_results,
        "itinerary": req.itinerary,
        "final_response": req.final_response,
        "llm_calls": req.llm_calls,
    }

    config = {"configurable": {"thread_id": req.thread_id}} if req.thread_id else {}

    result = app.invoke(payload, config=config)
    return result


@app_api.post("/resume")
def resume(req: ResumeRequest):
    config = {"configurable": {"thread_id": req.thread_id}} if req.thread_id else {}
    cmd = Command(resume={"approved": req.approved, "feedback": req.feedback})
    result = app.invoke(cmd, config=config)
    return result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app_api, host="127.0.0.1", port=8000)
