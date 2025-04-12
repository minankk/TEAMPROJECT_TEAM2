import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import './AdminDashboardPage.css';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path, { state: { fromSidebar: true } });
    };

    return (
        <div className="admin-sidebar">
            <ul>
                <li><button onClick={() => handleNavigation('/admin/overview')}>Overview</button></li>
                <li><button onClick={() => handleNavigation('/admin/messages')}>Messages</button></li>
                <li><button onClick={() => handleNavigation('/admin/products')}>Products Management</button></li>
                <li><button onClick={() => handleNavigation('/admin/users')}>User Management</button></li>
                <li><button onClick={() => handleNavigation('/admin/orders')}>Order Management</button></li>
                <li><button onClick={() => handleNavigation('/admin/analytics')}>Analytics</button></li>
                <li><button onClick={() => handleNavigation('/logout')}>Logout</button></li>
            </ul>
        </div>
    );
};

const AdminOverview = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [salesReport, setSalesReport] = useState([]);
    const [userActivity, setUserActivity] = useState(null);
    const [productStats, setProductStats] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await fetch('http://localhost:5001/admin/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                setDashboardData(json);
            } catch (err) {
                setError('Failed to fetch dashboard data');
            }
        };

        const fetchSales = async () => {
            try {
                const res = await fetch('http://localhost:5001/admin/reports/sales?reportType=monthly', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                setSalesReport(json);
            } catch {
                console.error('Sales report fetch failed');
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:5001/admin/reports/user-activity', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                setUserActivity(json);
            } catch {
                console.error('User activity fetch failed');
            }
        };

        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5001/admin/reports/products', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                setProductStats(json);
            } catch {
                console.error('Product stats fetch failed');
            }
        };

        fetchDashboardData();
        fetchSales();
        fetchUsers();
        fetchProducts();
    }, [token]);

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="admin-overview">
            <h2>Admin Overview</h2>
           {dashboardData && (
    <div className="overview-grid">
        <div className="overview-card">
            <strong>Total Users</strong>
            <span>{dashboardData.users}</span>
        </div>
        <div className="overview-card">
            <strong>Total Products</strong>
            <span>{dashboardData.products}</span>
        </div>
        <div className="overview-card">
            <strong>Total Sales</strong>
            <span>{dashboardData.sales}</span>
        </div>
    </div>
)}

            {salesReport.length > 0 && (
                <div className="overview-section">
                    <h3>Monthly Sales Report</h3>
                    <ul>
                        {salesReport.map((entry, index) => (
                            <li key={index}>{entry.period}: £{entry.sales}</li>
                        ))}
                    </ul>
                </div>
            )}

            {userActivity && (
                <div className="overview-section">
                    <h3>User Activity (Last 30 Days)</h3>
                    <p>Recent Signups: {userActivity.newSignups.length}</p>
                    <p>Active Users: {userActivity.activeUsers.length}</p>
                </div>
            )}

            {productStats && (
                <div className="overview-section">
                    <h3>Top Selling Products</h3>
                    <ul>
                        {productStats.mostSoldItems.map((item, idx) => (
                            <li key={idx}>{item.name} - {item.total_sold} sold</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const AdminDashboardPage = () => {
    const location = useLocation();
    const showSidebar = !location.pathname.startsWith('/logout');

    return (
        <div className="admin-dashboard">
            {showSidebar && <AdminSidebar />}
            <div className="admin-main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboardPage;
export { AdminOverview };
