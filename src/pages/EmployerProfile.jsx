import React, { useState } from "react";
import {
  User,
  Building2 as Building,
  Briefcase,
  Check,
  Upload,
} from "lucide-react";

export default function EmployerProfile() {
  const [showOtp, setShowOtp] = useState(false);
  const TOTAL_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "First Name",
    lastName: "Last Name",
    email: "demo@gmail.com",
    designation: "",
    mobile: "9125346589",

    organizationName: "",
    isIndependent: false,
    organizationDescription: "",
    organizationCity: "",
    industry: "",
    numberOfEmployees: "",

    // Job Details
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
    alternateNumber: "9330217963",
  });

  const steps = [
    { id: 1, name: "Personal Details", icon: User },
    { id: 2, name: "Organization Details", icon: Building },
    { id: 3, name: "Post Internship/Job", icon: Briefcase },
  ];

  const goNext = () => setCurrentStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const goPrev = () => setCurrentStep((s) => Math.max(1, s - 1));
  const goTo = (n) =>
    setCurrentStep(() => Math.min(TOTAL_STEPS, Math.max(1, n)));

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePerkChange = (perk) => {
    setFormData((prev) => ({
      ...prev,
      perks: { ...prev.perks, [perk]: !prev.perks[perk] },
    }));
  };

  const Stepper = () => (
    <div className="w-full max-w-5xl mx-auto select-none">
      <div className="relative">
        <div className="absolute left-0 right-0 top-6 h-[2px] bg-gray-200" />

        <ol className="relative z-10 grid grid-cols-3 gap-0">
          {steps.map((s, idx) => {
            const isActive = currentStep === s.id;
            const isComplete = currentStep > s.id;
            const Icon = s.icon;
            return (
              <li key={s.id} className="text-center">
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute left-[calc(${idx}*33.333%+2rem)] right-[calc(100%-((${idx}+1)*33.333%)-2rem)] top-6 h-[2px] transition-colors duration-300 ${
                      currentStep > s.id ? "bg-blue-500" : "bg-transparent"
                    }`}
                  />
                )}

                <button
                  type="button"
                  onClick={() => goTo(s.id)}
                  className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 shadow-sm ${
                    isActive
                      ? "bg-blue-500 border-blue-500 text-white"
                      : isComplete
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isComplete ? <Check size={20} /> : <Icon size={20} />}
                </button>
                <p
                  onClick={() => goTo(s.id)}
                  className={`mt-2 text-sm font-medium cursor-pointer ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {s.name}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Personal details
      </h2>
      <div className="bg-blue-50 p-3 rounded-md mb-6">
        <p className="text-blue-800 text-sm">
          Please provide all your details to proceed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          E-mail
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Designation
        </label>
        <input
          type="text"
          placeholder="E.g. HR Manager"
          value={formData.designation}
          onChange={(e) => handleInputChange("designation", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile number
        </label>
        <div className="flex">
          <div className="flex items-center px-3 border border-gray-300 border-r-0 rounded-l-md bg-gray-50">
            <span className="text-gray-600">+91</span>
          </div>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className="flex-1 p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => setShowOtp(true)} // 👈 show OTP section on click
            className="px-6 py-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 font-medium"
          >
            Verify
          </button>
        </div>

        {/* OTP Section (only visible after verify click) */}
        {showOtp && (
          <div>
            <p className="text-sm text-gray-600 my-2">
              We have sent an OTP to your registered mobile number. It will be
              valid for the next 10 minutes. Please enter it below.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-[13px] bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium">
                Verify
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={goNext}
          className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          Next
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Need help? Call us at{" "}
          <a href="tel:+919125346589" className="text-blue-600">
            +91 9125346589
          </a>
          , available from Mon to Fri, 10 AM - 6 PM.
        </p>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Organization details
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization name
          </label>
          <input
            type="text"
            placeholder="Organization Name"
            value={formData.organizationName}
            onChange={(e) =>
              handleInputChange("organizationName", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isIndependent}
                onChange={(e) =>
                  handleInputChange("isIndependent", e.target.checked)
                }
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-600">
                I am an independent practitioner (freelancer, architect, lawyer
                etc.) hiring for myself and I am NOT hiring on behalf of a
                company.
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization description
          </label>
          <textarea
            rows={4}
            value={formData.organizationDescription}
            onChange={(e) =>
              handleInputChange("organizationDescription", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization city
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai"
            value={formData.organizationCity}
            onChange={(e) =>
              handleInputChange("organizationCity", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select industry</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            No. of employees
          </label>
          <select
            value={formData.numberOfEmployees}
            onChange={(e) =>
              handleInputChange("numberOfEmployees", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an option</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization logo{" "}
            <span className="text-gray-500">(Recommended)</span>
          </label>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Upload logo
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Max file size: 1Mb and max resolution: 500px x 500px. File type:
              jpeg, jpg, png, gif, bmp
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Organization verification
        </h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            Get your organization verified by submitting the below mentioned
            details and start posting internships/jobs.
          </p>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="verification"
                defaultChecked
                className="mr-3 h-4 w-4 text-blue-600"
              />
              <div>
                <span className="font-medium text-gray-800">
                  Official company documents
                </span>
                <p className="text-sm text-gray-600">
                  Verify using any government-issued business registration
                  document
                </p>
              </div>
            </label>
          </div>

          <div className="ml-7 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Upload official document
            </p>
            <p className="text-sm text-gray-600 mb-4">
              View the list of documents accepted by moclass{" "}
              <a href="#" className="text-blue-600">
                here
              </a>
            </p>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center mx-auto">
                <Upload size={16} className="mr-2" />
                Upload file
              </button>
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                I do not have required documents
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={goPrev}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={goNext}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Need help? Call us at{" "}
          <a href="tel:+919125346589" className="text-blue-600">
            +91 9125346589
          </a>
          , available from Mon to Fri, 10 AM - 6 PM.
        </p>
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Post Job/Internship
        </h2>
        <p className="text-blue-600 text-sm mt-1">(Important guidelines)</p>
        <p className="text-gray-600 text-sm mt-2">
          Hire early talent with work experience up to 2 years
        </p>
      </div>

      <div className="space-y-6">
        {/* Opportunity Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Opportunity type
          </label>
          <div className="flex gap-6">
            {[
              { v: "Job", label: "Job" },
              { v: "Internship", label: "Internship" },
            ].map((o) => (
              <label key={o.v} className="flex items-center">
                <input
                  type="radio"
                  name="opportunityType"
                  value={o.v}
                  checked={formData.opportunityType === o.v}
                  onChange={(e) =>
                    handleInputChange("opportunityType", e.target.value)
                  }
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditionally Render Job or Internship */}
        {formData.opportunityType === "Job" && (
          <div className="space-y-8">
            {/* ===================== Job details ===================== */}
            <h2 className="text-xl font-semibold">Job details</h2>

            {/* Job title */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job title
              </label>
              <input
                type="text"
                placeholder="Software Engineer Trainee"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Minimum experience required */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum experience required
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 text-blue-600"
                    type="radio"
                    name="year"
                  />
                  <span>0 year</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 text-blue-600"
                    type="radio"
                    name="year"
                    checked
                  />
                  <span>1 year</span>
                </label>
              </div>
            </div>

            {/* Skills required */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills required
              </label>
              <input
                type="text"
                placeholder="Java, JavaScript, React, HTML/CSS, Git"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-red-500">
                This field is required
              </p>
            </div>

            {/* Job type */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job type
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input className="mr-2 h-4 w-4" type="radio" />
                  <span>In office</span>
                </label>
                <label className="flex items-center">
                  <input className="mr-2 h-4 w-4" type="radio" checked />
                  <span>Hybrid</span>
                </label>
                <label className="flex items-center">
                  <input className="mr-2 h-4 w-4" type="radio" />
                  <span>Remote</span>
                </label>
              </div>
            </div>

            {/* Part-time/Full-time */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Part-time/Full-time
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input className="mr-2 h-4 w-4" type="radio" name="ptft" />
                  <span>Part-time</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4"
                    type="radio"
                    name="ptft"
                    checked
                  />
                  <span>Full-time</span>
                </label>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of openings
              </label>
              <input
                type="text"
                placeholder="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-red-500">
                This field is required
              </p>
            </div>

            {/* Job description */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job description
              </label>
              <textarea
                placeholder="Key responsibilities:
    1. Build and maintain React-based web applications using modern JavaScript and REST APIs.
    2. Collaborate with designers and backend engineers to ship features on time.
    3. Write clean, testable code, participate in code reviews, and improve performance."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-36"
              />
              <p className="mt-1 text-xs text-red-500">
                Please enter at least 100 characters
              </p>
            </div>

            {/* Who can apply */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who can apply (prefilled as per earlier inputs):
              </label>
              <input
                type="text"
                placeholder="1. Candidates with minimum 1 years of experience."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Additional candidate preferences */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional candidate preferences:
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28"
                placeholder={`1. Computer Science graduate preferred
    2. Familiarity with Agile/Scrum
    3. Good communication skills`}
              />
            </div>

            {/* ===================== Salary & perks ===================== */}
            <h2 className="text-xl font-semibold">Salary & perks</h2>

            {/* CTC Breakup - Fixed pay */}
            <div className="mb-5">
              <p className="text-sm font-medium text-gray-700 mb-2">
                CTC Breakup
              </p>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fixed pay
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Fixed pay is the fixed component of the CTC
                </p>

                <div className="flex items-center gap-3">
                  <select
                    className="p-3 border border-gray-300 rounded-md bg-gray-100"
                    value="INR"
                  >
                    <option>₹</option>
                  </select>

                  <input
                    type="text"
                    placeholder="300000"
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-40"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="text"
                    placeholder="600000"
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-40"
                  />
                  <span className="text-gray-500">per year</span>
                </div>

                <p className="mt-2 text-xs text-red-500">
                  We only post jobs with a minimum fixed CTC of ₹1,00,000
                </p>
              </div>

              {/* Variables/Incentives */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variables/Incentives
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  If the role includes incentives/variable pay, we recommend
                  mentioning it to attract better talent.
                </p>

                <div className="flex items-center gap-3">
                  <select
                    className="p-3 border border-gray-300 rounded-md bg-gray-100"
                    placeholder="INR"
                  >
                    <option>₹</option>
                  </select>

                  <input
                    type="text"
                    placeholder="50000"
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-40"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="text"
                    placeholder="100000"
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-40"
                  />
                  <span className="text-gray-500">per year</span>
                </div>
              </div>

              {/* Perks */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Perks{" "}
                  <span className="text-gray-500">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4" />
                    <span>5 days a week</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4" />
                    <span>Health Insurance</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4" />
                    <span>Life Insurance</span>
                  </label>
                </div>
              </div>
            </div>

            {/* ===================== Screening Questions ===================== */}
            <h2 className="text-xl font-semibold">Screening Questions</h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability (Default)
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28"
                placeholder="Please confirm your availability for this job. If not available immediately, how early would you be able to join?"
              />
              <button
                type="button"
                className="mt-3 inline-flex items-center px-3 py-2 rounded-md border bg-gray-100 text-gray-500 cursor-not-allowed"
              >
                + Add more questions (Optional)
              </button>
            </div>

            {/* ===================== Alternate mobile number ===================== */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alternate mobile number for this listing
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Our team will call you on this number in case of any query
                regarding this listing only. Primary account number will not be
                updated.
              </p>

              <div className="flex gap-3">
                <input
                  type="text"
                  value="+91"
                  className="w-24 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                />
                <input
                  type="text"
                  placeholder="9330217963"
                  className="flex-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {formData.opportunityType === "Internship" && (
          <div className="space-y-10">
            {/* ===================== Internship details ===================== */}
            <h2 className="text-xl font-semibold">Internship details</h2>

            {/* Internship profile */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internship profile
              </label>
              <input
                type="text"
                placeholder="Android App Development"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Skills required */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills required
              </label>
              <input
                type="text"
                placeholder="Java, Kotlin, Android Studio, REST APIs"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Internship type */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internship type
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="itype"
                  />
                  <span>In office</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="itype"
                    defaultChecked
                  />
                  <span>Hybrid</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="itype"
                  />
                  <span>Remote</span>
                </label>
              </div>
            </div>

            {/* Part-time / Full-time */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Part-time/Full-time
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="ptft"
                  />
                  <span>Part-time</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="ptft"
                    defaultChecked
                  />
                  <span>Full-time</span>
                </label>
              </div>
            </div>

            {/* Number of openings */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of openings
              </label>
              <input
                type="text"
                placeholder="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Internship start date */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internship start date
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="start"
                    defaultChecked
                  />
                  <span>Immediately (within next 30 days)</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="start"
                  />
                  <span>Later</span>
                </label>
              </div>
            </div>

            {/* Internship duration (dropdown style like screenshot) */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internship duration
              </label>
              <div className="flex gap-3">
                <select className="p-3 border border-gray-300 rounded-md bg-gray-100 pointer-events-none">
                  <option>3</option>
                </select>
                <select className="p-3 border border-gray-300 rounded-md bg-gray-100 pointer-events-none">
                  <option>months</option>
                </select>
              </div>
              {/* Your preferred plain inputs version (from your snippet) */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internship Duration
                </label>
                <input
                  type="text"
                  placeholder="3 Months"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                  Internship Stipend
                </label>
                <input
                  type="text"
                  placeholder="₹10,000 / month"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Intern’s responsibilities */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intern’s responsibilities
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-36"
                placeholder={`Selected intern's day-to-day responsibilities include:
   1. Build Android features using Kotlin and Jetpack.
   2. Integrate REST APIs and handle local storage.
   3. Write unit tests and assist in QA.`}
              />
            </div>

            {/* Additional candidate preferences */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional candidate preferences:
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28"
                placeholder={`1. Candidates pursuing Computer Science Engineering preferred
   2. Familiarity with Git and Agile
   3. Good communication skills`}
              />
            </div>

            {/* Women restart checkbox */}
            <div className="mb-5">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 pointer-events-none"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">
                  Allow applications from women also who are willing to
                  start/restart their career.
                </span>
              </label>
            </div>

            {/* ===================== Stipend & perks ===================== */}
            <h2 className="text-xl font-semibold">Stipend & perks</h2>

            {/* Paid/Unpaid */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stipend
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="stipend"
                    defaultChecked
                  />
                  <span>Paid</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 pointer-events-none"
                    type="radio"
                    name="stipend"
                  />
                  <span>Unpaid</span>
                </label>
              </div>
            </div>

            {/* Fixed stipend */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fixed stipend
              </label>
              <div className="flex items-center gap-3">
                <select className="p-3 border border-gray-300 rounded-md bg-gray-100 pointer-events-none">
                  <option>₹</option>
                </select>
                <input
                  type="text"
                  placeholder="8000"
                  className="p-3 border border-gray-300 rounded-md bg-gray-100 w-36"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="text"
                  placeholder="12000"
                  className="p-3 border border-gray-300 rounded-md bg-gray-100 w-36"
                />
                <select className="p-3 border border-gray-300 rounded-md bg-gray-100 pointer-events-none">
                  <option>/month</option>
                </select>
              </div>
            </div>

            {/* Incentives */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incentives
              </label>
              <p className="text-xs text-gray-500 mb-2">
                If the role includes incentives/variable pay, we recommend
                mentioning it to attract better talent.
              </p>
              <div className="flex items-center gap-3">
                <select className="p-3 border border-gray-300 rounded-md bg-gray-100 pointer-events-none">
                  <option>₹</option>
                </select>
                <input
                  type="text"
                  placeholder="2000"
                  className="p-3 border border-gray-300 rounded-md bg-gray-100 w-36"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="text"
                  placeholder="4000"
                  className="p-3 border border-gray-300 rounded-md bg-gray-100 w-36"
                />
                <select className="p-3 border border-gray-300 rounded-md bg-gray-100 pointer-events-none">
                  <option>/month</option>
                </select>
              </div>
            </div>

            {/* PPO */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Does this internship come with a pre‑placement offer (PPO)?
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-5 w-10 pointer-events-none"
                  defaultChecked
                />
                <span>Yes</span>
              </label>
            </div>

            {/* Perks */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Perks{" "}
                <span className="text-gray-500">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 pointer-events-none"
                    defaultChecked
                  />
                  <span>Certificate</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 pointer-events-none"
                    defaultChecked
                  />
                  <span>Letter of recommendation</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 pointer-events-none"
                    defaultChecked
                  />
                  <span>Flexible work hours</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 pointer-events-none"
                    defaultChecked
                  />
                  <span>5 days a week</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 pointer-events-none"
                  />
                  <span>Informal dress code</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 pointer-events-none"
                  />
                  <span>Free snacks &amp; beverages</span>
                </label>
              </div>
            </div>

            {/* ===================== Screening Questions ===================== */}
            <h2 className="text-xl font-semibold">Screening Questions</h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability (Default)
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28"
                placeholder="Please confirm your availability for this internship. If not available immediately, how early would you be able to join?"
              />
              <button
                type="button"
                className="mt-3 inline-flex items-center px-3 py-2 rounded-md border bg-gray-100 text-gray-500 pointer-events-none"
              >
                + Add more questions (Optional)
              </button>
            </div>

            {/* ===================== Alternate mobile number ===================== */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alternate mobile number for this listing
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Our team will call you on this number in case of any query
                regarding this listing only. Primary account number will not be
                updated.
              </p>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="+91"
                  className="w-24 p-3 border border-gray-300 rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  placeholder="9330217963"
                  className="flex-1 p-3 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={goPrev}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => alert("Submitted! (wire up your real submit handler)")}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Post job
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Need assistance? Please visit{" "}
          <a href="#" className="text-blue-600">
            Help Center
          </a>
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full py-10 px-4">
      <Stepper />

      <div className="mt-8">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
      </div>
    </div>
  );
}
