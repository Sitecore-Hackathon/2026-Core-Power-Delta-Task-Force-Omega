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
                minHeight: "100vh",
                backgroundColor: "#fff",
            }}
        >
            {/* Header */}
            <header
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 20px",
                    borderBottom: "1px solid #eee",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginLeft: 20,
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "2px solid #222",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                backgroundColor: "#222",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            backgroundColor: "#222",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                        >
                            <path d="M7 1L13 13H1L7 1Z" fill="white" />
                        </svg>
                    </div>
                    <select
                        value={view}
                        onChange={(e) => setView(e.target.value as View)}
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            border: "none",
                            background: "transparent",
                            color: "#222",
                            cursor: "pointer",
                            padding: "4px 8px",
                            appearance: "auto",
                        }}
                    >
                        <option value="chart">Chart View</option>
                        <option value="chat">Chatbot</option>
                    </select>
                </div>
                <div
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        backgroundColor: "#e8e8e8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#555",
                    }}
                >
                    S
                </div>
            </header>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    overflow: "auto",
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
                ) : view === "chart" ? (
                    <BubbleChart onNodeClick={setSelectedNode} />
                ) : (
                    <Chatbot />
                )}
            </main>

            {/* Bottom Nav Bar */}
            <nav
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "16px 0 24px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        backgroundColor: "#1a1a1a",
                        borderRadius: 40,
                        padding: "10px 20px",
                    }}
                >
                    <NavButton
                        active={view === "chart"}
                        onClick={() => setView("chart")}
                        label="Chart"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    </NavButton>
                    <NavButton
                        active={view === "chat"}
                        onClick={() => setView("chat")}
                        label="Chatbot"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </NavButton>
                </div>
            </nav>
        </div>
    );
}

function NavButton({
    active,
    onClick,
    children,
    label,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                backgroundColor: active ? "#333" : "transparent",
                color: active ? "#fff" : "#888",
                cursor: "pointer",
                padding: 0,
                transition: "background-color 0.2s, color 0.2s",
            }}
        >
            {children}
        </button>
    );
}

export default App;
