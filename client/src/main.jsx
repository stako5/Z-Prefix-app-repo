import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIProvider from "./component/Context.jsx";
import ItemDetail from "./component/ItemDetail";
import ItemsList from "./component/ItemList";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Inventory from "./component/inventory";

createRoot(document.getElementById("root")).render(
  <APIProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/items" element={<ItemsList />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  </APIProvider>
);
