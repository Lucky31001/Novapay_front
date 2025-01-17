import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import PrivateRoute from "./navigation/PrivateRoutes";
import Profile from "./user/Profile";

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <nav>
            <ul>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/me">Profile</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;