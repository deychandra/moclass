// ManageJobsTabs.jsx
import React, { useState } from "react";
import {
  MoreVertical,
  Eye,
  ArrowLeft,
  ArrowRight,
  PlusCircle,
  UploadCloud,
} from "lucide-react";



const sampleData = [
  {
    id: 1,
    title: "Associate Software Developer",
    status: "Under review",
    views: 42,
    action: "Upgrade",
  },
  // add more rows as needed
];

const StatusPill = ({ status }) => {
  const base =
    "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold";
  if (status === "Under review") return <span className={`${base} bg-blue-50 text-blue-700`}>{status}</span>;
  if (status === "Active") return <span className={`${base} bg-green-50 text-green-700`}>{status}</span>;
  if (status === "Closed") return <span className={`${base} bg-rose-50 text-rose-700`}>{status}</span>;
  return <span className={`${base} bg-gray-50 text-gray-700`}>{status}</span>;
};

export default function ManageJobsTabs() {
  const [tab, setTab] = useState("jobs"); 
  const [rows] = useState(sampleData);

  return (
    <div className="space-y-6">
   
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700">
        <div className="max-w-5xl mx-auto flex items-start gap-3">
          <div className="flex-1">
            Post unlimited listings and get access to features like boosted visibility,
            applicant contact numbers, etc., with Internshala Premium.
            <a className="font-semibold underline ml-1" href="#upgrade"> View Premium Plans now</a>
          </div>
          <div className="text-sm text-blue-600 font-medium">?</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border-b">
            <nav className="flex -mb-px space-x-6">
              <button
                onClick={() => setTab("internships")}
                className={`pb-3 pt-4 text-sm font-medium ${
                  tab === "internships"
                    ? "text-sky-600 border-b-2 border-sky-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Internships
              </button>
              <button
                onClick={() => setTab("jobs")}
                className={`pb-3 pt-4 text-sm font-medium ${
                  tab === "jobs"
                    ? "text-sky-600 border-b-2 border-sky-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Jobs
              </button>
            </nav>
          </div>

         
          <div className="py-6">
            <div className="overflow-hidden rounded-md">
              <div className="grid grid-cols-[1.8fr_1fr_120px_120px_160px_48px] gap-4 items-center text-sm text-gray-500 px-4 py-3 bg-gray-50 border-b">
                <div className="font-semibold">JOB TITLE</div>
                <div className="font-semibold">STATUS</div>
                <div className="font-semibold">TOTAL VIEWS</div>
                <div className="font-semibold">ACTION</div>
                <div className="font-semibold">UPGRADE TO PREMIUM</div>
                <div className="sr-only">menu</div>
              </div>

             
              <div className="bg-white">
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="grid grid-cols-[1.8fr_1fr_120px_120px_160px_48px] gap-4 items-center px-4 py-6 border-b last:border-b-0"
                  >
                    <div className="text-gray-800">{r.title}</div>

                    <div>
                      <StatusPill status={r.status} />
                    </div>

                    <div className="text-gray-600">{r.views}</div>

                    <div>
                    
                      <button className="text-sm font-semibold text-sky-600 hover:underline inline-flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Upgrade
                      </button>
                    </div>

                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">👑</span>
                          <span className="underline text-sky-600">Upgrade</span>
                        </span>
                        <div className="text-xs text-gray-400">(get priority approval)</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <button
                        title="More actions"
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="more"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}

             
                {rows.length === 0 && (
                  <div className="p-8 text-center text-gray-500">No listings yet</div>
                )}
              </div>
            </div>

      
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
              <button className="p-2 rounded hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="px-3">1 / 1</div>
              <button className="p-2 rounded hover:bg-gray-100">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
