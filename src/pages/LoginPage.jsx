// LoginPage.jsx
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from "../store/auth.js"

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const guestLogin = useAuthStore((state) => state.guestLogin); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigator = useNavigate();

  const HandleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await login(email, password);
      if(res.success){
        toast.success("Login successful");
        navigator('/');
      }else{
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const HandleGuestLogin = async()=>{
    try {
      const res = await guestLogin();
      if(res.success){
        toast.success("Guest login successful");
        navigator('/');
      }else{
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Guest login failed:", error);
      toast.error("Guest login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6">
      <div className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Welcome back to Hirrd</h2>
        <p className="text-sm text-gray-400 mb-8 text-center">Log in to continue your journey.</p>

        <form className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              onChange={(e)=>{setEmail(e.target.value)}}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              onChange={(e)=>{setPassword(e.target.value)}}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-400">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            onClick={HandleSubmit} 
          >
            Sign In
          </button>
        </form>

        
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        
        <button
          onClick={HandleGuestLogin}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Continue as Guest
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
