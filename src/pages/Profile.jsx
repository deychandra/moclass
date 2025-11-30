import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../store";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(userContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    pictureUpload: null,
  });

  // ✅ Pre-fill form when user data becomes available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        pictureUpload: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pictureUpload") {
      setFormData((prev) => ({ ...prev, pictureUpload: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user || !user.id) {
        console.log("User not found. Please log in again.");
        return;
      }

      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("phoneNumber", formData.phoneNumber);
      if (formData.pictureUpload) {
        form.append("pictureUpload", formData.pictureUpload);
      }

      console.log("🚀 Payload being sent:");
      for (let pair of form.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.put(
        `http://localhost:3000/api/auth/users/${user.id}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        console.log("User updated successfully!");
      }
    } catch (error) {
      console.error("❌ Error updating user:", error.response?.data || error);
      console.log("Failed to update user");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="py-16" encType="multipart/form-data">
        {/* Full Name */}
        <div>
          <label className="font-medium text-sm text-[#333] mb-1 block">
            Full Name
          </label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0"
            placeholder="Enter your name"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="font-medium text-sm text-[#333] mb-1 block">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0"
              type="email"
              disabled
            />
          </div>

          <div>
            <label className="font-medium text-sm text-[#333] mb-1 block">
              Phone
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="mt-3">
          <label className="font-medium text-sm text-[#333] mb-1 block">
            Profile Picture
          </label>
          {(formData.pictureUpload || user?.pictureUpload) && (
    <div className="mb-3">
     <img
  src={
    formData.pictureUpload
      ? `http://localhost:3000/uploads/${formData.pictureUpload.name}`
      : `http://localhost:3000/uploads/${user.pictureUpload}`
  }
  
  alt="Profile Preview"
  className="w-24 h-24 rounded-full object-cover border border-gray-300"
/>
    </div>
  )}
  
          <input
            name="pictureUpload"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
