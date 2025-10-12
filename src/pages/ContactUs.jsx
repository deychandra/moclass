// import React from "react";

// const ContactUs = () => {
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
//             Contact <span className="text-[#1e3a5f]">Us</span>
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
//             Have questions or need assistance? Our team is here to help you. 
//             Reach out anytime and we’ll get back to you as soon as possible.
//           </p>
//         </div>
//       </section>

//       {/* Contact Info + Form */}
//       <section className="py-16 sm:py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          
//           {/* Contact Details */}
//           <div className="space-y-6 sm:space-y-8">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               Get in Touch
//             </h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               You can reach us via email, phone, or by visiting our office.
//             </p>

//             <div className="space-y-6">
//               {/* Email */}
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#1e3a5f] text-lg sm:text-xl font-bold">
//                   📧
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900">Email</h4>
//                   <p className="text-gray-600 text-sm sm:text-base">support@moclassName.com</p>
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center text-[#1e3a5f] text-lg sm:text-xl font-bold">
//                   📞
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900">Phone</h4>
//                   <p className="text-gray-600 text-sm sm:text-base">+91 98765 43210</p>
//                 </div>
//               </div>

//               {/* Address */}
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 flex items-center justify-center text-[#1e3a5f] text-lg sm:text-xl font-bold">
//                   📍
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900">Address</h4>
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     123 Internship Street, Bangalore, India
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
//               Send us a Message
//             </h3>
//             <form className="space-y-5 sm:space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
//                   placeholder="Your Name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
//                   placeholder="you@example.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                 <textarea
//                   rows="4"
//                   className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
//                   placeholder="Write your message..."
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full sm:w-auto bg-[#1e3a5f] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#162947] transition"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Google Maps Embed */}
//       <section className="w-full h-64 sm:h-80 lg:h-96">
//         <iframe
//           title="Google Maps Location"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.835652872032!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b2f2!2sBangalore!5e0!3m2!1sen!2sin!4v1610000000000"
//           className="w-full h-full border-0"
//           allowFullScreen=""
//           loading="lazy"
//         ></iframe>
//       </section>
//     </>
//   );
// };

// export default ContactUs;
import React, { useState } from "react";
import ContactUsService from "../services/employer.service";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    subject: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (message || error) {
      setMessage("");
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await ContactUsService.submitContactForm(formData);
      
      if (response.data.success) {
        setMessage(response.data.message);
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: "",
          subject: ""
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err.response?.data?.message || 
        "Failed to send message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Contact <span className="text-[#1e3a5f]">Us</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Have questions or need assistance? Our team is here to help you. 
            Reach out anytime and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          
          {/* Contact Details */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              You can reach us via email, phone, or by visiting our office.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#1e3a5f] text-lg sm:text-xl font-bold">
                  📧
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600 text-sm sm:text-base">support@moclassName.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center text-[#1e3a5f] text-lg sm:text-xl font-bold">
                  📞
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600 text-sm sm:text-base">+91 98765 43210</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 flex items-center justify-center text-[#1e3a5f] text-lg sm:text-xl font-bold">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    123 Internship Street, Bangalore, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>
            
            {/* Success/Error Messages */}
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto bg-[#1e3a5f] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#162947] transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="w-full h-64 sm:h-80 lg:h-96">
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.835652872032!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b2f2!2sBangalore!5e0!3m2!1sen!2sin!4v1610000000000"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
};

export default ContactUs;