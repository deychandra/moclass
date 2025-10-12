import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployerService from "../services/employer.service";
import { 
  Search, MapPin, Clock, IndianRupee, Filter, Heart, Share2, 
  Star, Calendar, Users 
} from 'lucide-react';

const FindInternship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedStipend, setSelectedStipend] = useState('All');
  const [sortBy, setSortBy] = useState("Latest");
  const [savedInternships, setSavedInternships] = useState(new Set());

  const [internships, setInternships] = useState([]); 
  const [loading, setLoading] = useState(true);

  // ✅ Fetch internships dynamically
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await EmployerService.getPostList({
          search: searchQuery,
          location: selectedLocation,
          stipend: selectedStipend,
          category: selectedCategory,
          sortBy,
        });

        if (res.data.success && Array.isArray(res.data.data)) {
          const posts = res.data.data.map(post => ({
            id: post._id,
            title: post.title,
            company: post.employer?.organizationName || 
                    `${post.employer?.firstName || ""} ${post.employer?.lastName || ""}`.trim(),
            logo: post.employer?.organizationLogo
              ? post.employer.organizationLogo.slice(0, 2).toUpperCase()
              : "IN",
            location: post.jobType || "Work From Home",
            stipend: post.fixedPayMin ? `₹${post.fixedPayMin}` : "Unpaid",
            duration: "Flexible", // ✅ no duration filter, fallback text
            startDate: "Immediately",
            applicants:post.applicantsCount || 0,
            tags: (post.skillsRequired || "").split(",").filter(Boolean),
            isActive: true,
            rating: 4.2,
            reviews: 50,
            description: post.description || "",
            requirements: [],
            perks: Object.keys(post.perks || {}).filter(k => post.perks[k]),
          }));

          setInternships(posts);
        }
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [searchQuery, selectedLocation, selectedStipend, selectedCategory, sortBy]);

  const categories = [
    'All', 'Web Development', 'Mobile App Development', 'Data Science', 
    'Digital Marketing', 'Graphic Design', 'Content Writing', 'UI/UX Design',
    'Business Development', 'Human Resources', 'Finance', 'Operations'
  ];

  const locations = [
    'All', 'Work From Home', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 
    'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida'
  ];

  const stipendRanges = [
    'All', 'Unpaid', '< ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', '₹20,000+'
  ];

  // ✅ Filtering (no duration filter now)
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'All' || internship.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

   const toggleSaveInternship = async (id) => {
    try {
      if (savedInternships.has(id)) {
        // remove wishlist
        await EmployerService.removeFromWishlist(id);
        const newSaved = new Set(savedInternships);
        newSaved.delete(id);
        setSavedInternships(newSaved);
      } else {
        // add wishlist
        await EmployerService.addToWishlist(id);
        const newSaved = new Set(savedInternships);
        newSaved.add(id);
        setSavedInternships(newSaved);
      }
    } catch (error) {
      console.error("Wishlist error:", error.response?.data || error.message);
    }
  };


  const InternshipCard = ({ internship }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">{internship.logo}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{internship.title}</h3>
            <p className="text-gray-600">{internship.company}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{internship.rating} ({internship.reviews})</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            onClick={() => toggleSaveInternship(internship.id)}
            className={`p-2 rounded-full ${savedInternships.has(internship.id) ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-80`}
          >
            <Heart className={`w-4 h-4 ${savedInternships.has(internship.id) ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Share2 className="w-4 h-4" />
          </button>
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
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{internship.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{internship.startDate}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{internship.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {internship.tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
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
        
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search internships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="lg:w-64">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filters Button */}
            {/* <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button> */}

            {/* Search Button */}
            <button className="bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-medium w-full lg:w-auto">
              Search
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border rounded-md">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-3 py-2 border rounded-md">
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
              <select value={selectedStipend} onChange={(e) => setSelectedStipend(e.target.value)} className="px-3 py-2 border rounded-md">
                {stipendRanges.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {loading ? "Loading..." : `${filteredInternships.length} Internships Found`}
          </h1>
          <select 
            className="px-3 py-2 border rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Latest">Latest</option>
            <option value="StipendHighLow">Stipend (High to Low)</option>
            <option value="StipendLowHigh">Stipend (Low to High)</option>
            <option value="Duration">Duration</option>
          </select>
        </div>

        {/* Internship List */}
        <div className="space-y-4">
          {!loading && filteredInternships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindInternship;
