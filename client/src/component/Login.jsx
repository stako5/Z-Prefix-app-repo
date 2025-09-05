import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { APIContext } from "./Context.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(APIContext);

  // matches the password and the username from db to then save to localstorage for the app.jsx header so USER displays. add BCRYPT
  const submit = async (event) => {
    event.preventDefault();
    const res = await fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      if (setUser) setUser(data.user);
      navigate("/");
    }
  };

  return (
    <div>
      <header>
        <h1>Inventory Manager</h1>
        <nav>
          <button onClick={() => navigate("/")} className="btn">
            Home
          </button>
        </nav>
      </header>
      <div className="container">
        <h1>Log In</h1>
        <h3>Admin:</h3>
        <h4>Username: U001</h4>
        <h4>Username: 1qaz2wsx</h4>
        <form onSubmit={submit}>
          {" "}
          <br />
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />{" "}
          <div>
            <br />
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
