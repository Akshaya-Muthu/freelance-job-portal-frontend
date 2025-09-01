import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios"; // your centralized axios instance
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch current user data
  const getUserData = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/me"); // your endpoint to get current user
      setUserData(data.user);
      setIsLoggedIn(true);
    } catch (err) {
      setUserData(null);
      setIsLoggedIn(false);
      console.error("Get user data error:", err.response || err);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout"); // backend logout endpoint
      setUserData(null);
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err.response || err);
      toast.error("Logout failed!");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        getUserData,
        logout,
        backendURL: "https://freelance-job-portal-backend.onrender.com/api", // fallback backend URL
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
