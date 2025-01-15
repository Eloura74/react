import "./App.css";

function App() {
  const name = "toto";

  const score = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const link = [
    <a key="link1" href="https://vitejs.dev" target="_blank">
      leink
    </a>,
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const person = {
    name: "toto",
    age: 10,
  };
  const isMajor = true;

  const darkMode = true;
  // commentaire_________________________________________________________
  return (
    <main
      style={{
        backgroundColor: darkMode ? "black" : "white",
        color: darkMode ? "white" : "black",
      }}
    >
      {/* commentaire */}
      <h1 className="text-3xl font-bold">hello world {name}</h1>
      <div className="text-3xl">
        {score.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </div>
      <div className="text-3xl">
        {link.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </div>
      <div className="text-3xl">
        {person.name} {person.age} ans
      </div>
      <div className="text-3xl">
        Majorité :{isMajor ? " Majeur" : " mineur"}
      </div>
      <div className="text-3xl">{darkMode ? "Mode nuit" : "Mode jour"}</div>
    </main>
  );
}

export default App;
