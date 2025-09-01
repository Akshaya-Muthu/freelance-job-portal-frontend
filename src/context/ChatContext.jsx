// src/context/ChatContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatContext = createContext();

// ✅ Socket.io should connect to root URL, not /api
const ENDPOINT = "https://freelance-job-portal-backend.onrender.com";

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ["websocket"],  // ✅ ensures WebSocket
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.connect();
    };
  }, []);

  const joinRoom = (roomId) => {
    if (socket && roomId) socket.emit("join-chat", roomId);
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        user,
        setUser,
        messages,
        setMessages,
        selectedChat,
        setSelectedChat,
        joinRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
