import React from "react";

const PostInternship = () => {
  return (
    <>
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
              Hire Interns & Freshers{" "}
              <span className="text-blue-600 italic">faster</span>
            </h1>
            <p className="text-gray-600 mt-3">
              Post Internships for <strong>Free</strong> & Hire Talent with up
              to 2 Years of Experience
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm border">
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Official Email Id"
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
              <input
                type="password"
                placeholder="Password (Min 6 characters)"
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 border rounded-lg px-4 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 border rounded-lg px-4 py-2 text-sm"
                />
              </div>
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700"
              >
                Post for Free
              </button>
            </form>
            <p className="mt-3 text-sm text-center text-gray-500">
              Already registered?{" "}
              <a href="#" className="text-blue-600">
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
