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

interface ChatbotProps {
    open: boolean;
    onClose?: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ open, onClose }) => {
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
        <div
            style={{
                position: "fixed",
                bottom: 80,
                left: "50%",
                width: "100%",
                maxWidth: 480,
                zIndex: 100,
                padding: "0 16px",
                transform: open
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(calc(100% + 80px))",
                opacity: open ? 1 : 0,
                transition: "transform 0.4s cubic-bezier(.32,.72,0,1), opacity 0.3s ease",
                pointerEvents: open ? "auto" : "none",
            }}
        >
            <div
                style={{
                    backgroundColor: "#1a1a1e",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 -4px 40px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "16px 20px 12px",
                        gap: 12,
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#aaa",
                            fontSize: 20,
                            cursor: "pointer",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #ff6b35, #c62368)",
                            flexShrink: 0,
                        }}
                    />
                    <div>
                        <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>
                            Chat Assistant
                        </div>
                        <div style={{ color: "#888", fontSize: 12 }}>
                            Online
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div
                    style={{
                        padding: "0 20px",
                        height: 300,
                        overflowY: "auto",
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
                                        msg.role === "user"
                                            ? "#6E3FFF"
                                            : "#2a2a2e",
                                    color: "#fff",
                                    padding: "8px 14px",
                                    borderRadius: 14,
                                    maxWidth: "80%",
                                    wordBreak: "break-word",
                                    fontSize: 14,
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div
                    style={{
                        padding: "12px 20px 16px",
                        borderTop: "1px solid #2a2a2e",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: 8,
                            backgroundColor: "#2a2a2e",
                            borderRadius: 12,
                            padding: 4,
                        }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: "10px 12px",
                                borderRadius: 8,
                                border: "none",
                                background: "transparent",
                                color: "#fff",
                                fontSize: 14,
                                outline: "none",
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                padding: "8px 16px",
                                borderRadius: 8,
                                border: "none",
                                background: "#6E3FFF",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
