import React, { useState, useEffect } from 'react';
import './PopPage.css';
import { useNavigate } from 'react-router-dom';
import PopUp from "./PopUp";
import { jwtDecode } from "jwt-decode";

const PopPage = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);
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
                .then(() => navigate('/cart'))
                .catch(err => console.error('Cart error:', err));
        } catch (err) {
            console.error("Token decode error:", err);
        }
    };

    useEffect(() => {
        fetch('http://localhost:5001/genres/pop')
            .then(res => res.json())
            .then(data => setProducts(data.products || []))
            .catch(err => console.error('Fetch pop albums error:', err));
    }, []);

    return (
        <main className="products-page">
            <section className="products">
                <h2>Pop Albums</h2>
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product.product_id} className="product-card" onClick={() => openPopup(product.product_id)}>
                            <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.album_name} className="product-image" />
                            <div className="product-info">
                                <h3>{product.album_name}</h3>
                                <p>{product.artist_name}</p>
                                <p>£{product.price}</p>
                            </div>
                            <div className="product-actions">
                                <button className="buy-button" onClick={(e) => handleAddToCart(product.product_id, e)}>Add to Cart</button>
                                <button className="read-more-button" onClick={() => openPopup(product.product_id)}>More</button>
                                <button
                                    className={`heart-button ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
                                    onClick={(e) => toggleFavorite(product.product_id, e)}
                                >
                                    {favorites.includes(product.product_id) ? '❤️' : '♡'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
            {popupMessage && <div className="favorite-popup">{popupMessage}</div>}
        </main>
    );
};

export default PopPage;
