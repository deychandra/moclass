import React, { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, User, Mail, Lock, CreditCard, MapPin, Calendar } from 'lucide-react';

const EmployerProfile = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      id: 1,
      title: 'Personal Info',
      icon: <User className="w-5 h-5" />,
      description: 'Enter your personal details'
    },
    {
      id: 2,
      title: 'Contact Info',
      icon: <Mail className="w-5 h-5" />,
      description: 'Provide your contact information'
    },
    {
      id: 3,
      title: 'Account Setup',
      icon: <Lock className="w-5 h-5" />,
      description: 'Create your account credentials'
    },
    {
      id: 4,
      title: 'Payment',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Add your payment method'
    },
    {
      id: 5,
      title: 'Confirmation',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Review and confirm your details'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Employer <span className="text-[#1e3a5f]">Registration</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these steps to create your employer account and start posting internships
          </p>
        </div>
        
        {/* Stepper Header */}
        <div className="relative mb-16">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 z-0">
            <div 
              className="h-full bg-[#1e3a5f] transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {/* Steps */}
          <div className="relative z-10 flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleStepClick(index)}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-[#1e3a5f] text-white shadow-lg' 
                      : 'bg-white border-2 border-gray-300 text-gray-400 group-hover:border-[#1e3a5f]'
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="w-6 h-6" /> : step.icon}
                </div>
                <div className="text-center">
                  <h3 className={`font-medium ${
                    index <= currentStep ? 'text-[#1e3a5f]' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex items-center mb-6">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
              currentStep <= steps.length - 1 
                ? 'bg-blue-100' 
                : 'bg-gray-100'
            }`}>
              {React.cloneElement(steps[currentStep].icon, { 
                className: `w-5 h-5 ${currentStep <= steps.length - 1 ? 'text-[#1e3a5f]' : 'text-gray-500'}` 
              })}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Step {currentStep + 1}: {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">
                {steps[currentStep].description}
              </p>
            </div>
          </div>
          
          {/* Step Content Area */}
          <div className="mt-8">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Industry</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent">
                    <option value="">Select your industry</option>
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Company Website</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="www.yourcompany.com"
                  />
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Username</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="Choose a username"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="terms" className="w-4 h-4 text-[#1e3a5f] rounded focus:ring-[#1e3a5f]" />
                  <label htmlFor="terms" className="ml-2 text-gray-700">
                    I agree to the Terms and Conditions
                  </label>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Card Number</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">CVV</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Cardholder Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    placeholder="Name on card"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Subscription Plan</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-[#1e3a5f]">
                      <div>
                        <h3 className="font-medium text-gray-900">Basic Plan</h3>
                        <p className="text-sm text-gray-600">₹999/month</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-[#1e3a5f] flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#1e3a5f]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-300">
                      <div>
                        <h3 className="font-medium text-gray-900">Premium Plan</h3>
                        <p className="text-sm text-gray-600">₹1999/month</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Your employer account has been created successfully. You can now start posting internships.
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Your Account Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Name</span>
                      <span className="text-gray-900">Acme Corporation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Username</span>
                      <span className="text-gray-900">acme_employer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email</span>
                      <span className="text-gray-900">contact@acme.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className="text-gray-900">Basic</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Billing</span>
                      <span className="text-gray-900">August 15, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-lg flex items-center ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-lg bg-[#1e3a5f] text-white flex items-center hover:bg-[#2d4b7b] transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(0)}
                className="px-6 py-3 rounded-lg bg-[#1e3a5f] text-white hover:bg-[#2d4b7b] transition-colors"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Employers Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We make it easy to find talented interns for your organization
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1e3a5f]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Access to Top Talent</h3>
              <p className="text-gray-600">Connect with qualified students from leading universities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1e3a5f]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Candidates</h3>
              <p className="text-gray-600">All student profiles are verified for authenticity</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1e3a5f]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Management</h3>
              <p className="text-gray-600">Simple tools to manage postings and applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;