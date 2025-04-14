import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import "./SearchPage.css";
import { jwtDecode } from "jwt-decode";
import formatCurrency from "./helpers/currencyFormatter";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [popupMessage, setPopupMessage] = useState(null);
    const navigate = useNavigate();

    const showPopup = (message) => {
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(null), 3000);
    };

    const [cartPopupVisible, setCartPopupVisible] = useState(false);


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
                    : "You have removed this item from your favorites."
                );
                fetchFavorites();
            } else {
                console.error('Failed to update favorites:', response);
                showPopup("Failed to update favorites. Please try again.");
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
                const response = await fetch(`http://localhost:5001/wishlist/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setFavorites(data.map(item => item.product_id));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const openPopup = (productId) => {
        fetch(`http://localhost:5001/pop-up/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) setSelectedProduct(data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    };

    const closePopup = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = (productId, event) => {
        event.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const user_id = decoded.user_id;

            fetch('http://localhost:5001/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ user_id, product_id: productId, quantity: 1 }),
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Failed to add to cart");
                    return response.json();
                })
                .then((data) => {
                    if (data.message) {
                        setCartPopupVisible(true);
                        setTimeout(() => setCartPopupVisible(false), 4500);
                    } else {
                        console.error('Failed to add item to cart');
                    }
                })
                .catch((error) => {
                    console.error('Error adding item to cart:', error);
                });
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    };

    useEffect(() => {
        if (query) {
            fetch(`http://localhost:5001/products/search?query=${encodeURIComponent(query)}`)
                .then((response) => response.json())
                .then((data) => {
                    setResults(data.products || []);
                })
                .catch((error) => console.error("Error fetching search results:", error));
        }
    }, [query]);

    return (
        <div className="search-page">
            <h2 className="search-title">Search Results for "{query}"</h2>
            {results.length > 0 ? (
                <div className="search-grid">
                    {results.map((product) => (
                        <div key={product.product_id} className="search-card">
                            <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.album_name} className="search-image" />
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
                            <div className="search-info">
                                <h3>{product.album_name}</h3>
                                <p>{product.artist_name} - {product.genre_name}</p>
                                <p>{product.price}</p>
                                <div className="search-actions">
                                    <button className="buy-button" onClick={(e) => handleAddToCart(product.product_id, e)}>Add to Cart</button>
                                    <button className="read-more-button" onClick={() => openPopup(product.product_id)}>More</button>
                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}

            {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
            {popupMessage && <div className="favorite-popup">{popupMessage}</div>}
            {cartPopupVisible && (
                <div className="cart-added-popup">
                    ✅ Added to cart! <a href="/cart">Go to Cart</a>
                </div>
            )}
        </div>
    );

};

export default SearchResults;
