import React from "react";
import { X, Plus } from "lucide-react";

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


<h1>gender is male</h1>


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
