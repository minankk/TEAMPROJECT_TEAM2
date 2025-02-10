const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bidgoli1379',
    database: 'mydb'
});

exports.getAllProducts = (req, res) => {
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send('Failed to fetch products');
        res.status(200).json(results);
    });
};
