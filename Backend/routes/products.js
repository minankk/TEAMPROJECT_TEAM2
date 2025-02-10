const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Allow frontend to communicate with the backend

// Create a connection to the database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'bidgoli_1379',
    database: 'team_project'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Get all products
app.get('/api/products', (req, res) => {
    const query = `
        SELECT albums.album_name, artists.name AS artist_name, genres.genre_name AS genre, 
               albums.release_date, albums.price, albums.cover_image_url, 
               albums.type, albums.best_sellers, albums.sale
        FROM albums
        JOIN artists ON albums.artist_id = artists.artist_id
        JOIN genres ON albums.genre_id = genres.genre_id;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
