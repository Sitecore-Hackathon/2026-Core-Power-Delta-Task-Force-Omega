from pydantic import BaseModel
from typing import Optional


class WeightComponents(BaseModel):
    exam_percentage: float
    exam_questions: int
    documentation_page_count: int
    community_pain_score: int
    community_pain_max: int
    community_pain_rationale: str


class CompetencyUrls(BaseModel):
    official_docs: list[str] = []
    community_resources: list[str] = []


class Compentency(BaseModel):
    id: str
    name: str
    weight_pct: float
    weight_components: WeightComponents
    description: str
    urls: CompetencyUrls
