import chromadb
import requests
from pydantic import TypeAdapter
from models.compentency import Compentency


class ChromaRepository:
    def __init__(self):
        self._chroma_client = chromadb.Client()

    def index_content_from_url(self, url):
        response = requests.get(url)
        data = response.json()

        adapter = TypeAdapter(list[Compentency])
        comps = adapter.validate_python(data["competencies"])

        collection = self._chroma_client.get_or_create_collection(name="comps")
        collection.add(
            ids=[c.id for c in comps],
            documents=[c.model_dump_json() for c in comps]
        )
    def search(self, query):
        collection = self._chroma_client.get_collection(name="comps")
        results = collection.query(
            query_texts=[query],
            n_results=5
        )

        return results






