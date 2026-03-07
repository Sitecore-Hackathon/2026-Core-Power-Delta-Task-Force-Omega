import { useState } from "react";
import "./App.css";
import BubbleChart from "./components/BubbleChart";
import Chatbot from "./components/Chatbot";
import type { BubbleDataPoint } from "./components/BubbleChart";
import TopicSummary from "./components/TopicSummary";

type View = "chart" | "chat";

const PRODUCTS = [
    { id: "sitecoreai", label: "Sitecore AI" },
    { id: "contenthub", label: "Sitecore ContentHub" },
];

function App() {
    const [view, setView] = useState<View>("chart");
    const [product, setProduct] = useState(PRODUCTS[0].id);
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
                    <span
                        style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#222",
                        }}
                    >
                        Core Power
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <select
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                            border: "1px solid #ddd",
                            borderRadius: 8,
                            background: "transparent",
                            color: "#222",
                            cursor: "pointer",
                            padding: "6px 10px",
                            appearance: "auto",
                        }}
                    >
                        {PRODUCTS.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                    justifyContent: "center",
                    padding: 20,
                    overflow: "auto",
                    position: "relative",
                    background: "#fff",
                }}
            >
                {/* TopicSummary slides in from the left */}
                <div
                    style={{
                        flex: 0.4,
                        // minWidth: 340,
                        // maxWidth: 500,
                        background: "#f8f8ff",
                        boxShadow: selectedNode ? "4px 0 24px 0 #0001" : "none",
                        borderRadius: "0 16px 16px 0",
                        marginRight: selectedNode ? 0 : -520,
                        opacity: selectedNode ? 1 : 0,
                        pointerEvents: selectedNode ? "auto" : "none",
                        transition: "all 0.5s cubic-bezier(.77,0,.18,1)",
                        position: "relative",
                        zIndex: 2,
                        display: selectedNode ? "block" : "none",
                    }}
                >
                    {selectedNode && (
                        <TopicSummary
                            node={selectedNode}
                            onClose={() => setSelectedNode(null)}
                        />
                    )}
                </div>
                {/* BubbleChart slides to the right */}
                <div
                    style={{
                        flex: selectedNode ? 0.6 : 1,
                        minWidth: 0,
                        minHeight: 0,
                        transition: "all 0.5s cubic-bezier(.77,0,.18,1)",
                        transform: selectedNode
                            ? "translateX(120px)"
                            : "translateX(0)",
                        zIndex: 1,
                        display: "block",
                    }}
                >
                    <BubbleChart
                        onNodeClick={setSelectedNode}
                        product={product}
                    />
                </div>
                <Chatbot
                    open={view === "chat"}
                    onClose={() => setView("chart")}
                />
            </main>

            {/* Bottom Nav Bar */}
            <nav
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    padding: "16px 0 24px",
                    zIndex: 200,
                    pointerEvents: "none",
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
                        pointerEvents: "auto",
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
