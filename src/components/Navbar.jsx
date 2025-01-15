import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#14142B] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Let's Cook Logo" className="h-8 w-8 mr-2" />
          <Link to="/" className="text-[#00FF66] hover:text-[#00FF66]/80">Accueil</Link>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Votre recherche"
            className="px-4 py-1 rounded bg-[#14142B] border border-gray-600 text-white mr-2"
          />
          <button className="bg-[#00FF66] text-[#14142B] px-3 py-1 rounded hover:bg-[#00FF66]/80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link to="/dashboard" className="ml-4 text-[#00FF66] hover:text-[#00FF66]/80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
