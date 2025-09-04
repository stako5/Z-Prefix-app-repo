import { useState, useEffect } from "react";
import { createContext } from "react";

export const APIContext = createContext();

function APIProvider({ children }) {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState(0);
  const [user, setUser] = useState(loggedUser);
  const url = `http://localhost:8000/items`;

  function loggedUser() {
    const raw = localStorage.getItem("user");
    return JSON.parse(raw);
  }

  useEffect(() => {
    if (user) {
      fetch(url)
        .then((res) => res.json())
        .then((d) => setData(d));
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((d) => setData(d));
    }
  }, [user]);

  return (
    <APIContext.Provider
      value={{
        data,
        setData,
        quantities,
        setQuantities,
        user,
        setUser,
        loggedUser,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default APIProvider;
