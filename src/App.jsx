import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const name = "toto";
  return (
    <>
      <h1 className="text-3xl font-bold">hello world {name}</h1>
      <div className="text-3xl">salut</div>
    </>
  );
}

export default App;
