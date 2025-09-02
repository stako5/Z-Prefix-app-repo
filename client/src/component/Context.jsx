import { useState, useEffect } from "react";
import { createContext } from "react";

export const APIContext = createContext();

function APIProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((d) => setData(d));
    fetch("");
  }, []);

  return <APIContext.Provider value={{ data }}>{children}</APIContext.Provider>;
}

export default APIProvider;
