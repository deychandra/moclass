// ForgotPassword.jsx
import React from "react";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-8">
        {/* Back */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
          <p className="text-gray-600">
            Enter your email address and we’ll send you a link to reset your password.
          </p>
        </div>

        {/* Email Input (static) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              readOnly
            />
          </div>
          <p className="text-xs text-gray-500">
            (Static demo — input is read-only. Wire it up later.)
          </p>
        </div>

        {/* Submit (static) */}
        <button
          className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition font-medium shadow"
          disabled
          title="Static demo"
        >
          Send Reset Link
        </button>

        {/* Footer links */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Remembered your password?</span>{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
