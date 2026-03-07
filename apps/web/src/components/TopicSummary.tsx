import { useRef, useEffect } from "react";
import type { BubbleDataPoint } from "./BubbleChart";

interface TopicSummaryProps {
    node: BubbleDataPoint;
    onClose: () => void;
}

const TopicSummary: React.FC<TopicSummaryProps> = ({ node, onClose }) => {
    const summaryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (summaryRef.current) {
            // Perform any necessary operations with summaryRef
        }
    }, []);

    // Use node.urls for documentation links, fallback to empty arrays if missing
    const documentationLinks = {
        official_docs: node.urls?.official_docs ?? [],
        community_resources: node.urls?.community_resources ?? [],
    };

    return (
        <div
            style={{
                position: "relative",
                padding: 36,
                width: "100%",
                // maxWidth: 600,
                // minWidth: 400,
                height: "100%",
                maxHeight: "calc(100vh - 60px)",
                overflowY: "auto",
                boxSizing: "border-box",
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 2px 24px #0002",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 24,
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    background: "#eee",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 16px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 22,
                    zIndex: 2,
                }}
                aria-label="Close summary"
            >
                ×
            </button>
            <div style={{ width: "100%", overflow: "hidden" }}>
                <h1 style={{ fontSize: 28, marginBottom: 12 }}>{node.name}</h1>
                <div style={{ marginBottom: 18 }}>
                    <p style={{ fontSize: 16, lineHeight: 1.6 }}>
                        {node.description}
                    </p>
                </div>
                <div style={{ marginBottom: 18 }}>
                    <h2 style={{ fontSize: 20, marginBottom: 8 }}>
                        Official Documentation
                    </h2>
                    <ul style={{ paddingLeft: 18, wordBreak: "break-all" }}>
                        {documentationLinks.official_docs.length === 0 && (
                            <li>No links</li>
                        )}
                        {documentationLinks.official_docs.map((link, idx) => (
                            <li key={idx} style={{ marginBottom: 6 }}>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ marginBottom: 18 }}>
                    <h2 style={{ fontSize: 20, marginBottom: 8 }}>
                        Community Resources
                    </h2>
                    <ul style={{ paddingLeft: 18, wordBreak: "break-all" }}>
                        {documentationLinks.community_resources.length ===
                            0 && <li>No links</li>}
                        {documentationLinks.community_resources.map(
                            (link, idx) => (
                                <li key={idx} style={{ marginBottom: 6 }}>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
                <button
                    type="button"
                    style={{
                        marginTop: 12,
                        padding: "10px 20px",
                        fontSize: 16,
                        borderRadius: 8,
                        border: "none",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Test Your Knowledge
                </button>
            </div>
        </div>
    );
};

export default TopicSummary;
