import React, { useState, useEffect } from 'react';
import './OrderHistoryPage.css';
import { useAuth } from './App'; // Import useAuth

const OrderHistoryPage = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const { token } = useAuth(); // Get the token
    const [fetchError, setFetchError] = useState(null); // State for fetch errors

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await fetch('http://localhost:5001/order-history', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }

                const data = await response.json();
                setOrderHistory(data);
                setFetchError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching order history:', error);
                setFetchError(error.message); // Set the error message
                setOrderHistory([]); // Set to empty array, to prevent rendering errors.
            }
        };

        fetchOrderHistory();
    }, [token]); // Run effect when token changes

    if (fetchError) {
        return <p>{fetchError}</p>;
    }

    return (
        <div className="order-history-page">
            <h2>Order History</h2>
            {orderHistory.length > 0 ? (
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
                        {orderHistory.reduce((acc, order) => {
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