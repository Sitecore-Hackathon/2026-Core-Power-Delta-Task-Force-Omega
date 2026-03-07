import { useState } from "react";
import "./App.css";
import BubbleChart from "./components/BubbleChart";
import Chatbot from "./components/Chatbot";
import type { BubbleDataPoint } from "./components/BubbleChart";
import TopicSummary from "./components/TopicSummary";

type View = "chart" | "chat";

function App() {
    const [view, setView] = useState<View>("chart");
    const [selectedNode, setSelectedNode] = useState<BubbleDataPoint | null>(
        null,
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: 20,
                height: "90vh",
            }}
        >
            {selectedNode ? (
                <TopicSummary
                    title="topic"
                    summary="summary"
                    documentationLinks={{
                        official_docs: [],
                        community_resources: [],
                    }}
                />
            ) : (
                <>
                    {view === "chart" ? (
                        <BubbleChart onNodeClick={setSelectedNode} />
                    ) : (
                        <Chatbot />
                    )}
                    <div
                        style={{
                            marginBottom: 16,
                            marginTop: 32,
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 16,
                                color: view === "chart" ? "#6E3FFF" : "#888",
                                fontWeight: view === "chart" ? 700 : 400,
                            }}
                        >
                            Chart
                        </span>
                        <label
                            style={{
                                position: "relative",
                                display: "inline-block",
                                width: 56,
                                height: 30,
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={view === "chat"}
                                onChange={() =>
                                    setView(view === "chart" ? "chat" : "chart")
                                }
                                style={{
                                    opacity: 0,
                                    width: 0,
                                    height: 0,
                                    position: "absolute",
                                }}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    backgroundColor: "#6E3FFF",
                                    borderRadius: 30,
                                    transition: "background-color 0.2s",
                                }}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    height: 22,
                                    width: 22,
                                    left: view === "chat" ? 30 : 4,
                                    bottom: 4,
                                    backgroundColor: "#fff",
                                    borderRadius: "50%",
                                    transition: "left 0.2s",
                                }}
                            />
                        </label>
                        <span
                            style={{
                                fontSize: 16,
                                color: view === "chat" ? "#6E3FFF" : "#888",
                                fontWeight: view === "chat" ? 700 : 400,
                            }}
                        >
                            Chatbot
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
