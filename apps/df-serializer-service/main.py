from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import json
from pathlib import Path

app = FastAPI(
    title="CompetencySerializer API",
    description="Serves weighted data for the SitecoreAI documentation.",
    version="1.0.0"
)

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "competencies-flat-schema.json"

def load_data() -> list:
    if not os.path.exists(DATA_FILE):
        raise HTTPException(status_code=500, detail=f"Data file not found: {DATA_FILE}")
    with open(DATA_FILE, "r") as f:
        return json.load(f)
    
# Define allowed origins (replace with your frontend Render URL)
origins = [
    "https://two026-core-power-delta-task-force-omega.onrender.com",
    "http://two026-core-power-delta-task-force-omega.onrender.com",
    "http://localhost:5173",  # For local development
    "http://localhost:3000" # optional: if you ever run Next.js locally
]

# Add the CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True, # Allows cookies/auth headers
    allow_methods=["*"],    # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)

@app.get(
    "/competencies",
    summary="Get all competencies",
    description="Returns the full array of competency objects."
)
def get_all_competencies():
    return {"total": len(load_data()), "competencies": load_data()}


@app.get(
    "/competencies/count",
    summary="Get total number of competencies",
    description="Returns the total number of competency objects in the dataset."
)
def get_competency_count():
    data = load_data()
    return {"total": len(data)}


@app.get(
    "/competencies/weight/greater-than",
    summary="Get competencies with weight greater than a value",
    description="Returns all competency objects where weight_pct is greater than the provided threshold."
)
def get_competencies_weight_gt(
    threshold: float = Query(..., description="Return competencies with weight_pct greater than this value", example=10)
):
    data = load_data()
    results = [c for c in data if c["weight_pct"] > threshold]
    if not results:
        raise HTTPException(
            status_code=404,
            detail=f"No competencies found with weight_pct greater than {threshold}"
        )
    return {"total": len(results), "competencies": results}


@app.get(
    "/competencies/weight/less-than",
    summary="Get competencies with weight less than a value",
    description="Returns all competency objects where weight_pct is less than the provided threshold."
)
def get_competencies_weight_lt(
    threshold: float = Query(..., description="Return competencies with weight_pct less than this value", example=10)
):
    data = load_data()
    results = [c for c in data if c["weight_pct"] < threshold]
    if not results:
        raise HTTPException(
            status_code=404,
            detail=f"No competencies found with weight_pct less than {threshold}"
        )
    return {"total": len(results), "competencies": results}