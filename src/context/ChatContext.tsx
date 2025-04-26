import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "../api/auth";
import apiClient from "../api/apiClient";
import { useAuthContext } from "./AuthProvider";

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
}

interface ChatContextType {
    messages: Message[];
    sendMessage: (receiverId: string, content: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const socket: Socket = io("http://localhost:5000", {
    auth: {
        token: getToken(), // adjust for your token storage
    },
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { currentUser } = useAuthContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [adminId, setAdminId] = useState<string>("6808783529a901b18f91a96d");

    useEffect(() => {
        if (!currentUser) return;
        const fetchMessages = async () => {
            const res = await apiClient.get(`/messages/${adminId}`);
            console.log({ fetchMessages: res });

            setMessages(res.data.data);
        };

        fetchMessages();

        socket.on("newMessage", (message: Message) => {
            if (message.senderId !== currentUser._id) {
                setMessages((prev) => [...prev, message]);
            }
        });

        return () => {
            socket.off("newMessage");
        };
    }, [adminId, currentUser]);

    const sendMessage = async (receiverId: string, content: string) => {
        const res = await apiClient.post("/messages", {
            receiverId,
            content,
        });
        console.log({ sendMessage: res });

        socket.emit("sendMessage", { receiverId, content }); // trigger real-time update

        setMessages((prev) => [...prev, res.data.data]);
    };

    return (
        <ChatContext.Provider value={{ messages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat must be used inside ChatProvider");
    return context;
};
