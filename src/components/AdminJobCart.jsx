import React from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";

export const AdminJobCart = ({ job, setJobs }) => {
  const navigate = useNavigate();
console.log(job.jobId);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Job deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error("Failed to delete job: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("An error occurred while deleting the job.");
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-md hover:scale-[1.02] transition-all duration-300 w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
      <div className="flex justify-between m-2">
        <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">{job?.title}</h3>
        <button
          className="text-red-600 text-3xl cursor-pointer"
          onClick={() => handleDelete(job?.jobId)}
        >
          <RiDeleteBinLine />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-300 mb-4">
        <span className="text-lg font-medium">{job?.company || "Company"}</span>
        <span className="text-base mt-2 sm:mt-0">{job?.location}</span>
      </div>

      <div className="border-t border-gray-700 my-4"></div>

      <p className="text-gray-400 text-base sm:text-lg mb-5 line-clamp-3">
        {job?.description}
      </p>

      <button
        className="bg-indigo-600 text-white w-full py-3 text-lg rounded-xl hover:bg-indigo-500 transition cursor-pointer"
        onClick={() => navigate(`/adminjob`, { state: { job } })}
      >
        More Details
      </button>
    </div>
  );
};
