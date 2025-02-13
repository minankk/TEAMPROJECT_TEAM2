import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './LandingPage';
import ProductsPage from './ProductsPage';
import LoginPage from './LoginPage';
import ContactUsPage from './ContactUsPage';
import FAQ from './faq'; 
import TermsAndConditions from './termsandconditions';
import CartPage from './CartPage';
import DashboardPage from './DashboardPage';
import Signup from './signup';


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
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="/FAQs" element={<FAQ />} /> 
        <Route path="/t&c" element={<TermsAndConditions/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
