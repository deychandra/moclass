import React from "react";
import { Link } from "react-router-dom";

const PostInternship = () => {
  return (
    <>
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-4 sm:px-6 lg:px-8">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
              Hire Interns & Freshers{" "}
              <span className="text-blue-600 italic">faster</span>
            </h1>
            <p className="text-gray-600 mt-3 text-base sm:text-lg">
              Post Internships for <strong>Free</strong> & Hire Talent with up
              to 2 Years of Experience
            </p>
          </div>

          {/* Right Form */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border">
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Official Email Id"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password (Min 6 characters)"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="flex-1 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="flex-1 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Link to="/employer-profile" className="block">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Post for Free
                </button>
              </Link>
            </form>
            <p className="mt-3 text-sm text-center text-gray-500">
              Already registered?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostInternship;
