import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp from "./PopUp";
import './ProductsPage.css';
import VinylRetro from './assets/VinylRetro.webp';
import { jwtDecode } from "jwt-decode";
import TestFilter from './TestFilter';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [originalArtists, setOriginalArtists] = useState([]);
    const [originalGenres, setOriginalGenres] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filters, setFilters] = useState({
        artist: '',
        genre: '',
        releaseDecade: '',
        priceRange: 0,
        bestSeller: false,
        onSale: false,
    });
    const [favorites, setFavorites] = useState([]);
    const [popupMessage, setPopupMessage] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    const bannerRef = useRef(null);
const [bannerHeight, setBannerHeight] = useState(0);

useEffect(() => {
    const updateBannerHeight = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight);
      }
    };
  
    updateBannerHeight(); // Initial run
    window.addEventListener('resize', updateBannerHeight); // Update on resize
  
    return () => window.removeEventListener('resize', updateBannerHeight);
  }, []);
  

    console.log("ProductsPage component rendered!");

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

    const navigate = useNavigate();

    const [slideIn, setSlideIn] = useState(false);

    useEffect(() => {
  if (showFilters) {
    // trigger slide in a tick after render
    setTimeout(() => setSlideIn(true), 10);
  } else {
    setSlideIn(false); // reset when closed
  }
}, [showFilters]);

    const Banner = () => (
        <section className="products-banner" ref={bannerRef}>
            <img src={VinylRetro} alt="Vinyl Collection" className="products-banner-image" />
            <div className="products-banner-text">
                <h1>Browse the Products and Get the Best Offer</h1>
            </div>
        </section>
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5001/products', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                    setOriginalArtists(Array.from(new Set(data.map(p => p.artist_name))));
                    setOriginalGenres(Array.from(new Set(data.map(p => p.genre_name))));
                } else {
                    setProducts([]);
                }
            })
            .catch(() => {
                setProducts([]);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        let queryParams = [];
        let url = 'http://localhost:5001/products/multiplefilter';

        if (filters.genre && filters.genre !== '') {
            queryParams.push(`genre=${filters.genre}`);
        }
        if (filters.artist && filters.artist !== '') {
            queryParams.push(`artist=${filters.artist}`);
        }
        if (filters.releaseDecade && filters.releaseDecade !== '') {
            queryParams.push(`decade=${filters.releaseDecade}`);
        }

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        } else if (filters.bestSeller) {
            url = 'http://localhost:5001/products/bestsellers';
        } else if (filters.onSale) {
            url = 'http://localhost:5001/products/onsale';
        } else if (filters.priceRange > 0) {
            url = `http://localhost:5001/products/price/${filters.priceRange}`;
        } else {
            url = 'http://localhost:5001/products'; // Default to all products
        }

        fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            })
            .catch(() => {
                setProducts([]);
            });
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const applyFilters = () => {
        setShowFilters(false);
    }

    const resetFilters = () => {
        setFilters({
            artist: '',
            genre: '',
            releaseDecade: '',
            priceRange: 0,
            bestSeller: false,
            onSale: false,
        });
    };

    const generateTitle = () => {
        const activeFilters = [];
        if (filters.bestSeller) activeFilters.push('Best Sellers');
        if (filters.onSale) activeFilters.push('On Sale');
        if (filters.artist && filters.artist !== '') activeFilters.push(`by ${filters.artist}`);
        if (filters.genre && filters.genre !== '') activeFilters.push(`${filters.genre}`);
        if (filters.priceRange > 0) activeFilters.push(`priced at £${filters.priceRange}`);
        if (filters.releaseDecade && filters.releaseDecade !== '') activeFilters.push(`from the ${filters.releaseDecade}s`);

        if (activeFilters.length === 0) {
            return 'All Products';
        } else {
            return `Filtered Products: ${activeFilters.join(' & ')}`;
        }
    };

    const handleAddToCart = (productId, event) => {
        event.stopPropagation(); // Prevents the product card click event
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

    /*useEffect(() => {
        const handleScroll = () => {
            const sidebar = document.querySelector('.filters');
            const banner = document.querySelector('.products-banner');

            if (sidebar && banner) { // Check if elements exist
                const bannerHeight = banner.offsetHeight;
                if (window.scrollY >= bannerHeight) {
                    //sidebar.classList.add('fixed');
                } else {
                   // sidebar.classList.remove('fixed');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call handleScroll initially to set the correct state on load.
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);*/

    return (
        <>
          <main className={`products-page ${showFilters ? 'blur-background' : ''}`}>
            <Banner />
      
            <div className="filter-link-container">
              <button className="filter-link" onClick={() => setShowFilters(true)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                </svg>
                Filters
              </button>
            </div>
      
            <section className="products">
              <h2>{generateTitle()}</h2>
              <div className="product-grid">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.product_id} className="product-card">
                      <div className="product-container">
                        <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.album_name} className="product-image" />
                        <div className="product-info">
                          <h3>{product.album_name}</h3>
                          <p>{product.artist_name}</p>
                          <p>{product.price}</p>
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
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-products-found">No products found matching your filters, try another combination.</p>
                )}
              </div>
            </section>
      
            {selectedProduct && <PopUp product={selectedProduct} onClose={closePopup} />}
            {popupMessage && <div className="favorite-popup">{popupMessage}</div>}
          </main>
      
          {showFilters && (
  <div
    className="filters-overlay"
    onClick={() => setShowFilters(false)}
  >
    <section
      className={`filters-popup ${slideIn ? 'open' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
            <div className="filters-header">
      <h2>Filter Products</h2>
      <button className="close-filters" onClick={() => setShowFilters(false)}>✕</button>
    </div>      
                <select name="artist" value={filters.artist} onChange={handleFilterChange}>
                  <option value="">All Artists</option>
                  {originalArtists.map((artist) => (
                    <option key={artist} value={artist}>{artist}</option>
                  ))}
                </select>
      
                <select name="genre" value={filters.genre} onChange={handleFilterChange}>
                  <option value="">All Genres</option>
                  {originalGenres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
      
                <select name="releaseDecade" value={filters.releaseDecade} onChange={handleFilterChange}>
                  <option value="">All Decades</option>
                  <option value="1970">1970s</option>
                  <option value="1980">1980s</option>
                  <option value="1990">1990s</option>
                  <option value="2000">2000s</option>
                  <option value="2010">2010s</option>
                  <option value="2020">2020s</option>
                </select>
      
                <label>Price Range: £{filters.priceRange}</label>
                <input
                  type="range"
                  name="priceRange"
                  min="0"
                  max="50"
                  step="1"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                />
      
                <label>
                  <input
                    type="checkbox"
                    name="bestSeller"
                    checked={filters.bestSeller}
                    onChange={handleFilterChange}
                  />
                  Best Seller
                </label>
      
                <label>
                  <input
                    type="checkbox"
                    name="onSale"
                    checked={filters.onSale}
                    onChange={handleFilterChange}
                  />
                  On Sale
                </label>
      
                <div className="filters-actions">
                  <button onClick={applyFilters}>Apply Filters</button>
                  <button onClick={resetFilters}>Reset Filters</button>
                </div>
              </section>
            </div>
          )}
        </>
      );
    }
export default ProductsPage;      