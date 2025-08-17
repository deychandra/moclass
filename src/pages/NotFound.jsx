import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {/* Icon */}
      <AlertTriangle className="w-20 h-20 text-red-500 mb-6 animate-bounce" />

      {/* 404 Text */}
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        The page you're looking for doesn’t exist or has been moved. Please
        check the URL or return to the homepage.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
