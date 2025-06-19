// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CaseStudy from "./Pages/CaseStudy"; // when you create it

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
