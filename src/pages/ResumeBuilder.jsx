import React from "react";

export default function ResumeBuilder() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* back + title */}
        <div className="flex items-center mb-6">
          <a href="#" className="text-blue-600 mr-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </a>
          <h1 className="flex-1 text-center text-2xl font-semibold text-gray-800">Moclass Resume</h1>
        </div>

        {/* yellow notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-800 mb-6">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.516 9.81c.75 1.334-.213 2.99-1.742 2.99H4.483c-1.529 0-2.492-1.656-1.742-2.99l5.516-9.81zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>This is the resume employers will see when you apply. Please make sure it is up to date.</span>
          </div>
        </div>

        {/* card */}
        <div className="bg-white border border-gray-200 rounded shadow-sm divide-y divide-gray-100">
          {/* header info */}
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  Chandra Sekhar Dey
                  <button className="p-1 rounded text-gray-500 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.414 2.586a2 2 0 010 2.828L8.414 14.414 4 15l.586-4.414L14.586 2.586a2 2 0 012.828 0z" />
                    </svg>
                  </button>
                </h2>
                <div className="text-sm text-gray-500 mt-2">
                  <div>deychandrasekhar03@gmail.com</div>
                  <div className="mt-1">+91 8145234446</div>
                  <div className="mt-1">Kolkata</div>
                </div>
              </div>

              <div className="text-sm text-blue-600 flex items-center gap-3">
                <button className="flex items-center gap-2 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 00-1 1v2H5a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-3V3a1 1 0 00-1-1H9z" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* sections */}
          <div className="p-6 space-y-6">
            {/* career objective */}
            <Section title="CAREER OBJECTIVE">
              <AddLink text="Add your career objective" />
            </Section>

            {/* education */}
            <Section title="EDUCATION">
              <div className="bg-gray-50 border border-gray-100 rounded p-4">
                <h3 className="font-semibold text-gray-800">Bachelor of Arts (B.A.), Computer Science & Engineering</h3>
                <p className="text-sm text-gray-500 mt-2">Shyama Prasad Mukherjee College Of Education</p>
                <p className="text-sm text-gray-400 mt-2">2024 - 2030</p>
                <div className="mt-3 flex items-center gap-3 text-gray-500">
                  <button className="p-1 hover:bg-gray-100 rounded">Edit</button>
                  <button className="p-1 hover:bg-gray-100 rounded">Delete</button>
                </div>
              </div>

              <AddLink text="Add education" />
            </Section>

            {/* work experience */}
            <Section title="WORK EXPERIENCE">
              <div className="bg-gray-50 border border-gray-100 rounded p-4">
                <h3 className="font-semibold text-gray-800">Associate Software Developer</h3>
                <p className="text-sm text-gray-500 mt-1">Kloudz, Virtual</p>
                <p className="text-sm text-gray-400 mt-1">Job • Sep 2025 - Present (1 month)</p>
                <div className="mt-3 flex items-center gap-3 text-gray-500">
                  <button className="p-1 hover:bg-gray-100 rounded">Edit</button>
                  <button className="p-1 hover:bg-gray-100 rounded">Delete</button>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <AddLink text="Add job" />
                <AddLink text="Add internship" />
              </div>
            </Section>

            {/* repeated simple sections */}
            <Section title="EXTRA CURRICULAR ACTIVITIES"><AddLink text="Add extra curricular activities" /></Section>
            <Section title="TRAININGS/ COURSES"><AddLink text="Add training/ course" /></Section>
            <Section title="ACADEMICS/ PERSONAL PROJECTS"><AddLink text="Add academic/ personal project" /></Section>
            <Section title="SKILLS"><AddLink text="Add skill" /></Section>
            <Section title="PORTFOLIO/ WORK SAMPLES"><AddLink text="Add portfolio/ work sample" /></Section>
            <Section title="ACCOMPLISHMENTS/ ADDITIONAL DETAILS"><AddLink text="Add accomplishment/ additional detail" /></Section>

          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-xs tracking-wider text-gray-500 font-medium mb-3">{title}</div>
      <div>{children}</div>
      <div className="h-px bg-gray-100 mt-6" />
    </div>
  );
}

function AddLink({ text }) {
  return (
    <button className="text-blue-600 text-sm mt-3 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
      </svg>
      {text}
    </button>
  );
}
