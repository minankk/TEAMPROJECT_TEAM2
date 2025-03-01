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
import AboutUs from './AboutUs';
import DeliveryInformation from './DeliveryInformation';
import PrivacyPolicy from './PrivacyPolicy';
import PaymentPage from './PaymentPage';
import OrderSuccess from './OrderSuccess'; // Import Order Success Page
import SalesPage from './SalesPage';
import LogoutPage from './LogoutPage';

function App() {
  const userId = 1; // Temporary user ID. It can be dynamically changed later when the login feature is added
 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage userId={userId} />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/FAQs" element={<FAQ />} />
        <Route path="/t&c" element={<TermsAndConditions />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/delivery-information" element={<DeliveryInformation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/payment-page" element={<PaymentPage />} /> 
        <Route path="/order-success" element={<OrderSuccess />} /> 
        <Route path="/sale" element={<SalesPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
 
export default App;
 