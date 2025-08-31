// pages/JobApplications.jsx
import { useState, useEffect } from "react";
import axios from "../api/axios"; // use your axios instance
import { useChat } from "../context/ChatContext";
import ChatBox from "../components/ChatBox";

const JobApplications = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const { setSelectedChat, selectedChat, socket, user } = useChat();

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = await axios.get(`/applications/job/${jobId}`);
      setApplications(data);
    };
    fetchApplications();
  }, [jobId]);

  // Recruiter clicks "Chat" after shortlisting
  const startChat = async (applicationId, candidateId) => {
    const { data } = await axios.post("/chat/create", { applicationId });

    setSelectedChat(data);

    // notify candidate via socket
    socket.emit("chat-started", { chat: data, candidateId });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Applications for Job</h2>

      {applications.map((app) => (
        <div key={app._id} className="border p-3 mb-2 flex justify-between items-center">
          <div>
            <p><strong>{app.candidate.name}</strong></p>
            <p>Email: {app.candidate.email}</p>
          </div>

          {app.status === "shortlisted" && (
            <button
              onClick={() => startChat(app._id, app.candidate._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Chat with Candidate
            </button>
          )}
        </div>
      ))}

      {/* Show chat window only when selected */}
      {selectedChat && <div className="mt-4"><ChatBox /></div>}
    </div>
  );
};

export default JobApplications;
