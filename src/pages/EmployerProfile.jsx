import React, { useState } from "react";
import { User, Building2 as Building, Briefcase, Check, Upload } from "lucide-react";


export default function EmployerProfile() {
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
  const goTo = (n) => setCurrentStep(() => Math.min(TOTAL_STEPS, Math.max(1, n)));

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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Personal details</h2>
      <div className="bg-blue-50 p-3 rounded-md mb-6">
        <p className="text-blue-800 text-sm">Please provide all your details to proceed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
        <input
          type="text"
          placeholder="E.g. HR Manager"
          value={formData.designation}
          onChange={(e) => handleInputChange("designation", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile number</label>
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
          <button className="px-6 py-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 font-medium">
            Verify
          </button>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={goNext} className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
          Next
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Need help? Call us at <a href="tel:+919125346589" className="text-blue-600">+91 9125346589</a>, available from Mon to Fri, 10 AM - 6 PM.
        </p>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Organization details</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organization name</label>
          <input
            type="text"
            placeholder="Organization Name"
            value={formData.organizationName}
            onChange={(e) => handleInputChange("organizationName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isIndependent}
                onChange={(e) => handleInputChange("isIndependent", e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-600">
                I am an independent practitioner (freelancer, architect, lawyer etc.) hiring for myself and I am NOT hiring on behalf of a company.
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organization description</label>
          <textarea
            rows={4}
            value={formData.organizationDescription}
            onChange={(e) => handleInputChange("organizationDescription", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organization city</label>
          <input
            type="text"
            placeholder="e.g. Mumbai"
            value={formData.organizationCity}
            onChange={(e) => handleInputChange("organizationCity", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">No. of employees</label>
          <select
            value={formData.numberOfEmployees}
            onChange={(e) => handleInputChange("numberOfEmployees", e.target.value)}
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
            Organization logo <span className="text-gray-500">(Recommended)</span>
          </label>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <button className="text-blue-600 hover:text-blue-700 font-medium">Upload logo</button>
            <p className="text-sm text-gray-500 mt-2">Max file size: 1Mb and max resolution: 500px x 500px. File type: jpeg, jpg, png, gif, bmp</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Organization verification</h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            Get your organization verified by submitting the below mentioned details and start posting internships/jobs.
          </p>

          <div className="mb-4">
            <label className="flex items-center">
              <input type="radio" name="verification" defaultChecked className="mr-3 h-4 w-4 text-blue-600" />
              <div>
                <span className="font-medium text-gray-800">Official company documents</span>
                <p className="text-sm text-gray-600">Verify using any government-issued business registration document</p>
              </div>
            </label>
          </div>

          <div className="ml-7 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Upload official document</p>
            <p className="text-sm text-gray-600 mb-4">
              View the list of documents accepted by Internshala <a href="#" className="text-blue-600">here</a>
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
              <span className="text-sm text-gray-600">I do not have required documents</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={goPrev} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
          Previous
        </button>
        <button onClick={goNext} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Next
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Need help? Call us at <a href="tel:+919125346589" className="text-blue-600">+91 9125346589</a>, available from Mon to Fri, 10 AM - 6 PM.
        </p>
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Post Job/Internship</h2>
        <p className="text-blue-600 text-sm mt-1">(Important guidelines)</p>
        <p className="text-gray-600 text-sm mt-2">Hire early talent with work experience up to 2 years</p>
      </div>

     
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Opportunity type</label>
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
                  onChange={(e) => handleInputChange("opportunityType", e.target.value)}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job title</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer Trainee"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={goPrev} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
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
          Need assistance? Please visit <a href="#" className="text-blue-600">Help Center</a>
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