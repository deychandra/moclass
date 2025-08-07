import React from 'react'
import { ArrowLeft, MapPin, IndianRupee, Clock10, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
const JobDetails = () => {
  return (
  <>
   <section className="max-w-5xl mx-auto px-4 py-10">
 
      <Link to="/" className="flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to job listings
      </Link>


      <div className="bg-white rounded-2xl shadow-md border p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Solar Panel Installation Engineer</h1>
            <p className="text-gray-600 text-sm">SunVolt Energy Solutions</p>
            <div className="flex items-center text-gray-500 text-sm mt-1 gap-1">
              <MapPin className="w-4 h-4" />
              Vizag, Guntur, Rajahmundry
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Clock10 className="w-4 h-4 text-gray-500" />
              Start Date: <span className="font-medium text-gray-800">Immediately</span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-gray-500" />
              Salary: <span className="font-medium text-gray-800">₹2.4 – 4.5 LPA</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              Experience: <span className="font-medium text-gray-800">Min 1 year</span>
            </div>
            <div className="flex items-center gap-2">
              🗓️ Apply by: <span className="font-medium text-red-600">10 Sep 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">About the Role</h2>
            <p className="text-gray-700 mb-3">
              We are hiring a skilled Solar Panel Installation Engineer to lead site operations and ensure timely,
              high-quality execution of solar PV projects. Ideal for professionals with technical expertise and strong
              problem-solving skills.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Oversee rooftop & off-grid solar panel installations</li>
              <li>Interpret electrical drawings and layouts</li>
              <li>Handle safety, testing, and quality control</li>
              <li>Guide junior technicians and ensure field coordination</li>
              <li>Report to project managers and provide regular updates</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {["Solar Equipment", "Team Leadership", "Problem Solving", "Self-learning", "Site Auditing"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Who Can Apply</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Minimum 1 year of experience in solar panel installation</li>
              <li>Diploma/BTech in EEE, Electrical or similar</li>
              <li>Must reside in Andhra Pradesh (Vizag, Guntur, etc.)</li>
              <li>Basic communication in English & Telugu</li>
              <li>Willing to travel to site locations</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">About SunVolt Energy</h2>
            <p className="text-gray-700">
              SunVolt Energy Solutions is a rapidly growing renewable energy company focused on solar infrastructure
              development. With projects across South India, our mission is to power every home and business
              sustainably through cutting-edge technology and a dedicated technical workforce.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Salary & Openings</h2>
            <p className="text-gray-700 mb-1">Annual CTC: <strong>₹2,40,000 – ₹4,50,000</strong></p>
            <p className="text-gray-700">Openings: <strong>5 positions</strong></p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-full">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default JobDetails