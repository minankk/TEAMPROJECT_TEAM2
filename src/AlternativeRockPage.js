import React, { useState, useEffect } from 'react';
import './AlternativeRockPage.css';
import { useNavigate } from 'react-router-dom';
import PopUp from "./PopUp";
import { jwtDecode } from "jwt-decode";

const AlternativeRockPage = () => {
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
                const favoriteIds = data.map(item => item.product_id);
                setFavorites(favoriteIds);
            } catch (err) {
                console.error('Error fetching favorites:', err);
            }
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const toggleFavorite = async (productId, event) => {
        event.stopPropagation();
        const token = localStorage.getItem('token');

        if (!token || typeof token !== 'string') {
            console.error("Invalid or missing token.");
            return;
        }

        try {
            const url = `http://localhost:5001/wishlist/add/${productId}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                showPopup(data.action === "added"
                    ? "You have added this item to your favorites."
                    : "You have removed this item from your favorites.");
                fetchFavorites();
            } else {
                showPopup("Failed to update favorites. Please try again.");
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
            showPopup("An unexpected error occurred.");
        }
    };

    const openPopup = (productId) => {
        fetch(`http://localhost:5001/pop-up/${productId}`)
            .then(res => res.json())
            .then(data => {
                if (data) setSelectedProduct(data);
            })
            .catch(err => console.error('Error fetching popup data:', err));
    };

    const closePopup = () => setSelectedProduct(null);

    const handleAddToCart = (productId, event) => {
        event.stopPropagation();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.user_id;

            fetch('http://localhost:5001/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ user_id: userId, product_id: productId, quantity: 1 }),
            })
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    if (data.message) {
                        console.log(data.message);
                        navigate('/cart');
                    }
                })
                .catch(err => console.error('Add to cart error:', err));
        } catch (err) {
            console.error("Error decoding token:", err);
        }
    };

    useEffect(() => {
        fetch('http://localhost:5001/genres/alternative-rock')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products || []);
            })
            .catch(err => {
                console.error('Error loading alternative rock albums:', err);
                setProducts([]);
            });
    }, []);

    return (
        <main className="products-page"> {/* Keep className same as ProductsPage */}
            <section className="products">
                <h2>Alternative Rock Albums</h2>
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.product_id} className="product-card" onClick={() => openPopup(product.product_id)}>
                                <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.album_name} className="product-image" />
                                <div className="product-info">
                                    <h3>{product.album_name}</h3>
                                    <p>{product.artist_name}</p>
                                    <p>£{product.price}</p>
                                </div>
                                <div className="product-actions">
                                    <button className="buy-button" onClick={(event) => handleAddToCart(product.product_id, event)}>Add to Cart</button>
                                    <button className="read-more-button" onClick={() => openPopup(product.product_id)}>More</button>
                                    <button
                                        className={`heart-button ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
                                        onClick={(event) => toggleFavorite(product.product_id, event)}
                                    >
                                        {favorites.includes(product.product_id) ? '❤️' : '♡'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-products-found">No Alternative Rock albums found.</p>
                    )}
                </div>
            </section>

            {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
            {popupMessage && <div className="favorite-popup">{popupMessage}</div>}
        </main>
    );
};

export default AlternativeRockPage;
