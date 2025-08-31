import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left - Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">Job Arch</h2>
          <p className="text-sm mt-1">Connecting talent with opportunity 💼</p>
        </div>

        {/* Center - Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Jobs</a>
          <a href="#" className="hover:text-white transition">Post a Job</a>
          <a href="#" className="hover:text-white transition">About</a>
        </div>

        {/* Right - Socials */}
        <div className="flex gap-4 text-lg">
          <a href="https://github.com/Akshaya-Muthu" className="hover:text-white transition"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/akshayamuthu/" className="hover:text-white transition"><FaLinkedin /></a>
        </div>
      </div>

      {/* Bottom - Credit & Copyright */}
      <div className="text-center mt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} JobPort. All rights reserved.
        <br />
        Made with love ❤️ by <span className="text-white font-medium">Akshaya</span>
      </div>
    </footer>
  );
};

export default Footer;
