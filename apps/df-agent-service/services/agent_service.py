import json
import requests
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from repositories.chroma import ChromaRepository


QUIZ_SYSTEM_PROMPT = """You are a quiz generator for Sitecore certification exam preparation.

When asked to create a quiz for a competency:
1. Use the search_competencies tool to find the matching competency in the database.
2. Extract the official_docs and community_resources URLs from the result.
3. Use the fetch_url_content tool to retrieve content from each URL.
4. Based on the content, generate a quiz in JSON format.

The quiz JSON format must be:
{
  "competency_id": "the competency id",
  "competency_name": "the competency name",
  "questions": [
    {
      "question": "The question text",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct_answer": "A",
      "explanation": "Why this answer is correct"
    }
  ]
}

Generate 5-10 questions per quiz. Questions should test practical developer knowledge,
not just rote memorization. Include a mix of conceptual and scenario-based questions.
Return ONLY the JSON, no other text."""

CHAT_SYSTEM_PROMPT = """You are a helpful Sitecore certification study assistant.
You help developers prepare for Sitecore certification exams by answering questions,
explaining concepts, and providing guidance on Sitecore topics.

Use the search_competencies tool to find relevant competency information when needed.
Use the fetch_url_content tool to retrieve documentation content when a user asks about specific topics.

Be concise, accurate, and encouraging. If you're unsure about something, say so."""


def create_quiz_agent(chroma_repo: ChromaRepository):
    @tool
    def search_competencies(query: str) -> str:
        """Search the competency database for a specific Sitecore competency topic.
        Returns matching competency records including descriptions, weights, and URLs."""
        results = chroma_repo.search(query)
        return json.dumps(results, indent=2)

    @tool
    def fetch_url_content(url: str) -> str:
        """Fetch the text content from a documentation URL.
        Use this to read official docs and community resources for quiz generation."""
        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()
            return response.text[:10000]
        except requests.RequestException as e:
            return f"Error fetching {url}: {e}"

    tools = [search_competencies, fetch_url_content]
    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    return create_react_agent(llm, tools, prompt=QUIZ_SYSTEM_PROMPT)


def create_chat_agent(chroma_repo: ChromaRepository):
    @tool
    def search_competencies(query: str) -> str:
        """Search the competency database for a specific Sitecore competency topic.
        Returns matching competency records including descriptions, weights, and URLs."""
        results = chroma_repo.search(query)
        return json.dumps(results, indent=2)

    @tool
    def fetch_url_content(url: str) -> str:
        """Fetch the text content from a documentation URL.
        Use this to read official docs and community resources."""
        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()
            return response.text[:10000]
        except requests.RequestException as e:
            return f"Error fetching {url}: {e}"

    tools = [search_competencies, fetch_url_content]
    llm = ChatOpenAI(model="gpt-4o", temperature=0.7, streaming=True)
    return create_react_agent(llm, tools, prompt=CHAT_SYSTEM_PROMPT)


class AgentService:
    def __init__(self, chroma_repo: ChromaRepository):
        self._repo = chroma_repo
        self._agent = create_quiz_agent(chroma_repo)

    def create_chat_agent(self):
        return create_chat_agent(self._repo)

    def generate_quiz(self, competency_topic: str) -> dict:
        result = self._agent.invoke({
            "messages": [("human", f"Create a quiz for the following Sitecore competency: {competency_topic} try to access the URL's if you can't just skip them. Only respond with valid JSON showing")]
        })
        last_message = result["messages"][-1]
        try:
            return json.loads(last_message.content)
        except (json.JSONDecodeError, AttributeError):
            return {"raw_response": last_message.content}
