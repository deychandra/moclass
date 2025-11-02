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
      profileImage: "",
      gender: "",
      languages: ""
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
          profileImage: "",
          gender: "",
          languages: ""
        },
        additionalDetails: data.additionalDetails || [],
        careerObjective: data.careerObjective || ""
      });
    } catch (error) {
      console.error('Error loading resume:', error);
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
          profileImage: "",
          gender: "",
          languages: ""
        },
        additionalDetails: [],
        careerObjective: ""
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        const updatedData = {
          ...resumeData,
          personalInfo: {
            ...resumeData.personalInfo,
            profileImage: base64
          }
        };
        setResumeData(updatedData);
        await saveResumeData(updatedData);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
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
      const emptyForms = {
        education: { 
          degree: "", 
          college: "", 
          startYear: "", 
          endYear: "", 
          stream: "", 
          educationType: "Graduation",
          performanceType: "Percentage",
          performanceScore: ""
        },
        skill: { name: "" },
        experience: { 
          title: "", 
          company: "", 
          type: "", 
          designation: "", 
          location: "", 
          startDate: "", 
          endDate: "", 
          currentlyWorking: false, 
          isRemote: false, 
          description: "",
          period: "" 
        },
        career: { text: "" },
        personal: { 
          name: "", 
          email: "", 
          phone: "", 
          location: "", 
          gender: "", 
          languages: "",
          profileImage: ""
        },
        extracurricular: { 
          title: "", 
          description: "",
          startDate: "",
          endDate: "",
          currentlyActive: false
        },
        trainings: { 
          title: "", 
          description: "", 
          organization: "", 
          location: "",
          startDate: "",
          endDate: "",
          currentlyOngoing: false,
          isOnline: false
        },
        academics: { 
          title: "", 
          description: "", 
          projectLink: "",
          startDate: "",
          endDate: "",
          currentlyOngoing: false
        },
        worksample: { 
          title: "", 
          description: "", 
          platform: "", 
          url: "",
          projectType: ""
        },
        additionalDetails: { 
          title: "", 
          description: "",
          type: "achievement"
        }
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
        let period = "";
        if (formData.startDate) {
          const startDate = new Date(formData.startDate);
          const startYear = startDate.getFullYear();
          const startMonth = startDate.toLocaleString('default', { month: 'short' });
          
          if (formData.currentlyWorking) {
            period = `${startMonth} ${startYear} - Present`;
          } else if (formData.endDate) {
            const endDate = new Date(formData.endDate);
            const endYear = endDate.getFullYear();
            const endMonth = endDate.toLocaleString('default', { month: 'short' });
            period = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
          }
        }

        const experienceData = {
          ...formData,
          period: period
        };

        const newExperience = [...(updatedData.experience || [])];
        if (modalMode === "add") {
          newExperience.unshift(experienceData);
        } else {
          newExperience[editingIndex] = experienceData;
        }
        updatedData.experience = newExperience;
      } else if (modalSection === "personal") {
        updatedData.personalInfo = formData;
      } else if (modalSection === "career") {
        updatedData.careerObjective = formData.text;
      } else if (modalSection === "extracurricular") {
        const newSectionData = [...(updatedData.extracurriculars || [])];
        if (modalMode === "add") {
          newSectionData.unshift(formData);
        } else {
          newSectionData[editingIndex] = formData;
        }
        updatedData.extracurriculars = newSectionData;
      } else if (["trainings", "academics", "worksample", "additionalDetails"].includes(modalSection)) {
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
    console.log('Download resume as PDF');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading resume...</div>
      </div>
    );
  }

  const {
    skills = [],
    educations = [],
    experience = [],
    extracurriculars = [],
    trainings = [],
    academics = [],
    worksample = [],
    personalInfo = {},
    additionalDetails = [],
    careerObjective = ""
  } = resumeData;

  const totalExperienceYears = experience.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-md border border-gray-100">
        {/* Header */}
        <div className="px-8 pt-10 pb-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            moclass Resume
          </h1>
        </div>

        {/* Alert Banner */}
        <div className="px-8">
          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 text-sm text-yellow-800 flex items-center gap-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2l9 4v6c0 5-3.58 9-9 11-5.42-2-9-6-9-11V6l9-4z" />
            </svg>
            <div className="text-sm">
              This is the resume employers will see when you apply. Please make sure it is up to date.
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 py-8">
          {/* Personal Info Header */}
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                {personalInfo.profileImage && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img 
                      src={personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {personalInfo.name || "Your Name"}
                  </h2>
                  <button
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => openModal({ mode: "edit", section: "personal" })}
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {personalInfo.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-gray-400" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={14} className="text-gray-400" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
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

          <hr className="my-8 border-t border-gray-200" />

          {/* Resume Sections */}
          <div className="space-y-8">
            {/* Career Objective */}
            <Section label="CAREER OBJECTIVE">
              {careerObjective ? (
                <Card>
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-600 leading-relaxed">{careerObjective}</p>
                    <button
                      className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors ml-4 flex-shrink-0"
                      onClick={() => openModal({ mode: "edit", section: "career" })}
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                </Card>
              ) : (
                <AddButton 
                  onClick={() => openModal({ mode: "add", section: "career" })}
                  text="Add your career objective"
                />
              )}
            </Section>

            {/* Education */}
            <Section label="EDUCATION">
              <div className="space-y-4">
                {educations.map((ed, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-gray-800">
                        {ed.degree} {ed.stream && `- ${ed.stream}`}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconButton
                          onClick={() => openModal({ mode: "edit", section: "education", index: idx })}
                          icon={<Edit2 size={14} />}
                        />
                        <IconButton
                          onClick={() => removeItem("educations", idx)}
                          icon={<Trash2 size={14} />}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {ed.college}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div>{ed.startYear} - {ed.endYear}</div>
                      {ed.performanceScore && (
                        <div>
                          {ed.performanceType}: {ed.performanceScore}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                <AddButton 
                  onClick={() => openModal({ mode: "add", section: "education" })}
                  text="Add education"
                />
              </div>
            </Section>

            {/* Work Experience */}
            <Section label={`WORK EXPERIENCE (${totalExperienceYears} ${totalExperienceYears === 1 ? 'YEAR' : 'YEARS'})`}>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <Card key={i}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-semibold text-gray-800">
                          {exp.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {exp.company} • {exp.designation}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconButton
                          onClick={() => openModal({ mode: "edit", section: "experience", index: i })}
                          icon={<Edit2 size={14} />}
                        />
                        <IconButton
                          onClick={() => removeItem("experience", i)}
                          icon={<Trash2 size={14} />}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      {exp.type} • {exp.period} {exp.isRemote && '• Remote'}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </Card>
                ))}

                <div className="flex gap-6 text-sm">
                  <AddButton 
                    onClick={() => openModal({ mode: "add", section: "experience" })}
                    text="Add job"
                  />
                  <AddButton 
                    onClick={() => openModal({ mode: "add", section: "experience" })}
                    text="Add internship"
                  />
                </div>
              </div>
            </Section>

            {/* Extra Curricular Activities */}
            <Section label="EXTRA CURRICULAR ACTIVITIES">
              <div className="space-y-4">
                {extracurriculars.map((ec, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-gray-800">
                        {ec.title}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconButton
                          onClick={() => openModal({ mode: "edit", section: "extracurricular", index: idx })}
                          icon={<Edit2 size={14} />}
                        />
                        <IconButton
                          onClick={() => removeItem("extracurriculars", idx)}
                          icon={<Trash2 size={14} />}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {ec.description}
                    </div>
                    {(ec.startDate || ec.endDate) && (
                      <div className="text-xs text-gray-500">
                        {ec.startDate && `Start: ${ec.startDate}`} 
                        {ec.endDate && ` - End: ${ec.endDate}`}
                        {ec.currentlyActive && ' (Currently Active)'}
                      </div>
                    )}
                  </Card>
                ))}
                <AddButton 
                  onClick={() => openModal({ mode: "add", section: "extracurricular" })}
                  text="Add activity"
                />
              </div>
            </Section>

            {/* Trainings / Courses */}
            <Section label="TRAININGS / COURSES">
              <div className="space-y-4">
                {trainings.map((training, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-gray-800">
                        {training.title}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconButton
                          onClick={() => openModal({ mode: "edit", section: "trainings", index: idx })}
                          icon={<Edit2 size={14} />}
                        />
                        <IconButton
                          onClick={() => removeItem("trainings", idx)}
                          icon={<Trash2 size={14} />}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {training.description}
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      {training.organization && (
                        <div>Organization: {training.organization}</div>
                      )}
                      {training.location && !training.isOnline && (
                        <div>Location: {training.location}</div>
                      )}
                      {training.isOnline && <div>Online Training</div>}
                      {(training.startDate || training.endDate) && (
                        <div>
                          {training.startDate && `Start: ${training.startDate}`} 
                          {training.endDate && ` - End: ${training.endDate}`}
                          {training.currentlyOngoing && ' (Currently Ongoing)'}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                <AddButton 
                  onClick={() => openModal({ mode: "add", section: "trainings" })}
                  text="Add training"
                />
              </div>
            </Section>

            {/* Academics/Personal Projects */}
            <Section label="ACADEMICS/ PERSONAL PROJECTS">
              <div className="space-y-4">
                {academics.map((project, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-gray-800">
                        {project.title}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconButton
                          onClick={() => openModal({ mode: "edit", section: "academics", index: idx })}
                          icon={<Edit2 size={14} />}
                        />
                        <IconButton
                          onClick={() => removeItem("academics", idx)}
                          icon={<Trash2 size={14} />}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {project.description}
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      {(project.startDate || project.endDate) && (
                        <div>
                          {project.startDate && `Start: ${project.startDate}`} 
                          {project.endDate && ` - End: ${project.endDate}`}
                          {project.currentlyOngoing && ' (Currently Ongoing)'}
                        </div>
                      )}
                      {project.projectLink && (
                        <div>
                          <a 
                            href={project.projectLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Project Link
                          </a>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                <AddButton 
                  onClick={() => openModal({ mode: "add", section: "academics" })}
                  text="Add project"
                />
              </div>
            </Section>

            {/* Skills */}
            <Section label="SKILLS">
              <div className="flex gap-8">
                <div className="flex-1 bg-white border border-gray-100 rounded-md p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                    {skills.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1"
                      >
                        <div>{s}</div>
                        <div className="flex items-center gap-1">
                          <IconButton
                            onClick={() => openModal({ mode: "edit", section: "skill", index: idx })}
                            icon={<Edit2 size={14} />}
                          />
                          <IconButton
                            onClick={() => removeItem("skills", idx)}
                            icon={<Trash2 size={14} />}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start">
                  <AddButton 
                    onClick={() => openModal({ mode: "add", section: "skill" })}
                    text="Add skill"
                  />
                </div>
              </div>
            </Section>

            {/* Portfolio/Work Samples */}
            <Section label="PORTFOLIO/ WORK SAMPLES">
              <div className="space-y-4">
                {worksample.map((sample, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-gray-800">
                        {sample.title}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconButton
                          onClick={() => openModal({ mode: "edit", section: "worksample", index: idx })}
                          icon={<Edit2 size={14} />}
                        />
                        <IconButton
                          onClick={() => removeItem("worksample", idx)}
                          icon={<Trash2 size={14} />}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {sample.description}
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      {sample.platform && (
                        <div>Platform: {sample.platform}</div>
                      )}
                      {sample.projectType && (
                        <div>Type: {sample.projectType}</div>
                      )}
                      {sample.url && (
                        <div>
                          <a 
                            href={sample.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {sample.platform || 'View Project'}
                          </a>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                <AddButton 
                  onClick={() => openModal({ mode: "add", section: "worksample" })}
                  text="Add work sample"
                />
              </div>
            </Section>

            {/* Accomplishments/Additional Details */}
            <Section label="ACCOMPLISHMENTS/ ADDITIONAL DETAILS">
              <div className="space-y-4">
                {additionalDetails.map((detail, idx) => (
                  <Card key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-gray-800">
                        {detail.title}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconButton
                          onClick={() => openModal({ mode: "edit", section: "additionalDetails", index: idx })}
                          icon={<Edit2 size={14} />}
                        />
                        <IconButton
                          onClick={() => removeItem("additionalDetails", idx)}
                          icon={<Trash2 size={14} />}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {detail.description}
                    </div>
                    {detail.type && (
                      <div className="text-xs text-gray-500 mt-1">
                        Type: {detail.type}
                      </div>
                    )}
                  </Card>
                ))}
                <AddButton 
                  onClick={() => openModal({ mode: "add", section: "additionalDetails" })}
                  text="Add details"
                />
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

// Reusable Components
function Section({ label, children }) {
  return (
    <div>
      <div className="text-xs text-gray-500 tracking-wide font-medium mb-4">
        {label}
      </div>
      {children}
      <div className="mt-6 border-t border-gray-100" />
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
      {children}
    </div>
  );
}

function AddButton({ onClick, text }) {
  return (
    <div
      className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center transition-colors"
      onClick={onClick}
    >
      <Plus size={14} />
      <span className="ml-2">{text}</span>
    </div>
  );
}

function IconButton({ onClick, icon }) {
  return (
    <button
      className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}