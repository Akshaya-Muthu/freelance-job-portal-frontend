// LandingPage.jsx
import toast from 'react-hot-toast';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Faq from '../components/Faq';
import googleLogo from '../assets/google.webp'
import amazon from '../assets/amazon.svg'
import atlassian from '../assets/atlassian.svg'
import netflix from '../assets/netflix.png'
import meta from '../assets/meta.svg' 
import microsoft from '../assets/microsoft.webp'
import  uber from '../assets/uber.svg' 
import ibm from '../assets/ibm.svg'
import { Testimonials } from '../components/Testimonials';
import useAuthStore from '../store/auth';
import { useNavigate } from 'react-router-dom';



const companies = [
  { id: 1, name: 'Google', path: googleLogo },
  { id: 2, name: 'Facebook', path: meta },
  { id: 3, name: 'Netflix', path:  netflix},
  { id: 4, name: 'Amazon', path: amazon },
  { id: 5, name: 'Atlassian', path: atlassian },
  { id: 6, name: 'Microsoft', path: microsoft },
  { id: 7, name: 'Uber', path: uber },
  { id: 8, name: 'Ibm', path: ibm }
];

const LandingPage = () => {
  const user = useAuthStore((state)=> state.user);
  const navigate = useNavigate();
  // console.log(user);
    const handleJobsClick = (e) => {
      if (!user) {
       e.preventDefault();
       toast.error("Please log in to browse jobs");    
      }

    };  

    const handleClick = (e) => {
        if (user?.role !== "recruiter") {
          e.preventDefault(); // stop navigation
          toast.error("Only recruiters can post jobs!");
        }
      };
    const repeatedCompanies = [...companies, ...companies]; 
  return (

    <div className= "text-gray-100 h-auto flex flex-col">
      <motion.header
        className="flex flex-col items-center justify-center text-center px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-6xl font-black mb-4 text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(59,130,246,0.5)] transition-all duration-300">
          Welcome to <span className="text-blue-500">Job Arch</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-xl">
          Find your dream job or hire the best talent in just a few clicks. Fast, easy, and free.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/jobs"
            onClick={handleJobsClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-blue-500/50"
          >
            Browse Jobs
          </Link>
          <Link 
            to="/post-job"
            onClick={handleClick}
            className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-white/40"
          >
            Post a Job
          </Link>
        </div>
      </motion.header>

      {/* Features Section */}
      <section className="flex-1 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Why choose Job Arch?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[{
            title: '🚀 Fast Hiring',
            desc: 'Connect with candidates and employers instantly with our seamless platform.',
          }, {
            title: '💼 Verified Jobs',
            desc: 'We verify every job posting to ensure it\'s authentic and up-to-date.',
          }, {
            title: '📱 Mobile Friendly',
            desc: 'Apply or post jobs on the go — fully responsive design for all devices.',
          }].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gray-900 p-6 rounded-lg shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="overflow-hidden py-6 bg-transparent">
        <div className="flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-10">Trusted by Companies</h2>
        </div>
      <motion.div
        className="flex gap-16 w-max m-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear',
        }}
      >
        {repeatedCompanies.map(({ id, name, path }, index) => (
          <div key={index} className="w-40 flex justify-center">
            <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
          </div>
        ))}
      </motion.div>

      <Testimonials />
      <Faq/>
    </div>
  </div>
  );
};

export default LandingPage;
