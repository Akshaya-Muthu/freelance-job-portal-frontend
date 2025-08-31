import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";

export const JobPost = () => {
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [requirements, setRequirements] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [about, setAbout] = useState("");
  const [jobType, setJobType] = useState(""); // ✅ New state for Job Type

  // Handle job submission
  const handleSubmit = async () => {
    const requirementsArray = requirements
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (!title || !description || !company || !location || !salary || !about || !jobType || requirementsArray.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    toast.loading("Submitting job...");
    try {
      const res = await axios.post(
        "/jobs",
        {
          title,
          description,
          company,
          location,
          salary,
          jobType, // ✅ Added jobType
          requirements: requirementsArray,
          about,
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Job posted successfully");

        // Reset form
        setTitle("");
        setDescription("");
        setCompany("");
        setLocation("");
        setSalary("");
        setRequirements("");
        setAbout("");
        setJobType(""); // ✅ Reset job type
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to post job");
    } finally {
      toast.dismiss();
    }
  };

  // Location and company options
  const locations = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
    "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Hyderabad", "Jaipur", "Lucknow", "Chennai", "Coimbatore",
    "Bengaluru", "Kochi", "Noida", "Gurugram", "Thiruvananthapuram", "Remote"
  ];

  const companies = [
    { id: 1, name: 'Google' }, { id: 2, name: 'Facebook' }, { id: 3, name: 'Netflix' },
    { id: 4, name: 'Amazon' }, { id: 5, name: 'Atlassian' }, { id: 6, name: 'Microsoft' },
    { id: 7, name: 'Uber' }, { id: 8, name: 'IBM' }, { id: 9, name: 'Insightify' },
    { id: 10, name: 'Paypal' }, { id: 11, name: 'Comcast' }, { id: 12, name: 'Instagram' },
    { id: 13, name: 'Tata Consulting services' }, { id: 14, name: 'Cognizant' },
    { id: 15, name: 'Nestle India' }, { id: 16, name: 'Infosys' },
    { id: 17, name: 'Accenture' }, { id: 18, name: 'Wipro' }, { id: 19, name: 'Capgemini' },
    { id: 20, name: 'Intel' }
  ];

  const jobTypes = ["Full-Time", "Part-Time", "Contract"]; // ✅ Added job type options

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen">
      <Navbar />
      <h2 className="text-white text-4xl md:text-6xl font-bold text-center my-8">
        Post a Job
      </h2>

      <div className="space-y-4 max-w-2xl mx-auto px-4">
        {/* Job Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        {/* Job Description */}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        {/* Location & Company */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="flex-1 p-4 bg-gray-900 text-white rounded-xl border border-gray-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc.toLowerCase()}>
                {loc}
              </option>
            ))}
          </select>

          <select
            className="flex-1 p-4 bg-gray-900 text-white rounded-xl border border-gray-700"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="">Select Company</option>
            {companies.map((comp) => (
              <option key={comp.id} value={comp.name.toLowerCase()}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Job Type */}
        <select
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">Select Job Type</option>
          {jobTypes.map((type, index) => (
            <option key={index} value={type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>

        {/* Salary */}
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salary"
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        {/* About Job */}
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="About job"
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        {/* Requirements */}
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Requirements (one per line)"
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        {/* Submit Button */}
        <button
          className="w-full md:w-[200px] mt-2 mb-5 p-3 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
