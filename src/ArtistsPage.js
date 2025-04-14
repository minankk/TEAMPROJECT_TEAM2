import React, { useState, useEffect } from 'react';
import './ArtistsPage.css';
import { jwtDecode } from "jwt-decode";
import PopUp from './PopUp';

function ArtistsPage() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [popupMessage, setPopupMessage] = useState(null);
    const [cartPopupVisible, setCartPopupVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/artists?timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Error fetching artists:', error));

        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.user_id;
                const response = await fetch(`http://localhost:5001/wishlist/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setFavorites(data.map(item => item.product_id));
            } catch (error) {
                console.error("Failed to fetch favorites", error);
            }
        }
    };

    const handleArtistClick = (artistId) => {
        fetch(`http://localhost:5001/artists/${artistId}?timestamp=${new Date().getTime()}`)
            .then(response => response.json())
            .then(data => {
                setSelectedArtist(data);
                setProducts(data.products);
            })
            .catch(error => console.error('Error fetching artist details:', error));
    };

    const toggleFavorite = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const url = `http://localhost:5001/wishlist/add/${productId}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setPopupMessage(data.action === "added" ? 'Added to favorites' : 'Removed from favorites');
            fetchFavorites();
            setTimeout(() => setPopupMessage(null), 2500);
        } catch (error) {
            console.error("Error toggling favorite", error);
        }
    };

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const user_id = decoded.user_id;
            const response = await fetch('http://localhost:5001/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ user_id, product_id: productId, quantity: 1 }),
            });

            if (response.ok) {
                setCartPopupVisible(true);
                setTimeout(() => setCartPopupVisible(false), 4000);
            } else {
                console.error("Failed to add to cart");
            }
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    const openPopup = (productId) => {
        fetch(`http://localhost:5001/pop-up/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setSelectedProduct(data);
            })
            .catch((err) => {
                console.error('Error loading product popup:', err);
            });
    };

    const closePopup = () => setSelectedProduct(null);

    return (
        <div className="artists-page">
            <div className="artists-container">
                <div className="artists-sidebar">
                    <h2>Artists</h2>
                    <ul>
                        {artists.map((artist) => (
                            <li key={artist.artist_id}>
                                <button onClick={() => handleArtistClick(artist.artist_id)}>
                                    {artist.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="artists-details">
                    {selectedArtist ? (
                        <div>
                            <h2>{selectedArtist.name}</h2>
                            {selectedArtist.image_url && (
                                <img src={`http://localhost:5001${selectedArtist.image_url}`} alt={selectedArtist.name} className="artists-image" />
                            )}
                            <p>{selectedArtist.bio}</p>
                            <h3>Products</h3>
                            <div className="artists-product-grid">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <div key={product.product_id} className="artists-product-card">
                                            <img
                                                src={`http://localhost:5001${product.cover_image_url}`}
                                                alt={product.name}
                                                className="artists-product-image"
                                            />
                                             <button
                                    className={`artists-heart-button ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
                                    onClick={(e) => toggleFavorite(product.product_id, e)}
                                >
                                    <svg
                                        className={`artists-heart-icon ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
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
                                            <div className="artists-product-info">
                                                <h3>{product.name}</h3>
                                                <p>£{product.price}</p>
                                            </div>
                                            <div className="artists-product-actions">
                                                <button className="artists-buy-button" onClick={() => handleAddToCart(product.product_id)}>
                                                    Add to Cart
                                                </button>
                                                <button className="read-more-button" onClick={() => openPopup(product.product_id)}>
                                                    More
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No products found.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>Select an artist to view details.</p>
                    )}
                </div>
            </div>

            {popupMessage && <div className="artists-popup">{popupMessage}</div>}
            {cartPopupVisible && (
                <div className="cart-added-popup">
                    ✅ Added to cart! <a href="/cart">Go to Cart</a>
                </div>
            )}
            {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
        </div>
    );
}

export default ArtistsPage;
