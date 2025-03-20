import React, { useEffect, useState } from 'react';
import './FavoritesPage.css';
import { jwtDecode } from 'jwt-decode';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            if (token && typeof token === 'string') {
                try {
                    const decoded = jwtDecode(token);
                    const userId = decoded.user_id;
                    const response = await fetch('http://localhost:5001/wishlist/', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch favorites');
                    }
                    const data = await response.json();
                    setFavorites(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchFavorites();
    }, []);

    if (loading) return <p>Loading favorites...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="favorites-page">
            <h2>Favorites</h2>
            {favorites.length > 0 ? (
                <div className="favorites-grid">
                    {favorites.map((product) => (
                        <div key={product.product_id} className="favorite-item">
                            <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.album_name} className="favorite-image" />
                            <h3>{product.album_name}</h3>
                            <p>{product.artist_name}</p>
                            <p>${product.price}</p>
                            {/* Add a remove from favorites button here if needed */}
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