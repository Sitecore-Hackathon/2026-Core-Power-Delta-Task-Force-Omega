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
        return <div>No questions available.</div>;
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
            <h2 style={{ marginBottom: 12 }}></h2>
            <p style={{ marginBottom: 18 }}>
                {questions[activeIndex].question}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {questions[activeIndex].options?.map((option, idx) => (
                    <label
                        key={idx}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 12px",
                            border: "1px solid #ccc",
                            borderRadius: 16,
                            cursor: "pointer",
                            backgroundColor: "#f1ecec",
                        }}
                    >
                        <input
                            type="radio"
                            name={`question-${activeIndex}`}
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => handleOptionSelect(option)}
                        />
                        {option}
                    </label>
                ))}
            </div>
            {feedback !== null && (
                <div
                    style={{
                        margin: "24px 12px",
                        color: feedback ? "red" : "green",
                        backgroundColor: feedback ? "#ffe5e5" : "#e5ffe5",
                        padding: "12px",
                        borderRadius: 12,
                    }}
                >
                    {feedback ? "Incorrect." : "Correct!"}
                    <p>{questions[activeIndex].explanation}</p>
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "24px 0",
                }}
            >
                <button
                    onClick={() => handleNavigation("prev")}
                    disabled={activeIndex === 0}
                >
                    Prev
                </button>
                <div>{`Question ${activeIndex + 1} of ${questions.length}`}</div>
                <button
                    onClick={() => handleNavigation("next")}
                    disabled={activeIndex === questions.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
