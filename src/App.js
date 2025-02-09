import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './LandingPage';
import ProductsPage from './ProductsPage';
import LoginPage from './LoginPage';
import CartPage from './CartPage';
import ContactUsPage from './ContactUsPage';
//import DashboardPage from './DashboardPage'; // Import the dashboard page


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
