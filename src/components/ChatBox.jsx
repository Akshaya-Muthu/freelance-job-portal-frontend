// src/components/ChatBox.jsx
import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";

const ChatBox = ({ roomId }) => {
  const { socket } = useChat();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Listen for messages from the server
  useEffect(() => {
    if (!socket || !roomId) return;

    // Join the correct room
    socket.emit("join-chat", roomId);

    // Receive messages
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [socket, roomId]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      const msgData = {
        roomId,
        message: input,
        sender: "Candidate", // or "Recruiter" depending on context
        timestamp: new Date(),
      };
      socket.emit("sendMessage", msgData);
      setMessages((prev) => [...prev, msgData]);
      setInput("");
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="my-1">
            <b>{msg.sender}:</b> {msg.message}{" "}
            <span className="text-xs text-gray-400">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 px-4 rounded-r-lg hover:bg-indigo-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
