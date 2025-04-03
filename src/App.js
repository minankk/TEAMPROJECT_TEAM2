import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './LandingPage';
import ProductsPage from './ProductsPage';
import LoginPage from './LoginPage';
import ContactUsPage from './ContactUsPage';
import FAQ from './faq';
import TermsAndConditions from './termsandconditions';
import CartPage from './CartPage';
import DashboardPage, { Overview } from './DashboardPage';
import Signup from './signup';
import AdminSignup from './AdminSignUpPage'; 
import AboutUs from './AboutUs';
import DeliveryInformation from './DeliveryInformation';
import PrivacyPolicy from './PrivacyPolicy';
import PaymentPage from './PaymentPage';
import OrderSuccess from './OrderSuccess';
import SalesPage from './SalesPage';
import LogoutPage from './LogoutPage';
import PopPage from './PopPage';
import RockPage from './RockPage';
import SoundtrackPage from './SoundTrackPage';
import ForgotPassword from './ForgotPasswordPage';
import UserMessagesPage from './UserMessagesPage';
import FavoritesPage from './FavoritesPage';
import OrdersPage from './OrdersPage';
import OrderHistoryPage from './OrderHistoryPage';
import UserProfilePage from './UserProfilePage';
import BestSellers from './BestSellersPage';
import GenrePage from './GenrePage';
import AlternativeRockPage from './AlternativeRockPage';
import HipHopPage from './HipHopPage';
import AdminDashboardPage, { AdminOverview } from './AdminDashboardPage'; 
import MessagesPage from './MessagesPage'; 
import ProductsManagementPage from './ProductsManagementPage'; 
import UserManagementPage from './UserManagementPage'; 
import OrderManagementPage from './OrderManagementPage'; 
import AnalyticsPage from './AnalyticsPage'; 
import ResetPasswordPage from './ResetPasswordPage';
import SearchResults from './SearchResults';
import ArtistsPage from './ArtistsPage';
import BlogPage from './BlogPage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Start with null token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
          // Verify the token with the backend
          fetch('http://localhost:5001/verify-token', {
              headers: {
                  'Authorization': `Bearer ${storedToken}`
              }
          })
          .then(response => {
              if (response.ok) {
                  setToken(storedToken); // Set token from localStorage if it is valid
                  setIsLoggedIn(true); // Set logged in state
              } else {
                  localStorage.removeItem('token'); // Remove invalid token
                  setIsLoggedIn(false); // Set logged out state
              }
          })
          .catch(() => {
              localStorage.removeItem('token'); // Remove invalid token
              setIsLoggedIn(false); // Set logged out state
          });
      }
  }, []);

  useEffect(() => {
      if (token) {
          localStorage.setItem('token', token);
          setIsLoggedIn(true); // Set logged in state
      } else {
          localStorage.removeItem('token');
          setIsLoggedIn(false); // Set logged out state
      }
  }, [token]);

  const login = (newToken) => {
      console.log('Logging in with token:', newToken);
      setToken(newToken);
      navigate('/dashboard');
  };

  const logout = () => {
      console.log('Logging out');
      setToken(null);
      navigate('/login');
  };

  return (
      <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
          {children}
      </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/contact-us" element={<ContactUsPage />} />
                    <Route path="/FAQs" element={<FAQ />} />
                    <Route path="/t&c" element={<TermsAndConditions />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin-signup" element={<AdminSignup />} /> {/* Add the admin signup route */}
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/delivery-information" element={<DeliveryInformation />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/payment-page" element={<PaymentPage />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/sale" element={<SalesPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                    <Route path="genres" element={<GenrePage />} />
                    <Route path="/genres/alternative-rock" element={<AlternativeRockPage />} />
                    <Route path="/best-sellers" element={<BestSellers />} />
                    <Route path="/genres/hip-hop" element={<HipHopPage />} />
                    <Route path="/genres/soundtrack" element={<SoundtrackPage />} />
                    <Route path="/genres/pop" element={<PopPage />} />
                    <Route path="/genres/rock" element={<RockPage />} />
                    <Route path="/search-results" element={<SearchResults />} />
                    <Route path="/artists" element={<ArtistsPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />}>
                    <Route index element={<AdminOverview />} /> {/* Default route */}
                    <Route path="overview" element={<AdminOverview />} />   
                    <Route path="messages" element={<MessagesPage />} />
                    <Route path="products" element={<ProductsManagementPage />} />
                    <Route path="users" element={<UserManagementPage />} />
                    <Route path="orders" element={<OrderManagementPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />

                    </Route>
                    
                    {/* Dashboard Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute />}>
                        <Route path="" element={<DashboardPage />}>
                            <Route index element={<Overview />} />
                            <Route path="orders" element={<OrdersPage />} />
                            <Route path="order-history" element={<OrderHistoryPage />} />
                            <Route path="favorites" element={<FavoritesPage />} />
                            <Route path="profile" element={<UserProfilePage />} />
                            <Route path="messages" element={<UserMessagesPage />} />
                        </Route>
                    </Route>
                </Routes>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

// Protected Route Component
const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export { useAuth };
export default App;