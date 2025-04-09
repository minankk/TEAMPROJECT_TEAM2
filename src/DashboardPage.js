import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import './DashboardPage.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path, { state: { fromSidebar: true } });
    };

    return (
        <div className="sidebar">
            <ul>
                <li><button onClick={() => handleNavigation('/dashboard')}>Overview</button></li>
                <li><button onClick={() => handleNavigation('/cart')}>Cart</button></li>
                <li><button onClick={() => handleNavigation('/dashboard/order-tracking')}>Order Tracking</button></li>
                <li><button onClick={() => handleNavigation('/dashboard/order-history')}>Order History</button></li>
                <li><button onClick={() => handleNavigation('/dashboard/favorites')}>Favorites</button></li>
                <li><button onClick={() => handleNavigation('/dashboard/profile')}>Personal Info</button></li>
                <li><button onClick={() => handleNavigation('/dashboard/messages')}>Messages</button></li>
                <li><button onClick={() => handleNavigation('/logout')}>Logout</button></li>
            </ul>
        </div>
    );
};

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Get the token from localStorage

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch("http://localhost:5001/dashboard", {
                  headers: {
                      'Authorization': `Bearer ${token}` // Include the token in the headers
                  }
              });
              if (!response.ok) {
                  throw new Error("Failed to fetch data");
              }
              const result = await response.json();
              setData(result);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="overview">
    <h2>Overview</h2>
    <div className="overview-grid">
      <div className="overview-item"><strong>Username:</strong><span>{data.username || 'N/A'}</span></div>
      <div className="overview-item"><strong>Message:</strong><span>{data.message || 'No new messages'}</span></div>
      <div className="overview-item"><strong>Orders:</strong><span>{data.orderCount ?? 0}</span></div>
      <div className="overview-item"><strong>Wishlist Items:</strong><span>{data.wishlistCount ?? 0}</span></div>
      <div className="overview-item"><strong>Wallet Balance:</strong><span>£{data.walletBalance || '0.00'}</span></div>
    </div>
          <div className="vip-info">
  {data.isVIP && data.benefits ? (
    <>
      <h3>🎖 VIP Member</h3>
      <p><strong>Tier:</strong> {data.benefits.tier}</p>
      <p><strong>Discount:</strong> {data.benefits.discount * 100}%</p>
    </>
  ) : (
    <>
      <h3>🚫 Not a VIP Member</h3>
      <p>Unlock exclusive perks and discounts by joining our VIP program!</p>
    </>
  )}
</div>
</div>
  );
};
const DashboardPage = () => {
    const location = useLocation();
    const showSidebar = !location.pathname.startsWith('/cart');

    console.log('Rendering DashboardPage');
    console.log('Location:', location.pathname);
    console.log('Show Sidebar:', showSidebar);

    return (
        <div className="dashboard">
            {showSidebar && <Sidebar />}
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardPage;
export { Overview };