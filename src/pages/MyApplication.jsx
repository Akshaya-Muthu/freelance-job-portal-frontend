import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuthStore from "../store/auth";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import { useChat } from "../context/ChatContext";
import { Briefcase, GraduationCap, Clock, FileDown } from "lucide-react";

export const MyApplication = () => {
  const user = useAuthStore((state) => state.user);
  const { socket, selectedChat, setSelectedChat } = useChat();

  const [applications, setApplications] = useState([]);

  const fetchMyApplications = async () => {
    try {
      const res = await axios.get("/applications/myApplication");
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  // Setup socket and listen for chat started
  useEffect(() => {
    if (user) {
      socket.emit("setup", user); // join personal room
    }

    socket.on("chat-started", (data) => {
      // Only open chat if this user is the candidate
      if (data.chat.participants.includes(user._id)) {
        setSelectedChat(data.chat);
      }
    });

    return () => socket.off("chat-started");
  }, [socket, user, setSelectedChat]);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10 pointer-events-none" />
      <Navbar />
      <h2 className="text-5xl md:text-7xl text-center font-bold mt-8">My Applications</h2>

      <div className="flex flex-col items-center mt-10 gap-6 px-4 md:px-20 relative z-10">
        {applications.map((app) => {
          const myApplicant = app.applicants.find((appl) => appl.user._id === user._id);
          if (!myApplicant) return null;

          return (
            <div key={app._id} className="bg-gray-900 text-white rounded-2xl w-full shadow-md p-5 mb-5 border border-gray-700">
              <h2 className="text-4xl font-semibold">{app.job.title} at {app.job.company}</h2>

              <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-4 mb-3">
                <div className="flex items-center text-xl gap-2 text-gray-300">
                  <Briefcase size={16} />
                  <span>{myApplicant.yearsOfExperience} years of experience</span>
                </div>
                <div className="flex items-center gap-2 text-xl text-gray-300">
                  <GraduationCap size={16} />
                  <span>{myApplicant.education}</span>
                </div>
              </div>

              <p className="mt-2">
                <span className="font-semibold text-xl">Status:</span>{" "}
                <span className="text-blue-400 text-xl">{myApplicant.status}</span>
              </p>

              <div className="flex justify-end mt-3">
                <a
                  href={myApplicant.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xl text-blue-400 hover:text-blue-300"
                >
                  <FileDown size={20} />
                  View Resume
                </a>
              </div>

              {/* ✅ Render chat box only if shortlisted */}
              {myApplicant.status === "shortlisted" && selectedChat && (
                <div className="mt-4">
                  <ChatBox />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
