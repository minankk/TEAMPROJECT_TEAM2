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
import Overview from './DashboardPage'; // Assuming Overview is exported from DashboardPage.js
import Signup from './signup';
import AboutUs from './AboutUs';
import DeliveryInformation from './DeliveryInformation';
import PrivacyPolicy from './PrivacyPolicy';
import PaymentPage from './PaymentPage';
import OrderSuccess from './OrderSuccess';
import SalesPage from './SalesPage';
import LogoutPage from './LogoutPage';
import UserMessagesPage from './UserMessagesPage';
import FavoritesPage from './FavoritesPage';
import OrdersPage from './OrdersPage';
import OrderHistoryPage from './OrderHistoryPage';
import UserProfilePage from './UserProfilePage';

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/delivery-information" element={<DeliveryInformation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/payment-page" element={<PaymentPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/sale" element={<SalesPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="orders" element={<OrdersPage />} />
          <Route path="order-history" element={<OrderHistoryPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="messages" element={<UserMessagesPage />} />
        </Route>
        {/*<Route path="/artists" element={<ArtistsPage />} />*/}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;