import { useState, useEffect } from "react";
import { createContext } from "react";

export const APIContext = createContext();

function APIProvider({ children }) {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState(0);
  const [user, setUser] = useState(loggedUser);
  const [userList, setUserList] = useState([]);

  function loggedUser() {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  useEffect(() => {
    if (!user) {
      setUserList([]);
      return;
    }
    fetch(`http://localhost:8000/users/${user.id}/list`)
      .then((r) => r.json())
      .then(setUserList)
      .catch(() => setUserList([]));
  }, [user]);

  async function addToList(item_id, quantity = 1) {
    if (!user) return;
    const res = await fetch(`http://localhost:8000/users/${user.id}/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id, quantity }),
    });
    if (res.ok) {
      const refreshed = await fetch(
        `http://localhost:8000/users/${user.id}/list`
      ).then((r) => r.json());
      setUserList(refreshed);
    }
  }
  return (
    <APIContext.Provider
      value={{
        data,
        quantities,
        setQuantities,
        user,
        setUser,
        userList,
        addToList,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default APIProvider;
