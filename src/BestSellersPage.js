import React, { useState, useEffect } from 'react';
import './BestSellersPage.css';
import { useNavigate } from 'react-router-dom';
import PopUp from "./PopUp";
import { jwtDecode } from "jwt-decode";

const BestSellersPage = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [cartPopupVisible, setCartPopupVisible] = useState(false);
  const navigate = useNavigate();

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');
    if (token && typeof token === 'string') {
      try {
        const decoded = jwtDecode(token);
        const response = await fetch(`http://localhost:5001/wishlist/${decoded.user_id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setFavorites(data.map(item => item.product_id));
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    }
  };

  useEffect(() => { fetchFavorites(); }, []);

  const toggleFavorite = async (productId, event) => {
    event.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5001/wishlist/add/${productId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        showPopup(data.action === "added" ? "Added to favorites." : "Removed from favorites.");
        fetchFavorites();
      } else {
        showPopup("Failed to update favorites.");
      }
    } catch (err) {
      console.error(err);
      showPopup("Unexpected error.");
    }
  };

  const openPopup = (productId) => {
    fetch(`http://localhost:5001/pop-up/${productId}`)
      .then(res => res.json())
      .then(data => setSelectedProduct(data))
      .catch(err => console.error('Popup fetch error:', err));
  };

  const closePopup = () => setSelectedProduct(null);

  const handleAddToCart = (productId, event) => {
    event.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      fetch('http://localhost:5001/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: decoded.user_id, product_id: productId, quantity: 1 }),
      })
        .then(res => res.ok && res.json())
        .then(() => {
          setCartPopupVisible(true);
          setTimeout(() => setCartPopupVisible(false), 4500);
        })
        .catch(err => console.error('Cart error:', err));
    } catch (err) {
      console.error("Token decode error:", err);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5001/best-sellers')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <main className="best-seller-page">
      <section className="best-seller-products">
        <h2>Best Sellers</h2>
        <div className="best-seller-product-grid">
          {products.map(product => (
            <div
              key={product.product_id}
              className="best-seller-product-card"
              onClick={() => openPopup(product.product_id)}
            >
              <div className="best-seller-product-container">
                <img
                  src={`http://localhost:5001${product.cover_image_url}`}
                  alt={product.album_name}
                  className="best-seller-product-image"
                />
                <button
                  className={`best-seller-heart-button ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
                  onClick={(e) => toggleFavorite(product.product_id, e)}
                >
                  <svg
                    className={`heart-icon ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill={favorites.includes(product.product_id) ? 'red' : '#333'}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                      2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                      C13.09 3.81 14.76 3 16.5 3 
                      19.58 3 22 5.42 22 8.5 
                      c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <div className="best-seller-product-info">
                  <h3>{product.album_name}</h3>
                  <p>{product.artist_name}</p>
                  <p>{product.price}</p>
                </div>
                <div className="best-seller-product-actions">
                  <button className="buy-button" onClick={(e) => handleAddToCart(product.product_id, e)}>Add to Cart</button>
                  <button className="read-more-button" onClick={() => openPopup(product.product_id)}>More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
      {popupMessage && <div className="favorite-popup">{popupMessage}</div>}
      {cartPopupVisible && (
        <div className="cart-added-popup">
          ✅ Added to cart! <a href="/cart">Go to Cart</a>
        </div>
      )}
    </main>
  );
};

export default BestSellersPage;
