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

    const currentProduct = PRODUCTS.find((p) => p.id === product);

    return (
        <div className="app-bg" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Header */}
            <header
                className="header-bar"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 28px",
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 12 }}>
                    <img
                        src="/images.png"
                        alt="Sitecore"
                        style={{ width: 42, height: 42, objectFit: "contain" }}
                    />
                    <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>
                        Core Power
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-secondary)", marginLeft: 4, opacity: 0.6 }}>
                        Knowledge Explorer
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <select
                        value={product}
                        onChange={(e) => {
                            setProduct(e.target.value);
                            setSelectedNode(null);
                        }}
                        style={{
                            fontSize: 13,
                            fontWeight: 600,
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            background: "var(--surface)",
                            color: "var(--text-primary)",
                            cursor: "pointer",
                            padding: "8px 14px",
                            appearance: "auto",
                            boxShadow: "var(--shadow-sm)",
                            transition: "border-color 0.2s ease",
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
                }}
            >
                {/* TopicSummary panel */}
                <div
                    className={selectedNode ? "topic-panel" : ""}
                    style={{
                        flex: 0.4,
                        background: "transparent",
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
                {/* BubbleChart with hero overlay */}
                <div
                    style={{
                        flex: selectedNode ? 0.6 : 1,
                        minWidth: 0,
                        minHeight: 0,
                        transition: "all 0.5s cubic-bezier(.77,0,.18,1)",
                        transform: selectedNode ? "translateX(120px)" : "translateX(0)",
                        zIndex: 1,
                        display: "block",
                        position: "relative",
                    }}
                >
                    {/* Radial glow behind bubble cluster */}
                    <div className="bubble-glow" />

                    {/* Hero context text - fades out when a topic is selected */}
                    {!selectedNode && (
                        <div className="hero-overlay">
                            <h2 className="hero-title">{currentProduct?.label} Competencies</h2>
                            <p className="hero-subtitle">Explore the key skills and knowledge areas</p>
                            <div className="hero-hint">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                                    <path d="M15 15l-2 5L9 9l11 4-5 2z" />
                                </svg>
                                Click a topic to explore
                            </div>
                        </div>
                    )}

                    <BubbleChart
                        onNodeClick={setSelectedNode}
                        product={product}
                        selectedNodeId={selectedNode?.id ?? null}
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
                        backgroundColor: "#1a1a2e",
                        borderRadius: 40,
                        padding: "10px 20px",
                        pointerEvents: "auto",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <NavButton
                        active={view === "chart"}
                        onClick={() => setView("chart")}
                        label="Chart"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                backgroundColor: active ? "var(--accent)" : "transparent",
                color: active ? "#fff" : "#888",
                cursor: "pointer",
                padding: 0,
                transition: "background-color 0.25s, color 0.25s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = "#ccc";
            }}
            onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = "#888";
            }}
        >
            {children}
        </button>
    );
}

export default App;
