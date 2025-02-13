import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import OriginalSoundtrackBarbietheAlbum from './assets/OriginalSoundtrackBarbietheAlbum.webp';
import NirvanaNevermind from './assets/NirvanaNevermind.webp'; 
import ArianaGrandeSweetener from './assets/ArianaGrandeSweetener.webp';
import TheBeatleAbbyRoad from './assets/TheBeatleAbbyRoad.webp';

const initialCart = [
  { id: 0, name: "Nirvana - Nevermind", price: 20, quantity: 1, image: NirvanaNevermind },
  { id: 1, name: "Barbie the Album", price: 30, quantity: 1, image: OriginalSoundtrackBarbietheAlbum },
  { id: 2, name: "Ariana Grande - Sweetener", price: 30, quantity: 2, image: ArianaGrandeSweetener },
  { id: 3, name: "The Beatles - Abby Road", price: 50, quantity: 1, image: TheBeatleAbbyRoad }
];

export default function ShoppingCart() {
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    fetch('http://localhost:5001/myCart') 
      .then(response => response.json())
      .then(data => {
        if (data.cartItems) {
          const fetchedCartItems = data.cartItems.map(item => ({
            id: item.cart_id,
            name: item.product_name,
            price: item.price,
            quantity: item.quantity,
            image: `http://localhost:5001${item.cover_image_url}`
          }));
          setCart(prevCart => [...prevCart, ...fetchedCartItems]);
        }
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

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
  const navigate = useNavigate();


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
              <div className="cart-item-details">
                <span className="cart-item-title">{item.name}</span>
                <span className="cart-item-price">£{item.price}</span>
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
        <div className="total-price">Total: £{totalPrice}</div>
        <button className="checkout-button" onClick={() => navigate("/payment-page")}>
          Checkout
        </button>
      </div>
    </div>
  );
}
