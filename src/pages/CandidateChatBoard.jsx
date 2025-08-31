import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import useAuthStore from "../store/auth";
import { useChat } from "../context/ChatContext";
import axios from "../api/axios";

const CandidateChatBoard = () => {
  const user = useAuthStore((state) => state.user);
  const { joinRoom, socket } = useChat();
  const [chatId, setChatId] = useState(null);

  // Fetch chats assigned to candidate
  const fetchChats = async () => {
    try {
      const res = await axios.get("/chat/my-chats", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.data?.length > 0) {
        setChatId(res.data[0]._id); // pick first active chat
        joinRoom(res.data[0]._id);
      }
    } catch (err) {
      console.error("Failed to fetch chats", err.response || err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchChats();

    socket?.on("candidate-selected", (data) => {
      if (data.candidateId === user._id) {
        setChatId(data.chatId);
        joinRoom(data.chatId);
      }
    });

    return () => socket?.off("candidate-selected");
  }, [user, socket]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">Your Messages</h2>
      {chatId ? <ChatBox roomId={chatId} /> : <p>No active chat yet.</p>}
    </div>
  );
};

export default CandidateChatBoard;
