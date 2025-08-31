import { useState } from "react";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/auth";
import toast from "react-hot-toast";

export const SettingPage = () => {
  const { user, updateProfile, logout } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }
    if (
      (formData.newPassword || formData.confirmPassword) &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(
        formData.name,
        formData.email,
        formData.oldPassword,
        formData.newPassword,
        formData.confirmPassword
      );
       toast.success("Profile updated successfully");

      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://api.dicebear.com/7.x/miniavs/png?seed=Jamie&backgroundColor=d1d4f9"
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-400"
          />
          <div>
            <h3 className="text-lg font-semibold">{user?.name}</h3>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg  border-gey-600   text-white"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg  border-gey-600   text-white"
              placeholder="Email"
            />
          </div>
        </div>

        
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <p className="text-sm text-gray-400 mb-4">
            Leave empty if you don't want to change your password
          </p>
          <div className="space-y-4">
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full p-3 border  border-gey-600   text-white rounded-lg"
              placeholder="Current Password"
            />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gey-600   text-white"
              placeholder="New Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg  border-gey-600   text-white"
              placeholder="Confirm New Password"
            />
          </div>
        </div>

        
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Danger Zone
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Once you delete your account, there is no going back.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>

        
        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`px-8 py-3 text-white rounded-lg transition-all ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-105"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
