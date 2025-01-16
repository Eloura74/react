import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Let's Cook</h3>
            <p className="text-gray-400">
              Votre application de recettes de cuisine
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-gray-300">
              Accueil
            </a>
            <a href="/about" className="hover:text-gray-300">
              À propos
            </a>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Let's Cook. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
