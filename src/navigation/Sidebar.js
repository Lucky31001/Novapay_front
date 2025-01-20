import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaUser } from 'react-icons/fa';
import apiInstance from '../config/api';

const Sidebar = ({ visible, toggleSidebar }) => {
    const token = apiInstance.token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        apiInstance.setToken('');
        window.location.href = '/login';
    };

    return (
        <div className={`fixed top-0 left-0 h-full w-52 bg-gray-800 text-white p-5 shadow-lg transform transition-transform ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
            <button className="absolute top-4 right-4 text-white" onClick={toggleSidebar}>
                <FaTimes size={24} />
            </button>
            <ul className="mt-16 space-y-5">
                {!token && (
                    <>
                        <li><Link to="/register" className="text-white font-bold hover:text-green-400">Register</Link></li>
                        <li><Link to="/login" className="text-white font-bold hover:text-green-400">Login</Link></li>
                    </>
                )}
            </ul>
            {token && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <Link to="/me" className="text-white hover:text-green-400">
                        <FaUser size={24} />
                    </Link>
                    <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;