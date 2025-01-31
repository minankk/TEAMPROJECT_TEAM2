<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Import LandingPage component
import ProductsPage from "./pages/ProductsPage"; // Import ProductsPage component
=======
// App.js
import React from 'react';
import LandingPage from './LandingPage';
import ProductsPage from './ProductsPage'; //hahahah
// import LoginPage from './LoginPage';
>>>>>>> 432b6cefa2b08e7ea97366542fab547b3a8a0614

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
