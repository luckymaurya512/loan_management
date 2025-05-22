import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider Component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Mock login function - in a real app, this would connect to your backend
  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, any email with admin will be an admin user
        const admin = email.includes('admin');
        
        // Generate a unique ID based on the email
        const userId = admin ? 'admin-' + Date.now() : 'user-' + Date.now();
        
        // Store user in localStorage for persistence
        const user = { 
          id: userId, 
          email, 
          name: admin ? 'Admin User' : 'Regular User',
          role: admin ? 'admin' : 'user'
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        setIsAdmin(admin);
        resolve(user);
      }, 1000);
    });
  };

  // Mock register function
  const register = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Generate a unique ID for the new user
        const userId = 'user-' + Date.now();
        
        const user = { 
          id: userId, 
          email, 
          name,
          role: 'user'
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        setIsAdmin(false);
        resolve(user);
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAdmin(false);
  };

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      setIsAdmin(parsedUser.role === 'admin');
    }
    setLoading(false);
  }, []);

  // Context value
  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}