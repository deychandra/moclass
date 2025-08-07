import { useState } from "react";
import { Briefcase, MapPin, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const tabs = [
  "Big brands",
  "Work from home",
  "Part-time",
  "MBA",
  "Engineering",
  "Media",
  "Design",
  "Data Science",
];

const jobsData = {
  "Big brands": [
    {
      title: "Technician For Solar Installation",
      company: "Lishanth Enterprises",
      location: "Guntur, Visakhapatnam, Vijayawada",
      salary: "₹2,00,000 - ₹4,20,000 /year",
    },
    {
      title: "Junior Architect",
      company: "California Burrito",
      location: "Bangalore",
      salary: "₹3,00,000 - ₹3,50,000 /year",
    },
    {
      title: "Corporate Sales Executive",
      company: "IREED Academy India Pvt Ltd",
      location: "Amaravati, Ongole, Andhra Pradesh",
      salary: "₹2,40,000 - ₹4,00,000 /year",
    },
    {
      title: "Corporate Sales Manager",
      company: "SBI Life Insurance",
      location: "Gurgaon",
      salary: "₹3,50,000 - ₹4,60,000 /year",
    },
  ],
  "Work from home": [],
  "Part-time": [],
  MBA: [],
  Engineering: [],
  Media: [],
  Design: [],
  "Data Science": [],
};

export default function JobTabs() {
  const [activeTab, setActiveTab] = useState("Big brands");

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          What are you looking for today?
        </h2>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition 
                ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobsData[activeTab]?.length > 0 ? (
            jobsData[activeTab].map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
              >
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium mb-2 inline-block">
                  Actively hiring
                </span>
                <h3 className="text-base font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center text-sm text-gray-500 gap-1 mb-1">
                  <MapPin className="w-4 h-4" /> {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <IndianRupee className="w-4 h-4" /> {job.salary}
                </div>
                <Link
                  to={`/jobs/${index}`}
                  className="mt-4 text-blue-600 hover:underline text-sm font-medium"
                >
                  View details →
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No jobs available under "{activeTab}"
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
