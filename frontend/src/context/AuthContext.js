// Auth context — Zustand store for auth state
import api from '../api/axiosInstance';
import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useAuthStore = create((set) => ({
  authUser: null,
  setAuthUser: (user) => set({ authUser: user }),
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await api.post('/auth/refresh');
      if (response.status === 200) {
        // Store the new access token
        localStorage.setItem('accessToken', response.data.accessToken);
        set({ authUser: response.data, isCheckingAuth: false });
      } else {
        set({ authUser: null, isCheckingAuth: false });
      }
    } catch (error) {
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post('/auth/register', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      toast.success('Account created successfully!');
      set({ authUser: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating account.');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      toast.success('Logged in successfully!');
      set({ authUser: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error logging in.');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('accessToken');
      set({ authUser: null });
      toast.success('Logged out successfully!');
    } catch (err) {
      toast.error('Error logging out.');
    }
  },
}));
