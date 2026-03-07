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

    // Placeholder summary and docs for demonstration
    const summary = `Summary for ${node.id}`;
    const documentationLinks = {
        official_docs: [],
        community_resources: [],
    };

    return (
        <div style={{ padding: 24, position: "relative" }}>
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "#eee",
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 10px",
                    cursor: "pointer",
                    fontWeight: 600,
                }}
                aria-label="Close summary"
            >
                ×
            </button>
            <div>
                <h1>{node.id}</h1>
                <div>
                    <p>{summary}</p>
                </div>
                <div>
                    <h2>Official Documentation</h2>
                    <ul>
                        {documentationLinks.official_docs.length === 0 && (
                            <li>No links</li>
                        )}
                        {documentationLinks.official_docs.map((link, idx) => (
                            <li key={idx}>
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
                <div>
                    <h2>Community Resources</h2>
                    <ul>
                        {documentationLinks.community_resources.length ===
                            0 && <li>No links</li>}
                        {documentationLinks.community_resources.map(
                            (link, idx) => (
                                <li key={idx}>
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
                <button type="button">Test Your Knowledge</button>
            </div>
        </div>
    );
};

export default TopicSummary;
