import React, { useContext } from "react";
import { userContext } from "../../store";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  Bookmark,
  User,
  FileText,
  PlusCircle,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(userContext);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a5f] text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded-lg"
          >
            <User className="w-5 h-5" /> Profile
          </Link>
          {user.userType === "student" && (
            <>
              <Link
                to="/dashboard/applications"
                className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded-lg"
              >
                <FileText className="w-5 h-5" /> My Applications
              </Link>
              <Link
                to="/dashboard/saved"
                className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded-lg"
              >
                <Bookmark className="w-5 h-5" /> Saved Jobs
              </Link>
            </>
          )}
          {user.userType === "employee" && (
            <>
              <Link
                to="/dashboard/post-job"
                className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded-lg"
              >
                <PlusCircle className="w-5 h-5" /> Post a Job
              </Link>
              <Link
                to="/dashboard/manage-jobs"
                className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded-lg"
              >
                <Briefcase className="w-5 h-5" /> Manage Jobs
              </Link>
            </>
          )}
          <Link
            to="/dashboard/interviews"
            className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded-lg"
          >
            <Calendar className="w-5 h-5" /> Interviews
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Welcome back, {user.name || "User"} 👋
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Applications</h3>
            <p className="text-2xl font-bold text-[#1e3a5f]">12</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Interviews</h3>
            <p className="text-2xl font-bold text-[#1e3a5f]">3</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Saved Jobs</h3>
            <p className="text-2xl font-bold text-[#1e3a5f]">5</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Profile Views</h3>
            <p className="text-2xl font-bold text-[#1e3a5f]">89</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>Application submitted to Google SWE Intern</li>
            <li>Interview scheduled with Microsoft - Tomorrow 3 PM</li>
            <li>You saved a job: Product Designer @ Figma</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
