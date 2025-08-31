import axios from "../api/axios";
import { useEffect, useState } from "react";
import useAuthStore from "../store/auth";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';

export const MoreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

    console.log(user);
  const [job, setJob] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantId, setApplicantId] = useState("");
  const[alreadyApply,setAlreadyApply] = useState(false);  
  const [applyJob, setApplyJob] = useState([]);

  const [formData, setFormData] = useState({
    yearsOfExperience: '',
    skills: '',
    education: '',
    resume: null,
    id: ''
  });

  const jobFetch = async () => {
    try {
      const res = await axios.get(`/jobs/${id}`);
      setJob(res.data);
      setFormData((prev) => ({ ...prev, id: res.data._id }));

    } catch (err) {
      console.log(err);
    }
  };
  // console.log(job);

  useEffect(() => {
    jobFetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("resume", formData.resume);
    form.append("skills", formData.skills);
    form.append("education", formData.education);
    form.append("yearsOfExperience", formData.yearsOfExperience);
    form.append("jobId", formData.id);

    try{
      toast.loading("loading...");
        const res = await axios.post(`/applications/${job._id}/apply`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });

        // if (res.application.applicants?.length > 0) {
        //   setApplicantId(res.application.applicants[0]);
        // }
        toast.dismiss();
        console.log(res.data.application);
      setApplyJob(res.data.application);  

      
      res.data.application.applicants.forEach((applicant) => {
        if (applicant.user === user._id) {
          setAlreadyApply(true);
        }
      });
      
      toast.success("Application submitted successfully!");
      if (res.status === 200) {
        setIsModalOpen(false);
        
        navigate(-1);
      }
      toast.dismiss();
      
    }catch(err){
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to submit application");
    }
  };
  // Check if the user has already applied for the job
    useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const res = await axios.get(`/applications/${job._id}/check`);
        setAlreadyApply(res.data.alreadyApplied);
      } catch (err) {
        console.error(err);
      }
    };

    if (job?._id && user?._id) {
      checkIfApplied();
    }
  }, [job?._id, user?._id]);

  const jobsalary = job.salary;

  return (
    <>
      <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen text-white px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex text-center items-center justify-center md:ml-6 mt-6 h-12 w-12 rounded-full text-2xl text-gray-400 hover:bg-gray-700 hover:text-gray-300 transition-colors duration-200"
        >
          <span className="text-4xl font-medium">←</span>
        </button>

        <h2 className="mt-6 ml-2 md:ml-10 text-4xl  md:text-6xl font-bold">{job.title}</h2>
        <div className="mt-6 m-3 md:m-10 flex flex-row justify-between">
          <p className="text-2xl"> Location : {String(job.location).charAt(0).toUpperCase() + String(job.location).slice(1)}</p>
          <p className="text-2xl">
          Salary: ₹{Number(jobsalary).toLocaleString("en-IN")}
        </p>
        </div>

        <p className="mt-6 ml-2 md:ml-10 text-2xl md:text-4xl font-bold">About this job</p>
        <p className="mt-6 ml-2 md:ml-10 text-xl md:text-2xl">
          Apply is seeking an experienced Data Scientist to join our analytics team...
        </p>

        <p className="mt-8 ml-2 md:ml-10 text-2xl md:text-4xl font-bold">What we are looking for</p>
        <ul className="mt-6 ml-2 md:ml-10 list-disc space-y-2">
          {job.requirements && job.requirements.map((req, index) => (
            <li key={index} className="text-2xl">
              {req}
            </li>
          ))}
        </ul>       

        <div className="mt-8 ml-2 md:ml-10 text-gray-400 text-lg md:text-xl">
          Posted by:{" "}
          <span className="text-white font-semibold">{job.postedBy?.email}</span>
        </div>

        <div className="flex justify-center mt-12">
          {alreadyApply ?  <button className="bg-red-700 hover:bg-red-700 w-[95%]  text-white text-2xl font-bold p-3 rounded-lg transition duration-200 cursor-not-allowed" disabled>
            Already Applied
          </button>:
                  <button
                    className="bg-blue-600 hover:bg-blue-700 w-[95%] cursor-pointer text-white text-2xl font-bold p-3 rounded-lg transition duration-200"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Apply
                  </button>}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm">
          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center items-end transition-transform duration-300 translate-y-0">
            <div className="bg-gray-900 rounded-t-2xl p-8 w-full relative shadow-lg">
              <div className="absolute left-1/2 top-3 mb-5 w-20 border-b-4 border-gray-700 bg-gray-700"></div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold text-white mb-6">
                Apply for {job.title} at {job.company}
              </h2>
              <p className="text-gray-400 mb-4">Please fill the form below</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="number"
                  required
                  placeholder="Years of Experience"
                  value={formData.yearsOfExperience}
                  onChange={(e) =>
                    setFormData({ ...formData, yearsOfExperience: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 outline-none"
                />

                <input
                  type="text"
                  required
                  placeholder="Skills (Comma Separated)"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 outline-none"
                />

                <div className="space-y-2 text-white">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="education"
                      value="Intermediate"
                      checked={formData.education === "Intermediate"}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                    />
                    Intermediate
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="education"
                      value="Graduate"
                      checked={formData.education === "Graduate"}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                    />
                    Graduate
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="education"
                      value="Post Graduate"
                      checked={formData.education === "Post Graduate"}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                    />
                    Post Graduate
                  </label>
                </div>

                <input
                  type="file"
                  required
                  accept="application/pdf"
                  className="w-full p-3 rounded bg-gray-800 text-white outline-none file:bg-gray-700 file:text-white file:rounded file:border-0"
                  onChange={(e) =>
                    setFormData({ ...formData, resume: e.target.files[0] })
                  }
                />

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 rounded-lg transition duration-200"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
