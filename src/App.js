import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Import LandingPage component
import ProductsPage from "./pages/ProductsPage"; // Import ProductsPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing page route */}
        <Route path="/products" element={<ProductsPage />} /> {/* Products page route */}
      </Routes>
    </Router>
  );
}

export default App;
