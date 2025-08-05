import React from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
       <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                    
                    <div className="flex items-center space-x-3">
                        <Link to="/">
                   <img src={Logo} alt="Logo" className="max-w-[150px] w-full" />
                    </Link>
                    </div>
                </div>
                <nav className="hidden md:flex space-x-8">
                    <Link to="/internships" className="text-gray-700 hover:text-[#1e3a5f] transition-colors">Internships</Link>
                    <Link to="/companies" className="text-gray-700 hover:text-[#1e3a5f] transition-colors">Companies</Link>
                    <Link to="/about" className="text-gray-700 hover:text-[#1e3a5f] transition-colors">About</Link>
                    <Link to="/contact" className="text-gray-700 hover:text-[#1e3a5f] transition-colors">Contact</Link>
                </nav>
                <div className="flex items-center space-x-4">
                <button className="text-[#1e3a5f] hover:text-blue-800 font-medium">Login</button>
                    <button className="bg-[#1e3a5f] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">Register</button>
                </div>
            </div>
        </div>
    </header>
    </>
  );
};

export default Header;
