import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LandingPage from "./LandingPage";

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-700 text-white overflow-hidden">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        {/* Subtle glowing accents */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>

        {/* Content above background */}
        <div className="relative z-10">
          <Navbar />
          <LandingPage />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
