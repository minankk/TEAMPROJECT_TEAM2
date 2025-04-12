import React, { useEffect, useState } from "react";
import "./OrderManagementPage.css";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5001/admin/dashboard/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setMessage("Failed to fetch orders.");
    }
  };

  const cancelOrder = async (order_id) => {
    try {
      const response = await fetch(`http://localhost:5001/admin/dashboard/orders/${order_id}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessage(data.message);
      fetchOrders(); // refresh list
    } catch (err) {
      setMessage("Failed to cancel order.");
    }
  };

  return (
    <div className="order-management-page">
      <h2>Order Management</h2>
      {message && <p className="message">{message}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.order_id}>
            <div>
              <strong>Order #{order.order_id}</strong> — £{order.total_amount} — {order.status}
              <br />
              User ID: {order.user_id} | Date: {order.order_date}
              <br />
              Shipping: {order.shipping_address}
            </div>
            <div className="order-actions">
              {order.status !== "Cancelled" &&
                order.status !== "Completed" &&
                order.status !== "Shipped" && (
                  <button className="cancel-btn" onClick={() => cancelOrder(order.order_id)}>
                    Cancel Order
                  </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagementPage;
