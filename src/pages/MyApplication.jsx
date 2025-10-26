// // import React, { useState, useEffect, useContext } from "react";
// // import { userContext } from "../../store";
// // import EmployerService from "../services/employer.service";

// // // ✅ Reusable status pill
// // const StatusPill = ({ status }) => {
// //   const base =
// //     "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
// //   if (status === "Hired")
// //     return <span className={`${base} bg-green-50 text-green-700`}>{status}</span>;
// //   if (status === "Under review")
// //     return <span className={`${base} bg-blue-50 text-blue-700`}>{status}</span>;
// //   if (status === "Rejected")
// //     return <span className={`${base} bg-rose-50 text-rose-700`}>{status}</span>;
// //   return <span className={`${base} bg-gray-50 text-gray-700`}>{status}</span>;
// // };

// // export default function ManageJobsTabs() {
// //   const [applications, setApplications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const { user } = useContext(userContext);

// //   useEffect(() => {
// //     const fetchApplications = async () => {
// //       try {
// //         const res = await EmployerService.getPostByUserId(user.id);
// //         if (res.data.success && Array.isArray(res.data.data)) {
// //           const mapped = res.data.data.map((post) => ({
// //             id: post._id,
// //             company: post.employer?.organizationName || "Unknown Company",
// //             profile: post.title || "Web Development Internship",
// //             appliedOn: post.createdAt
// //               ? new Date(post.createdAt).toLocaleDateString("en-GB", {
// //                   day: "2-digit",
// //                   month: "short",
// //                   year: "numeric",
// //                 })
// //               : "-",
// //             applicants: post.views || 0,
// //             status: post.status || "Under review",
// //           }));
// //           setApplications(mapped);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching applications:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (user?.id) fetchApplications();
// //   }, [user]);

// //   return (
// //     <div className="max-w-6xl mx-auto py-10 space-y-6">
// //       {/* ✅ Yellow alert banner */}
// //       <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
// //         <span className="font-semibold">⚠ Facing an issue with an employer?</span>
// //         <a href="#report" className="underline font-medium hover:text-amber-900">
// //           Report suspicious behaviour
// //         </a>
// //       </div>

// //       {/* Heading */}
// //       <h2 className="text-xl font-semibold text-center">My applications</h2>

// //       {/* Table */}
// //       <div className="overflow-hidden border rounded-lg">
// //         <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1.2fr_1.5fr_1.5fr] bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-3">
// //           <div>COMPANY</div>
// //           <div>PROFILE</div>
// //           <div>APPLIED ON</div>
// //           <div>NUMBER OF APPLICANTS</div>
// //           <div>APPLICATION STATUS</div>
// //           <div>REVIEW APPLICATION</div>
// //         </div>

// //         <div className="bg-white divide-y">
// //           {loading ? (
// //             <div className="p-8 text-center text-gray-500">Loading...</div>
// //           ) : applications.length > 0 ? (
// //             applications.map((app) => (
// //               <div
// //                 key={app.id}
// //                 className="grid grid-cols-[1.5fr_1.5fr_1fr_1.2fr_1.5fr_1.5fr] items-center px-6 py-4 text-sm"
// //               >
// //                 <div className="text-gray-800">{app.company}</div>
// //                 <div className="text-sky-600 underline">{app.profile}</div>
// //                 <div className="text-gray-600">{app.appliedOn}</div>
// //                 <div className="text-gray-600">{app.applicants}</div>

// //                 {/* Status with view certificate */}
// //                 <div className="flex flex-col gap-1">
// //                   <StatusPill status={app.status} />
// //                   {app.status === "Hired" && (
// //                     <a
// //                       href="#certificate"
// //                       className="text-sky-600 text-xs hover:underline"
// //                     >
// //                       View certificate
// //                     </a>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <a
// //                     href="#review"
// //                     className="text-sky-600 text-sm hover:underline"
// //                   >
// //                     Ace this internship
// //                   </a>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="p-8 text-center text-gray-500">
// //               No applications found
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // components/MyApplications.js
// import React, { useEffect, useState } from "react";
// import JobService from "../services/employer.service";
// import { MapPin, IndianRupee, Briefcase, Calendar } from "lucide-react";
// import { Link } from "react-router-dom";
// // ✅ Reusable status pill
// const StatusPill = ({ status }) => {
//   const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
//   if (status === "Hired" || status === "accepted")
//     return <span className={`${base} bg-green-50 text-green-700`}>{status}</span>;
//   if (status === "Under review" || status === "pending")
//     return <span className={`${base} bg-blue-50 text-blue-700`}>{status}</span>;
//   if (status === "Rejected" || status === "rejected")
//     return <span className={`${base} bg-rose-50 text-rose-700`}>{status}</span>;
//   return <span className={`${base} bg-gray-50 text-gray-700`}>{status}</span>;
// };

// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await JobService.getUserAppliedJobs();
//         if (response.data.success) {
//           setApplications(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//         setError("Failed to fetch your applications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-10">Loading your applications...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto py-10 space-y-6">
//       {/* ✅ Yellow alert banner */}
//       <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
//         <span className="font-semibold">⚠ Facing an issue with an employer?</span>
//         <a href="#report" className="underline font-medium hover:text-amber-900">
//           Report suspicious behaviour
//         </a>
//       </div>

//       {/* Heading */}
//       <h2 className="text-xl font-semibold text-center">My applications</h2>

//       {/* Table */}
//       <div className="overflow-hidden border rounded-lg">
//         <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1.2fr_1.5fr_1.5fr] bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-3">
//           <div>COMPANY</div>
//           <div>PROFILE</div>
//           <div>APPLIED ON</div>
//           <div>SALARY RANGE</div>
//           <div>APPLICATION STATUS</div>
//           <div>REVIEW APPLICATION</div>
//         </div>

//         <div className="bg-white divide-y">
//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading...</div>
//           ) : applications.length > 0 ? (
//             applications.map((application) => (
//               <div
//                 key={application.applicationId}
//                 className="grid grid-cols-[1.5fr_1.5fr_1fr_1.2fr_1.5fr_1.5fr] items-center px-6 py-4 text-sm"
//               >
//                 <div className="text-gray-800">{application.job.employer.organizationName}</div>
//                 <div className="text-sky-600 underline">{application.job.title}</div>
//                 <div className="text-gray-600">
//                   {new Date(application.appliedAt).toLocaleDateString("en-GB", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </div>
//                 <div className="text-gray-600">
//                   ₹{application.job.fixedPayMin} - ₹{application.job.fixedPayMax}
//                 </div>

//                 {/* Status with view certificate */}
//                 <div className="flex flex-col gap-1">
//                   <StatusPill status={application.status} />
//                   {application.status === "Hired" || application.status === "accepted" ? (
//                     <a
//                       href="#certificate"
//                       className="text-sky-600 text-xs hover:underline"
//                     >
//                       View certificate
//                     </a>
//                   ) : null}
//                 </div>

//                 <div>
//                   <Link
//                     to={`/jobs/${application.job._id}`}
//                     className="text-sky-600 text-sm hover:underline"
//                   >
//                     Datails
//                   </Link>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-8 text-center text-gray-500">
//               No applications found
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyApplications;
import React, { useEffect, useState } from "react";
import JobService from "../services/employer.service";
import { Link } from "react-router-dom";

// ✅ Reusable status pill
const StatusPill = ({ status }) => {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  if (status === "Hired" || status === "accepted")
    return <span className={`${base} bg-green-50 text-green-700`}>{status}</span>;
  if (status === "Under review" || status === "pending")
    return <span className={`${base} bg-blue-50 text-blue-700`}>{status}</span>;
  if (status === "Rejected" || status === "rejected")
    return <span className={`${base} bg-rose-50 text-rose-700`}>{status}</span>;
  return <span className={`${base} bg-gray-50 text-gray-700`}>{status}</span>;
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 1; // items per page

  const fetchApplications = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await JobService.getUserAppliedJobs(currentPage, limit);
      if (response.data.success) {
        setApplications(response.data.data);
        setTotalPages(response.data.totalPages);
        setPage(response.data.currentPage);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to fetch your applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(page);
  }, [page]);

  if (loading) {
    return <div className="text-center py-10">Loading your applications...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-6">
      {/* ✅ Alert banner */}
      <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
        <span className="font-semibold">⚠ Facing an issue with an employer?</span>
        <a href="#report" className="underline font-medium hover:text-amber-900">
          Report suspicious behaviour
        </a>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-semibold text-center">My applications</h2>

      {/* Table */}
      <div className="overflow-hidden border rounded-lg">
        <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1.2fr_1.5fr_1.5fr] bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-3">
          <div>COMPANY</div>
          <div>PROFILE</div>
          <div>APPLIED ON</div>
          <div>SALARY RANGE</div>
          <div>APPLICATION STATUS</div>
          <div>REVIEW APPLICATION</div>
        </div>

        <div className="bg-white divide-y">
          {applications.length > 0 ? (
            applications.map((application) => (
              <div
                key={application.applicationId}
                className="grid grid-cols-[1.5fr_1.5fr_1fr_1.2fr_1.5fr_1.5fr] items-center px-6 py-4 text-sm"
              >
                <div className="text-gray-800">{application.job.employer.organizationName}</div>
                <div className="text-sky-600 underline">{application.job.title}</div>
                <div className="text-gray-600">
                  {new Date(application.appliedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="text-gray-600">
                  ₹{application.job.fixedPayMin} - ₹{application.job.fixedPayMax}
                </div>

                <div className="flex flex-col gap-1">
                  <StatusPill status={application.status} />
                  {(application.status === "Hired" ||
                    application.status === "accepted") && (
                    <a
                      href="#certificate"
                      className="text-sky-600 text-xs hover:underline"
                    >
                      View certificate
                    </a>
                  )}
                </div>

                <div>
                  <Link
                    to={`/jobs/${application.job._id}`}
                    className="text-sky-600 text-sm hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">No applications found</div>
          )}
        </div>
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
    </div>
  );
};

export default MyApplications;
