import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import apiInstance from '../config/api';
import { ThemeContext } from '../context/ThemeContext';

const Sidebar = ({ visible, toggleSidebar }) => {
  const apiToken = apiInstance.token;
  const localToken = localStorage.getItem('token');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    apiInstance.setToken('');
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, toggleSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-52 p-5 shadow-lg transform transition-transform ${visible ? 'translate-x-0' : '-translate-x-full'} z-10 ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}`}
    >
      <button
        className="absolute top-4 right-4 text-white"
        onClick={toggleSidebar}
      >
        <FaTimes size={24} />
      </button>
      <ul className="mt-16 space-y-5">
        {(!apiToken || !localToken) && (
          <>
            <li>
              <Link
                to="/register"
                className="text-white font-bold hover:text-green-400"
              >
                Créé un compte
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white font-bold hover:text-green-400"
              >
                Se connecter
              </Link>
            </li>
          </>
        )}
      </ul>
      {(apiToken || localToken) && (
        <>
          <ul className="mt-16 space-y-5">
            <li>
              <Link
                to="/my-accounts"
                className="text-white font-bold hover:text-green-400"
              >
                Mes comptes
              </Link>
            </li>
            <li>
              <Link
                to="/depots"
                className="text-white font-bold hover:text-green-400"
              >
                Mes depots
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Link to="/me" className="text-white hover:text-green-400">
              <FaUser size={24} />
            </Link>
            <button className="text-white" onClick={handleLogout}>
              <FaSignOutAlt size={24} />
            </button>
          </div>
        </>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center">
        <span className="mr-2">Light</span>
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <span className="slider round"></span>
        </label>
        <span className="ml-2">Dark</span>
      </div>
    </div>
  );
};

export default Sidebar;
