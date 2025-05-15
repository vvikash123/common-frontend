import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for theme management
const AppContext = createContext();

// Theme provider component to wrap around your app
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  // Check if a theme is already saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save the selected theme in localStorage
      return newTheme;
    });
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the theme context
export const useAppContext = () => {
  return useContext(AppContext);
};
