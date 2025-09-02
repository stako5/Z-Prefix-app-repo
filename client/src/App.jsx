import Inventory from "./component/inventory";

import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
      <div>
        <h1>Inventory Manager</h1>
        <nav>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/")}>Home</button>
        </nav>
        <Inventory />
      </div>
    </>
  );
}

export default App;
