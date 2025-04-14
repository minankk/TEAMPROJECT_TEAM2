import React, { useState, useEffect } from 'react';
import './DecadesPage.css';
import { jwtDecode } from "jwt-decode";
import PopUp from './PopUp';
import { useNavigate } from 'react-router-dom';

function DecadesPage() {
    const [decadesData, setDecadesData] = useState([]);
    const [selectedDecade, setSelectedDecade] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [popupMessage, setPopupMessage] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartPopupVisible, setCartPopupVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5001/decades')
            .then(res => res.json())
            .then(setDecadesData)
            .catch(err => console.error('Failed to load decades:', err));

        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            const res = await fetch(`http://localhost:5001/wishlist/${decoded.user_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setFavorites(data.map(item => item.product_id));
        } catch (err) {
            console.error('Error fetching favorites:', err);
        }
    };

    const handleDecadeClick = (decade) => {
        const found = decadesData.find(d => d.decade === decade);
        setSelectedDecade(found || null);
    };

    const toggleFavorite = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await fetch(`http://localhost:5001/wishlist/add/${productId}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setPopupMessage(data.action === "added" ? 'Added to favorites' : 'Removed from favorites');
            fetchFavorites();
            setTimeout(() => setPopupMessage(null), 2500);
        } catch (err) {
            console.error('Favorite toggle failed', err);
        }
    };

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            const res = await fetch('http://localhost:5001/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ user_id: decoded.user_id, product_id: productId, quantity: 1 })
            });
            if (res.ok) {
                setCartPopupVisible(true);
                setTimeout(() => setCartPopupVisible(false), 4000);
            }
        } catch (err) {
            console.error('Cart add failed', err);
        }
    };

    const openPopup = (productId) => {
        fetch(`http://localhost:5001/pop-up/${productId}`)
            .then(res => res.json())
            .then(setSelectedProduct)
            .catch(err => console.error('Popup fetch failed:', err));
    };

    const closePopup = () => setSelectedProduct(null);

    return (
        <div className="decades-page">
            <div className="decades-container">
                <div className="decades-sidebar">
                    <h2>Decades</h2>
                    <ul>
                        {decadesData.map(d => (
                            <li key={d.decade}>
                                <button onClick={() => handleDecadeClick(d.decade)}>
                                    {d.decade}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="decades-details">
                    <h2>{selectedDecade?.decade || "Select a Decade"}</h2>
                    <div className="decades-product-grid">
                        {selectedDecade?.products?.length ? (
                            selectedDecade.products.map(product => (
                                <div key={product.product_id} className="decades-product-card">
                                    <img
                                        src={`http://localhost:5001${product.cover_image_url}`}
                                        alt={product.name}
                                        className="decades-product-image"
                                    />
                                    <button
                                        className={`decades-heart-button ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
                                        onClick={() => toggleFavorite(product.product_id)}
                                    >
                                        <svg
                                            className={`decades-heart-icon ${favorites.includes(product.product_id) ? 'favorited' : ''}`}
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
                                    <div className="decades-product-info">
                                        <h3>{product.name}</h3>
                                        <p>£{product.price}</p>
                                    </div>
                                    <div className="decades-product-actions">
                                        <button className="decades-buy-button" onClick={() => handleAddToCart(product.product_id)}>
                                            Add to Cart
                                        </button>
                                        <button className="read-more-button" onClick={() => openPopup(product.product_id)}>
                                            More
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>{selectedDecade ? "No products found in this decade." : "Choose a decade to explore products."}</p>
                        )}
                    </div>
                </div>
            </div>

            {popupMessage && <div className="decades-popup">{popupMessage}</div>}
            {cartPopupVisible && (
            <div className="cart-added-popup">
  ✅ Added to cart!{" "}
  <button onClick={() => navigate('/cart')} className="go-to-cart-link">
    Go to Cart
  </button>
</div>)}
            {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
        </div>
    );
}

export default DecadesPage;
