import Inventory from "./component/Inventory";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APIContext } from "./component/Context.jsx";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(APIContext);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <>
      <header>
        <div>
          <h1>Inventory Manager</h1>
          <label>{user?.username}</label>
          <br />
        </div>
        <br />
        <nav>
          <button onClick={() => navigate("/login")} className="btn">
            Login
          </button>

          <button onClick={logout} className="btn">
            Logout
          </button>

          <button onClick={() => navigate("/signup")} className="btn">
            Signup
          </button>
          <button onClick={() => navigate("/")} className="btn">
            Home
          </button>
        </nav>
      </header>
      <main>
        <Inventory />
      </main>
    </>
  );
}

export default App;
