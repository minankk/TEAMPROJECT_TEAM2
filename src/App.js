// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProductsPage from './ProductsPage'; //hahahah
import LoginPage from './LoginPage';


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
