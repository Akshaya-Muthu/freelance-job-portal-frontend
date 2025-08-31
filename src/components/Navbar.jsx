import React from 'react'
import logo from '../assets/logo.png';
import { Link, Links, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../store/auth';
import { UserNavigate } from './UserNavigate';
import { FaUser } from "react-icons/fa";
import {MdEditDocument} from 'react-icons/md'

const Navbar = () => {

  const navigate = useNavigate();
  const user = useAuthStore((state)=>state.user);

  const isAuthenticated = useAuthStore((state)=>state.isAuthenticated);
  const [userPanel, setuserPanel] = useState(false);
  // console.log(user);

  const handeBlur = ()=>{
    setTimeout(()=>{
      setuserPanel(false)
    }, 200);
  } 
  return (
    <nav className=' flex flex-row ' >
        <img src={logo} alt="Logo" className="w-35 h-25 cursor-pointer p-4" onClick={()=>{navigate('/')}} />
    
        {
        
          user?.role==="recruiter" ?   <Link to="/post-job" className='absolute top-7 right-25 md:right-40 text-xl p-2 bg-red-800 rounded-full text-white-800 text-center flex items-center md:gap-2' ><MdEditDocument /> Post job</Link> : null
        }

      { user ? 
        <Link className='rounded-full border flex items-center justify-center border-gray-950 h-10 w-10 bg-gray-600 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-white/40 cursor-pointer absolute md:right-15 right-10 top-7 '  
        onClick={()=>{setuserPanel(prev => !prev)}}
        onBlur={handeBlur}
        >
          <FaUser/>
        </Link> :
        <button className ='rounded-full border border-gray-600 h-10 w-20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-white/40 cursor-pointer absolute md:right-15 right-10 top-5 '
        onClick={()=>{navigate('/login')}}
        >LogIn
        </button> 
      }

      <div>
      {
        userPanel ? <UserNavigate/> : null
      }
      </div>

        

    </nav>
  )
}

export default Navbar