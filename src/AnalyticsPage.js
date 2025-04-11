import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import "./AnalyticsPage.css";

const AnalyticsPage = () => {
  const token = localStorage.getItem("token");
  const [salesData, setSalesData] = useState([]);
  const [userActivity, setUserActivity] = useState({ newSignups: [], activeUsers: [] });
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const res = await fetch("http://localhost:5001/admin/reports/sales?reportType=monthly", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Sales fetch failed: ${await res.text()}`);
        const data = await res.json();
        setSalesData(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const fetchUserActivity = async () => {
      try {
        const res = await fetch("http://localhost:5001/admin/reports/user-activity", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`User activity fetch failed: ${await res.text()}`);
        const data = await res.json();
        setUserActivity(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const fetchTopProducts = async () => {
      try {
        const res = await fetch("http://localhost:5001/admin/reports/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Product fetch failed: ${await res.text()}`);
        const data = await res.json();
        setTopProducts(data.mostSoldItems);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchSalesData();
    fetchUserActivity();
    fetchTopProducts();
  }, [token]);
  
  return (
    <div className="analytics-page">
      <h2>Analytics</h2>

      {/* Sales Chart */}
      <div className="chart-container">
        <h3>Monthly Sales</h3>
        <LineChart width={600} height={300} data={salesData}>
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="sales" stroke="#00d4ff" strokeWidth={2} />
        </LineChart>
      </div>

      {/* User Activity */}
      <div className="chart-container">
        <h3>User Signups (Daily)</h3>
        <BarChart width={600} height={300} data={userActivity.newSignups}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ff6b6b" />
        </BarChart>
      </div>

      {/* Top Products */}
      <div className="chart-container">
        <h3>Top Selling Products</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={topProducts}
            dataKey="total_sold"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {topProducts.map((_, index) => (
              <Cell key={`cell-${index}`} fill={['#ff6b6b', '#00d4ff', '#7effb2', '#e0ff6b'][index % 4]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AnalyticsPage;
