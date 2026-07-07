// Auth context — provides user state + login/register/logout to the app
import { createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const value = {
    user: null,
    token: null,
    loading: false,
    isAuthenticated: false,
    login: async () => {},
    register: async () => {},
    logout: () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
