import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import FindRecipes from "./FindRecipes";
import AddRecipes from "./AddRecipes";
const apiUrl = import.meta.env.VITE_API_URL;

useEffect(() => {
  fetch(`${apiUrl}WarmUp`);
}, []);

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<FindRecipes />} />
        <Route path="/add" element={<AddRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;

fetch(`${apiUrl}WarmUp`);
