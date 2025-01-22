import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { SocialIcon } from "react-social-icons"; 

const Footter = ({ copyright, socialLinks, navLinks }) => {
  return (
    <footer className="bg-[#14142B] py-4 px-6 bottom-0 w-full shadow-lg flex flex-col md:flex-row items-center justify-between z-50 gap-4">
      {/* Section principale */}
      <article className="text-center ml-4 md:text-left">
        <p className="text-white font-memoirs text-2xl">Lets Cook</p>
        <p className="text-gray-400 font-memoirs">
          Votre application de recettes culinaires
        </p>
      </article>

      {/* Liens sociaux dynamiques */}
      <article className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          {/* Génération dynamique des icônes de réseaux sociaux */}
          {socialLinks.map((link, index) => (
            <SocialIcon
              key={index}
              url={link.href}
              className="rounded-full shadow-md shadow-slate-200 hover:scale-110 transition-transform duration-200"
              style={{ height: 60, width: 60 }}
            />
          ))}
        </div>
        <p className="text-gray-400 text-sm underline">{copyright}</p>
      </article>

      {/* Liens de navigation dynamiques */}
      <article className="flex flex-wrap items-center gap-4 min-w-[200px] min-h-[100px]">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className=" text-center bg-[#353549] text-white font-memoirs rounded-full px-4 py-2 hover:bg-[#343437] transition-colors shadow-md hover:shadow-lg"
          >
            {link.label}
          </Link>
        ))}
      </article>
    </footer>
  );
};

export default Footter;

// Prop-types pour rendre le debug plus facile et verifier que les proprietes sont bien passes
Footter.propTypes = {
  copyright: PropTypes.string.isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
