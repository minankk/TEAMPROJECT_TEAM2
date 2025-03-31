import React, { useState, useEffect } from 'react';
import './BestSellersPage.css';
import PopUp from "./PopUp"; // Ensure PopUp component is imported
import { jwtDecode } from "jwt-decode";

const BestSellers = ({ handleAddToCart }) => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [popupMessage, setPopupMessage] = useState(null);

    const showPopup = (message) => {
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(null), 3000);
    };

    const toggleFavorite = async (productId, event) => {
        event.stopPropagation();
        const token = localStorage.getItem('token');

        if (!token || typeof token !== 'string') {
            console.error("Invalid or missing token. User might not be logged in.");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.user_id;

            const url = `http://localhost:5001/wishlist/add/${productId}`;

            console.log(`Sending POST request to: ${url}`);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(`Response status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                if (data.action === "added") {
                    showPopup("You have added this item to your favorites.");
                } else if (data.action === "removed") {
                    showPopup("You have removed this item from your favorites.");
                }
                fetchFavorites();
            } else {
                console.error('Failed to update favorites:', response);
                if (response.status === 401) {
                    console.error("Unauthorized, please log in");
                } else {
                    showPopup("Failed to update favorites. Please try again.");
                }
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
            showPopup("An unexpected error occurred.");
        }
    };

    const fetchFavorites = async () => {
        const token = localStorage.getItem('token');
        if (token && typeof token === 'string') {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.user_id;
                fetch(`http://localhost:5001/wishlist/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        const favoriteIds = data.map(item => item.product_id);
                        setFavorites(favoriteIds);
                    })
                    .catch(error => {
                        console.error('Error fetching favorites:', error);
                    });
            } catch (decodeError) {
                console.error("Error decoding token:", decodeError);
            }
        } else {
            console.log("Token not found or invalid.");
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const openPopup = (productId) => {
        console.log("Fetching pop-up data for productId:", productId);
        fetch(`http://localhost:5001/pop-up/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched pop-up data:", data);
                if (data) {
                    setSelectedProduct(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    };

    const closePopup = () => {
        setSelectedProduct(null);
    };

    useEffect(() => {
        fetch('http://localhost:5001/best-sellers')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBestSellers(data.products);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading best sellers...</p>;
    if (error) return <p>Error loading best sellers: {error.message}</p>;
    if (bestSellers.length === 0) return <p>No best-selling products available</p>;

    return (
        <div className="best-sellers-container">
            <h1>Best Sellers</h1>
            <div className="products-grid">
                {bestSellers.map((product) => (
                    <div className="product-card" key={product.product_id}>
                        <img
                            src={`http://localhost:5001${product.cover_image_url}`}
                            alt={product.album_name}
                            className="product-image"
                        />
                        <h2 className="product-name">{product.album_name}</h2>
                        <p className="product-artist">{product.artist_name}</p>
                        <p className="product-genre">{product.genre}</p>
                        <p className="product-price">{product.price}</p>
                        <button className="add-to-cart" onClick={() => handleAddToCart(product.product_id)}>Add to Cart</button>
                        <button className="read-more-button" onClick={() => openPopup(product.product_id)}>Read More</button>
                        <button
                            className={`heart-button ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
                            onClick={(event) => toggleFavorite(product.product_id, event)}
                        >
                            ❤️
                        </button>
                    </div>
                ))}
            </div>
            {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
            {popupMessage && <div className="favorite-popup">{popupMessage}</div>}
        </div>
    );
};

export default BestSellers;