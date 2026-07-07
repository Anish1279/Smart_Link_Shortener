// Auth context — provides user state + login/register/logout to the app
// import { createContext } from 'react';

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {

//   const value = {
//     user: null,
//     token: null,
//     loading: false,
//     isAuthenticated: false,
//     login: async () => {},
//     register: async () => {},
//     logout: () => {},
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import api from '../api/axiosInstance';


import { create } from "zustand";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  authUser: null,
  
  setAuthUser: (user) => set({ authUser: user }),
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  checkAuth: async () => {

    try {
      const response = await api.get('/auth/check-auth');
      if (response.status === 200) {
        set({ authUser: response.data.user, isCheckingAuth: false });

      } else {
        set({ authUser: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data)=>{

    set({isSigningUp:true});
    try{
      const response = await api.post('/auth/register', data);
      toast.success("Account created successfully!");
      set({authUser:response.data});
    } catch (error) {
      toast.error("Error creating account.");
    } finally {
      set({isSigningUp:false});
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post('/auth/login', data);
      toast.success('Logged in successfully!');
      set({ authUser: response.data });
    } catch (error) {
      toast.error('Error logging in.');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  loout:async()=>{

    try{
      const response = await api.post('/auth/logout');
      set({authUser:null});
      toast.success("Logged out successfully!");
    }catch(err){
      toast.error("Error logging out.");
    }
  }


      
  
}));
 