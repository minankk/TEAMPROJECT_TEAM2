import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import './AdminDashboardPage.css'; // Assuming you create a CSS file

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
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); // Get the token from localStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/admin/overview", { // Update endpoint
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
        <div className="admin-overview">
            <h2>Admin Overview</h2>
            <p><strong>Total Users:</strong> {data.totalUsers || 'N/A'}</p>
            <p><strong>Total Products:</strong> {data.totalProducts || 'N/A'}</p>
            <p><strong>Total Orders:</strong> {data.totalOrders || 'N/A'}</p>
            <p><strong>New Messages:</strong> {data.newMessages || '0'}</p>
            {/* Add more overview data as needed */}
        </div>
    );
};

const AdminDashboardPage = () => {
    const location = useLocation();
    const showSidebar = !location.pathname.startsWith('/logout'); // Keep sidebar on all admin pages

    console.log('Rendering AdminDashboardPage');
    console.log('Location:', location.pathname);
    console.log('Show Sidebar:', showSidebar);

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