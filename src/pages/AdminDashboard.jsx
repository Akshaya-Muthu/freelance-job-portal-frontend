import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import { AdminJobCart }  from '../components/AdminJobCart';


export const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get('/applications/myjobs');
      setJobs(res.data.jobs);  
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen">
      <Navbar />
      <h1 className="text-5xl md:text-7xl font-bold text-white text-center mt-10">My Job</h1>
      {jobs.length === 0 ? (
        <div className="text-white text-2xl text-center mt-10">
          No jobs posted yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {jobs.map((jobItem) => (
            <AdminJobCart key={jobItem.jobId} job={jobItem} />
          ))}
        </div>
      )}
    </div>
  );
};
