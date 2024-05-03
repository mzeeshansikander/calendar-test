import "./App.css";

// Pages Imports
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Events from "./Pages/Events";

// React Router Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AuthGuard><Events /></AuthGuard>} /> {/* Public route */}
        <Route path="/events" element={<AuthGuard><Events /></AuthGuard>}> {/* Protected route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
