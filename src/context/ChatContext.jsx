// src/context/ChatContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatContext = createContext();
const ENDPOINT = "http://localhost:5000";

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT, { withCredentials: true });
    setSocket(newSocket);

    return () => newSocket.disconnect();
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

// ✅ Export useChat hook
export const useChat = () => useContext(ChatContext);
