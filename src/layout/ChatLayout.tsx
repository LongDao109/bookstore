import React, { ReactNode, useState } from "react";
import { ChatProvider, useChat } from "../context/ChatContext";

const ChatWidget: React.FC<{ adminId: string }> = ({ adminId }) => {
    const { messages, sendMessage } = useChat();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    console.log({ messages });

    const handleSend = () => {
        if (!content.trim()) return;
        sendMessage(adminId, content);
        setContent("");
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {open ? (
                <div className="bg-white w-80 shadow-lg rounded-xl p-4 border">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">Chat</span>
                        <button onClick={() => setOpen(false)}>✕</button>
                    </div>
                    <div className="h-64 overflow-y-auto space-y-1 mb-2">
                        {messages.map((msg) => (
                            <div
                                key={msg?._id}
                                className={`p-2 rounded ${
                                    msg?.senderId === adminId
                                        ? "bg-gray-200"
                                        : "bg-blue-200 self-end"
                                }`}
                            >
                                {msg?.content}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            className="border flex-1 px-2 py-1 rounded"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
                >
                    Chat
                </button>
            )}
        </div>
    );
};

const ChatLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ChatProvider>
            {children}
            <ChatWidget adminId={"680ca6b101deb75ce25218bb"} />
        </ChatProvider>
    );
};

export default ChatLayout;
