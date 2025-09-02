import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Inventory Manager</h1>
      <nav>
        <button onClick={() => navigate("/")}>Home</button>
      </nav>
      <h1>Log In</h1>
      <form onSubmit={submit}>
        {" "}
        <br />
        <label>Username</label> &nbsp;
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        &nbsp;
        <label>Password</label> &nbsp;
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />{" "}
        &nbsp;
        <div>
          <br />
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
