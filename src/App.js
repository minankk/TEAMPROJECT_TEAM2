import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './LandingPage';
import ProductsPage from './ProductsPage';
import LoginPage from './LoginPage';
import CartPage from './components/CartPage';  // Import CartPage
//import DashboardPage from './DashboardPage'; // Import the dashboard page


function App() {
  const userId = 1;　// Temporary user ID. It can be dynamically changed later when the login feature is added
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage userId={userId} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
