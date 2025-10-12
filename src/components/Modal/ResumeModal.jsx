
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
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-medium text-gray-800">{title}</div>
          <button className="p-1" onClick={onClose} aria-label="Close modal">
            <X />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-auto">
          {modalSection === "education" && (
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs text-gray-600">Degree</label>
                <input
                  name="degree"
                  value={formData.degree || ""}
                  onChange={onChange}
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">College</label>
                <input
                  name="college"
                  value={formData.college || ""}
                  onChange={onChange}
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Year</label>
                  <input
                    name="year"
                    value={formData.year || ""}
                    onChange={onChange}
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">CGPA</label>
                  <input
                    name="cgpa"
                    value={formData.cgpa || ""}
                    onChange={onChange}
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </form>
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
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs text-gray-600">Title</label>
                <input
                  name="title"
                  value={formData.title || ""}
                  onChange={onChange}
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Company</label>
                <input
                  name="company"
                  value={formData.company || ""}
                  onChange={onChange}
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Type</label>
                  <input
                    name="type"
                    value={formData.type || ""}
                    onChange={onChange}
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Period</label>
                  <input
                    name="period"
                    value={formData.period || ""}
                    onChange={onChange}
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={onChange}
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  rows={4}
                />
              </div>
            </form>
          )}

          {modalSection === "career" && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs text-gray-600">
                  Career objective
                </label>
                <textarea
                  name="text"
                  value={formData.text || ""}
                  onChange={onChange}
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  rows={5}
                />
              </div>
            </form>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t">
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
