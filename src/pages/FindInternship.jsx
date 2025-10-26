import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployerService from "../services/employer.service";
import { userContext } from "../../store";
import {
  Search,
  MapPin,
  Clock,
  IndianRupee,
  Heart,
  Share2,
  Star,
  Calendar,
  Users,
} from "lucide-react";

const FindInternship = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedStipend, setSelectedStipend] = useState("All");
  const [selectedOpportunityType, setSelectedOpportunityType] =
    useState("Job"); // ✅ New filter
  const [sortBy, setSortBy] = useState("Latest");
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTrigger, setSearchTrigger] = useState(false); // ✅ used to trigger manual search

  const { user } = useContext(userContext);
  const userId = user?.id;

  // ✅ Fetch internships dynamically when filters or search are updated
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const res = await EmployerService.getPostList({
          search: searchQuery,
          location: locationFilter || selectedLocation,
          stipend: selectedStipend,
          category: selectedCategory,
          opportunityType:
            selectedOpportunityType === "All"
              ? undefined
              : selectedOpportunityType, // ✅ Added filter
          sortBy,
          userId,
          page,
          limit: 1,
        });

        if (res.data.success && Array.isArray(res.data.data)) {
          const posts = res.data.data.map((post) => ({
            id: post._id,
            title: post.title,
            company:
              post.employer?.organizationName ||
              `${post.employer?.firstName || ""} ${
                post.employer?.lastName || ""
              }`.trim(),
            logo: post.employer?.organizationLogo
              ? post.employer.organizationLogo.slice(0, 2).toUpperCase()
              : "IN",
            location: post.jobType || "Work From Home",
            stipend: post.fixedPayMin ? `₹${post.fixedPayMin}` : "Unpaid",
            duration: "Flexible",
            startDate: "Immediately",
            applicants: post.applicantsCount || 0,
            tags: (post.skillsRequired || "").split(",").filter(Boolean),
            isActive: true,
            rating: 4.2,
            reviews: 50,
            isWishlisted: post.isWishlisted || false,
            description: post.description || "",
            perks: Object.keys(post.perks || {}).filter((k) => post.perks[k]),
          }));

          setInternships(posts);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setInternships([]);
        }
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [
    searchTrigger, // ✅ re-fetch when Search button clicked
    selectedLocation,
    selectedStipend,
    selectedCategory,
    selectedOpportunityType,
    sortBy,
    page,
  ]);

  // ✅ Wishlist toggle logic with instant feedback
  const toggleSaveInternship = async (id) => {
    if (!userId) {
      alert("Please login to save internships!");
      return;
    }

    const updatedInternships = internships.map((post) =>
      post.id === id ? { ...post, isWishlisted: !post.isWishlisted } : post
    );
    setInternships(updatedInternships); // Optimistic UI update

    try {
      const post = updatedInternships.find((p) => p.id === id);
      if (post.isWishlisted) {
        await EmployerService.addToWishlist(id);
      } else {
        await EmployerService.removeFromWishlist(id);
      }
    } catch (error) {
      console.error("Wishlist API error:", error.response?.data || error.message);
      // Revert change if API fails
      setInternships((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, isWishlisted: !post.isWishlisted } : post
        )
      );
    }
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLocation =
      selectedLocation === "All" ||
      internship.location === selectedLocation ||
      internship.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const InternshipCard = ({ internship }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {internship.logo}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {internship.title}
            </h3>
            <p className="text-gray-600">{internship.company}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {internship.rating} ({internship.reviews})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            onClick={() => toggleSaveInternship(internship.id)}
            className={`p-2 rounded-full ${
              internship.isWishlisted
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            } hover:bg-opacity-80`}
          >
            <Heart
              className={`w-4 h-4 ${
                internship.isWishlisted ? "fill-current" : ""
              }`}
            />
          </button>

          {/* <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Share2 className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{internship.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <IndianRupee className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{internship.stipend}/month</span>
        </div>
        {/* <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{internship.location}</span>
        </div> */}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{internship.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{internship.startDate}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {internship.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {internship.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{internship.applicants} applicants</span>
          </div>
          {internship.isActive && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Actively hiring
            </span>
          )}
        </div>
        <button className="bg-[#1e3a5f] text-white px-6 py-2 rounded-md font-medium w-full sm:w-auto">
          <Link to={`/jobs/${internship.id}`}>Apply Now</Link>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ✅ Search & Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="lg:w-64 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ✅ Opportunity Type Dropdown */}
            <select
              value={selectedOpportunityType}
              onChange={(e) => setSelectedOpportunityType(e.target.value)}
              className="w-full lg:w-48 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>

            <button
              onClick={() => {
                setPage(1);
                setSearchTrigger((prev) => !prev); // ✅ triggers useEffect
              }}
              className="bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-medium w-full lg:w-auto"
            >
              Search
            </button>
          </div>
        </div>

        {/* Header & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {loading
              ? "Loading..."
              : `${filteredInternships.length} Opportunities Found`}
          </h1>
          <select
            className="px-3 py-2 border rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Latest">Latest</option>
            <option value="StipendHighLow">Salary(High to Low)</option>
            <option value="StipendLowHigh">Salary(Low to High)</option>
            {/* <option value="Duration">Duration</option> */}
          </select>
        </div>

        {/* Internship Cards */}
        <div className="space-y-4">
          {!loading &&
            filteredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindInternship;
