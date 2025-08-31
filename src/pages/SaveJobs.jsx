import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/auth";

export const SaveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get("/saveJobs", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      console.log("Saved Jobs response:", res.data);

      setJobs(res.data.savedJobs || []); // adjust key based on backend response
    } catch (error) {
      console.error("Error fetching saved jobs:", error.response || error);
    }
  };

  useEffect(() => {
    if (user) fetchSavedJobs();
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen text-white px-6 py-4">
      <Navbar />
      <h2 className="text-white text-5xl md:text-7xl font-bold text-center my-8">
        Saved Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-3xl text-center">No saved jobs found</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="mb-8 border-gray-700 border-3 p-5 rounded-2xl">
            <h3 className="text-white text-2xl font-bold mb-2">{job.title}</h3>

            <div className="flex items-center justify-between text-gray-300 mb-3">
              <span className="text-xl font-medium">{job.company || "Logo"}</span>
              <span className="text-lg">{job.location}</span>
            </div>

            <div className="border border-gray-500 mt-5 mb-3"></div>

            <p className="text-gray-400 text-lg mb-4 line-clamp-3">{job.description}</p>

            <div className="flex justify-between mt-auto">
              <button
                className="bg-gray-700 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                More Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
