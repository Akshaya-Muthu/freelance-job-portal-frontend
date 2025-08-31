import { create } from "zustand";
import axios from "../api/axios";

export const useSavedJobsStore = create((set, get) => ({
  savedJobs: [],

  fetchSavedJobs: async () => {
    try {
      const res = await axios.get("/saveJobs");
      console.log("Fetched saved jobs:", res.data);

      const jobIds = res.data?.savejobs?.map((job) => job._id) || [];
      set({ savedJobs: jobIds });
    } catch (err) {
      console.error("Error fetching saved jobs", err);
      set({ savedJobs: [] });
    }
  },

  toggleSaveJob: async (jobId) => {
    let { savedJobs } = get();

    // Ensure it's always an array
    if (!Array.isArray(savedJobs)) {
      savedJobs = [];
    }

    try {
      if (savedJobs.includes(jobId)) {
        await axios.post("/saveJobs/unsave", { jobId });
        set({ savedJobs: savedJobs.filter((id) => id !== jobId) });
      } else {
        await axios.post("/saveJobs/save", { jobId });
        set({ savedJobs: [...savedJobs, jobId] });
      }
    } catch (err) {
      console.error("Error saving job", err);
    }
  },
}));
