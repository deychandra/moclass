import React, { useState } from "react";
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

export default function ResumeBuilder() {
  const [skills, setSkills] = useState([
    "PHP",
    "HTML",
    "CSS",
    "JavaScript",
    "Adobe Photoshop",
    "MySQL",
    "jQuery",
    "Node.js",
    "MongoDB",
    "Express.js",
  ]);

  const [educations, setEducations] = useState([
    {
      degree: "B.Tech (Hons.), Computer Science & Engineering",
      college: "Templecity Institute Of Technology And Engineering",
      year: "2016 - 2020",
      cgpa: "7.30/10",
    },
    {
      degree: "B.Tech (Hons.), Computer Science & Engineering",
      college: "Templecity Institute Of Technology And Engineering",
      year: "2016 - 2020",
      cgpa: "7.30/10",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      title: "Webdevelopment Internship",
      company: "Appmantechnology Pvt.ltd, Bhubaneswar",
      type: "Internship",
      period: "Dec 2019 - Dec 2020 (1 year)",
      description:
        "I have done web development using node.js, mongodb, express js, mongoose with a realstate project.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalSection, setModalSection] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  function openModal({ mode = "add", section, index = null }) {
    setModalMode(mode);
    setModalSection(section);
    setEditingIndex(index);

    if (mode === "edit") {
      if (section === "education") setFormData(educations[index]);
      else if (section === "skill") setFormData({ name: skills[index] });
      else if (section === "experience") setFormData(experience[index]);
      else if (section === "career") setFormData({ text: "" });
    } else {
      if (section === "education")
        setFormData({ degree: "", college: "", year: "", cgpa: "" });
      else if (section === "skill") setFormData({ name: "" });
      else if (section === "experience")
        setFormData({
          title: "",
          company: "",
          type: "",
          period: "",
          description: "",
        });
      else if (section === "career") setFormData({ text: "" });
    }

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormData({});
    setEditingIndex(null);
    setModalSection("");
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  }

  function saveForm() {
    if (modalSection === "education") {
      if (modalMode === "add") setEducations((s) => [formData, ...s]);
      else if (modalMode === "edit")
        setEducations((s) =>
          s.map((it, i) => (i === editingIndex ? formData : it))
        );
    } else if (modalSection === "skill") {
      if (!formData.name) return;
      if (modalMode === "add") setSkills((s) => [formData.name, ...s]);
      else if (modalMode === "edit")
        setSkills((s) =>
          s.map((it, i) => (i === editingIndex ? formData.name : it))
        );
    } else if (modalSection === "experience") {
      if (modalMode === "add") setExperience((s) => [formData, ...s]);
      else if (modalMode === "edit")
        setExperience((s) =>
          s.map((it, i) => (i === editingIndex ? formData : it))
        );
    }

    closeModal();
  }

  function removeSkill(index) {
    setSkills((s) => s.filter((_, i) => i !== index));
  }

  function removeEducation(index) {
    setEducations((s) => s.filter((_, i) => i !== index));
  }

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
                <h2 className="text-2xl font-bold text-gray-800">Jagan Rout</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit2 size={16} />
                </button>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Mail size={14} /> <span>jaganrout33@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <Phone size={14} /> <span>+91 9556246675</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <MapPin size={14} /> <span>Bhubaneswar</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <Download size={16} /> <span className="text-sm">Download</span>
              </button>
            </div>
          </div>

          <hr className="my-6 border-t border-gray-200" />

          <div className="space-y-8">
            <Section label="CAREER OBJECTIVE">
              <div
                className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                onClick={() => openModal({ mode: "add", section: "career" })}
              >
                <Plus size={14} />{" "}
                <span className="ml-2">Add your career objective</span>
              </div>
            </Section>

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
                          onClick={() => removeEducation(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {ed.college}
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <div>{ed.year}</div>
                      <div>CGPA: {ed.cgpa}</div>
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

            <Section label={`WORK EXPERIENCE (${experience.length} YEAR)`}>
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
                        <button className="p-1 hover:bg-gray-100 rounded-full">
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
                            onClick={() => removeSkill(idx)}
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

            <Section label="PORTFOLIO/ WORK SAMPLES">
              <div className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center">
                <Plus size={14} />{" "}
                <span className="ml-2">Add portfolio/ work sample</span>
              </div>
            </Section>

            <Section label="ACCOMPLISHMENTS/ ADDITIONAL DETAILS">
              <div className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center">
                <Plus size={14} />{" "}
                <span className="ml-2">
                  Add accomplishment/ additional detail
                </span>
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
      />
    </div>
  );
}

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

function Card({ children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-md p-4 shadow-sm">
      {children}
    </div>
  );
}
