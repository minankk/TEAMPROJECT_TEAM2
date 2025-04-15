import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; 
import './CartPage.css';

export default function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); 
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const user_id = decoded.user_id;

            fetch(`http://localhost:5001/cart/${user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            })
            .then(response => {

                    if (response.status === 401) {
                        localStorage.removeItem('token');
                        navigate('/login');
                        throw new Error("Unauthorized");
                    }
                    if (response.status === 403) {
                        throw new Error("Forbidden: User IDs do not match");
                    }
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })

            .then(data => {
                if (data.cartItems) {
                    const fetchedCartItems = data.cartItems.map(item => ({
                        id: item.cart_id,
                        product_id: item.product_id, 
                        name: item.product_name,
                        price: item.price,
                        quantity: item.quantity,
                        image: `http://localhost:5001${item.cover_image_url}`
                    }));
                    setCart(fetchedCartItems);
                } else {
                    setCart([]); 
                }
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
        } catch (error) {
            console.error("Error decoding token:", error);
            localStorage.removeItem('token');
            navigate('/login');
        }
        fetch(`http://localhost:5001/user/status`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch user status');
            return res.json();
        })
        .then(data => setUserStatus(data))
        .catch(err => console.error('Error fetching user status:', err));
    }, [navigate]);

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
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const user_id = decoded.user_id;
  
      fetch(`http://localhost:5001/cart/remove/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      })
      .then(response => {
          if (response.status === 401 || response.status === 403) {
              localStorage.removeItem('token');
              navigate('/login');
              throw new Error("Unauthorized");
          }
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          if (data.message) {
              fetch(`http://localhost:5001/cart/${user_id}`, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
              })
              .then(response => response.json())
              .then(data => {
                  if (data.cartItems) {
                      const fetchedCartItems = data.cartItems.map(item => ({
                          id: item.cart_id,
                          product_id: item.product_id,   
                          name: item.product_name,
                          price: item.price,
                          quantity: item.quantity,
                          image: `http://localhost:5001${item.cover_image_url}`
                      }));
                      setCart(fetchedCartItems);
                  } else {
                      setCart([]); 
                  }
              })
              .catch(error => {
                  console.error('Error refetching cart items:', error);
              });
          } else {
              console.error('Failed to remove item from cart');
          }
      })
      .catch(error => {
          console.error('Error removing item from cart:', error);
      });
  };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const vipDiscountRate = userStatus?.discount || 0;
const discountAmount = totalPrice * vipDiscountRate;
const discountedTotal = totalPrice - discountAmount;

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Add items before checking out.");
            return;
        }
    
        navigate("/payment-page", {
            state: {
              cartItems: cart,
              totalAmount: discountedTotal,
              originalAmount: totalPrice,
              discountApplied: discountAmount
            }
          });
          
    };
    return (
        <div id="cart-page">
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
                      <button className="quantity-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <input type="text" value={item.quantity} readOnly className="quantity-input" />
                      <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))
              )}
            </div>
      
            <div className="cart-summary">
  {userStatus?.membership === 'vip' && (
    <div className="vip-discount-banner">
      🎉 <strong>VIP Member:</strong> {vipDiscountRate * 100}% discount applied
    </div>
  )}

  <div className="total-price">
    {userStatus?.membership === 'vip' ? (
      <>
        <div>Original: £{totalPrice.toFixed(2)}</div>
        <div>Discount: -£{discountAmount.toFixed(2)}</div>
        <div><strong>Final: £{discountedTotal.toFixed(2)}</strong></div>
      </>
    ) : (
      <>Total: £{totalPrice.toFixed(2)}</>
    )}
  </div>

  <button className="checkout-button" onClick={handleCheckout} disabled={cart.length === 0}>
    Checkout
  </button>
</div>
          </div>
        </div>
      );
}