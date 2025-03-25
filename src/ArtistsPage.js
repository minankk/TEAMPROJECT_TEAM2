import React, { useState, useEffect } from 'react';
import "./ArtistsPage.css"

function ArtistsPage() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/artists?timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(data => {
                setArtists(data);
            })
            .catch(error => {
                console.error('Error fetching artists:', error);
            });
    }, []);

    const handleArtistClick = (artistId) => {
        fetch(`http://localhost:5001/artists/${artistId}?timestamp=${new Date().getTime()}`)
            .then(response => response.json())
            .then(data => {
                setSelectedArtist(data);
            })
            .catch(error => {
                console.error('Error fetching artist details:', error);
            });

        fetch(`http://localhost:5001/artists/${artistId}/products?timestamp=${new Date().getTime()}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    return (
        <div className="artistsPage">
            <div className="artistList">
                <h2>Artists</h2>
                <ul>
                    {artists.map(artist => (
                        <li key={artist.artist_id}>
                            <a href="#" onClick={() => handleArtistClick(artist.artist_id)}>
                                {artist.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="artistDetails">
                {selectedArtist ? (
                    <div>
                        <h2>{selectedArtist.name}</h2>
                        {selectedArtist.image_url && <img src={`http://localhost:5001${selectedArtist.image_url}`} alt={selectedArtist.name} className="artistImage" />}
                        <p>{selectedArtist.bio}</p>
                        <h3>Products</h3>
                        <div className="productList">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <div key={product.product_id} className="productItem">
                                        <h4>{product.product_name}</h4>
                                        <p>{product.description}</p>
                                        <p>${product.price}</p>
                                        {product.cover_image_url && <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.product_name} className="productImage" />}
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
    );
}

export default ArtistsPage;