import React, { useState, useEffect } from 'react';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem('token'); // Get token from local storage
            const userId = JSON.parse(localStorage.getItem('user')).user_id; //get userId from local storage

            if (!token || !userId) {
                setError('Please log in to view your order history.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/orders/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order history');
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchOrderHistory();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="order-history-page">
            <h2>Order History</h2>
            {orders.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.reduce((acc, order) => {
                            const existingOrder = acc.find(o => o.order_id === order.order_id);
                            if (existingOrder) {
                                existingOrder.items.push({
                                    product_id: order.product_id,
                                    quantity: order.quantity,
                                    price: order.price,
                                });
                            } else {
                                acc.push({
                                    order_id: order.order_id,
                                    order_date: order.order_date,
                                    total_amount: order.total_amount,
                                    status: order.status,
                                    items: [{
                                        product_id: order.product_id,
                                        quantity: order.quantity,
                                        price: order.price,
                                    }],
                                });
                            }
                            return acc;
                        }, []).map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                <td>${order.total_amount.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <ul>
                                        {order.items.map(item => (
                                            <li key={item.product_id}>
                                                Product ID: {item.product_id}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No order history found.</p>
            )}
        </div>
    );
};

export default OrderHistoryPage;