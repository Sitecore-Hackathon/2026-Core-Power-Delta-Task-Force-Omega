import { useRef, useEffect, useState } from "react";
import type { BubbleDataPoint } from "./BubbleChart";
import { Quiz } from "./Quiz";

interface TopicSummaryProps {
    node: BubbleDataPoint;
    onClose: () => void;
}

function extractLabel(url: string): string {
    try {
        const parsed = new URL(url);
        const segments = parsed.pathname
            .replace(/\/index\.html?$/i, "")
            .replace(/\.[^/.]+$/, "")
            .split("/")
            .filter(Boolean);

        // Take the last meaningful segments (skip version-like segments)
        const meaningful = segments.filter(
            (s) => !/^(v?\d+(\.\d+)*|current|latest|en|docs?)$/i.test(s),
        );

        if (meaningful.length === 0) {
            return parsed.hostname.replace("www.", "");
        }

        return meaningful
            .slice(-2)
            .map((s) =>
                s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            )
            .join(" - ");
    } catch {
        return url;
    }
}

const TopicSummary: React.FC<TopicSummaryProps> = ({ node, onClose }) => {
    const summaryRef = useRef<HTMLDivElement>(null);
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
        if (summaryRef.current) {
            // Perform any necessary operations with summaryRef
        }
    }, []);

    const documentationLinks = {
        official_docs: node.urls?.official_docs ?? [],
        community_resources: node.urls?.community_resources ?? [],
    };

    return (
        <div
            style={{
                position: "relative",
                padding: "32px 28px",
                width: "100%",
                height: "100%",
                maxHeight: "calc(100vh - 60px)",
                boxSizing: "border-box",
                background: "var(--surface)",
                borderRadius: 16,
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border-light)",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 0,
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "4px 12px",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--text-secondary)",
                    zIndex: 2,
                    transition: "all 0.2s ease",
                    lineHeight: 1.4,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fee2e2";
                    e.currentTarget.style.borderColor = "#fca5a5";
                    e.currentTarget.style.color = "#dc2626";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--surface-raised)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                }}
                aria-label="Close summary"
            >
                &times;
            </button>
            <div
                ref={summaryRef}
                style={{
                    width: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: "calc(100vh - 120px)",
                    paddingRight: 4,
                }}
            >
                {/* Title */}
                <div style={{ marginBottom: 20 }}>
                    <div
                        style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: 6,
                            background: "rgba(79,70,229,0.08)",
                            color: "var(--accent)",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            marginBottom: 8,
                        }}
                    >
                        Topic
                    </div>
                    <h1
                        style={{
                            fontSize: 24,
                            fontWeight: 700,
                            margin: "4px 0 0",
                            color: "var(--text-primary)",
                            letterSpacing: "-0.3px",
                            lineHeight: 1.3,
                        }}
                    >
                        {node.name}
                    </h1>
                </div>

                {showQuiz ? (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                        <Quiz
                            competency_id={node.id}
                            onClose={() => setShowQuiz(false)}
                        />
                    </div>
                ) : (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                        {/* Description */}
                        <div style={{ marginBottom: 24 }}>
                            <p
                                style={{
                                    fontSize: 14,
                                    lineHeight: 1.7,
                                    color: "var(--text-secondary)",
                                    margin: 0,
                                }}
                            >
                                {node.description}
                            </p>
                        </div>

                        <div className="section-divider" />

                        {/* Official Docs */}
                        <div style={{ marginBottom: 20, marginTop: 16 }}>
                            <h2
                                style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    color: "var(--text-secondary)",
                                    marginBottom: 10,
                                }}
                            >
                                Documentation
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {documentationLinks.official_docs.length === 0 && (
                                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>No links available</span>
                                )}
                                {documentationLinks.official_docs.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="resource-card"
                                    >
                                        <span
                                            className="resource-icon"
                                            style={{ background: "rgba(79,70,229,0.08)", color: "var(--accent)" }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                        </span>
                                        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {extractLabel(link)}
                                        </span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4, flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="section-divider" />

                        {/* Community */}
                        <div style={{ marginBottom: 24, marginTop: 16 }}>
                            <h2
                                style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    color: "var(--text-secondary)",
                                    marginBottom: 10,
                                }}
                            >
                                Community Resources
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {documentationLinks.community_resources.length === 0 && (
                                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>No links available</span>
                                )}
                                {documentationLinks.community_resources.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="resource-card"
                                    >
                                        <span
                                            className="resource-icon"
                                            style={{ background: "rgba(30,27,75,0.06)", color: "var(--accent-dark)" }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                        </span>
                                        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {extractLabel(link)}
                                        </span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4, flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="quiz-cta"
                            onClick={() => setShowQuiz(true)}
                        >
                            Test Your Knowledge
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicSummary;
