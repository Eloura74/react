import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onHomeClick }) => {
  return (
    <nav className="bg-[#1F1F3D] py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo et titre */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={onHomeClick}
        >
          <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-[#00FF66] font-bold text-xl">Accueil</span>
        </Link>

        {/* Bouton Dashboard */}
        <Link
          to="/dashboard"
          className="bg-[#00FF66] text-[#14142B] px-4 py-2 rounded hover:bg-[#00FF66]/80 transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
