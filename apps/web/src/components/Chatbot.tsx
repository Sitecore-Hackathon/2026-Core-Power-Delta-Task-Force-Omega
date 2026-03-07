import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "bot";
    text: string;
}

const BOT_RESPONSES = [
    "That's an interesting point! Tell me more.",
    "I see what you mean. Have you considered another approach?",
    "Great question! Let me think about that...",
    "Thanks for sharing! Here's what I think...",
    "That makes sense. Anything else on your mind?",
    "Fascinating! I hadn't thought of it that way.",
];

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: "Hi! I'm a chatbot. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const userMsg: Message = { role: "user", text: trimmed };
        const botMsg: Message = {
            role: "bot",
            text: BOT_RESPONSES[
                Math.floor(Math.random() * BOT_RESPONSES.length)
            ],
        };

        setMessages((prev) => [...prev, userMsg, botMsg]);
        setInput("");
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
            <div
                style={{
                    border: "1px solid #797979",
                    borderRadius: 8,
                    padding: 16,
                    height: 500,
                    overflowY: "auto",
                    marginBottom: 12,
                    background: "#cbcbcc",
                }}
            >
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            justifyContent:
                                msg.role === "user" ? "flex-end" : "flex-start",
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                background:
                                    msg.role === "user" ? "#6E3FFF" : "#e0e0e0",
                                color: msg.role === "user" ? "#fff" : "#0f0f0f",
                                padding: "8px 14px",
                                borderRadius: 16,
                                maxWidth: "75%",
                                wordBreak: "break-word",
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: "10px 14px",
                        borderRadius: 8,
                        border: "1px solid #444",
                        background: "#cbcbcc",
                        color: "#0f0f0f",
                        fontSize: 14,
                    }}
                />
                <button
                    onClick={handleSend}
                    style={{
                        padding: "10px 20px",
                        borderRadius: 8,
                        border: "none",
                        background: "#6E3FFF",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: 14,
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
