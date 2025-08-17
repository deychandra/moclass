import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            About <span className="text-[#1e3a5f]">MoclassName</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
            We are on a mission to bridge the gap between talented students and
            top companies by providing meaningful internship opportunities that
            kickstart successful careers.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 sm:gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              To empower students and young professionals by connecting them
              with verified, high-quality internship opportunities. We believe
              in learning by doing and enabling every student to find their
              dream career path.
            </p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              To become the world’s most trusted platform for internships,
              where every student can explore opportunities, gain experience,
              and build a strong foundation for their future.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-6 sm:gap-8 md:grid-cols-3 text-center">
          <div className="p-6 sm:p-8 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
              10,000+
            </h3>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">
              Internships Listed
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-green-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
              5,000+
            </h3>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">
              Companies Partnered
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-purple-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
              50,000+
            </h3>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">
              Students Empowered
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 sm:mb-12">
            Meet Our Team
          </h2>
          <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                img: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=871&auto=format&fit=crop",
              },
              {
                name: "Sophia Lee",
                role: "Head of Partnerships",
                img: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop",
              },
              {
                name: "Michael Smith",
                role: "Product Manager",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover mb-4 sm:mb-6"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-[#1e3a5f] text-white text-center">
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Join Us on Our Journey
          </h2>
          <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8">
            Whether you’re a student seeking opportunities or a company looking
            for talented interns, MoclassName is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/find-internships"
              className="bg-white text-[#1e3a5f] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Find Internships
            </Link>
            <Link
              to="/post-internship"
              className="border-2 border-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a5f] transition"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
