import { useRef, useEffect } from "react";

interface TopicSummaryProps {
    title: string;
    summary: string;
    documentationLinks: {
        official_docs: string[];
        community_resources: string[];
    };
}

const TopicSummary: React.FC<TopicSummaryProps> = ({
    title,
    summary,
    documentationLinks,
}) => {
    const summaryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (summaryRef.current) {
            // Perform any necessary operations with summaryRef
        }
    }, []);

    return (
        <div>
            {/* Left panel */}
            <div>
                {/* Competency title */}
                <h1>{title}</h1>

                {/* Competency summary */}
                <div>
                    <p>{summary}</p>
                </div>

                {/* Documentation links */}
                <div>
                    <h2>Official Documentation</h2>
                    <ul>
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

                {/* Test Your Knowledge CTA button */}
                <button type="button">Test Your Knowledge</button>
            </div>
        </div>
    );
};

export default TopicSummary;
