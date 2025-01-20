import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 hover:text-blue-700 font-bold">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
