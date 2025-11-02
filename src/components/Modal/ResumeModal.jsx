import React from "react";
import { X, Plus, Camera } from "lucide-react";

export default function ResumeModal({
  isOpen,
  onClose,
  modalMode = "add",
  modalSection = "",
  formData = {},
  onChange,
  onSave,
  saving = false
}) {
  if (!isOpen) return null;

  const title = `${modalMode === "add" ? "Add" : "Edit"} ${modalSection.charAt(0).toUpperCase() + modalSection.slice(1)}`;

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (file.size > 2 * 1024 * 1024) {
          alert('Image size should be less than 2MB');
          return;
        }

        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file');
          return;
        }

        const base64 = await convertToBase64(file);
        onChange({ 
          target: { 
            name: 'profileImage', 
            value: base64 
          } 
        });
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const handleRemoveImage = () => {
    onChange({ 
      target: { 
        name: 'profileImage', 
        value: '' 
      } 
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCheckboxChange = (name, checked) => {
    onChange({
      target: {
        name,
        type: 'checkbox',
        checked
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full z-10 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#DDD] sticky top-0 bg-white">
          <div className="font-medium text-gray-800">{title}</div>
          <button className="p-1" onClick={onClose} aria-label="Close modal">
            <X />
          </button>
        </div>

        <div className="p-4">
          {/* Career Objective */}
          {modalSection === "career" && (
            <>
              <div className="text-center mb-6">
                <strong className="text-lg font-semibold text-gray-800">
                  Career Objective
                </strong>
                <span className="text-gray-500 text-sm ml-1">(Optional)</span>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Add a brief career objective to help employers understand your career aspirations and value you can deliver to their organization.
                  </label>
                  <textarea
                    name="text"
                    value={formData.text || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none resize-none"
                    rows={6}
                    placeholder="Describe your career goals and aspirations..."
                  />
                </div>
              </form>
            </>
          )}

          {/* Education */}
          {modalSection === "education" && (
            <>
              <div className="text-center mb-6">
                <strong className="text-lg font-semibold text-gray-800">
                  Education Details
                </strong>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    College/University
                  </label>
                  <input
                    name="college"
                    value={formData.college || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="Enter college/university name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Start Year
                    </label>
                    <select
                      name="startYear"
                      value={formData.startYear || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    >
                      <option value="">Select Year</option>
                      {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      End Year
                    </label>
                    <select
                      name="endYear"
                      value={formData.endYear || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    >
                      <option value="">Select Year</option>
                      {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Degree
                    </label>
                    <input
                      name="degree"
                      value={formData.degree || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      placeholder="e.g., Bachelor of Technology"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Stream (Optional)
                    </label>
                    <input
                      name="stream"
                      value={formData.stream || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Education Type
                  </label>
                  <select
                    name="educationType"
                    value={formData.educationType || "Graduation"}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                  >
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                    <option value="Secondary XII">Secondary XII</option>
                    <option value="Secondary X">Secondary X</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Performance Type
                    </label>
                    <select
                      name="performanceType"
                      value={formData.performanceType || "Percentage"}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="CGPA (10)">CGPA (10)</option>
                      <option value="CGPA (9)">CGPA (9)</option>
                      <option value="CGPA (8)">CGPA (8)</option>
                      <option value="CGPA (7)">CGPA (7)</option>
                      <option value="CGPA (4)">CGPA (4)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Performance Score
                    </label>
                    <input
                      name="performanceScore"
                      value={formData.performanceScore || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      placeholder="e.g., 85 or 8.5"
                    />
                  </div>
                </div>
              </form>
            </>
          )}

          {/* Experience (Job/Internship) */}
          {modalSection === "experience" && (
            <>
              <div className="text-center mb-6">
                <strong className="text-lg font-semibold text-gray-800">
                  Experience Details
                </strong>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Job Title
                  </label>
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Designation
                    </label>
                    <input
                      name="designation"
                      value={formData.designation || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      placeholder="e.g., Senior Developer"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Company
                    </label>
                    <input
                      name="company"
                      value={formData.company || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      placeholder="e.g., Google"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Employment Type
                  </label>
                  <select
                    name="type"
                    value={formData.type || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Location
                  </label>
                  <input
                    name="location"
                    value={formData.location || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., Kolkata"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4" 
                      name="isRemote"
                      checked={formData.isRemote || false}
                      onChange={(e) => handleCheckboxChange('isRemote', e.target.checked)}
                    />
                    <label className="text-sm">Work from home</label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Start Date
                    </label>
                    <input
                      type="month"
                      name="startDate"
                      value={formData.startDate || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      End Date
                    </label>
                    <input
                      type="month"
                      name="endDate"
                      value={formData.endDate || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      disabled={formData.currentlyWorking}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        name="currentlyWorking"
                        checked={formData.currentlyWorking || false}
                        onChange={(e) => handleCheckboxChange('currentlyWorking', e.target.checked)}
                      />
                      <label className="text-sm">Currently working here</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Description
                    <span className="text-gray-500 text-sm ml-1">(Optional)</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none resize-none"
                    placeholder="Describe your responsibilities and achievements..."
                    rows={5}
                  />
                </div>
              </form>
            </>
          )}

          {/* Extra Curricular Activities */}
          {modalSection === "extracurricular" && (
            <>
              <div className="text-center mb-6">
                <strong className="text-lg font-semibold text-gray-800">
                  Extra Curricular Activities
                </strong>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Activity Title
                  </label>
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., College Football Team Captain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Start Date
                    </label>
                    <input
                      type="month"
                      name="startDate"
                      value={formData.startDate || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      End Date
                    </label>
                    <input
                      type="month"
                      name="endDate"
                      value={formData.endDate || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      disabled={formData.currentlyActive}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        name="currentlyActive"
                        checked={formData.currentlyActive || false}
                        onChange={(e) => handleCheckboxChange('currentlyActive', e.target.checked)}
                      />
                      <label className="text-sm">Currently Active</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none resize-none"
                    placeholder="Describe your role, responsibilities, and achievements..."
                    rows={5}
                  />
                </div>
              </form>
            </>
          )}

          {/* Trainings */}
          {modalSection === "trainings" && (
            <>
              <div className="text-center mb-6">
                <strong className="text-lg font-semibold text-gray-800">
                  Training Details
                </strong>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Training Program
                  </label>
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., React.js Advanced Training"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Organization
                  </label>
                  <input
                    name="organization"
                    value={formData.organization || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., Google Trainings"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      name="isOnline"
                      checked={formData.isOnline || false}
                      onChange={(e) => handleCheckboxChange('isOnline', e.target.checked)}
                    />
                    <label className="text-sm">Online Training</label>
                  </div>
                </div>

                {!formData.isOnline && (
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Location
                    </label>
                    <input
                      name="location"
                      value={formData.location || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      placeholder="e.g., Kolkata"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Start Date
                    </label>
                    <input
                      type="month"
                      name="startDate"
                      value={formData.startDate || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      End Date
                    </label>
                    <input
                      type="month"
                      name="endDate"
                      value={formData.endDate || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      disabled={formData.currentlyOngoing}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        name="currentlyOngoing"
                        checked={formData.currentlyOngoing || false}
                        onChange={(e) => handleCheckboxChange('currentlyOngoing', e.target.checked)}
                      />
                      <label className="text-sm">Currently Ongoing</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none resize-none"
                    placeholder="Describe what you learned and skills acquired..."
                    rows={5}
                  />
                </div>
              </form>
            </>
          )}

          {/* Academics/Projects */}
          {modalSection === "academics" && (
            <>
              <div className="text-center mb-6">
                <strong className="text-lg font-semibold text-gray-800">
                  Project Details
                </strong>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Project Title
                  </label>
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., E-commerce Website"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Start Date
                    </label>
                    <input
                      type="month"
                      name="startDate"
                      value={formData.startDate || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      End Date
                    </label>
                    <input
                      type="month"
                      name="endDate"
                      value={formData.endDate || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                      disabled={formData.currentlyOngoing}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        name="currentlyOngoing"
                        checked={formData.currentlyOngoing || false}
                        onChange={(e) => handleCheckboxChange('currentlyOngoing', e.target.checked)}
                      />
                      <label className="text-sm">Currently Ongoing</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none resize-none"
                    placeholder="Describe the project, technologies used, and your role..."
                    rows={5}
                  />
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Project Link (Optional)
                  </label>
                  <input
                    name="projectLink"
                    value={formData.projectLink || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., https://github.com/username/project"
                  />
                </div>
              </form>
            </>
          )}

          {/* Skills */}
          {modalSection === "skill" && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-medium text-sm text-gray-700 mb-2 block">
                  Skill Name
                </label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={onChange}
                  className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                  placeholder="e.g., JavaScript, React, Python"
                />
              </div>
            </form>
          )}

          {/* Portfolio/Work Samples */}
          {modalSection === "worksample" && (
            <>
              <div className="text-center mb-6">
                <strong className="text-lg font-semibold text-gray-800">
                  Work Samples
                </strong>
                <p className="mt-2 text-sm text-gray-600">
                  Showcase your skills by adding your work samples
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Project Title
                  </label>
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., Portfolio Website"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Platform
                    </label>
                    <select
                      name="platform"
                      value={formData.platform || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    >
                      <option value="">Select Platform</option>
                      <option value="GitHub">GitHub</option>
                      <option value="GitLab">GitLab</option>
                      <option value="Bitbucket">Bitbucket</option>
                      <option value="Behance">Behance</option>
                      <option value="Dribbble">Dribbble</option>
                      <option value="Personal Website">Personal Website</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType || ""}
                      onChange={onChange}
                      className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    >
                      <option value="">Select Type</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Desktop Application">Desktop Application</option>
                      <option value="Design Project">Design Project</option>
                      <option value="Open Source">Open Source</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Project URL
                  </label>
                  <input
                    name="url"
                    value={formData.url || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., https://github.com/username/project"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none resize-none"
                    placeholder="Describe the project and your contributions..."
                    rows={4}
                  />
                </div>
              </form>
            </>
          )}

          {/* Additional Details */}
          {modalSection === "additionalDetails" && (
            <>
              <div className="text-center mb-6">
                <strong className="text-lg font-semibold text-gray-800">
                  Additional Details
                </strong>
                <p className="mt-2 text-sm text-gray-600 text-left">
                  Add your accomplishments such as rewards, recognitions, test scores, certifications, etc. here.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type || "achievement"}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                  >
                    <option value="achievement">Achievement</option>
                    <option value="award">Award</option>
                    <option value="certification">Certification</option>
                    <option value="publication">Publication</option>
                    <option value="conference">Conference</option>
                    <option value="hobby">Hobby/Interest</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Title
                  </label>
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., Best Paper Award 2023"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none resize-none"
                    placeholder="Provide details about your accomplishment..."
                    rows={5}
                  />
                </div>
              </form>
            </>
          )}

          {/* Personal Information */}
          {modalSection === "personal" && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                  {formData.profileImage ? (
                    <img 
                      src={formData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-10 h-10 text-gray-400" />
                  )}
                  
                  <label className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity rounded-full">
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {formData.profileImage ? "Change profile photo" : "Upload profile photo"}
                </p>
                
                {formData.profileImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-1 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove photo
                  </button>
                )}
              </div>

              <div>
                <label className="font-medium text-sm text-gray-700 mb-2 block">
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={onChange}
                  className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    type="tel"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-sm text-gray-700 mb-2 block">
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location || ""}
                  onChange={onChange}
                  className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                  placeholder="e.g., Mumbai, India"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Languages
                  </label>
                  <input
                    name="languages"
                    value={formData.languages || ""}
                    onChange={onChange}
                    className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded text-sm outline-none"
                    placeholder="e.g., English, Hindi, Spanish"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <button 
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}