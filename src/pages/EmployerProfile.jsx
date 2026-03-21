import React, { useState, useCallback, useEffect, useContext } from "react";
import { User, Building2 as Building, Briefcase, Check, Upload, ChevronRight, ChevronLeft } from "lucide-react";
import EmployerService from "../services/employer.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "../../store";

/* ===========================
   Reusable memoized inputs
=========================== */
const TextInput = React.memo(({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[13px] font-semibold text-gray-700">{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
  </div>
));

const TextArea = React.memo(({ label, value, onChange, placeholder, rows = 4 }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[13px] font-semibold text-gray-700">{label}</label>
    <textarea rows={rows} placeholder={placeholder} value={value} onChange={onChange} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[6rem] resize-y placeholder:text-slate-400" />
  </div>
));

/* ===========================
   Utilities
=========================== */
// const { user } = useContext(userContext);
const getInitialFormData = () => ({
  userId:"",
  firstName: "",
  lastName: "",
  email: "",
  designation: "",
  phoneNumber: "",

  organizationName: "",
  isIndependent: false,
  organizationDescription: "",
  organizationCity: "",
  industry: "",
  numberOfEmployees: "",

  opportunityType: "Job",
  jobTitle: "",
  minExperience: "0 year",
  skillsRequired: "",
  jobType: "Remote",
  partFullTime: "Full-time",
  numberOfOpenings: "",
  jobDescription: "",
  additionalPreferences: "",
  fixedPayMin: "",
  fixedPayMax: "",
  variablePayMin: "",
  variablePayMax: "",
  perks: {
    fiveDaysWeek: false,
    healthInsurance: false,
    lifeInsurance: false,
  },
  availabilityQuestion: "",
  alternateNumber: "",
});

/* ===========================
   Stepper (HOISTED)
=========================== */
const Stepper = ({ steps, currentStep, goTo }) => (
  <div className="max-w-3xl mx-auto mb-8 select-none">
    <div className="flex items-center justify-center">
      {steps.map((s, idx) => {
        const isActive = currentStep === s.id;
        const isComplete = currentStep > s.id;
        const Icon = s.icon;
        return (
          <React.Fragment key={s.id}>
            {idx > 0 && (
              <div className={`flex-1 h-[3px] max-w-20 rounded-full transition-all duration-400 ${currentStep > idx ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-slate-200'}`} />
            )}
            <button type="button" onClick={() => goTo(s.id)} className="flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer p-1 transition-transform hover:-translate-y-0.5" aria-current={isActive ? "step" : undefined}>
              <span className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm ${isActive ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-blue-500/30 shadow-lg' : isComplete ? 'border-green-500 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-green-500/25 shadow-lg' : 'border-slate-200 bg-white text-slate-400'}`}>
                {isComplete ? <Check size={18} /> : <Icon size={18} />}
              </span>
              <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${isActive ? 'text-blue-500' : isComplete ? 'text-green-600' : 'text-slate-500'}`}>{s.name}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

/* ===========================
   Step 1 (HOISTED)
=========================== */
const Step1 = ({ formData, handleInputChange, showOtp, setShowOtp, handleSavePersonal }) => (
  <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-10 shadow-lg shadow-black/5 animate-[fadeIn_0.35s_ease-out]">
    <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">Personal details</h2>
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
      <p className="text-blue-800 text-[13px] font-medium m-0">Please provide all your details to proceed.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <TextInput label="First name" placeholder="First Name" value={formData.firstName} onChange={handleInputChange("firstName")} />
      <TextInput label="Last name" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange("lastName")} />
    </div>
    <div className="mt-4"><TextInput label="E-mail" type="email" placeholder="demo@gmail.com" value={formData.email} onChange={handleInputChange("email")} /></div>
    <div className="mt-4"><TextInput label="Designation" placeholder="E.g. HR Manager" value={formData.designation} onChange={handleInputChange("designation")} /></div>
    <div className="flex flex-col gap-1 mt-4">
      <label className="text-[13px] font-semibold text-gray-700">Mobile number</label>
      <div className="flex items-stretch">
        <div className="flex items-center px-3.5 bg-indigo-50 text-indigo-600 font-semibold text-sm border border-slate-200 border-r-0 rounded-l-xl whitespace-nowrap">+91</div>
        <input type="tel" placeholder="9125346589" value={formData.phoneNumber} onChange={handleInputChange("phoneNumber")} className="flex-1 min-w-0 px-4 py-3 text-sm bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
        <button onClick={() => setShowOtp(true)} className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-sm rounded-r-xl border-none cursor-pointer whitespace-nowrap hover:shadow-lg hover:shadow-indigo-500/30 transition-all">Verify</button>
      </div>
      {showOtp && (
        <div className="mt-3 flex flex-col gap-2">
          <p className="text-xs text-slate-400 leading-relaxed m-0">We have sent an OTP to your registered mobile number. It will be valid for the next 10 minutes.</p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input type="text" placeholder="Enter OTP" className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
            <button className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-sm rounded-xl border-none cursor-pointer hover:shadow-lg hover:shadow-indigo-500/30 transition-all">Verify</button>
          </div>
        </div>
      )}
    </div>
    <div className="flex justify-end mt-8">
      <button onClick={handleSavePersonal} className="inline-flex items-center gap-1.5 px-7 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/25 border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">Next <ChevronRight size={18} /></button>
    </div>
    <div className="text-center mt-6">
      <p className="text-[13px] text-slate-500 m-0">Need help? Call us at <a href="tel:+919125346589" className="text-indigo-500 font-medium no-underline hover:underline">+91 9125346589</a>, available Mon–Fri, 10 AM – 6 PM.</p>
    </div>
  </div>
);

/* ===========================
   Step 2 (HOISTED)
=========================== */
const Step2 = ({ 
  formData, handleInputChange, goPrev, handleSaveOrganization,
  organizationLogo, setOrganizationLogo, verificationDoc, setVerificationDoc, noDocuments, setNoDocuments 
}) => (
  <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-10 shadow-lg shadow-black/5 animate-[fadeIn_0.35s_ease-out]">
    <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Organization details</h2>
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-semibold text-gray-700">Organization name</label>
        <input type="text" placeholder="Organization Name" value={formData.organizationName} onChange={handleInputChange("organizationName")} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
          <input type="checkbox" checked={formData.isIndependent} onChange={handleInputChange("isIndependent")} className="w-4 h-4 accent-indigo-500 cursor-pointer" />
          <span className="text-[13px] text-slate-500 leading-snug">I am an independent practitioner (freelancer, architect, lawyer etc.) hiring for myself and I am NOT hiring on behalf of a company.</span>
        </label>
      </div>

      <TextArea label="Organization description" placeholder="Enter a brief description" value={formData.organizationDescription} onChange={handleInputChange("organizationDescription")} />
      <TextInput label="Organization city" placeholder="e.g. Mumbai" value={formData.organizationCity} onChange={handleInputChange("organizationCity")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-semibold text-gray-700">Industry</label>
          <select value={formData.industry} onChange={handleInputChange("industry")} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer">
            <option value="">Select industry</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-semibold text-gray-700">No. of employees</label>
          <select value={formData.numberOfEmployees} onChange={handleInputChange("numberOfEmployees")} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer">
            <option value="">Select an option</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-semibold text-gray-700">Organization logo <span className="font-normal text-slate-400">(Recommended)</span></label>
        <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-8 text-center bg-gradient-to-br from-purple-50 to-indigo-50 hover:border-indigo-500 transition-colors">
          <Upload className="mx-auto mb-3 w-10 h-10 text-indigo-400" />
          <input type="file" id="organizationLogo" accept="image/jpeg,image/jpg,image/png,image/gif,image/bmp" onChange={(e) => setOrganizationLogo(e.target.files[0])} className="hidden" />
          <label htmlFor="organizationLogo" className="text-indigo-500 font-semibold text-sm cursor-pointer hover:text-indigo-700 transition-colors">Upload logo</label>
          {organizationLogo && <p className="text-green-500 text-[13px] font-medium mt-2">{organizationLogo.name}</p>}
          <p className="text-xs text-slate-400 mt-2 leading-relaxed m-0">Max file size: 1Mb | Max resolution: 500×500px | jpeg, jpg, png, gif, bmp</p>
        </div>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-1 pb-2 border-b-2 border-indigo-100 inline-block">Organization verification</h3>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-6 rounded-2xl mt-4">
        <p className="text-xs text-slate-400 leading-relaxed mb-4">Get your organization verified by submitting the below mentioned details and start posting internships/jobs.</p>
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
            <input type="radio" name="verification" defaultChecked className="w-4 h-4 accent-indigo-500 cursor-pointer" />
            <div>
              <span className="font-semibold text-slate-800 text-sm">Official company documents</span>
              <p className="text-xs text-slate-400 m-0">Verify using any government-issued business registration document</p>
            </div>
          </label>
        </div>
        <div className="ml-6 mb-4">
          <p className="text-[13px] font-semibold text-gray-700">Upload official document</p>
          <p className="text-xs text-slate-400">View the list of documents accepted by moclass <a href="#" className="text-indigo-500 font-medium no-underline hover:underline">here</a></p>
          <div className="border-2 border-dashed border-indigo-300 rounded-xl p-5 text-center bg-gradient-to-br from-purple-50 to-indigo-50 hover:border-indigo-500 transition-colors mt-2">
            <input type="file" id="verificationDoc" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => setVerificationDoc(e.target.files[0])} className="hidden" disabled={noDocuments} />
            <label htmlFor="verificationDoc" className={`inline-flex items-center gap-1.5 text-indigo-500 font-semibold text-sm cursor-pointer hover:text-indigo-700 transition-colors ${noDocuments ? "opacity-40 pointer-events-none" : ""}`}>
              <Upload size={16} /> Upload file
            </label>
            {verificationDoc && <p className="text-green-500 text-[13px] font-medium mt-2">{verificationDoc.name}</p>}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
          <input type="checkbox" checked={noDocuments} onChange={(e) => setNoDocuments(e.target.checked)} className="w-4 h-4 accent-indigo-500 cursor-pointer" />
          <span className="text-[13px] text-slate-500">I do not have required documents</span>
        </label>
      </div>
    </div>

    <div className="flex justify-between mt-8 gap-3 flex-col-reverse sm:flex-row">
      <button onClick={goPrev} className="inline-flex items-center justify-center gap-1.5 px-7 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 cursor-pointer hover:bg-slate-50 hover:border-gray-400 transition-all"><ChevronLeft size={18} /> Previous</button>
      <button onClick={handleSaveOrganization} className="inline-flex items-center justify-center gap-1.5 px-7 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/25 border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">Next <ChevronRight size={18} /></button>
    </div>

    <div className="text-center mt-6">
      <p className="text-[13px] text-slate-500 m-0">Need help? Call us at <a href="tel:+919125346589" className="text-indigo-500 font-medium no-underline hover:underline">+91 9125346589</a>, available Mon–Fri, 10 AM – 6 PM.</p>
    </div>
  </div>
);

/* ===========================
   Step 3 (HOISTED)
=========================== */
const Step3 = ({
  formData,
  handleInputChange,
  handlePerkChange,
  goPrev,
  handleCreatePosting,
}) => (
  <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-10 shadow-lg shadow-black/5">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">Post Job/Internship</h2>
      <p className="text-indigo-500 text-[13px] font-medium mt-1">(Important guidelines)</p>
      <p className="text-xs text-slate-400 leading-relaxed m-0">Hire early talent with work experience up to 2 years</p>
    </div>

    <div className="flex flex-col gap-5">
      {/* Opportunity Type */}
      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-semibold text-gray-700">Opportunity type</label>
        <div className="flex flex-wrap gap-4">
          {[
            { v: "Job", label: "Job" },
            { v: "Internship", label: "Internship" },
          ].map((o) => (
            <label key={o.v} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
              <input
                type="radio"
                name="opportunityType"
                value={o.v}
                checked={formData.opportunityType === o.v}
                onChange={handleInputChange("opportunityType")}
                className="w-4 h-4 accent-indigo-500 cursor-pointer"
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Conditionally Render Job or Internship */}
      {formData.opportunityType === "Job" && (
        <div className="flex flex-col gap-5">
          {/* ===================== Job details ===================== */}
          <h2 className="text-lg font-bold text-slate-800 pb-2 border-b-2 border-indigo-100 inline-block">Job details</h2>

          {/* Job title */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Job title</label>
            <input
              type="text"
              placeholder="Software Engineer Trainee"
              value={formData.jobTitle}
              onChange={handleInputChange("jobTitle")}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Minimum experience required */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Minimum experience required</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                <input
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                  type="radio"
                  name="minExperience"
                  value="0 year"
                  checked={formData.minExperience === "0 year"}
                  onChange={handleInputChange("minExperience")}
                />
                <span>0 year</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                <input
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                  type="radio"
                  name="minExperience"
                  value="1 year"
                  checked={formData.minExperience === "1 year"}
                  onChange={handleInputChange("minExperience")}
                />
                <span>1 year</span>
              </label>
            </div>
          </div>

          {/* Skills required */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Skills required</label>
            <input
              type="text"
              placeholder="Java, JavaScript, React, HTML/CSS, Git"
              value={formData.skillsRequired}
              onChange={handleInputChange("skillsRequired")}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Job type */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Job type</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                <input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="jobType" value="In office" checked={formData.jobType === "In office"} onChange={handleInputChange("jobType")} />
                <span>In office</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                <input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="jobType" value="Hybrid" checked={formData.jobType === "Hybrid"} onChange={handleInputChange("jobType")} />
                <span>Hybrid</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                <input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="jobType" value="Remote" checked={formData.jobType === "Remote"} onChange={handleInputChange("jobType")} />
                <span>Remote</span>
              </label>
            </div>
          </div>

          {/* Part-time/Full-time */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Part-time/Full-time</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                <input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="partFullTime" value="Part-time" checked={formData.partFullTime === "Part-time"} onChange={handleInputChange("partFullTime")} />
                <span>Part-time</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                <input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="partFullTime" value="Full-time" checked={formData.partFullTime === "Full-time"} onChange={handleInputChange("partFullTime")} />
                <span>Full-time</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Number of openings</label>
            <input
              type="text"
              placeholder="4"
              value={formData.numberOfOpenings}
              onChange={handleInputChange("numberOfOpenings")}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Job description */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Job description</label>
            <textarea
              placeholder={`Key responsibilities:
1. Build and maintain React-based web applications using modern JavaScript and REST APIs.
2. Collaborate with designers and backend engineers to ship features on time.
3. Write clean, testable code, participate in code reviews, and improve performance.`}
              value={formData.jobDescription}
              onChange={handleInputChange("jobDescription")}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[6rem] resize-y placeholder:text-slate-400"
            />
          </div>

          {/* Additional candidate preferences */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Additional candidate preferences:</label>
            <textarea
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[6rem] resize-y placeholder:text-slate-400"
              placeholder={`1. Computer Science graduate preferred
2. Familiarity with Agile/Scrum
3. Good communication skills`}
              value={formData.additionalPreferences}
              onChange={handleInputChange("additionalPreferences")}
            />
          </div>

          {/* ===================== Salary & perks ===================== */}
          <h2 className="text-lg font-bold text-slate-800 pb-2 border-b-2 border-indigo-100 inline-block">Salary & perks</h2>

          {/* CTC Breakup - Fixed pay */}
          <div className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold text-gray-700">CTC Breakup</p>

            <div className="mb-3">
              <label className="text-[13px] font-semibold text-gray-700">Fixed pay</label>
              <p className="text-xs text-slate-400 leading-relaxed m-0">Fixed pay is the fixed component of the CTC</p>

              <div className="flex flex-wrap items-center gap-2">
                <select className="px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer" value="INR" onChange={() => {}}>
                  <option>₹</option>
                </select>
                <input type="text" placeholder="300000" value={formData.fixedPayMin} onChange={handleInputChange("fixedPayMin")} className="w-28 px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" />
                <span className="text-slate-400 text-[13px] font-medium">to</span>
                <input type="text" placeholder="600000" value={formData.fixedPayMax} onChange={handleInputChange("fixedPayMax")} className="w-28 px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" />
                <span className="text-slate-400 text-[13px] font-medium">per year</span>
              </div>

              <p className="text-xs text-red-500 mt-1">We only post jobs with a minimum fixed CTC of ₹1,00,000</p>
            </div>

            {/* Variables/Incentives */}
            <div className="mb-3">
              <label className="text-[13px] font-semibold text-gray-700">Variables/Incentives</label>
              <p className="text-xs text-slate-400 leading-relaxed m-0">If the role includes incentives/variable pay, we recommend mentioning it to attract better talent.</p>

              <div className="flex flex-wrap items-center gap-2">
                <select className="px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer" placeholder="INR" onChange={() => {}}>
                  <option>₹</option>
                </select>
                <input type="text" placeholder="50000" value={formData.variablePayMin} onChange={handleInputChange("variablePayMin")} className="w-28 px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" />
                <span className="text-slate-400 text-[13px] font-medium">to</span>
                <input type="text" placeholder="100000" value={formData.variablePayMax} onChange={handleInputChange("variablePayMax")} className="w-28 px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" />
                <span className="text-slate-400 text-[13px] font-medium">per year</span>
              </div>
            </div>

            {/* Perks */}
            <div className="mb-3">
              <label className="text-[13px] font-semibold text-gray-700">
                Perks <span className="font-normal text-slate-400">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                  <input type="checkbox" checked={formData.perks.fiveDaysWeek} onChange={handlePerkChange("fiveDaysWeek")} className="w-4 h-4 accent-indigo-500 cursor-pointer" />
                  <span>5 days a week</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                  <input type="checkbox" checked={formData.perks.healthInsurance} onChange={handlePerkChange("healthInsurance")} className="w-4 h-4 accent-indigo-500 cursor-pointer" />
                  <span>Health Insurance</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
                  <input type="checkbox" checked={formData.perks.lifeInsurance} onChange={handlePerkChange("lifeInsurance")} className="w-4 h-4 accent-indigo-500 cursor-pointer" />
                  <span>Life Insurance</span>
                </label>
              </div>
            </div>
          </div>

          {/* ===================== Screening Questions ===================== */}
          <h2 className="text-lg font-bold text-slate-800 pb-2 border-b-2 border-indigo-100 inline-block">Screening Questions</h2>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Availability (Default)</label>
            <textarea
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[6rem] resize-y placeholder:text-slate-400"
              placeholder="Please confirm your availability for this job. If not available immediately, how early would you be able to join?"
              value={formData.availabilityQuestion}
              onChange={handleInputChange("availabilityQuestion")}
            />
            <button type="button" className="mt-3 inline-flex items-center px-4 py-2 bg-slate-100 text-slate-500 font-medium text-sm rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-200 transition-all">
              + Add more questions (Optional)
            </button>
          </div>

          {/* ===================== Alternate mobile number ===================== */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Alternate mobile number for this listing</label>
            <p className="text-xs text-slate-400 leading-relaxed m-0">Our team will call you on this number in case of any query regarding this listing only.</p>

            <div className="flex items-stretch">
              <div className="flex items-center px-3.5 bg-indigo-50 text-indigo-600 font-semibold text-sm border border-slate-200 border-r-0 rounded-l-xl whitespace-nowrap">+91</div>
              <input
                type="text"
                placeholder="9330217963"
                value={formData.alternateNumber}
                onChange={handleInputChange("alternateNumber")}
                className="flex-1 min-w-0 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-r-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      )}

      {formData.opportunityType === "Internship" && (
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-bold text-slate-800 pb-2 border-b-2 border-indigo-100 inline-block">Internship details</h2>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Internship profile</label>
            <input type="text" placeholder="Android App Development" value={formData.jobTitle} onChange={handleInputChange("jobTitle")} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Skills required</label>
            <input type="text" placeholder="Java, Kotlin, Android Studio, REST APIs" value={formData.skillsRequired} onChange={handleInputChange("skillsRequired")} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Internship type</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="jobType" value="In office" checked={formData.jobType === "In office"} onChange={handleInputChange("jobType")} /><span>In office</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="jobType" value="Hybrid" checked={formData.jobType === "Hybrid"} onChange={handleInputChange("jobType")} /><span>Hybrid</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="jobType" value="Remote" checked={formData.jobType === "Remote"} onChange={handleInputChange("jobType")} /><span>Remote</span></label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Part-time/Full-time</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="partFullTime" value="Part-time" checked={formData.partFullTime === "Part-time"} onChange={handleInputChange("partFullTime")} /><span>Part-time</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="partFullTime" value="Full-time" checked={formData.partFullTime === "Full-time"} onChange={handleInputChange("partFullTime")} /><span>Full-time</span></label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Number of openings</label>
            <input type="text" placeholder="4" value={formData.numberOfOpenings} onChange={handleInputChange("numberOfOpenings")} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Internship start date</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="start" defaultChecked /><span>Immediately (within next 30 days)</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="start" /><span>Later</span></label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Internship Duration</label>
            <input type="text" placeholder="3 Months" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
            <label className="text-[13px] font-semibold text-gray-700" style={{marginTop:'1rem'}}>Internship Stipend</label>
            <input type="text" placeholder="₹10,000 / month" className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Intern's responsibilities</label>
            <textarea className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[6rem] resize-y placeholder:text-slate-400" placeholder={`Selected intern's day-to-day responsibilities include:\n1. Build Android features using Kotlin and Jetpack.\n2. Integrate REST APIs and handle local storage.\n3. Write unit tests and assist in QA.`} value={formData.jobDescription} onChange={handleInputChange("jobDescription")} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Additional candidate preferences:</label>
            <textarea className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[6rem] resize-y placeholder:text-slate-400" placeholder={`1. Candidates pursuing Computer Science Engineering preferred\n2. Familiarity with Git and Agile\n3. Good communication skills`} value={formData.additionalPreferences} onChange={handleInputChange("additionalPreferences")} />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1">
            <input type="checkbox" className="w-4 h-4 accent-indigo-500 cursor-pointer" defaultChecked />
            <span className="text-[13px] text-slate-500 leading-snug">Allow applications from women also who are willing to start/restart their career.</span>
          </label>

          <h2 className="text-lg font-bold text-slate-800 pb-2 border-b-2 border-indigo-100 inline-block">Stipend & perks</h2>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Stipend</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="stipend" defaultChecked /><span>Paid</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input className="w-4 h-4 accent-indigo-500 cursor-pointer" type="radio" name="stipend" /><span>Unpaid</span></label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Fixed stipend</label>
            <div className="flex flex-wrap items-center gap-2">
              <select className="px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer" onChange={() => {}}><option>₹</option></select>
              <input type="text" placeholder="8000" value={formData.fixedPayMin} onChange={handleInputChange("fixedPayMin")} className="w-28 px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" />
              <span className="text-slate-400 text-[13px] font-medium">to</span>
              <input type="text" placeholder="12000" value={formData.fixedPayMax} onChange={handleInputChange("fixedPayMax")} className="w-28 px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" />
              <select className="px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer" onChange={() => {}}><option>/month</option></select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Incentives</label>
            <p className="text-xs text-slate-400 leading-relaxed m-0">If the role includes incentives/variable pay, we recommend mentioning it to attract better talent.</p>
            <div className="flex flex-wrap items-center gap-2">
              <select className="px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer" onChange={() => {}}><option>₹</option></select>
              <input type="text" placeholder="2000" value={formData.variablePayMin} onChange={handleInputChange("variablePayMin")} className="w-28 px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" />
              <span className="text-slate-400 text-[13px] font-medium">to</span>
              <input type="text" placeholder="4000" value={formData.variablePayMax} onChange={handleInputChange("variablePayMax")} className="w-28 px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" />
              <select className="px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer" onChange={() => {}}><option>/month</option></select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Does this internship come with a pre-placement offer (PPO)?</label>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input type="checkbox" className="w-4 h-4 accent-indigo-500 cursor-pointer" defaultChecked /><span>Yes</span></label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Perks <span className="font-normal text-slate-400">(Select all that apply)</span></label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input type="checkbox" className="w-4 h-4 accent-indigo-500 cursor-pointer" defaultChecked /><span>Certificate</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input type="checkbox" className="w-4 h-4 accent-indigo-500 cursor-pointer" defaultChecked /><span>Letter of recommendation</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input type="checkbox" className="w-4 h-4 accent-indigo-500 cursor-pointer" defaultChecked /><span>Flexible work hours</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input type="checkbox" className="w-4 h-4 accent-indigo-500 cursor-pointer" defaultChecked /><span>5 days a week</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input type="checkbox" className="w-4 h-4 accent-indigo-500 cursor-pointer" /><span>Informal dress code</span></label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer py-1"><input type="checkbox" className="w-4 h-4 accent-indigo-500 cursor-pointer" /><span>Free snacks & beverages</span></label>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-800 pb-2 border-b-2 border-indigo-100 inline-block">Screening Questions</h2>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Availability (Default)</label>
            <textarea className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[6rem] resize-y placeholder:text-slate-400" placeholder="Please confirm your availability for this internship. If not available immediately, how early would you be able to join?" value={formData.availabilityQuestion} onChange={handleInputChange("availabilityQuestion")} />
            <button type="button" className="mt-3 inline-flex items-center px-4 py-2 bg-slate-100 text-slate-500 font-medium text-sm rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-200 transition-all">+ Add more questions (Optional)</button>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-gray-700">Alternate mobile number for this listing</label>
            <p className="text-xs text-slate-400 leading-relaxed m-0">Our team will call you on this number in case of any query regarding this listing only.</p>
            <div className="flex items-stretch">
              <div className="flex items-center px-3.5 bg-indigo-50 text-indigo-600 font-semibold text-sm border border-slate-200 border-r-0 rounded-l-xl whitespace-nowrap">+91</div>
              <input type="text" placeholder="9330217963" value={formData.alternateNumber} onChange={handleInputChange("alternateNumber")} className="flex-1 min-w-0 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-r-xl outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400" />
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="flex justify-between mt-8 gap-3 flex-col-reverse sm:flex-row">
      <button onClick={goPrev} className="inline-flex items-center justify-center gap-1.5 px-7 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 cursor-pointer hover:bg-slate-50 hover:border-gray-400 transition-all"><ChevronLeft size={18} /> Previous</button>
      <button onClick={handleCreatePosting} className="inline-flex items-center justify-center gap-1.5 px-7 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/25 border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">Post job</button>
    </div>

    <div className="text-center mt-6">
      <p>Need assistance? Please visit <a href="#">Help Center</a></p>
    </div>
  </div>
);

/* ===========================
   Main Component
=========================== */
export default function EmployerProfile() {
  const { user } = useContext(userContext);
  const TOTAL_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const [showOtp, setShowOtp] = useState(false);
  const [employerId, setEmployerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [organizationLogo, setOrganizationLogo] = useState(null);
  const [verificationDoc, setVerificationDoc] = useState(null);
  const [noDocuments, setNoDocuments] = useState(false);

  const [formData, setFormData] = useState(getInitialFormData);

  const steps = [
    { id: 1, name: "Personal Details", icon: User },
    { id: 2, name: "Organization Details", icon: Building },
    { id: 3, name: "Post Internship/Job", icon: Briefcase },
  ];

  // Fetch employer data on mount
 useEffect(() => {
  setLoading(false);
}, []);

  const goNext = () => setCurrentStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const goPrev = () => setCurrentStep((s) => Math.max(1, s - 1));
  const goTo = (n) => {
    // Only allow going back or staying; forward requires completing the form
    if (n <= currentStep) {
      setCurrentStep(() => Math.min(TOTAL_STEPS, Math.max(1, n)));
    } else {
      toast.error("Please complete the current step first");
    }
  };

  // Cursor-stable handlers
  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handlePerkChange = useCallback(
    (perk) => () => {
      setFormData((prev) => ({ ...prev, perks: { ...prev.perks, [perk]: !prev.perks[perk] } }));
    },
    []
  );

  // API Handlers
  const handleSavePersonal = async () => {
    // Validation
    if (!formData.firstName.trim()) { toast.error("First name is required"); return; }
    if (!formData.lastName.trim()) { toast.error("Last name is required"); return; }
    if (!formData.email.trim()) { toast.error("Email is required"); return; }
    if (!formData.phoneNumber.trim()) { toast.error("Phone number is required"); return; }
    if (!formData.designation.trim()) { toast.error("Designation is required"); return; }

    console.log(user,'user')
    try {
      const result = await EmployerService.savePersonal({
        firstName: formData.firstName,
        lastName: formData.lastName,
        userId:user.id,
        email: formData.email,
        designation: formData.designation,
        phoneNumber: formData.phoneNumber,
      });

      if (result?.data?.employerId) {
        setEmployerId(result.data.employerId);
        toast.success("Personal details saved!");
        goNext();
      } else {
        toast.error("Failed to save personal details: No employer ID returned");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error saving personal details");
    }
  };

  const handleSaveOrganization = async () => {
    // Validation
    if (!formData.organizationName.trim()) { toast.error("Organization name is required"); return; }
    if (!formData.organizationCity.trim()) { toast.error("Organization city is required"); return; }
    if (!formData.industry) { toast.error("Please select an industry"); return; }
    if (!formData.numberOfEmployees) { toast.error("Please select number of employees"); return; }

    if (!employerId) {
      toast.error("Please complete personal details first");
      goTo(1);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("employerId", employerId);
      formDataToSend.append("organizationName", formData.organizationName);
      formDataToSend.append("isIndependent", formData.isIndependent);
      formDataToSend.append("organizationDescription", formData.organizationDescription);
      formDataToSend.append("organizationCity", formData.organizationCity);
      formDataToSend.append("industry", formData.industry);
      formDataToSend.append("numberOfEmployees", formData.numberOfEmployees);
      formDataToSend.append("noDocuments", noDocuments);
      
      if (organizationLogo) {
        formDataToSend.append("organizationLogo", organizationLogo);
      }
      if (verificationDoc && !noDocuments) {
        formDataToSend.append("verificationDoc", verificationDoc);
      }

      await EmployerService.saveOrganization(formDataToSend);
      toast.success("Organization details saved!");
      goNext();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error saving organization details");
    }
  };

  const handleCreatePosting = async () => {
    if (!employerId) {
      toast.error("Please complete personal details first");
      goTo(1);
      return;
    }

    try {
      // Convert perks object to JSON string for proper transmission
      const perksString = JSON.stringify(formData.perks);
      
      await EmployerService.createPosting({
        employerId,
        opportunityType: formData.opportunityType,
        jobTitle: formData.jobTitle,
        minExperience: formData.minExperience,
        skillsRequired: formData.skillsRequired,
        jobType: formData.jobType,
        partFullTime: formData.partFullTime,
        numberOfOpenings: formData.numberOfOpenings,
        jobDescription: formData.jobDescription,
        additionalPreferences: formData.additionalPreferences,
        fixedPayMin: formData.fixedPayMin,
        fixedPayMax: formData.fixedPayMax,
        variablePayMin: formData.variablePayMin,
        variablePayMax: formData.variablePayMax,
        perks: perksString,
        availabilityQuestion: formData.availabilityQuestion,
        alternateNumber: formData.alternateNumber,
      });
      toast.success("Job/Internship posted successfully!");
      setFormData(getInitialFormData());
      goTo(1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating posting");
    }
  };

  if (loading) {
    return <div className="w-full min-h-screen py-8 px-4 md:py-12 md:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"><div className="text-center py-16 text-lg text-slate-500 font-medium">Loading...</div></div>;
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 md:py-12 md:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Stepper steps={steps} currentStep={currentStep} goTo={goTo} />
      <div className="mt-6">
        {currentStep === 1 && (
          <Step1
            formData={formData}
            handleInputChange={handleInputChange}
            showOtp={showOtp}
            setShowOtp={setShowOtp}
            handleSavePersonal={handleSavePersonal}
          />
        )}
        {currentStep === 2 && (
          <Step2
            formData={formData}
            handleInputChange={handleInputChange}
            goPrev={goPrev}
            handleSaveOrganization={handleSaveOrganization}
            organizationLogo={organizationLogo}
            setOrganizationLogo={setOrganizationLogo}
            verificationDoc={verificationDoc}
            setVerificationDoc={setVerificationDoc}
            noDocuments={noDocuments}
            setNoDocuments={setNoDocuments}
          />
        )}
        {currentStep === 3 && (
          <Step3
            formData={formData}
            handleInputChange={handleInputChange}
            handlePerkChange={handlePerkChange}
            goPrev={goPrev}
            handleCreatePosting={handleCreatePosting}
          />
        )}
      </div>
    </div>
  );
}