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
}) {
  if (!isOpen) return null;

  const title = `${modalMode === "add" ? "Add" : "Edit"} ${modalSection}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full z-10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#DDD]">
          <div className="font-medium text-gray-800">{title}</div>
          <button className="p-1" onClick={onClose} aria-label="Close modal">
            <X />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-auto">
          {modalSection === "education" && (
            <>
              <div className="text-center mb-[24px]">
                <strong class="text-[18px] font-semibold text-[#333]">
                  {" "}
                  Graduation details/ Post graduation details
                </strong>{" "}
              </div>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-[#333] mb-1">
                    College
                  </label>
                  <input
                    name="college"
                    value={formData.college || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      Start year
                    </label>
                    <select
                      name="startYear"
                      value={formData.startYear || ""}
                      onChange={onChange}
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    >
                      <option value="">Select</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      End year
                    </label>
                    <select
                      name="endYear"
                      value={formData.endYear || ""}
                      onChange={onChange}
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    >
                      <option value="">Select</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      Degree
                    </label>
                    <input
                      name="degree"
                      value={formData.degree || ""}
                      onChange={onChange}
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      Stream{" "}
                      <span className="text-gray-500 font-normal text-[11px] ml-1">
                        (Optional)
                      </span>
                    </label>
                    <input
                      name="stream"
                      value={formData.stream || ""}
                      onChange={onChange}
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    />
                  </div>
                </div>

                <div className="bg-[#1e3a5f1f] px-6 py-4 border border-[#DDD] text-[#484848]  rounded-[6px] text-[14px] leading-[1.57142857]">
                  <div>
                    <p>
                      Example: If your degree is B.Sc in Chemistry, then select
                      Bachelor of Science (B.Sc) in <strong>degree </strong>and
                      Chemistry in <strong>streams.</strong>
                    </p>
                  </div>

                  <div>
                    <p>
                      If you can't find your degree, check for typos or
                      different ways of writing your degree or choose from the
                      closest available. Write to{" "}
                      <a href="#" className="text-[#007BFF]">
                        {" "}
                        demo@gmail.com
                      </a>{" "}
                      if you are pursuing a degree not available in the list.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor=""
                      className="font-medium text-sm text-[#333] mb-1"
                    >
                      Select Education
                    </label>
                    <select
                      name=""
                      id=""
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    >
                      <option value="">Graduation</option>
                      <option value="2015">Post Graduation</option>
                      <option value="2016">Secondary XII</option>
                      <option value="2017">Secondary X</option>
                      <option value="2018">Diploma</option>
                      <option value="2019">Phd</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      Performance Score{" "}
                      <span className="text-gray-500 font-normal text-[11px] ml-1">
                        (Recommended)
                      </span>
                    </label>

                    <div className="flex gap-2">
                      <div className="w-[120px]">
                        <select
                          name="endYear"
                          value={formData.endYear || ""}
                          onChange={onChange}
                          className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 h-[45px]"
                        >
                          <option value="">Percentage</option>
                          <option value="2015">CGPA (10)</option>
                          <option value="2016">CGPA (9)</option>
                          <option value="2017">CGPA (8)</option>
                          <option value="2018">CGPA (7)</option>
                          <option value="2019">CGPA (6)</option>
                          <option value="2020">CGPA (5)</option>
                          <option value="2021">CGPA (4)</option>
                          <option value="2022">CGPA (3)</option>
                          <option value="2023">CGPA (2)</option>
                          <option value="2024">CGPA (1)</option>
                        </select>
                      </div>
                      <div className="flex-1 ">
                        <input
                          name="percentage"
                          value={formData.percentage || ""}
                          onChange={onChange}
                          className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}

          {modalSection === "skill" && (
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs text-gray-600">Skill name</label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={onChange}
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                />
              </div>
            </form>
          )}

          {modalSection === "experience" && (
            <>
              <div className="text-center mb-[24px]">
                <strong class="text-[18px] font-semibold text-[#333]">
                  {" "}
                  Job details
                </strong>{" "}
              </div>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-[#333] mb-1">
                    Designation
                  </label>
                  <input
                    placeholder="e.g. Software Engineer"
                    name="designation"
                    value={formData.college || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor=""
                      className="font-medium text-sm text-[#333] mb-1"
                    >
                      Profile
                    </label>
                    <input
                      type="text"
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                      name="profile"
                      value={formData.profile || ""}
                      onChange={onChange}
                      placeholder="e.g. Operations"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="font-medium text-sm text-[#333] mb-1"
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                      name="company"
                      value={formData.company || ""}
                      onChange={onChange}
                      placeholder="e.g. Google"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    placeholder="e.g. Kolkata"
                  />

                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className="w-4 h-4" name="" id="" />
                    <label htmlFor="">Is work from home</label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor=""
                      className="font-medium text-sm text-[#333] mb-1"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      name=""
                      id=""
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="font-medium text-sm text-[#333] mb-1"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      name=""
                      id=""
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    />

                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        name=""
                        id=""
                      />
                      <label htmlFor="">Currently working here</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="font-medium text-sm text-[#333] mb-1">
                    Description
                    <span className="text-gray-500 font-normal text-[11px] ml-1">
                      (Optional)
                    </span>
                  </label>

                  <div className="bg-[#1e3a5f1f] px-6 py-4 border border-[#DDD] text-[#484848]  rounded-[6px] text-[14px] leading-[1.57142857]">
                    <strong className="block">Pro tip:</strong>
                    <ul className="list-[circle] pl-[17px]">
                      <li>
                        Mention key job responsibilities, measurable impact or
                        results you helped deliver, any awards/recognition you
                        won during this time
                      </li>
                      <li>
                        Use action verbs: Built, Led, Drove, Conceptualized,
                        Learnt, etc.
                      </li>
                      <li>Use numbers and percentages wherever possible</li>
                      <li>Keep it to 3-4 points</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 resize-none"
                    placeholder="Type Here"
                    rows={5}
                  ></textarea>
                </div>
              </form>
            </>
          )}

          {modalSection === "extracurricular" && (
            <>
              <div className="text-center mb-[24px]">
                <strong class="text-[18px] font-semibold text-[#333]">
                  {" "}
                  Extra Curricular Activities
                </strong>{" "}
              </div>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-[#333] mb-1">
                    Description
                  </label>
                  <p className="mt-3 text-sm text-gray-600">
                    If you have been/are an active part of societies, conducted
                    any events or led a team, add details here
                  </p>
                </div>
                <div>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 resize-none"
                    placeholder="Type Here"
                    rows={5}
                  ></textarea>
                </div>
              </form>
            </>
          )}

          {modalSection === "trainings" && (
            <>
              <div className="text-center mb-[24px]">
                <strong class="text-[18px] font-semibold text-[#333]">
                  {" "}
                  Trainings
                </strong>{" "}
              </div>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-[#333] mb-1">
                    Training program
                  </label>
                  <input
                    placeholder="e.g. Software Engineer"
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    value={formData.training || ""}
                    name="training"
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="font-medium text-sm text-[#333] mb-1">
                    Organization
                  </label>
                  <input
                    placeholder="e.g. Google Trannings"
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    value={formData.organization || ""}
                    name="organization"
                    onChange={onChange}
                  />

                  <div className="flex items-center gap-2 mt-2">
                    <input className="w-4 h-4" id="" type="checkbox" name="" />
                    <label for="">Online</label>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-sm text-[#333] mb-1">
                    Location
                  </label>
                  <input
                    placeholder="e.g. Kolkata"
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    value={formData.location || ""}
                    name="location"
                    onChange={onChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      Start Date
                    </label>
                    <input
                      id=""
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                      type="date"
                      name=""
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      End Date
                    </label>
                    <input
                      id=""
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                      type="date"
                      name=""
                    />

                    <div className="flex items-center gap-2 mt-2">
                      <input
                        className="w-4 h-4"
                        id=""
                        type="checkbox"
                        name=""
                      />
                      <label for="">Currently working here</label>
                    </div>
                  </div>
                </div>

                <div>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 resize-none"
                    placeholder="Type Here"
                    rows={5}
                  ></textarea>
                </div>
              </form>
            </>
          )}

          {modalSection === "academics" && (
            <>
              <div className="text-center mb-[24px]">
                <strong class="text-[18px] font-semibold text-[#333]">
                  {" "}
                  Project details
                </strong>{" "}
              </div>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-sm text-[#333] mb-1">
                    Title
                  </label>
                  <input
                    placeholder="e.g. Optical Character Recognition"
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    value={formData.title || ""}
                    name="title"
                    onChange={onChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      Start Date
                    </label>
                    <input
                      id=""
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                      type="date"
                      name=""
                    />
                  </div>
                  <div>
                    <label className="font-medium text-sm text-[#333] mb-1">
                      End Date
                    </label>
                    <input
                      id=""
                      className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                      type="date"
                      name=""
                    />

                    <div className="flex items-center gap-2 mt-2">
                      <input
                        className="w-4 h-4"
                        id=""
                        type="checkbox"
                        name=""
                      />
                      <label for="">Currently ongoing</label>
                    </div>
                  </div>
                </div>

                <div>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 resize-none"
                    placeholder="Type Here"
                    rows={5}
                  ></textarea>
                </div>

                <div>
                  <label class="font-medium text-sm text-[#333] mb-1">
                    Project link
                    <span class="text-gray-500 font-normal text-[11px] ml-1">
                      (Optional)
                    </span>
                  </label>

                  <p className="mb-2 mt-1 text-sm text-gray-600">
                    If you have multiple project links or an offline project,
                    upload and provide link to google drive
                  </p>

                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="e.g http://localhost:5173/resumebuilder"
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                  />
                </div>
              </form>
            </>
          )}

          {modalSection === "career" && (
            <>
              <div className="text-center mb-[24px]">
                <strong className="text-[18px] font-semibold text-[#333]">
                  {" "}
                  Career objective
                </strong>{" "}
                <span className="text-gray-500 font-normal text-[11px] ml-1">
                  (Optional)
                </span>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-medium text-[14px] text-[#333] leading-normal">
                    Add a brief career objective to help employers understand
                    your career aspirations and value you can deliver to their
                    organization.
                  </label>
                  <textarea
                    name="text"
                    value={formData.text || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 resize-none"
                    rows={5}
                  />
                </div>
              </form>
            </>
          )}

          {modalSection === "personal" && (
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                  <img src="" className="w-full h-full object-cover" />

                  <Camera className="w-10 h-10 text-gray-400 absolute" />

                  <label className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity rounded-full">
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      name="profileImage"
                      onChange={onChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Upload profile photo
                </p>
              </div>

              <div>
                <label className="font-medium text-sm text-[#333] mb-1 block">
                  Full name
                </label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={onChange}
                  className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-sm text-[#333] mb-1 block">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    type="email"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm text-[#333] mb-1 block">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone || ""}
                    onChange={onChange}
                    className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-sm text-[#333] mb-1 block">
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location || ""}
                  onChange={onChange}
                  className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-sm text-[#333] mb-1 block">
                    Gender
                  </label>
                  <select
                    className="w-full shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px]  outline-0 "
                    name="gender"
                    value={formData.gender || ""}
                    onChange={onChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-sm text-[#333] mb-1 block">
                    Languages you know
                  </label>
                  <select
                    className="w-full shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px]  outline-0 "
                    name="language"
                    value={formData.language || ""}
                    onChange={onChange}
                  >
                    <option value="">Select Language</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </form>
          )}

          {modalSection === "worksample" && (
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="text-center mb-[24px]">
                <strong className="text-[18px] font-semibold text-[#333]">
                  {" "}
                  Work samples
                </strong>{" "}
                <p className="mt-3 text-sm text-gray-600">
                  Showcase your skills by adding your work samples
                </p>
              </div>

              <div className="bg-[#1e3a5f1f] px-6 py-4 border border-[#DDD] text-[#484848]  rounded-[6px] text-[14px] leading-[1.57142857]">
                <p className="font-medium text-[14px] text-[#333] leading-normal">
                  Add a brief career objective to help employers understand your
                  career aspirations and value you can deliver to their
                  organization.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <select
                    name=""
                    id=""
                    className="w-full shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px]  outline-0 "
                  >
                    <option value="">GitHub</option>
                    <option value="">GitLab</option>
                    <option value="">Bitbucket</option>
                    <option value="">Other</option>
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Enter URL"
                    className="w-full shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px]  outline-0 "
                  />
                </div>
              </div>
            </form>
          )}

          {modalSection === "additionalDetails" && (
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="text-center mb-[24px]">
                <strong className="text-[18px] font-semibold text-[#333]">
                  {" "}
                  Additional details
                </strong>{" "}
                <p className="mt-3 text-sm text-gray-600 text-left">
                  Add your accomplishments such as rewards, recognitions, test
                  scores, certifications, etc. here. You may also add
                  information such as seminars/workshops you have attended or
                  any interests/hobbies you have pursued.
                </p>
              </div>

              <div>
                <textarea
                  name=""
                  id=""
                  placeholder="E.g. Secured 1st rank among 500 entries in national level story writing competition organised by Internshala."
                  className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 resize-none"
                  rows={8}
                ></textarea>
              </div>
            </form>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-[#DDD]">
          <button className="px-4 py-2 rounded border" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
