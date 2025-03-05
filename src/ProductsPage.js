import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';
import VinylRetro from './assets/VinylRetro.webp';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    artist: '',
    genre: '',
    releaseDecade: '',
    priceRange: '',
    bestSeller: false,
    onSale: false,
  });
  const navigate = useNavigate();

  const Banner = () => (
    <section className="products-banner">
      <img src={VinylRetro} alt="Vinyl Collection" className="products-banner-image" />
      <div className="products-banner-text">
        <h1>Browse the Products and Get the Best Offer</h1>
      </div>
    </section>
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = (url = 'http://localhost:5001/products') => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => {
        setProducts([]);
      });
  };

   const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = { ...filters, [name]: type === 'checkbox' ? checked : value };
    setFilters(newFilters);

    let url = 'http://localhost:5001/products';

    if (newFilters.releaseDecade) {
      url = `http://localhost:5001/products/decade/${newFilters.releaseDecade}`;
    } else if (newFilters.priceRange) {
      url = `http://localhost:5001/products/price/${newFilters.priceRange}`;
    } else if (newFilters.bestSeller) {
      url = 'http://localhost:5001/products/bestsellers';
    } else if (newFilters.onSale) {
      url = 'http://localhost:5001/products/onsale';
    } else if (newFilters.artist) {
      url = `http://localhost:5001/products/artist/${newFilters.artist}`;
    } else if (newFilters.genre) {
      url = `http://localhost:5001/products/genre/${newFilters.genre}`;
    }

    fetchProducts(url);
  };

  const generateTitle = () => {
    if (filters.artist) {
      return `All products with ${filters.artist}`;
    }
    if (filters.genre) {
      return `All ${filters.genre} products`;
    }
    if (filters.releaseDecade) {
      return `All products from the ${filters.releaseDecade}s`;
    }
    if (filters.priceRange) {
      return `All products within price range ${filters.priceRange}`;
    }
    if (filters.bestSeller) {
      return `All best-selling products`;
    }
    if (filters.onSale) {
      return `All products on sale`;
    }
    return 'All Products';
  };

  const handleAddToCart = (productId) => {
    const userId = 1; // Replace with actual user ID
    const quantity = 1; // Default quantity

    fetch('http://localhost:5001/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
    })
      .then(response => response.json())
      .then(data => {
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
  };

  return (
    <main className="products-page">
      <Banner />
      <section className="filters">
        <select name="artist" onChange={handleFilterChange}>
          <option value="">All Artists</option>
          {Array.from(new Set(products.map(p => p.artist_name))).map(artist => (
            <option key={artist} value={artist}>{artist}</option>
          ))}
        </select>

        <select name="genre" onChange={handleFilterChange}>
          <option value="">All Genres</option>
          {Array.from(new Set(products.map(p => p.genre_name))).map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <select name="releaseDecade" onChange={handleFilterChange}>
          <option value="">All Decades</option>
          <option value="1970">1970s</option>
          <option value="1980">1980s</option>
          <option value="1990">1990s</option>
          <option value="2000">2000s</option>
          <option value="2010">2010s</option>
          <option value="2020">2020s</option>
        </select>

        <label>Price Range:</label>
        <input type="range" name="priceRange" min="0" max="500" step="10" value={filters.priceRange} onChange={handleFilterChange} />

        <label>
          <input type="checkbox" name="bestSeller" onChange={handleFilterChange} />
          Best Seller
        </label>

        <label>
          <input type="checkbox" name="onSale" onChange={handleFilterChange} />
          On Sale
        </label>

        <button onClick={() => setFilters({ artist: '', genre: '', releaseDecade: '', priceRange: '', bestSeller: false, onSale: false })}>
          Reset Filters
        </button>
      </section>

      <section className="products">
        <h2>{generateTitle()}</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.product_id} className="product-card">
              <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.album_name}</h3>
                <p>{product.artist_name}</p>
                <p>{product.release_date}</p>
                <p>{product.price}</p>
              </div>
              <button className="buy-button" onClick={() => handleAddToCart(product.product_id)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;