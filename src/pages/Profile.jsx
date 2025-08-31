import Navbar from "../components/Navbar";
import useAuthStore from "../store/auth";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigator = useNavigate();

  const user = useAuthStore((state) => state.user);

  console.log(user.role);

  const [jobSave, setJobSave] = useState([]);
  const [myjobs, setMyjobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const fetchMyApplications = async () => {
    try {
      const res = await axios.get("/applications/myApplication");
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get("/applications/myjobs");
      setMyjobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get("/saveJobs");
      console.log("Fetched saved jobs:", res.data);
      setJobSave(res.data.savejobs || []);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
    fetchMyApplications();
    fetchMyJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="relative bg-gray-800/70 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <img
              src="https://api.dicebear.com/7.x/miniavs/png?seed=Jamie&backgroundColor=d1d4f9"
              alt="Profile Avatar"
              className="w-36 h-36 rounded-full border-4 border-gray-900 shadow-lg"
            />
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              {user?.name}
            </h2>
            <p className="text-gray-400 mt-2">{user?.email}</p>

            <span
              className={`inline-block mt-4 px-4 py-1 text-lg font-medium rounded-full shadow-md ${
                user?.role === "recruiter"
                  ? "bg-green-500/20 text-green-400 border border-green-600"
                  : "bg-blue-500/20 text-blue-400 border border-blue-600"
              }`}
            >
              {user?.role}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-10 text-gray-300">
            {user?.role === "recruiter" ? (
              <div>
                <p className="text-xl font-semibold text-white">{myjobs.length}</p>
                <p className="text-sm">Jobs Post</p>
              </div>
            ) : (
              <div>
                <p className="text-xl font-semibold text-white">{applications.length}</p>
                <p className="text-sm">Jobs Applied</p>
              </div>
            )}

            <div>
              <p className="text-xl font-semibold text-white">{jobSave.length}</p>
              <p className="text-sm">Saved Jobs</p>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            { user?.name === "Guest User" ? null :  (
            <button
              className="w-50 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 cursor-pointer text-white shadow-md transition"
              onClick={() => navigator("/settings")}
            >
              Edit Profile
            </button>)
        }
          </div>
        </div>
      </div>
    </div>
  );
};
