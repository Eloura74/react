import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ accueilOnClick }) => {
  return (
    <nav className="navbarBg flex items-center justify-between h-36 shadow-lg shadow-gray-700 px-6">
      {/* Logo à gauche */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.svg"
            alt="logo"
            className="w-32 h-32 filter grayscale ml-12 mt-12"
          />
        </Link>
      </div>
      {/* Accueil et Profil à droite */}
      <div className="flex items-center gap-12 mr-16 mt-12">
        <Link to="/" onClick={accueilOnClick}>
          <span className="text-5xl text-white font-semibold inline-block transition-transform duration-300 hover:scale-105">
            Accueil
          </span>
        </Link>

        {/* Icône pour ouvrir Dashboard dans un nouvel onglet */}
        <a
          href="/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full cursor-pointer hoverBtn"
        >
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            aria-label="Dashboard"
          >
            <g transform="translate(0 -1028.4)">
              <path
                d="m12 0c-0.405 0-0.805 0.060326-1.188 0.15625-0.224 0.05678-0.44 0.13135-0.656 0.21875-0.083 0.03401-0.1679 0.05534-0.2498 0.09375-0.034 0.01583-0.06 0.04594-0.0937 0.0625-0.2032 0.10058-0.4021 0.21704-0.5937 0.34375-0.027 0.0174-0.0671 0.01339-0.0938 0.03125-0.0563 0.03864-0.101 0.08419-0.1562 0.12495-0.1569 0.1126-0.3216 0.216-0.4688 0.3438-0.1342 0.1207-0.2494 0.2724-0.375 0.4062-0.4251 0.4359-0.7936 0.8971-1.0938 1.4376-0.5154 0.9034-0.9002 1.9205-1.0624 2.9687-0.0783-0.0165-0.1501-0.0224-0.2188 0-0.5251 0.171-0.6545 1.1685-0.3125 2.2187 0.2007 0.6163 0.5346 1.1015 0.875 1.375 0.4573 1.7778 1.4257 3.2598 2.6875 4.1878v1.031l-1 1-2 1c-1.6173 0.801-3.2284 1.605-4.8438 2.406-0.89513 0.54-1.2415 1.6-1.1562 2.594 0.041664 0.626-0.18448 1.427 0.4375 1.844 0.5909 0.304 1.2959 0.106 1.9375 0.156 1.8766-0.001 3.7484 0 5.625 0 2.669 0.001 5.331 0 8 0 2.367 0 4.727 0.004 7.094 0 0.768-0.054 0.981-0.865 0.906-1.5 0.014-0.932 0.069-1.976-0.656-2.688-0.592-0.602-1.434-0.84-2.156-1.25-1.061-0.525-2.128-1.037-3.188-1.562l-2-1-1-1v-1.031c1.262-0.928 2.23-2.41 2.688-4.1878 0.34-0.2736 0.674-0.7588 0.874-1.375 0.342-1.0502 0.213-2.0477-0.312-2.2187-0.069-0.0224-0.14-0.0165-0.219 0-0.162-1.0482-0.547-2.0653-1.062-2.9687-0.3-0.5405-0.669-1.0017-1.094-1.4376-0.126-0.1338-0.241-0.2855-0.375-0.4062-0.006-0.0055-0.025 0.0055-0.031 0-0.392-0.3499-0.827-0.61894-1.281-0.84375-0.115-0.05622-0.227-0.10854-0.344-0.15625-0.084-0.03401-0.165-0.06426-0.25-0.09375-0.255-0.08848-0.516-0.17356-0.782-0.21875-0.02-0.003405-0.042 0.003148-0.062 0-0.249-0.039144-0.495-0.06525-0.75-0.0625z"
                transform="translate(0 1028.4)"
                fill="#ffffff"
              />
            </g>
          </svg>
        </a>
      </div>
    </nav>
  );
};

// ______________________________________________________________________________
// ______________________________________________________________________________
// Prop-types pour rendre le debug plus facile et verifier que les proprietes sont bien passes
// Navbar.propTypes = {
//   accueilOnClick: PropTypes.func.isRequired,
// };
export default Navbar;
