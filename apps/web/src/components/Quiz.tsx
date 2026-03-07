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
        // Fetch quiz data from the API
        fetch(`${API_URL}${competency_id}`) // Replace with actual topic
            .then((res) => {
                console.log("Response:", { res });
                if (!res.ok) throw new Error("Failed to fetch quiz data");
                return res.json();
            })
            .then((json) => {
                // Handle quiz data (json should contain question, options, correct_answer, explanation)
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
            <button onClick={onClose}>Back</button>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: "red" }}>
                    Failed to load quiz data: {error}
                </div>
            ) : (
                questionData && (
                    <div>
                        <h2>{questionData.competency_name}</h2>
                        <QuizQuestions questions={questionData.questions} />
                    </div>
                )
            )}
        </div>
    );
};
