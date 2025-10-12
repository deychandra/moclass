import React, { useContext,useState,useEffect } from "react";
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
import ApplicationService from "../services/employer.service";
import WishlistService from "../services/employer.service";
const Dashboard = () => {
  const { user } = useContext(userContext);
 const [stats, setStats] = useState({
    applications: 0,
    interviews: 0,
    savedJobs: 0,
    profileViews: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [wishlist, setWishlist] = useState([]);
   useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        if (user.userType === "student") {
          // Fetch applications
          const applicationsResponse = await ApplicationService.getUserAppliedJobs();
          const applicationsData = applicationsResponse.data.data || [];
          setApplications(applicationsData);
          
          // Fetch wishlist
          const wishlistResponse = await WishlistService.getUserWishlist();
          const wishlistData = wishlistResponse.data.data || [];
          setWishlist(wishlistData);
          
          // Count interviews (applications with interview status)
          const interviewCount = applicationsData.filter(app => 
            app.status === 'INTERVIEW_SCHEDULED' || 
            app.status === 'INTERVIEW_COMPLETED'
          ).length;

          setStats({
            applications: applicationsData.length,
            interviews: interviewCount,
            savedJobs: wishlistData.length,
            profileViews: 89 // This would come from a different API
          });

          // Prepare recent activity
          const activity = [];
          
          // Add recent applications
          const recentApps = applicationsData.slice(0, 2);
          recentApps.forEach(app => {
            activity.push({
              type: 'application',
              message: `Applied to ${app.job?.title} at ${app.job?.employer?.organizationName}`,
              date: app.appliedAt,
              icon: <FileText className="w-4 h-4" />
            });
          });

          // Add recent wishlist items
          const recentWishlist = wishlistData.slice(0, 1);
          recentWishlist.forEach(item => {
            activity.push({
              type: 'wishlist',
              message: `Saved ${item.job?.title} at ${item.job?.employer?.organizationName}`,
              date: item.addedAt,
              icon: <Bookmark className="w-4 h-4" />
            });
          });

          // Sort by date and take latest 3
          const sortedActivity = activity
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

          setRecentActivity(sortedActivity);
        }

        // For employers, fetch different stats
        if (user.userType === "employee") {
          // You would fetch employer-specific data here
          // For example: total job posts, active applications, etc.
          setStats({
            applications: 45, // Total applications received
            interviews: 8,    // Interviews scheduled
            savedJobs: 0,     // Not applicable for employers
            profileViews: 156 // Company profile views
          });
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userType) {
      fetchDashboardData();
    }
  }, [user]);
  console.log(stats)
    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
   if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Loading skeleton remains the same */}
      </div>
    );
  }
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
                to="/myapplication"
                className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded-lg"
              >
                <FileText className="w-5 h-5" /> My Applications
              </Link>
              <Link
                to="/mywishlist"
                className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded-lg"
              >
                <Bookmark className="w-5 h-5" /> Saved Jobs
              </Link>
            </>
          )}
          {user.userType === "employee" && (
            <>
              <Link
                to="/employer-profile"
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
            <p className="text-2xl font-bold text-[#1e3a5f]">{stats.applications}</p>
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
