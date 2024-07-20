import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';
import Footer from './../Footer/index.jsx';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode || 'system';
  });

  useEffect(() => {
    if (darkMode === 'system') {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDarkScheme.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (darkMode === 'dark') {
      setDarkMode('light');
    } else if (darkMode === 'light') {
      setDarkMode('system');
    } else {
      setDarkMode('dark');
    }
  };

  const renderIcon = () => {
    if (darkMode === 'dark') {
      return <MoonIcon className="w-4 h-4 text-black" />;
    } else if (darkMode === 'light') {
      return <SunIcon className="w-6 h-6 text-yellow-400" />;
    } else {
      return <ComputerDesktopIcon className="w-4 h-4  text-black" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 dark:bg-black">
      <button
        onClick={toggleDarkMode}
        className="p-1 m-2 bg-white dark:bg-gray-700 text-black dark:text-white rounded fixed top-16 right-2 hover:bg-blue-600"
      >
        {renderIcon()}
      </button>
      <main className="flex flex-col items-center mt-20 flex-grow transition-colors duration-500 dark:bg-black">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
