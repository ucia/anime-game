
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CharacterCreation from "./pages/CharacterCreation";
import Play from "./pages/Play";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/character" element={<CharacterCreation />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </Router>
  );
}

export default App;
