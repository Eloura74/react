import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footter from "../components/footter";

const Dashboard = () => {
  const socialLinks = [
    { url: "https://twitter.com", network: "twitter" },
    { url: "https://facebook.com", network: "facebook" },
    { url: "https://instagram.com", network: "instagram" },
  ];

  const navLinks = [
    { text: "Mentions légales", url: "/mentions-legales" },
    { text: "Politique de confidentialité", url: "/confidentialite" },
    { text: "CGU", url: "/cgu" },
  ];

  return (
    <div className="min-h-screen bodyBg">
      <Navbar accueilOnClick={() => {}} />
      <div className="container mx-auto p-8">
        <h1 className="text-gray-700 font-memoirs text-5xl font-bold mb-2e">
          Test Dashboard
        </h1>
        <Link to="/" className="text-white">
          Retour à l`&apos;`accueil
        </Link>
      </div>
      <Footter
        copyright=" 2024 Lets Cook. Tous droits réservés."
        socialLinks={socialLinks}
        navLinks={navLinks}
      />
    </div>
  );
};

export default Dashboard;
