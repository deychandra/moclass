// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import EmployerService from "../services/employer.service";
// import {
//   ArrowLeft,
//   MapPin,
//   IndianRupee,
//   Clock10,
//   Briefcase,
// } from "lucide-react";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const fetchJob = async () => {
//     try {
//       console.log(id);
//       const res = await EmployerService.getPostById(id);
//       if (res.data.success) {
//         console.log(res.data.data);
//         setJob(res.data.data); // ✅ directly set the object
//       }
//     } catch (error) {
//       console.error("Error fetching job:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchJob();
// }, [id]);


//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (!job) {
//     return <div className="text-center py-10">Job not found</div>;
//   }

//   const posting = job; // pick first posting
//   if (!posting) {
//     return <div className="text-center py-10">No job details available</div>;
//   }

//   return (
//     <>
//       <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
//         <Link
//           to="/"
//           className="flex items-center text-blue-600 hover:underline mb-4 sm:mb-6 text-sm sm:text-base"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to job listings
//         </Link>

//         <div className="bg-white rounded-2xl shadow-md border p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
//                 {posting.title}
//               </h1>
//               <p className="text-gray-600 text-sm sm:text-base">
//                 {job.employer?.organizationName}
//               </p>
//               <div className="flex items-center text-gray-500 text-sm mt-1 gap-1 flex-wrap">
//                 <MapPin className="w-4 h-4" />
//                 {job.employer.organizationCity}
//               </div>
//             </div>

//             <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-700">
//               <div className="flex items-center gap-2">
//                 <Clock10 className="w-4 h-4 text-gray-500" />
//                 Start Date:{" "}
//                 <span className="font-medium text-gray-800">Immediately</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <IndianRupee className="w-4 h-4 text-gray-500" />
//                 Salary:{" "}
//                 <span className="font-medium text-gray-800">
//                   ₹{posting.fixedPayMin} – ₹{posting.fixedPayMax}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Briefcase className="w-4 h-4 text-gray-500" />
//                 Experience:{" "}
//                 <span className="font-medium text-gray-800">
//                   {posting.minExperience}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Your existing design stays same, replace hardcoded text with dynamic values */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//           <div className="col-span-2 space-y-4 sm:space-y-6">
//             <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
//               <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
//                 About the Role
//               </h2>
//               <p className="text-gray-700 text-sm sm:text-base mb-3">
//                 {posting.description}
//               </p>
//             </div>

//             <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
//               <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
//                 Skills Required
//               </h2>
//               <div className="flex flex-wrap gap-2">
//                 {(posting.skillsRequired || "")
//                   .split(",")
//                   .filter(Boolean)
//                   .map((skill) => (
//                     <span
//                       key={skill}
//                       className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4 sm:space-y-6">
//             <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
//               <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
//                 Salary & Openings
//               </h2>
//               <p className="text-gray-700 text-sm sm:text-base mb-1">
//                 Annual CTC:{" "}
//                 <strong className="block sm:inline">
//                   ₹{posting.fixedPayMin} – ₹{posting.fixedPayMax}
//                 </strong>
//               </p>
//               <p className="text-gray-700 text-sm sm:text-base">
//                 Openings: <strong>{posting.numberOfOpenings}</strong>
//               </p>
//             </div>

//             <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm flex justify-center">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium px-6 py-2 rounded-full w-full sm:w-auto">
//                 Apply Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default JobDetails;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EmployerService from "../services/employer.service";
import JobService from "../services/employer.service"; // You'll need to create this service
import {
  ArrowLeft,
  MapPin,
  IndianRupee,
  Clock10,
  Briefcase,
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJobAndStatus = async () => {
      try {
        // Fetch job details
        const res = await EmployerService.getPostById(id);
        if (res.data.success) {
          setJob(res.data.data);
        }
        
        // Check if user has already applied
        const statusRes = await JobService.checkApplyStatus(id);
        if (statusRes.data.success) {
          setAlreadyApplied(statusRes.data.applied);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // If it's an auth error, you might want to redirect to login
        if (error.response?.status === 401) {
          setMessage("Please login to apply for this job");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndStatus();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setMessage("");
    try {
      const response = await JobService.applyToJob(id);
      if (response.data.success) {
        setAlreadyApplied(true);
        setMessage("Application submitted successfully!");
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      if (error.response?.status === 400) {
        setMessage("You have already applied for this job");
        setAlreadyApplied(true);
      } else if (error.response?.status === 401) {
        setMessage("Please login to apply for this job");
      } else {
        setMessage("Failed to apply. Please try again.");
      }
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!job) {
    return <div className="text-center py-10">Job not found</div>;
  }

  const posting = job;
  if (!posting) {
    return <div className="text-center py-10">No job details available</div>;
  }

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:underline mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to job listings
        </Link>

        <div className="bg-white rounded-2xl shadow-md border p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                {posting.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {job.employer?.organizationName || "Company Name Not Available"}
              </p>
              <div className="flex items-center text-gray-500 text-sm mt-1 gap-1 flex-wrap">
                <MapPin className="w-4 h-4" />
                {job.employer?.organizationCity || "Location Not Specified"}
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Clock10 className="w-4 h-4 text-gray-500" />
                Start Date:{" "}
                <span className="font-medium text-gray-800">Immediately</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-gray-500" />
                Salary:{" "}
                <span className="font-medium text-gray-800">
                  ₹{posting.fixedPayMin} – ₹{posting.fixedPayMax}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-500" />
                Experience:{" "}
                <span className="font-medium text-gray-800">
                  {posting.minExperience}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                About the Role
              </h2>
              <p className="text-gray-700 text-sm sm:text-base mb-3">
                {posting.description}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Skills Required
              </h2>
              <div className="flex flex-wrap gap-2">
                {(posting.skillsRequired || "")
                  .split(",")
                  .filter(Boolean)
                  .map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Salary & Openings
              </h2>
              <p className="text-gray-700 text-sm sm:text-base mb-1">
                Annual CTC:{" "}
                <strong className="block sm:inline">
                  ₹{posting.fixedPayMin} – ₹{posting.fixedPayMax}
                </strong>
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                Openings: <strong>{posting.numberOfOpenings}</strong>
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm flex justify-center">
              <button
                onClick={handleApply}
                disabled={applying || alreadyApplied}
                className={`${
                  applying || alreadyApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white text-sm sm:text-base font-medium px-6 py-2 rounded-full w-full sm:w-auto`}
              >
                {alreadyApplied
                  ? "Already Applied"
                  : applying
                  ? "Applying..."
                  : "Apply Now"}
              </button>
            </div>

            {message && (
              <div className={`text-center mt-4 text-sm font-medium ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetails;