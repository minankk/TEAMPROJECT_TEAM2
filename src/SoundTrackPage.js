import React, { useState, useEffect } from 'react';
import './SoundTrackPage.css';
import { useNavigate } from 'react-router-dom';
import PopUp from "./PopUp";
import { jwtDecode } from "jwt-decode";

const SoundtrackPage = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);
    const navigate = useNavigate();

    const showPopup = (message) => {
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(null), 3000);
    };

    const [cartPopupVisible, setCartPopupVisible] = useState(false);


    const fetchFavorites = async () => {
        const token = localStorage.getItem('token');
        if (token && typeof token === 'string') {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.user_id;
                const response = await fetch(`http://localhost:5001/wishlist/${userId}`, {
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
        if (!token || typeof token !== 'string') return;

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
        } catch (error) {
            console.error('Error:', error);
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
        fetch('http://localhost:5001/genres/soundtrack')
            .then(res => res.json())
            .then(data => setProducts(data.products || []))
            .catch(err => console.error('Fetch soundtrack albums error:', err));
    }, []);

    return (
        <main className="products-page">
<section className="soundtrack-products">
  <h2>Soundtracks</h2>
  <div className="soundtrack-product-grid">
                    {products.map(product => (
                        <div key={product.product_id} className="soundtrack-product-card" onClick={() => openPopup(product.product_id)}>
                            <div className="soundtrack-product-container">
                            <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.album_name} className="soundtrack-product-image" />
                            <button
  className={`heart-button ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
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
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
      4.42 3 7.5 3c1.74 0 3.41 0.81 
      4.5 2.09C13.09 3.81 14.76 3 16.5 3 
      19.58 3 22 5.42 22 8.5c0 
      3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
</button>
                            <div className="soundtrack-product-info">
                                <h3>{product.album_name}</h3>
                                <p>{product.artist_name}</p>
                                <p>{product.price}</p>
                            </div>
                            <div className="soundtrack-product-actions">
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
  ✅ Added to cart!{" "}
  <button onClick={() => navigate('/cart')} className="go-to-cart-link">
    Go to Cart
  </button>
</div>)}

        </main>
    );
};

export default SoundtrackPage;
