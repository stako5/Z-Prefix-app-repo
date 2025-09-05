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
  //Update context with UTils for api.js so data can be reuse better and less reduntances/CRUD render issues.
  function reFetch() {
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  }

  useEffect(() => {
    reFetch();
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
        reFetch,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default APIProvider;
