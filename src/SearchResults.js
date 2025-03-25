import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import formatCurrency from './helpers/currencyFormatter';
import "./SearchPage.css";
import PopUp from "./PopUp"; // Import PopUp component
import { jwtDecode } from "jwt-decode";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // For popup
    const [favorites, setFavorites] = useState([]); // For favorites
    const [popupMessage, setPopupMessage] = useState(null); // For popup messages
    const navigate = useNavigate();

    const showPopup = (message) => {
        setPopupMessage(message);
        setTimeout(() => setPopupMessage(null), 3000); // Hide after 3 seconds
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

            const url = `http://localhost:5001/wishlist/add/${productId}`; // Always POST

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
                fetchFavorites(); // Refetch favorites after successful operation
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
            const quantity = 1;

            console.log('User ID:', user_id);

            fetch('http://localhost:5001/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ user_id: user_id, product_id: productId, quantity }),
            })
                .then(response => {
                    if (response.status === 401) {
                        throw new Error("Unauthorized: Invalid token");
                    }
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Response data:', data);
                    if (data.message) {
                        console.log(data.message);
                        navigate('/cart');
                    } else {
                        console.error('Failed to add item to cart');
                    }
                })
                .catch(error => {
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
                    if (data.products) {
                        setResults(data.products);
                    } else {
                        setResults(data);
                    }
                })
                .catch((error) => console.error("Error fetching search results:", error));
        }
    }, [query]);

    return (
        <div className="search-page">
            <h2>Search Results for "{query}"</h2>
            {results.length > 0 ? (
                <div className="search-grid">
                    {results.map((product) => (
                        <div key={product.product_id} className="search-card">
                            {product.cover_image_url && <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.album_name} className="search-image" />}
                            <div className="search-info">
                                <h3>{product.album_name}</h3>
                                <p>{product.artist_name} - {product.genre_name} - {formatCurrency(product.price)}</p>
                                <button className="buy-button" onClick={(event) => handleAddToCart(product.product_id, event)}>Add to Cart</button>
                                <button className="read-more-button" onClick={() => openPopup(product.product_id)}>Read More</button>
                                <button
                                    className={`heart-button ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
                                    onClick={(event) => toggleFavorite(product.product_id, event)}
                                >
                                    ❤️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
            {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
            {popupMessage && <div className="favorite-popup">{popupMessage}</div>}
        </div>
    );
};

export default SearchResults;