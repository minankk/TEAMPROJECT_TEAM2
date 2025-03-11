import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardPage.css';


const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    sessionStorage.clear(); 
    navigate("/logout"); 
  };

  return (
    <div className="sidebar">
      <ul>
        <li><a href="#">Overview</a></li>
        <li><Link to="/cart/">Cart</Link></li>
        <li><a href="#">Order Tracking</a></li>
        <li><a href="#">Order History</a></li>
        <li><a href="#">Favorites</a></li>
        <li><a href="#">Personal Info</a></li>
        <li><a href="#">Messages</a></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </div>
  );
};

const Overview = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/dashboard");
        const result = await response.json();
        console.log("Fetched data:", result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Personal Info: {data.username || 'Loading...'}</p>
      <p>Message: {data.message || 'Loading...'}</p>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Overview />
      </div>
    </div>
  );
};

export default DashboardPage;
