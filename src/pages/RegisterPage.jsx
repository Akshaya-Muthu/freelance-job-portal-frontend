// RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';
import toast from 'react-hot-toast';

const RegisterPage = () => {

  const navigate = useNavigate()

  const register = useAuthStore((state)=>state.register)
  const [ email , setEmail ] = useState('')
  const [ name, setName ]  = useState('')
  const [ password, setPassword] = useState('')

  const HandleSubmit = async(e)=>{
    e.preventDefault();
    try{
    const res = await register(name,email,password);
      if(res.success){
        toast.success("Register successful");
        navigate('/select-role');
      }
      else{
        toast.error(res.message);
      }
    }catch(err){
      console.error('Register failed:', err);
      toast.error('Register failed. Please try again.');
    } 

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6">
      <div className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Create your Hirrd account</h2>
        <p className="text-sm text-gray-400 mb-8 text-center">Join the community and find your dream job today.</p>

        <form className="space-y-6" onSubmit={HandleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              required
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e)=>{setEmail(e.target.value)}}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              onChange={(e)=>{setPassword(e.target.value)}}
              required
              placeholder="Create a strong password"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
