import React from 'react'
import Logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <Link to="/">
                     <img src={Logo} alt="Logo" className="max-w-[150px] w-full color-gradient" />
                     </Link>
                    </div>
                    <p className="text-gray-400">Connecting students with opportunities to build their future careers.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">For Students</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <Link to="/internships" className="hover:text-white transition-colors">
                            Browse Internships</Link></li>
                        <li><Link to="/create-profile" className="hover:text-white transition-colors">Create Profile</Link></li>
                        <li><Link to="/career-guidance" className="hover:text-white transition-colors">Career Guidance</Link></li>
                        <li><Link to="/resume-builder" className="hover:text-white transition-colors">Resume Builder</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">For Employers</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/post-internships" className="hover:text-white transition-colors">Post Internships</Link></li>
                        <li><Link to="/find-talent" className="hover:text-white transition-colors">Find Talent</Link></li>
                        <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                        <li><Link to="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Support</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
                        <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
                        <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 MoclassName Internship. All rights reserved.</p>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer