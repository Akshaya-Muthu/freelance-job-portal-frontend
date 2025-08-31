import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Briefcase, GraduationCap, Clock, FileDown } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../api/axios";
import ChatBox from "../components/ChatBox"; // Import ChatBox
import { ChatProvider } from "../context/ChatContext"; // Wrap chat context

export const AdminMoredetails = () => {
  const [aap, setAap] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // candidate for chat
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  const fetchApplicants = async (jobId) => {
    try {
      const res = await axios.get(`/applications/myjobs`);
      const jobData = res.data.jobs.find((j) => j.jobId === jobId);

      setAap(jobData ? jobData.applicants : []);
    } catch (error) {
      console.error("Error fetching applicants:", error.response?.data || error.message);
      toast.error("Failed to fetch applicants");
    }
  };

  useEffect(() => {
    if (job?._id || job?.jobId) {
      fetchApplicants(job._id || job.jobId);
    }
  }, [job]);

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        No job details found.
      </div>
    );
  }

  const updateStatus = async (applicantId, jobId, newStatus) => {
    try {
      await axios.put(`/applications/${jobId}/${applicantId}`, { status: newStatus });
      fetchApplicants(jobId);
      toast.success("Status updated to " + newStatus);

      // Open chat automatically if selected
      if (newStatus === "selected") {
        const candidate = aap.find((c) => c.userId === applicantId);
        setSelectedCandidate(candidate);
      } else if (selectedCandidate?.userId === applicantId) {
        setSelectedCandidate(null); // close chat if status changed from selected
      }
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      toast.error("Failed to update status");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600 text-white border-yellow-400 focus:ring-yellow-500";
      case "interview":
        return "bg-blue-600 text-white border-blue-400 focus:ring-blue-500";
      case "selected":
        return "bg-green-600 text-white border-green-400 focus:ring-green-500";
      case "rejected":
        return "bg-red-600 text-white border-red-400 focus:ring-red-500";
      default:
        return "bg-gray-600 text-white border-gray-400 focus:ring-gray-500";
    }
  };

  return (
    <ChatProvider>
      <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen text-white px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex text-center items-center justify-center md:ml-6 mt-6 h-12 w-12 rounded-full text-2xl text-gray-400 hover:bg-gray-700 hover:text-gray-300 transition-colors duration-200"
        >
          <span className="text-4xl font-medium">←</span>
        </button>

        <h2 className="mt-6 ml-2 md:ml-10 text-6xl font-bold">{job.title}</h2>

        <div className="mt-6 m-3 md:m-10 flex flex-row justify-between">
          <p className="text-2xl">{job.location}</p>
          <p className="text-2xl">Salary: ${job.salary.toLocaleString("usd") || "Not Disclosed"}</p>
        </div>

        <p className="mt-6 ml-2 md:ml-10 text-4xl font-bold">About this job</p>
        <p className="mt-6 ml-2 md:ml-10 text-2xl">{job.description}</p>

        <p className="mt-8 ml-2 md:ml-10 text-4xl font-bold">What we are looking for</p>
        <ul className="mt-6 ml-2 md:ml-10 list-disc space-y-2">
          {job.requirements?.map((req, index) => (
            <li key={index} className="text-2xl">{req}</li>
          ))}
        </ul>

        <p className="text-4xl font-bold mt-10 ml-5 mb-5">Applications</p>

        {aap.length === 0 ? (
          <p className="ml-5 text-xl mt-6 text-gray-400">No applications yet.</p>
        ) : (
          aap.map((myApplicant) => (
            <div
              key={myApplicant.userId}
              className="bg-gray-900 text-white rounded-2xl mt-8 w-full shadow-md p-5 mb-5 border border-gray-700"
            >
              <h2 className="text-3xl font-semibold">
                {job.title} at {job.company}
              </h2>

              <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-4 mb-3">
                <div className="flex items-center text-xl gap-2 text-gray-300">
                  <Briefcase size={16} />
                  <span>{myApplicant.yearsOfExperience} years of experience</span>
                </div>
                <div className="flex items-center gap-2 text-xl text-gray-300">
                  <GraduationCap size={16} />
                  <span>{myApplicant.education}</span>
                </div>
                <div className="flex items-center gap-2 text-xl text-gray-300">
                  <span className="font-medium">Skills:</span>
                  <span>
                    {Array.isArray(myApplicant.skills)
                      ? myApplicant.skills.join(", ")
                      : myApplicant.skills}
                  </span>
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="mt-2">
                <label className="font-semibold text-xl mr-2">Status:</label>
                <select
                  className={`text-xl px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${getStatusClass(myApplicant.status)}`}
                  value={myApplicant.status || "pending"}
                  onChange={(e) => updateStatus(myApplicant.userId, job.jobId, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="interview">Interview</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-3 border-t-2 border-gray-700 pb-3">
                <div className="flex items-center gap-2 text-xl text-gray-400 mt-3">
                  <Clock size={14} />
                  <span>{new Date(myApplicant.appliedAt).toLocaleString()}</span>
                </div>
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
              </div>
            </div>
          ))
        )}

        {/* Render ChatBox if a candidate is selected */}
        {selectedCandidate && (
          <div className="fixed bottom-5 right-5 w-80 h-96 z-50">
            <ChatBox roomId={selectedCandidate.userId} />
          </div>
        )}
      </div>
    </ChatProvider>
  );
};
