import React from "react";
import { ShieldCheck, Mail } from "lucide-react";

const OtpGenerator = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-8">
        {/* Icon + Title */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            Enter the 6-digit code we sent to{" "}
            <span className="font-medium flex items-center justify-center gap-1 text-gray-800">
              <Mail className="w-4 h-4 text-blue-600" /> your@email.com
            </span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-3">
          {[...Array(6)].map((_, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="•"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-400 cursor-not-allowed transition duration-300">
          Verify OTP
        </button>

        {/* Resend Option */}
        <div className="text-center text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <span className="text-blue-600 font-medium hover:underline cursor-pointer">
            Resend OTP
          </span>
        </div>

        {/* Change Email */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Wrong email? </span>
          <a href="/signup" className="text-blue-600 hover:underline">
            Change it
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpGenerator;
