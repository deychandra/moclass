import axios from "axios";
import TokenHelper from "../components/TokenHelper";

const BASE_URL = "http://localhost:3000/api/resume";

const ResumeService = {
  // ✅ Get user's resume
  async getResume() {
    const res = await axios.get(BASE_URL, TokenHelper.getHeader());
    return res.data; // ✅ return only data
  },

  // ✅ Save or update entire resume
  async saveResume(data) {
    const res = await axios.post(BASE_URL, JSON.stringify(data), TokenHelper.getHeader());
    return res.data; // ✅
  },

  // ✅ Update specific section
  async updateSection(section, data) {
    const res = await axios.put(`${BASE_URL}/section/${section}`, data, TokenHelper.getHeader());
    return res.data; // ✅
  },

  // ✅ Delete entire resume
  async deleteResume() {
    const res = await axios.delete(BASE_URL, TokenHelper.getHeader());
    return res.data; // ✅
  },

  // ✅ Delete specific section
  async deleteSection(section) {
    const res = await axios.delete(`${BASE_URL}/section/${section}`, TokenHelper.getHeader());
    return res.data; // ✅
  },
};

export default ResumeService;
