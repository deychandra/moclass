import React, { useState } from 'react';
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
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedStipend, setSelectedStipend] = useState('All');
  const [savedInternships, setSavedInternships] = useState(new Set());

  const categories = [
    'All', 'Web Development', 'Mobile App Development', 'Data Science', 
    'Digital Marketing', 'Graphic Design', 'Content Writing', 'UI/UX Design',
    'Business Development', 'Human Resources', 'Finance', 'Operations'
  ];

  const locations = [
    'All', 'Work From Home', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 
    'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida'
  ];

  const durations = ['All', '1 Month', '2 Months', '3 Months', '4 Months', '5 Months', '6 Months'];
  const stipendRanges = ['All', 'Unpaid', '< ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', '₹20,000+'];

  const internships = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp Solutions',
      logo: 'TC',
      location: 'Work From Home',
      stipend: '₹15,000',
      duration: '3 Months',
      startDate: 'Immediately',
      applicants: 156,
      tags: ['React', 'JavaScript', 'CSS'],
      isActive: true,
      rating: 4.5,
      reviews: 234,
      description: 'Work on exciting web applications and gain hands-on experience with modern frontend technologies.',
      requirements: ['React.js', 'JavaScript ES6+', 'HTML/CSS', 'Git'],
      perks: ['Certificate', 'Letter of Recommendation', 'Flexible hours']
    },
    {
      id: 2,
      title: 'Digital Marketing Intern',
      company: 'MarketGuru Inc',
      logo: 'MG',
      location: 'Mumbai',
      stipend: '₹12,000',
      duration: '2 Months',
      startDate: '15 Jan 2025',
      applicants: 89,
      tags: ['SEO', 'Social Media', 'Analytics'],
      isActive: true,
      rating: 4.2,
      reviews: 156,
      description: 'Learn digital marketing strategies and work on real campaigns for top brands.',
      requirements: ['Basic marketing knowledge', 'Social media savvy', 'Google Analytics'],
      perks: ['Certificate', 'Performance bonus', 'Mentorship']
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'DataMinds Analytics',
      logo: 'DA',
      location: 'Bangalore',
      stipend: '₹25,000',
      duration: '6 Months',
      startDate: '1 Feb 2025',
      applicants: 234,
      tags: ['Python', 'Machine Learning', 'SQL'],
      isActive: true,
      rating: 4.7,
      reviews: 89,
      description: 'Work on cutting-edge ML projects and gain experience with real-world data problems.',
      requirements: ['Python', 'Statistics', 'SQL', 'Machine Learning basics'],
      perks: ['Certificate', 'Job opportunity', 'Industry projects']
    },
    {
      id: 4,
      title: 'UI/UX Design Intern',
      company: 'DesignStudio Pro',
      logo: 'DS',
      location: 'Work From Home',
      stipend: '₹8,000',
      duration: '4 Months',
      startDate: 'Immediately',
      applicants: 67,
      tags: ['Figma', 'Adobe XD', 'Prototyping'],
      isActive: true,
      rating: 4.3,
      reviews: 123,
      description: 'Design beautiful user interfaces and improve user experience for mobile and web applications.',
      requirements: ['Figma', 'Design thinking', 'User research', 'Prototyping'],
      perks: ['Certificate', 'Portfolio building', 'Design tools access']
    },
    {
      id: 5,
      title: 'Business Development Associate',
      company: 'GrowthVentures Ltd',
      logo: 'GV',
      location: 'Delhi',
      stipend: '₹18,000',
      duration: '3 Months',
      startDate: '20 Jan 2025',
      applicants: 123,
      tags: ['Sales', 'Communication', 'CRM'],
      isActive: true,
      rating: 4.1,
      reviews: 67,
      description: 'Drive business growth through strategic partnerships and client relationships.',
      requirements: ['Communication skills', 'Sales aptitude', 'MS Office', 'CRM knowledge'],
      perks: ['Certificate', 'Commission bonus', 'Client exposure']
    },
    {
      id: 6,
      title: 'Content Writing Intern',
      company: 'ContentCrafters',
      logo: 'CC',
      location: 'Work From Home',
      stipend: '₹10,000',
      duration: '2 Months',
      startDate: 'Immediately',
      applicants: 45,
      tags: ['Writing', 'SEO', 'Research'],
      isActive: true,
      rating: 4.4,
      reviews: 91,
      description: 'Create engaging content for websites, blogs, and social media platforms.',
      requirements: ['Excellent writing skills', 'SEO knowledge', 'Research abilities', 'WordPress'],
      perks: ['Certificate', 'Published articles', 'Writing portfolio']
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'All' || internship.location === selectedLocation;
    const matchesDuration = selectedDuration === 'All' || internship.duration === selectedDuration;
    
    return matchesSearch && matchesLocation && matchesDuration;
  });

  const toggleSaveInternship = (id) => {
    const newSaved = new Set(savedInternships);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedInternships(newSaved);
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
          Apply Now
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
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>

            {/* Search Button */}
            <button className="bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-medium w-full lg:w-auto">
              Search
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border rounded-md">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-3 py-2 border rounded-md">
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
              <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)} className="px-3 py-2 border rounded-md">
                {durations.map(d => <option key={d}>{d}</option>)}
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
            {filteredInternships.length} Internships Found
          </h1>
          <select className="px-3 py-2 border rounded-md">
            <option>Latest</option>
            <option>Stipend (High to Low)</option>
            <option>Stipend (Low to High)</option>
            <option>Duration</option>
          </select>
        </div>

        {/* Internship List */}
        <div className="space-y-4">
          {filteredInternships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindInternship;
