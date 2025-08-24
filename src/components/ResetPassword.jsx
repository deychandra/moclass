// ResetPassword.jsx
import React from "react";
import { Lock, ArrowLeft, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-8">
  
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>


        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            <KeyRound className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-600">
            Enter your new password below and confirm it to continue.
          </p>
        </div>

     
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              readOnly
            />
          </div>
        </div>

        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Re-enter new password"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              readOnly
            />
          </div>
        </div>

     
        <button
          className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition font-medium shadow"
          disabled
          title="Static demo"
        >
          Update Password
        </button>

   
        <div className="text-center text-sm">
          <span className="text-gray-600">Back to</span>{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
