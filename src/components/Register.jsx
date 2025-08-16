import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-7">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Sign-up and <span className="text-blue-600 underline underline-offset-4">apply for free</span>
          </h1>
          <p className="text-gray-600 mt-1 text-lg">
            400+ companies hiring on moclass
          </p>
        </div>
        
        {/* Social login */}
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 text-base rounded-lg font-medium hover:bg-blue-700 transition shadow mb-3">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
            className="w-5 h-5"
          />
          <span>Sign up with Google</span>
        </button>
        
        {/* Divider */}
        <div className="relative flex items-center mb-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400 text-sm bg-white px-2">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        {/* Sign up with Email */}
        <Link
          to="/signup"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition text-gray-800 text-base mb-2 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12H8m8 0a4 4 0 00-8 0m8 0a4 4 0 01-8 0M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Sign up with Email
        </Link>
        
        {/* Terms and Conditions */}
        <p className="text-xs text-gray-600 text-center">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms and Conditions
          </a>
          .
        </p>
        
        {/* Already Registered */}
        <p className="text-sm text-center mt-2">
          Already registered?{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
