import "./App.css";

// Pages Imports
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Events from "./Pages/Events";

// React Router Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
