import { useEffect, useState } from "react";
import { QuizQuestions } from "./QuizQuestions";
export type Question = {
    question?: string;
    options?: string[];
    correct_answer?: string;
    explanation?: string;
};

type QuizData = {
    competency_name?: string;
    competency_id?: string;
    questions: Question[];
};

export type QuizProps = {
    competency_id?: string;
    onClose?: () => void;
};
const API_URL = "https://df-agent-service.onrender.com/api/v1/indexer/quiz/";

export const Quiz = (props: QuizProps) => {
    const [questionData, setQuestionData] = useState<QuizData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { competency_id, onClose } = props;

    console.log("Quiz component rendered with competency_id:", competency_id);

    useEffect(() => {
        if (!competency_id) return;
        console.log("Fetching quiz data for competency_id:", competency_id);
        fetch(`${API_URL}${competency_id}`)
            .then((res) => {
                console.log("Response:", { res });
                if (!res.ok) throw new Error("Failed to fetch quiz data");
                return res.json();
            })
            .then((json) => {
                console.log("Quiz data:", json);
                setQuestionData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [competency_id]);

    return (
        <div>
            <button
                onClick={onClose}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    marginBottom: 16,
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back
            </button>
            {loading ? (
                <div style={{
                    padding: 24,
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    fontSize: 14,
                    animation: "pulse-subtle 1.5s ease infinite",
                }}>
                    Loading quiz...
                </div>
            ) : error ? (
                <div style={{
                    color: "#dc2626",
                    background: "#fef2f2",
                    padding: 14,
                    borderRadius: 10,
                    fontSize: 14,
                    border: "1px solid #fecaca",
                }}>
                    Failed to load quiz data
                </div>
            ) : (
                questionData && (
                    <div>
                        <h2 style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: 16,
                        }}>
                            {questionData.competency_name}
                        </h2>
                        <QuizQuestions questions={questionData.questions} />
                    </div>
                )
            )}
        </div>
    );
};
