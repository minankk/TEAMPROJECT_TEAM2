import React, { useEffect, useState, useCallback } from 'react';
import './FavoritesPage.css';
import { jwtDecode } from 'jwt-decode';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showPopup = (message) => {
    alert(message); 
  };

  const fetchFavorites = useCallback(async () => {
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

        if (!response.ok) throw new Error('Failed to fetch favorites');

        const data = await response.json();

        if (data.length === 0) {
          setFavorites([]); 
          setError(null);   
          setLoading(false);
          return;
        }

        const productDetails = await Promise.all(
          data.map(async (item) => {
            const productResponse = await fetch(`http://localhost:5001/pop-up/${item.product_id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
        
            if (productResponse.ok) {
              const productData = await productResponse.json();
              return { ...productData, product_id: item.product_id }; 
            }
            return null;
          })
        );
        

        setFavorites(productDetails.filter(product => product !== null));
      } catch (err) {
      console.error("Error in fetchFavorites:", err);
      setError("Could not load your favorites. Please try again.");
    } finally {
      setLoading(false);
    }
  } else {
    setError("No valid token found. Please log in.");
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleToggleFavorite = async (productId, event) => {
    event.stopPropagation();
    const token = localStorage.getItem('token');

    if (!token || typeof token !== 'string') {
      console.error("Invalid or missing token. User might not be logged in.");
      showPopup("You're not logged in. Please log in to use the wishlist.");
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
        showPopup(data.message); 
        fetchFavorites(); 
      } else {
        showPopup("Failed to update favorites. Please try again.");
        console.error('Failed to update favorites:', response);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      showPopup("An unexpected error occurred.");
    }
  };

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="dashboard-content favorites-page">
      <div className="favorites-container">
        <h2>Favorites</h2>
  
        {loading ? (
          <p>Loading favorites...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : favorites.length === 0 ? (
          <p className="no-favorites">You haven’t added anything to your favorites yet.</p>
        ) : (
          <>
            <p className="favorites-info-text">
              Click the ❤️ to remove items from your favorites.
            </p>
            <div className="favorites-grid">
              {favorites.map((product) => (
                product && (
                  <div key={product.product_id} className="favorite-item">
                    <img
                      src={`http://localhost:5001${product.cover_image_url}`}
                      alt={product.album_name}
                      className="favorite-image"
                    />
                    <h3>{product.album_name}</h3>
                    <p>{product.artist_name}</p>
                    <p>£{Number(product.price).toFixed(2)}</p>
                    <button
                      className="heart-button favorited"
                      onClick={(event) => handleToggleFavorite(product.product_id, event)}
                      title="Remove from favorites"
                    >
                      ♥
                    </button>
                  </div>
                )
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
  
  
};

export default FavoritesPage;
