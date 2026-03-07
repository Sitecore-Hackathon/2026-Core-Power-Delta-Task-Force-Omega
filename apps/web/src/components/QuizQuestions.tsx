import { useState } from "react";
import type { Question } from "./Quiz";
type QuizQuestionsProps = {
    questions: Question[];
};

export const QuizQuestions = ({ questions }: QuizQuestionsProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [feedback, setFeedback] = useState<boolean | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    if (!questions || questions.length === 0) {
        return <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>No questions available.</div>;
    }

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        if (option[0] === questions[activeIndex].correct_answer) {
            setFeedback(false);
        } else {
            setFeedback(true);
        }
    };

    const handleNavigation = (direction: "prev" | "next") => {
        setFeedback(null);
        setSelectedOption(null);
        setActiveIndex((prev) =>
            direction === "prev"
                ? Math.max(prev - 1, 0)
                : Math.min(prev + 1, questions.length - 1),
        );
    };

    return (
        <div>
            <p style={{
                marginBottom: 18,
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--text-primary)",
            }}>
                {questions[activeIndex].question}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {questions[activeIndex].options?.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = feedback !== null && option[0] === questions[activeIndex].correct_answer;
                    const isWrong = feedback !== null && isSelected && feedback;
                    return (
                        <label
                            key={idx}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "10px 14px",
                                border: `1px solid ${isCorrect && feedback !== null ? "#86efac" : isWrong ? "#fca5a5" : isSelected ? "var(--accent)" : "var(--border)"}`,
                                borderRadius: 10,
                                cursor: "pointer",
                                background: isCorrect && feedback !== null ? "#f0fdf4" : isWrong ? "#fef2f2" : isSelected ? "rgba(79,70,229,0.04)" : "var(--surface)",
                                fontSize: 13,
                                lineHeight: 1.5,
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                if (feedback === null) e.currentTarget.style.borderColor = "var(--accent-light)";
                            }}
                            onMouseLeave={(e) => {
                                if (feedback === null && !isSelected) e.currentTarget.style.borderColor = "var(--border)";
                            }}
                        >
                            <input
                                type="radio"
                                name={`question-${activeIndex}`}
                                value={option}
                                checked={isSelected}
                                onChange={() => handleOptionSelect(option)}
                                style={{ accentColor: "var(--accent)" }}
                            />
                            {option}
                        </label>
                    );
                })}
            </div>
            {feedback !== null && (
                <div
                    style={{
                        margin: "16px 0",
                        color: feedback ? "#991b1b" : "#166534",
                        backgroundColor: feedback ? "#fef2f2" : "#f0fdf4",
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: `1px solid ${feedback ? "#fecaca" : "#bbf7d0"}`,
                        fontSize: 13,
                        lineHeight: 1.6,
                        animation: "fadeIn 0.2s ease",
                    }}
                >
                    <strong>{feedback ? "Incorrect" : "Correct!"}</strong>
                    <p style={{ margin: "6px 0 0" }}>{questions[activeIndex].explanation}</p>
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "20px 0",
                }}
            >
                <button
                    onClick={() => handleNavigation("prev")}
                    disabled={activeIndex === 0}
                    style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: activeIndex === 0 ? "var(--border)" : "var(--text-primary)",
                        cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                    }}
                >
                    Prev
                </button>
                <div style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                }}>
                    {activeIndex + 1} / {questions.length}
                </div>
                <button
                    onClick={() => handleNavigation("next")}
                    disabled={activeIndex === questions.length - 1}
                    style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: activeIndex === questions.length - 1 ? "var(--border)" : "var(--text-primary)",
                        cursor: activeIndex === questions.length - 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
