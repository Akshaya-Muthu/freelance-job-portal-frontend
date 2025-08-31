import React from 'react';
import { useNavigate } from 'react-router-dom';
import  useAuthStore  from '../store/auth'
import toast from 'react-hot-toast';

const RoleSelect = () => {
  const navigate = useNavigate();
  const roleSelect = useAuthStore((state)=>state.roleSelect);
  
  const handleSelect = async(role) => {
    try{
    const res  = await roleSelect(role);
    if(res.success){
      toast.success("Role Selected successful")
      navigate('/');
    }
    else{
      toast.error('Role Selection failed')
    }
  }
  catch(err){
    toast.error('Role Selection failed')
    console.log("role setection error ", err)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 py-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-center">
        I am a...
      </h1>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
        <button
          onClick={() => handleSelect('candidate')}
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto md:px-26 md:py-8  px-10 py-4 rounded-lg font-semibold text-lg sm:text-xl transition-all duration-300"
        >
          Candidate
        </button>
        <button
          onClick={() => handleSelect('recruiter')}
          className="bg-red-600 hover:bg-red-700 w-full sm:w-auto px-10 py-4 md:px-26 md:py-8 rounded-lg font-semibold text-lg sm:text-xl transition-all duration-300"
        >
          Recruiter
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
