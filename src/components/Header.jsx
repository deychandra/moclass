import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CircleUser, Menu, X } from "lucide-react";
import Logo from "../assets/images/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Moclass Logo" className="w-[140px]" />
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link to="/internship" className="hover:text-blue-600">Internship</Link>
          <Link to="/blog" className="hover:text-blue-600 flex items-center gap-1"><CircleUser /> Login/Register</Link>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 text-sm font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">Contact</Link>
          <Link to="/internship" onClick={() => setIsOpen(false)} className="block hover:text-blue-600">Internship</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
