// Import
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App.jsx";
// _____________________________________________________________________________
// ______________________________________________________________________________
createRoot(document.getElementById("root")).render(
  // StrictMode permet de verifier que le code fonctionne correctement
  <StrictMode>
    {/* BrowserRouter permet de gerer les routes */}
    <BrowserRouter>
      {/* App est le composant principal */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
