import React, { useState } from "react";
import { CheckCircle, User, Mail, Lock, Building } from "lucide-react";

const EmployerOnboarding = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const steps = [
    { title: "Basic Details", icon: <User /> },
    { title: "Contact Info", icon: <Mail /> },
    { title: "Create Password", icon: <Lock /> },
  ];

  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => step < totalSteps - 1 && setStep((s) => s + 1);
  const prev = () => step > 0 && setStep((s) => s - 1);

  const renderFields = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Input label="Full Name" placeholder="John Doe" />
            <Input
              label="Company Name"
              placeholder="Acme Corp"
              icon={<Building />}
            />
            <Select label="Industry">
              <option>Technology</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>Other</option>
            </Select>
          </>
        );
      case 1:
        return (
          <>
            <Input
              label="Work Email"
              type="email"
              placeholder="john@acme.com"
            />
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="+91 98765 43210"
            />
            <Input label="Company Website" placeholder="https://acme.com" />
          </>
        );
      case 2:
        return (
          <>
            <Input label="Username" placeholder="john_employer" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-blue-600" />I agree to
              the{" "}
              <a href="#!" className="text-blue-600">
                Terms & Conditions
              </a>
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-full sm:max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Register as an Employer
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Create your account in a few simple steps
          </p>
        </div>

        <div className="relative mb-6">
          <div className="w-full h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-1.5 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((s, i) => (
              <button
                key={i}
                className={`flex items-center gap-1 text-xs font-medium ${
                  i <= step ? "text-blue-600" : "text-gray-400"
                }`}
                onClick={() => setStep(i)}
              >
                {React.cloneElement(s.icon, { size: 16 })}
                <span className="hidden sm:inline">{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
            {steps[step].title}
          </h2>
          <div className="space-y-4 sm:space-y-5">{renderFields()}</div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
            <button
              onClick={prev}
              disabled={step === 0}
              className="w-full sm:flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700
                         hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>

            {step < totalSteps - 1 ? (
              <button
                onClick={next}
                className="w-full sm:flex-1 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Continue
              </button>
            ) : (
              <button className="w-full sm:flex-1 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700">
                Create Account
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="#!" className="text-blue-600 font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </main>
  );
};

const Input = ({ label, icon, ...props }) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div className="relative mt-1">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {React.cloneElement(icon, { size: 18, className: "text-gray-400" })}
        </div>
      )}
      <input
        {...props}
        className={`w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500
                    ${icon ? "pl-10" : "px-3"} py-2 text-sm sm:text-base`}
      />
    </div>
  </label>
);

const Select = ({ label, children }) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <select className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3 text-sm sm:text-base">
      {children}
    </select>
  </label>
);

export default EmployerOnboarding;
