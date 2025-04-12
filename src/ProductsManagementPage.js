import React, { useEffect, useState } from 'react';
import './ProductsManagementPage.css';

const ProductsManagementPage = () => {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    artist_id: '',
    album_id: '',
    genre_id: '',
    release_date: '',
    price: '',
    cover_image_url: ''
  });
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ ...newProduct });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5001/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProducts(data);
    } catch {
      setMessage('Failed to load products');
    }
  };

  const handleInputChange = (e, type = 'new') => {
    const { name, value } = e.target;
    if (type === 'new') {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    } else {
      setUpdatedProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const createProduct = async () => {
    try {
      const res = await fetch('http://localhost:5001/admin/dashboard/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        fetchProducts();
        setNewProduct({
          name: '',
          artist_id: '',
          album_id: '',
          genre_id: '',
          release_date: '',
          price: '',
          cover_image_url: ''
        });
      }
    } catch (err) {
      setMessage('Product creation failed');
    }
  };

  const selectProductForUpdate = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({ ...product });
  };

  const updateProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5001/admin/dashboard/products/${selectedProduct.product_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        fetchProducts();
        setSelectedProduct(null);
      }
    } catch {
      setMessage('Product update failed');
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/admin/dashboard/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) fetchProducts();
    } catch {
      setMessage('Failed to delete product');
    }
  };

  return (
    <div className="products-management-page">
      <h2>Products Management</h2>
      {message && <p>{message}</p>}

      <h3>Add New Product</h3>
      <div className="form-grid">
        {Object.keys(newProduct).map((field) => (
          <input
            key={field}
            type={field === 'release_date' ? 'date' : 'text'}
            name={field}
            placeholder={field.replace(/_/g, ' ')}
            value={newProduct[field]}
            onChange={(e) => handleInputChange(e, 'new')}
          />
        ))}
        <button onClick={createProduct}>Create Product</button>
      </div>

      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <span>{product.name} - {product.price}</span>
            <div>
              <button onClick={() => selectProductForUpdate(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div className="update-form">
          <h3>Update Product</h3>
          {Object.keys(updatedProduct).map((field) => (
            <input
              key={field}
              type={field === 'release_date' ? 'date' : 'text'}
              name={field}
              placeholder={field.replace(/_/g, ' ')}
              value={updatedProduct[field]}
              onChange={(e) => handleInputChange(e, 'update')}
            />
          ))}
          <button onClick={updateProduct}>Update</button>
          <button onClick={() => setSelectedProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProductsManagementPage;
