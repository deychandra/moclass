import React from "react";
import banner from "../assets/images/banner.png"
import JobTabs from "./jobsData";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="bg-gradient-to-br to-blue-50 py-10 min-h-screen flex items-center" style={{backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find Your Dream
                <span className="text-[#1e3a5f]">Internship</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with top companies and kickstart your career with
                meaningful internship opportunities. Over 10,000+ internships
                available across various domains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/find-internships" className="bg-[#1e3a5f] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1e3a5f] hover:text-white transition-all transform hover:scale-105">
                  Find Internships
                </Link>
                <Link to="/post-internship" className="border-2 border-[#1e3a5f] text-[#1e3a5f] px-8 py-4 rounded-lg font-semibold hover:bg-[#1e3a5f] hover:text-white transition-all">
                  Post Internship
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8  transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Application Submitted
                      </h3>
                      <p className="text-sm text-gray-600">
                        Your application is under review
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Interview Scheduled
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tomorrow at 2:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Profile Matched
                      </h3>
                      <p className="text-sm text-gray-600">
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MoclassName?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect talented students with leading companies to create
              meaningful internship experiences
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-moclassName-blue"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                10,000+ Opportunities
              </h3>
              <p className="text-gray-600">
                Thousands of internship opportunities across various industries
                and domains to match your interests.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Verified Companies
              </h3>
              <p className="text-gray-600">
                All our partner companies are verified and trusted, ensuring
                safe and legitimate internship experiences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Application
              </h3>
              <p className="text-gray-600">
                Simple and streamlined application process. Apply to multiple
                internships with just one click.
              </p>
            </div>
          </div>
        </div>
      </section>



      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
                <p className="text-xl text-gray-600">Explore internships across different domains</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white hover:transform hover:scale-105 transition-all cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Technology</h3>
                    <p className="text-blue-100 text-sm mb-3">Software Development, AI/ML, Data Science</p>
                    <p className="text-2xl font-bold">2,500+ jobs</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white hover:transform hover:scale-105 transition-all cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Marketing</h3>
                    <p className="text-green-100 text-sm mb-3">Digital Marketing, Content, Social Media</p>
                    <p className="text-2xl font-bold">1,800+ jobs</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white hover:transform hover:scale-105 transition-all cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Design</h3>
                    <p className="text-purple-100 text-sm mb-3">UI/UX, Graphic Design, Product Design</p>
                    <p className="text-2xl font-bold">1,200+ jobs</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white hover:transform hover:scale-105 transition-all cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Finance</h3>
                    <p className="text-orange-100 text-sm mb-3">Investment Banking, Fintech, Consulting</p>
                    <p className="text-2xl font-bold">900+ jobs</p>
                </div>
            </div>
        </div>
    </section>

    <JobTabs/>

    <section className="py-20 bg-[#1e3a5f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-blue-100">Join thousands of students who have found their dream internships through MoclassName</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#1e3a5f] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Create Your Profile
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a5f] transition-colors">
                    Browse Internships
                </button>
            </div>
        </div>
    </section>
    </>
  );
};

export default Home;
