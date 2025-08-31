import Navbaar from '../components/Navbar';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { JobCart } from '../components/JobCart';

export const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [keyword, setKeyword] = useState("");
  const [jobType, setJobType] = useState("");

  // Fetch all jobs without filters
  const fetchJobs = async () => {
    try {
      toast.loading('Loading jobs...');
      const res = await axios.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Fetching jobs failed:', err);
      toast.error('Failed to load jobs');
    } finally {
      toast.dismiss();
    }
  };

  // Fetch jobs by filters
  const fetchFilteredJobs = async (filters) => {
    try {
      toast.loading('Filtering jobs...');
      const res = await axios.get('/jobs/search', { params: filters });
      setJobs(res.data.jobs || []);
      toast.dismiss();

      if (!res.data.jobs.length) {
        toast('No jobs found with these filters', { icon: '⚠️' });
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to filter jobs');
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword to search');
      return;
    }

    try {
      toast.loading('Searching jobs...');
      const res = await axios.get('/jobs/search', { params: { keyword } });
      setJobs(res.data.jobs || []);
      toast.dismiss();

      if (!res.data.jobs.length) {
        toast('No jobs found for the given keyword', { icon: '⚠️' });
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to search jobs');
      console.error(err);
    }
  };

  const handleLocationChange = (e) => {
    const loc = e.target.value;
    setLocation(loc);
    fetchFilteredJobs({ location: loc, company, jobType });
  };

  const handleCompanyChange = (e) => {
    const comp = e.target.value;
    setCompany(comp);
    fetchFilteredJobs({ location, company: comp, jobType });
  };

  const handleJobTypeChange = (e) => {
    const type = e.target.value;
    setJobType(type);
    fetchFilteredJobs({ location, company, jobType: type });
  };

  const handleClearFilters = () => {
    setKeyword("");
    setLocation("");
    setCompany("");
    setJobType("");
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const locations = [
    "Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Delhi",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Hyderabad","Jaipur","Lucknow","Chennai","Coimbatore","Bengaluru","Kochi",
    "Noida","Gurugram","Thiruvananthapuram","Remote"
  ];

  const companies = [
    { id: 1, name: 'Google' },{ id: 2, name: 'Facebook' },{ id: 3, name: 'Netflix' },{ id: 4, name: 'Amazon' },
    { id: 5, name: 'Atlassian' },{ id: 6, name: 'Microsoft' },{ id: 7, name: 'Uber' },{ id: 8, name: 'IBM' },
    { id: 9, name: 'Insightify' },{ id: 10, name: 'Paypal' },{ id: 11, name: 'Comcast' },{ id: 12, name: 'Instagram' },
    { id: 13, name: 'Tata Consulting services' },{ id: 14, name: 'Cognizant' },{ id: 15, name: 'Nestle India' },
    { id: 16, name: 'Infosys' },{ id: 17, name: 'Accenture' },{ id: 18, name: 'Wipro' },{ id: 19, name: 'Capgemini' },
    { id: 20, name: 'Intel' }
  ];

  const jobTypes = ["Full Time", "Part Time", "Contract"];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen">
      <Navbaar />
      <h2 className="text-white text-5xl md:text-7xl font-bold text-center my-8">Latest Jobs</h2>

      <section className="px-4 md:px-20">
        {/* Search by keyword */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Jobs by Title..."
            className="flex-1 p-3 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
          />
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Filters: Location, Company & Job Type */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <select
            className="w-full md:w-[350px] p-3 bg-gray-900 text-white rounded-xl border border-gray-700"
            value={location}
            onChange={handleLocationChange}
          >
            <option value="">Filter by Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc.toLowerCase()}>
                {loc}
              </option>
            ))}
          </select>

          <select
            className="w-full md:w-[350px] p-3 bg-gray-900 text-white rounded-xl border border-gray-700"
            value={company}
            onChange={handleCompanyChange}
          >
            <option value="">Filter by Company</option>
            {companies.map((comp) => (
              <option key={comp.id} value={comp.name.toLowerCase()}>
                {comp.name}
              </option>
            ))}
          </select>

          <select
            className="w-full md:w-[350px] p-3 bg-gray-900 text-white rounded-xl border border-gray-700"
            value={jobType}
            onChange={handleJobTypeChange}
          >
            <option value="">Filter by Job Type</option>
            {jobTypes.map((type, index) => (
              <option key={index} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>

          <button
            className="px-6 py-3 bg-red-600 cursor-pointer text-white rounded-xl hover:bg-red-700 transition"
            onClick={handleClearFilters}
          >
            Clear Filter
          </button>
        </div>
      </section>

      {/* Jobs Grid */}
      <div className="px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job, index) => <JobCart key={index} job={job} />)
          ) : (
            <p className="text-white text-center col-span-full">No Jobs Found</p>
          )}
        </div>
      </div>
    </div>
  );
};
