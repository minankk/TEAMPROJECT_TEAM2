import React, { useEffect, useState } from 'react';
import './FavoritesPage.css';
import { jwtDecode } from 'jwt-decode';
import { toggleFavorite } from './ProductsPage';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const showPopup = (message) => {
        alert(message); // Simple alert popup
    };
    

    const fetchFavorites = async () => {
        const token = localStorage.getItem('token');
        if (token && typeof token === 'string') {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.user_id;

                const response = await fetch(`http://localhost:5001/wishlist/${userId}`, { // Updated URL
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch favorites');
                }

                const data = await response.json();

                // Fetch full product details for each product_id
                const productDetails = await Promise.all(
                    data.map(async (item) => {
                        const productResponse = await fetch(`http://localhost:5001/pop-up/${item.product_id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        if (productResponse.ok) {
                            return productResponse.json();
                        } else {
                            console.error(`Failed to fetch product details for ${item.product_id}`);
                            return null;
                        }
                    })
                );

                setFavorites(productDetails.filter(product => product !== null));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
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
                if (data.action === "removed") {
                    showPopup("Item removed");
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

    if (loading) return <p>Loading favorites...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="favorites-page">
            <h2>Favorites</h2>
            {favorites.length > 0 ? (
                <div className="favorites-grid">
                    {favorites.map((product) => (
                        product && <div key={product.product_id} className="favorite-item">
                            <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.album_name} className="favorite-image" />
                            <h3>{product.album_name}</h3>
                            <p>{product.artist_name}</p>
                            <p>${product.price}</p>
                            <div
                                className={`heart-icon ${favorites.some(fav => fav?.product_id === product.product_id) ? 'filled' : 'outlined'}`}
                                onClick={(event) => toggleFavorite(product.product_id, event)}
                            >
                                ❤️
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorites found.</p>
            )}
        </div>
    );
};

export default FavoritesPage;