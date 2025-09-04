import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIProvider from "./component/Context.jsx";
import ItemDetail from "./component/ItemDetail";
import Login from "./component/Login";
import Signup from "./component/Signup";
import NewItem from "./component/NewItem.jsx";

createRoot(document.getElementById("root")).render(
  <APIProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/items/newItem" element={<NewItem />} />
      </Routes>
    </Router>
  </APIProvider>
);
