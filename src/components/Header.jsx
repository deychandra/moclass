import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger and close icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm  w-full ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  className="max-w-[140px] w-full"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/internships"
                className="text-gray-700 hover:text-[#1e3a5f] transition-colors"
              >
                Internships
              </Link>
              <Link
                to="/aboutUs"
                className="text-gray-700 hover:text-[#1e3a5f] transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-[#1e3a5f] transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-[#1e3a5f] hover:text-blue-800 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#1e3a5f] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Register
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-[#1e3a5f] focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg border-t">
            <nav className="flex flex-col space-y-4 px-6 py-4">
              <Link
                to="/internships"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#1e3a5f] transition-colors"
              >
                Internships
              </Link>
              <Link
                to="/aboutUs"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#1e3a5f] transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#1e3a5f] transition-colors"
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-3 pt-3 border-t">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-[#1e3a5f] font-medium hover:text-blue-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#1e3a5f] text-white px-6 py-2 rounded-lg text-center hover:bg-blue-800 transition-colors"
                >
                  Register
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
