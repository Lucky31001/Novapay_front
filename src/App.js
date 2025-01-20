import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Register from './auth/Register';
import Login from './auth/Login';
import PrivateRoute from "./navigation/PrivateRoutes";
import Profile from "./user/Profile";
import NotFound from "./NotFound";
import Sidebar from './navigation/Sidebar';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
      <Router>
        <div className="flex">
          <button className="fixed top-6 left-6 text-black" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>
          <Sidebar visible={sidebarVisible} toggleSidebar={toggleSidebar} />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/me" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;