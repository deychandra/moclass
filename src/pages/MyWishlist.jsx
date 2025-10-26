// // components/MyWishlist.js
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import WishlistService from "../services/employer.service";
// import { MapPin, IndianRupee, Briefcase, Calendar, Heart, Trash2 } from "lucide-react";

// const MyWishlist = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const response = await WishlistService.getUserWishlist();
//         if (response.data.success) {
//           setWishlist(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//         setError("Failed to fetch your wishlist");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   const handleRemoveFromWishlist = async (jobId) => {
//     try {
//       const response = await WishlistService.removeFromWishlist(jobId);
//       if (response.data.success) {
//         // Remove the item from the local state
//         setWishlist(wishlist.filter(item => item.job._id !== jobId));
//       }
//     } catch (error) {
//       console.error("Error removing from wishlist:", error);
//       setError("Failed to remove from wishlist");
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading your wishlist...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
//         My Wishlist
//       </h1>
      
//       {wishlist.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           Your wishlist is empty. Start saving jobs you're interested in!
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {wishlist.map((item) => (
//             <div key={item.wishlistId} className="bg-white p-6 rounded-lg border shadow-sm relative">
//               <button
//                 onClick={() => handleRemoveFromWishlist(item.job._id)}
//                 className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
//                 title="Remove from wishlist"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
              
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     {item.job.title}
//                   </h2>
//                   <p className="text-gray-600">{item.job.employer.organizationName}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 <div className="flex items-center text-gray-600">
//                   <MapPin className="w-4 h-4 mr-2" />
//                   {item.job.employer.organizationCity}
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <IndianRupee className="w-4 h-4 mr-2" />
//                   ₹{item.job.fixedPayMin} - ₹{item.job.fixedPayMax}
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <Briefcase className="w-4 h-4 mr-2" />
//                   {item.job.minExperience} years experience
//                 </div>
//               </div>

//               <div className="flex items-center text-gray-500 text-sm">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 Added on: {new Date(item.addedAt).toLocaleDateString()}
//               </div>

//               <p className="mt-4 text-gray-700 line-clamp-2">{item.job.description}</p>

//               <div className="mt-4 flex flex-wrap gap-2">
//                 {item.job.skillsRequired.split(',').map((skill, index) => (
//                   <span
//                     key={index}
//                     className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
//                   >
//                     {skill.trim()}
//                   </span>
//                 ))}
//               </div>

//               <div className="mt-4 flex gap-2">
//                <Link
//                     to={`/jobs/${item.job._id}`}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
//                 >
//                     Apply Now
//                 </Link>
//                 {/* <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm">
//                   View Details
//                 </button> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyWishlist;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WishlistService from "../services/employer.service";
import { MapPin, IndianRupee, Briefcase, Calendar, Heart, Trash2 } from "lucide-react";

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 1; // Items per page

  const fetchWishlist = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await WishlistService.getUserWishlist(currentPage, limit);
      if (response.data.success) {
        setWishlist(response.data.data);
        setTotalPages(response.data.totalPages);
        setPage(response.data.currentPage);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to fetch your wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist(page);
  }, [page]);

  const handleRemoveFromWishlist = async (jobId) => {
    try {
      const response = await WishlistService.removeFromWishlist(jobId);
      if (response.data.success) {
        setWishlist((prev) => prev.filter((item) => item.job._id !== jobId));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setError("Failed to remove from wishlist");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading your wishlist...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Your wishlist is empty. Start saving jobs you're interested in!
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div key={item.wishlistId} className="bg-white p-6 rounded-lg border shadow-sm relative">
                <button
                  onClick={() => handleRemoveFromWishlist(item.job._id)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.job.title}</h2>
                    <p className="text-gray-600">{item.job.employer.organizationName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {item.job.employer.organizationCity}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <IndianRupee className="w-4 h-4 mr-2" />
                    ₹{item.job.fixedPayMin} - ₹{item.job.fixedPayMax}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {item.job.minExperience}
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Added on: {new Date(item.addedAt).toLocaleDateString()}
                </div>

                <p className="mt-4 text-gray-700 line-clamp-2">{item.job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.job.skillsRequired.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/jobs/${item.job._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-md text-sm border ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-md text-sm border ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyWishlist;
