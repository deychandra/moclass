import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Sign-up and <span className="text-blue-600 underline underline-offset-4">apply for free</span>
        </h1>
        <p className="text-gray-700 mt-2 text-lg">
          400+ companies hiring on moclass
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
   
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition mb-4">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

      
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md font-medium hover:bg-gray-50 transition mb-4">
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
        </button>

    
        <p className="text-xs text-gray-600 text-center">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms and Conditions
          </a>
          .
        </p>

       
        <p className="text-sm text-center mt-4">
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
