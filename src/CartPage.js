import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './CartPage.css';
import { useNavigate } from "react-router-dom"

const initialCart = [
  { id: 1, name: "Vinyl Record A", price: 25, quantity: 1, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Vinyl Record B", price: 30, quantity: 2, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Vinyl Record C", price: 40, quantity: 1, image: "https://via.placeholder.com/150" }
];

export default function ShoppingCart() {
  const [cart, setCart] = useState(initialCart);
  const navigate = useNavigate(); // Initialize navigate

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="item-details">
                <span className="item-title">{item.name}</span>
                <span className="item-price">${item.price}</span>
              </div>
              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="quantity-input"
                />
                <button
                  className="quantity-button"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <div className="total-price">Total: ${totalPrice}</div>
        <button className="checkout-button" onClick={() => navigate("/payment-page")}>
          Checkout
        </button>
      </div>
    </div>
  );
}
