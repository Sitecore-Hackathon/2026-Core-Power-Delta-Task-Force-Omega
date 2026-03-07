from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
import json
import os

app = FastAPI(
    title="CompetencySerializer API",
    description="Serves weighted data for the SitecoreAI documentation.",
    version="1.0.0"
)

DATA_FILE = os.path.join(os.path.dirname(__file__), "competencies-flat-schema.json")


def load_data() -> list:
    if not os.path.exists(DATA_FILE):
        raise HTTPException(status_code=500, detail=f"Data file not found: {DATA_FILE}")
    with open(DATA_FILE, "r") as f:
        return json.load(f)


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