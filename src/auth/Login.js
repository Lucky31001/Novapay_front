import React, { useState } from 'react';
import api from '../config/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d).+$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must contain at least one uppercase letter and one digit');
      return;
    }
    try {
      const data = { email, password };
      const response = await api.login(data);
      console.log('Login successful:', response);
      window.location.href = '/me';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Me connecter</h2>
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Mot de passe:</label>
            <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Pas de compte ?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Créé un compte
          </a>
        </p>
      </div>
  );
};

export default Login;