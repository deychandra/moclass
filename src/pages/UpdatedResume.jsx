import React, { useState, useEffect } from "react";
import {
  Download,
  Edit2,
  Trash2,
  Plus,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import ResumeModal from "../components/Modal/ResumeModal";
import resumeService from "../services/resume.service";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    skills: [],
    educations: [],
    experience: [],
    extracurriculars: [],
    trainings: [],
    academics: [],
    worksample: [],
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    additionalDetails: [],
    careerObjective: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalSection, setModalSection] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load resume data on component mount
  useEffect(() => {
    loadResumeData();
  }, []);

  const loadResumeData = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getResume();
      // Ensure all arrays are defined
      setResumeData({
        skills: data.skills || [],
        educations: data.educations || [],
        experience: data.experience || [],
        extracurriculars: data.extracurriculars || [],
        trainings: data.trainings || [],
        academics: data.academics || [],
        worksample: data.worksample || [],
        personalInfo: data.personalInfo || {
          name: "",
          email: "",
          phone: "",
          location: "",
        },
        additionalDetails: data.additionalDetails || [],
        careerObjective: data.careerObjective || ""
      });
    } catch (error) {
      console.error('Error loading resume:', error);
      // Initialize with empty data if no resume exists
      setResumeData({
        skills: [],
        educations: [],
        experience: [],
        extracurriculars: [],
        trainings: [],
        academics: [],
        worksample: [],
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          location: "",
        },
        additionalDetails: [],
        careerObjective: ""
      });
    } finally {
      setLoading(false);
    }
  };

  const saveResumeData = async (updatedData) => {
    try {
      setSaving(true);
      await resumeService.saveResume(updatedData);
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const openModal = ({ mode = "add", section, index = null }) => {
    setModalMode(mode);
    setModalSection(section);
    setEditingIndex(index);

    if (mode === "edit") {
      const sectionData = resumeData[section];
      if (Array.isArray(sectionData)) {
        setFormData(sectionData[index] || {});
      } else if (section === "personal") {
        setFormData(resumeData.personalInfo || {});
      } else if (section === "career") {
        setFormData({ text: resumeData.careerObjective || "" });
      }
    } else {
      // Set empty form based on section
      const emptyForms = {
        education: { degree: "", college: "", year: "", cgpa: "", startYear: "", endYear: "", stream: "" },
        skill: { name: "" },
        experience: { title: "", company: "", type: "", period: "", description: "", designation: "", location: "" },
        career: { text: "" },
        personal: { name: "", email: "", phone: "", location: "", gender: "", languages: "" },
        extracurricular: { title: "", description: "" },
        trainings: { title: "", description: "", organization: "", location: "" },
        academics: { title: "", description: "", projectLink: "" },
        worksample: { title: "", description: "", platform: "", url: "" },
        additionalDetails: { title: "", description: "" }
      };
      setFormData(emptyForms[section] || {});
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingIndex(null);
    setModalSection("");
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const saveForm = async () => {
    try {
      let updatedData = { ...resumeData };

      if (modalSection === "education") {
        const newEducations = [...(updatedData.educations || [])];
        if (modalMode === "add") {
          newEducations.unshift(formData);
        } else {
          newEducations[editingIndex] = formData;
        }
        updatedData.educations = newEducations;
      } else if (modalSection === "skill") {
        const newSkills = [...(updatedData.skills || [])];
        if (modalMode === "add") {
          newSkills.unshift(formData.name);
        } else {
          newSkills[editingIndex] = formData.name;
        }
        updatedData.skills = newSkills;
      } else if (modalSection === "experience") {
        const newExperience = [...(updatedData.experience || [])];
        if (modalMode === "add") {
          newExperience.unshift(formData);
        } else {
          newExperience[editingIndex] = formData;
        }
        updatedData.experience = newExperience;
      } else if (modalSection === "personal") {
        updatedData.personalInfo = formData;
      } else if (modalSection === "career") {
        updatedData.careerObjective = formData.text;
      } else if (["extracurriculars", "trainings", "academics", "worksample", "additionalDetails"].includes(modalSection)) {
        const newSectionData = [...(updatedData[modalSection] || [])];
        if (modalMode === "add") {
          newSectionData.unshift(formData);
        } else {
          newSectionData[editingIndex] = formData;
        }
        updatedData[modalSection] = newSectionData;
      }

      setResumeData(updatedData);
      await saveResumeData(updatedData);
      closeModal();
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Error saving data. Please try again.');
    }
  };

  const removeItem = async (section, index) => {
    try {
      const updatedData = { ...resumeData };
      const sectionData = updatedData[section] || [];
      updatedData[section] = sectionData.filter((_, i) => i !== index);
      
      setResumeData(updatedData);
      await saveResumeData(updatedData);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error removing item. Please try again.');
    }
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    console.log('Download resume as PDF');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading resume...</div>
      </div>
    );
  }

  // Safe destructuring with fallbacks
  const {
    skills = [],
    educations = [],
    experience = [],
    extracurriculars = [],
    trainings = [],
    academics = [],
    worksample = [],
    personalInfo = {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    additionalDetails = [],
    careerObjective = ""
  } = resumeData;

  const totalExperienceYears = experience.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-md border border-gray-100">
        <div className="px-8 pt-10 pb-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            moclass Resume
          </h1>
        </div>

        <div className="px-8">
          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 text-sm text-yellow-800 flex items-center gap-3">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M12 2l9 4v6c0 5-3.58 9-9 11-5.42-2-9-6-9-11V6l9-4z"
              ></path>
            </svg>
            <div className="text-sm">
              This is the resume employers will see when you apply. Please make
              sure it is up to date.
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {personalInfo.name || "Your Name"}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    openModal({
                      mode: "edit",
                      section: "personal",
                      index: null,
                    })
                  }
                >
                  <Edit2 size={16} />
                </button>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Mail size={14} /> <span>{personalInfo.email || "your.email@example.com"}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <Phone size={14} /> <span>{personalInfo.phone || "+91 0000000000"}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <MapPin size={14} /> <span>{personalInfo.location || "Your Location"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                onClick={handleDownload}
                disabled={saving}
              >
                <Download size={16} /> 
                <span className="text-sm">
                  {saving ? "Saving..." : "Download"}
                </span>
              </button>
            </div>
          </div>

          <hr className="my-6 border-t border-gray-200" />

          <div className="space-y-8">
            {/* Career Objective */}
            <Section label="CAREER OBJECTIVE">
              {careerObjective ? (
                <Card>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">{careerObjective}</p>
                    <button
                      className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                      onClick={() => openModal({ mode: "edit", section: "career" })}
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                </Card>
              ) : (
                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                  onClick={() => openModal({ mode: "add", section: "career" })}
                >
                  <Plus size={14} />{" "}
                  <span className="ml-2">Add your career objective</span>
                </div>
              )}
            </Section>

            {/* Education */}
            <Section label="EDUCATION">
              <div className="space-y-4">
                {educations.map((ed, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-800 font-semibold">
                        {ed.degree}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() =>
                            openModal({
                              mode: "edit",
                              section: "education",
                              index: idx,
                            })
                          }
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => removeItem("educations", idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {ed.college}
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <div>{ed.year || `${ed.startYear} - ${ed.endYear}`}</div>
                      {ed.cgpa && <div>CGPA: {ed.cgpa}</div>}
                      {ed.performanceScore && <div>Score: {ed.performanceScore}</div>}
                    </div>
                  </Card>
                ))}

                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                  onClick={() =>
                    openModal({ mode: "add", section: "education" })
                  }
                >
                  <Plus size={14} /> <span className="ml-2">Add education</span>
                </div>
              </div>
            </Section>

            {/* Work Experience */}
            <Section label={`WORK EXPERIENCE (${totalExperienceYears} ${totalExperienceYears === 1 ? 'YEAR' : 'YEARS'})`}>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <Card key={i}>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-semibold text-gray-800">
                          {exp.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() =>
                            openModal({
                              mode: "edit",
                              section: "experience",
                              index: i,
                            })
                          }
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => removeItem("experience", i)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      {exp.type} • {exp.period}
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {exp.description}
                    </p>
                  </Card>
                ))}

                <div className="flex gap-4 text-sm">
                  <div
                    className="text-blue-600 cursor-pointer hover:underline flex items-center"
                    onClick={() =>
                      openModal({ mode: "add", section: "experience" })
                    }
                  >
                    <Plus size={14} /> <span className="ml-2">Add job</span>
                  </div>
                  <div
                    className="text-blue-600 cursor-pointer hover:underline flex items-center"
                    onClick={() =>
                      openModal({ mode: "add", section: "experience" })
                    }
                  >
                    <Plus size={14} />{" "}
                    <span className="ml-2">Add internship</span>
                  </div>
                </div>
              </div>
            </Section>

            {/* Extra Curricular Activities */}
            <Section label="EXTRA CURRICULAR ACTIVITIES">
              <div className="space-y-4">
                {extracurriculars.map((ec, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-800 font-semibold">
                        {ec.title}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() =>
                            openModal({
                              mode: "edit",
                              section: "extracurricular",
                              index: idx,
                            })
                          }
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => removeItem("extracurriculars", idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {ec.description}
                    </div>
                  </Card>
                ))}

                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                  onClick={() =>
                    openModal({ mode: "add", section: "extracurricular" })
                  }
                >
                  <Plus size={14} /> <span className="ml-2">Add activity</span>
                </div>
              </div>
            </Section>

            {/* Trainings / Courses */}
            <Section label="TRAININGS / COURSES">
              <div className="space-y-4">
                {trainings.map((training, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-800 font-semibold">
                        {training.title}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() =>
                            openModal({
                              mode: "edit",
                              section: "trainings",
                              index: idx,
                            })
                          }
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => removeItem("trainings", idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {training.description}
                    </div>
                    {training.organization && (
                      <div className="mt-1 text-xs text-gray-500">
                        Organization: {training.organization}
                      </div>
                    )}
                  </Card>
                ))}

                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                  onClick={() =>
                    openModal({ mode: "add", section: "trainings" })
                  }
                >
                  <Plus size={14} /> <span className="ml-2">Add training</span>
                </div>
              </div>
            </Section>

            {/* Academics/Personal Projects */}
            <Section label="ACADEMICS/ PERSONAL PROJECTS">
              <div className="space-y-4">
                {academics.map((project, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-800 font-semibold">
                        {project.title}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() =>
                            openModal({
                              mode: "edit",
                              section: "academics",
                              index: idx,
                            })
                          }
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => removeItem("academics", idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {project.description}
                    </div>
                    {project.projectLink && (
                      <div className="mt-1 text-xs text-blue-600">
                        <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                          Project Link
                        </a>
                      </div>
                    )}
                  </Card>
                ))}

                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                  onClick={() =>
                    openModal({ mode: "add", section: "academics" })
                  }
                >
                  <Plus size={14} /> <span className="ml-2">Add project</span>
                </div>
              </div>
            </Section>

            {/* Skills */}
            <Section label="SKILLS">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-md p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                    {skills.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <div>{s}</div>
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                            onClick={() =>
                              openModal({
                                mode: "edit",
                                section: "skill",
                                index: idx,
                              })
                            }
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                            onClick={() => removeItem("skills", idx)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                    onClick={() => openModal({ mode: "add", section: "skill" })}
                  >
                    <Plus size={14} /> <span className="ml-2">Add skill</span>
                  </div>
                </div>
              </div>
            </Section>

            {/* Portfolio/Work Samples */}
            <Section label="PORTFOLIO/ WORK SAMPLES">
              <div className="space-y-4">
                {worksample.map((sample, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-800 font-semibold">
                        {sample.title}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() =>
                            openModal({
                              mode: "edit",
                              section: "worksample",
                              index: idx,
                            })
                          }
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => removeItem("worksample", idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {sample.description}
                    </div>
                    {sample.url && (
                      <div className="mt-1 text-xs text-blue-600">
                        <a href={sample.url} target="_blank" rel="noopener noreferrer">
                          {sample.platform || 'View Project'}
                        </a>
                      </div>
                    )}
                  </Card>
                ))}

                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                  onClick={() =>
                    openModal({ mode: "add", section: "worksample" })
                  }
                >
                  <Plus size={14} /> <span className="ml-2">Add work sample</span>
                </div>
              </div>
            </Section>

            {/* Accomplishments/Additional Details */}
            <Section label="ACCOMPLISHMENTS/ ADDITIONAL DETAILS">
              <div className="space-y-4">
                {additionalDetails.map((detail, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-800 font-semibold">
                        {detail.title}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() =>
                            openModal({
                              mode: "edit",
                              section: "additionalDetails",
                              index: idx,
                            })
                          }
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => removeItem("additionalDetails", idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {detail.description}
                    </div>
                  </Card>
                ))}

                <div
                  className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                  onClick={() =>
                    openModal({ mode: "add", section: "additionalDetails" })
                  }
                >
                  <Plus size={14} /> <span className="ml-2">Add details</span>
                </div>
              </div>
            </Section>
          </div>
        </div>

        <div className="h-6" />
      </div>

      <ResumeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalMode={modalMode}
        modalSection={modalSection}
        formData={formData}
        onChange={handleFormChange}
        onSave={saveForm}
        saving={saving}
      />
    </div>
  );
}

// Section Component
function Section({ label, children }) {
  return (
    <div>
      <div className="text-xs text-gray-500 tracking-wide font-medium mb-3">
        {label}
      </div>
      {children}
      <div className="mt-6 border-t border-gray-100" />
    </div>
  );
}

// Card Component
function Card({ children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-md p-4 shadow-sm">
      {children}
    </div>
  );
}