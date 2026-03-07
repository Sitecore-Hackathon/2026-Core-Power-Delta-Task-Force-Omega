# df-agent-service

A FastAPI-powered AI agent service for Sitecore certification exam preparation. It provides a conversational study assistant and an AI-driven quiz generator, both backed by a ChromaDB vector store of Sitecore competency data.

## Features

- **Chat Agent** — Streaming conversational assistant that answers Sitecore certification questions using RAG over indexed competency data
- **Quiz Agent** — Generates structured JSON quizzes (5-10 questions) from competency topics, pulling content from official docs and community resources
- **Competency Search** — Semantic search over Sitecore exam competencies stored in ChromaDB
- **Auto-Indexing** — Competency data is automatically fetched and indexed from the serializer service on startup
- **Reindex on Demand** — Trigger a manual reindex of competency data via API

## Endpoints

### Chat (Streaming)

```
POST /api/v1/chat/stream
```

- Streams an AI-generated response as Server-Sent Events (SSE)
- Request body: `{ "message": "your question here" }`
- Returns `text/event-stream` with `data: "chunk"` messages, ending with `data: [DONE]`

### Search Competencies

```
GET /api/v1/indexer/search/{search_term}
```

- Returns the top 5 matching competency records from ChromaDB
- `search_term` — the topic or keyword to search for

### Generate Quiz

```
GET /api/v1/indexer/quiz/{competency_topic}
```

- Returns a JSON quiz object with questions, options, correct answers, and explanations
- `competency_topic` — the Sitecore competency to generate a quiz for

### Reindex

```
POST /api/v1/indexer/reindex
```

- Re-fetches competency data from the serializer service and reindexes into ChromaDB
- Returns `{ "status": "reindexed" }`

### Health Check

```
GET /
```

- Returns `"Hello World"`

## Data Files

- `chroma_data/`: Persistent ChromaDB storage directory for indexed competency vectors

## Running Locally

1. **Prerequisites**
   - Python 3.13+
   - [uv](https://docs.astral.sh/uv/) package manager
   - An OpenAI API key

2. **Create a `.env` file** in the project root:
   ```env
   OPENAI_API_KEY=sk-...
   ```

3. **Install dependencies:**
   ```bash
   uv sync
   ```

4. **Start the server:**
   ```bash
   uv run uvicorn main:app --reload
   ```

   The service will be available at `http://localhost:8000`.

## Implementation Notes

- The chat agent uses `gpt-4o` with `temperature=0.7` and streaming enabled; the quiz agent uses `gpt-4o` with `temperature=0` for deterministic output
- Both agents are built with LangGraph's `create_react_agent` and share two tools: `search_competencies` (ChromaDB lookup) and `fetch_url_content` (fetches documentation URLs)
- Competency data is sourced from `https://df-serializer-service.onrender.com/competencies` and only indexed once (skipped if the collection already has data)
- CORS is configured for the Render-hosted frontend and `localhost` development origins
- The quiz agent returns raw response text if the LLM output is not valid JSON

