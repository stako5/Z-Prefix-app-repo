import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Sent the form in JSON to the backend server for the db. Need to work on BCRYPT
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      navigate("/login");
    } else {
      console.log("error", data);
    }
  }

  return (
    <div>
      <header>
        <h1>Inventory Manager</h1>
        <nav>
          <button onClick={() => navigate("/")} className="btn">
            Home
          </button>
          <button onClick={() => navigate("/login")} className="btn">
            Login
          </button>
        </nav>
      </header>

      <div className="container">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div>
            <br />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
