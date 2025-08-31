import { create } from 'zustand';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const useAuthStore = create((set, get) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return {
    user: storedUser || null,
    isAuthenticated: !!storedUser,

    // LOGIN
    login: async (email, password) => {
      try {
        const response = await axios.post('/auth/login', { email, password });
        set({ user: response.data, isAuthenticated: true });
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success("Logged in successfully!");
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        throw error;
      }
    },

    // LOGOUT
    logout: () => {
      try {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('user');
        toast.success("Logged out successfully!");
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },

    // REGISTER
    register: async (name, email, password) => {
      try {
        const response = await axios.post('/auth/register', { name, email, password });
        set({ user: response.data, isAuthenticated: true });
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success("Registration successful!");
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
        throw error;
      }
    },

    // ROLE SELECTION
    roleSelect: async (role) => {
      try {
        const res = await axios.post('/auth/role-selection', { role });
        const currentUser = get().user || {};
        const updatedUser = { ...currentUser, role: res.data.role };
        set({ user: updatedUser });
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success("Role updated successfully!");
        return res.data;
      } catch (err) {
        console.error("Role selection error:", err);
        toast.error("Role selection failed");
        return { success: false };
      }
    },

    // GUEST LOGIN
    guestLogin: async () => {
      try {
        const response = await axios.post('/auth/guest-login');
        set({ user: response.data, isAuthenticated: true });
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success("Guest login successful!");
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || "Guest login failed");
        throw error;
      }
    },

    // UPDATE PROFILE
    updateProfile: async (name, email, oldPassword, newPassword, confirmPassword) => {
      try {
        const response = await axios.put('/auth/updateProfile', {
          name,
          email,
          oldPassword,
          newPassword,
          confirmPassword,
        });

        set((state) => ({
          user: { ...state.user, ...response.data.user },
        }));

        localStorage.setItem('user', JSON.stringify(get().user));
        toast.success("Profile updated successfully!");
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || "Profile update failed");
        throw error;
      }
    },
  };
});

export default useAuthStore;
