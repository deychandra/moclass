import React from "react";
import JobTabs from "./jobsData";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, User } from "lucide-react";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 sm:pt-20 pb-20 sm:pb-32 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-64 sm:w-80 h-64 sm:h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 -left-32 w-48 sm:w-60 h-48 sm:h-60 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Find Your Dream{" "}
                <span className="text-[#1e3a5f]">Internship</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Connect with top companies and kickstart your career with
                meaningful internship opportunities. Over{" "}
                <span className="font-semibold">10,000+</span> internships
                available across various domains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Link
                  to="/find-internships"
                  className="bg-[#1e3a5f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-900 transition-all transform hover:scale-105 w-full sm:w-auto text-center"
                >
                  Find Internships
                </Link>
                <Link
                  to="/post-internship"
                  className="border-2 border-[#1e3a5f] text-[#1e3a5f] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#1e3a5f] hover:text-white transition-all w-full sm:w-auto text-center"
                >
                  Post Internship
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    Your Dashboard
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        Application Submitted
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Google - SWE Intern
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-xl">
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        Interview Scheduled
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Tomorrow at 2:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-purple-50 rounded-xl">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        Profile Matched
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        5 new opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose MoclassName?
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              We connect talented students with leading companies to create
              meaningful internship experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                10,000+ Opportunities
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Thousands of internship opportunities across various industries
                and domains to match your interests.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 
                      001.745-.723 3.066 3.066 0 
                      013.976 0 3.066 3.066 0 
                      001.745.723 3.066 3.066 0 
                      012.812 2.812c.051.643.304 
                      1.254.723 1.745a3.066 3.066 
                      0 010 3.976 3.066 3.066 0 
                      00-.723 1.745 3.066 3.066 
                      0 01-2.812 2.812 3.066 3.066 0 
                      00-1.745.723 3.066 3.066 0 
                      01-3.976 0 3.066 3.066 0 
                      00-1.745-.723 3.066 3.066 0 
                      01-2.812-2.812 3.066 3.066 0 
                      00-.723-1.745 3.066 3.066 0 
                      010-3.976 3.066 3.066 0 
                      00.723-1.745 3.066 3.066 0 
                      012.812-2.812zm7.44 5.252a1 1 
                      0 00-1.414-1.414L9 10.586 
                      7.707 9.293a1 1 0 
                      00-1.414 1.414l2 2a1 1 0 
                      001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Verified Companies
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                All our partner companies are verified and trusted, ensuring
                safe and legitimate internship experiences.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 
                    1 0 011 1v2a1 1 0 
                    01-1 1H4a1 1 0 
                    01-1-1V4zM3 10a1 1 0 
                    011-1h6a1 1 0 011 1v6a1 
                    1 0 01-1 1H4a1 1 0 
                    01-1-1v-6zM14 9a1 1 0 
                    00-1 1v6a1 1 0 001 1h2a1 
                    1 0 001-1v-6a1 1 0 
                    00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Easy Application
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Simple and streamlined application process. Apply to multiple
                internships with just one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Popular Categories
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
              Explore internships across different domains
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 sm:p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
              <h3 className="text-lg font-semibold mb-1 sm:mb-2">Technology</h3>
              <p className="text-blue-100 text-xs sm:text-sm mb-2 sm:mb-3">
                Software Development, AI/ML, Data Science
              </p>
              <p className="text-lg sm:text-xl font-bold">2,500+ jobs</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 sm:p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
              <h3 className="text-lg font-semibold mb-1 sm:mb-2">Marketing</h3>
              <p className="text-green-100 text-xs sm:text-sm mb-2 sm:mb-3">
                Digital Marketing, Content, Social Media
              </p>
              <p className="text-lg sm:text-xl font-bold">1,800+ jobs</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 sm:p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
              <h3 className="text-lg font-semibold mb-1 sm:mb-2">Design</h3>
              <p className="text-purple-100 text-xs sm:text-sm mb-2 sm:mb-3">
                UI/UX, Graphic Design, Product Design
              </p>
              <p className="text-lg sm:text-xl font-bold">1,200+ jobs</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 sm:p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
              <h3 className="text-lg font-semibold mb-1 sm:mb-2">Finance</h3>
              <p className="text-orange-100 text-xs sm:text-sm mb-2 sm:mb-3">
                Investment Banking, Fintech, Consulting
              </p>
              <p className="text-lg sm:text-xl font-bold">900+ jobs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Tabs */}
      <JobTabs />

      {/* CTA Section */}
      <section className="py-14 sm:py-20 bg-[#1e3a5f] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100">
            Join thousands of students who have found their dream internships
            through MoclassName
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-white text-[#1e3a5f] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto">
              Create Your Profile
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a5f] transition-colors w-full sm:w-auto">
              Browse Internships
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
