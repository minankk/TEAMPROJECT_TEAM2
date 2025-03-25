const db = require('../db');

exports.getDashboardData = async (req, res) => {
    try {
        // Reporting data (from your image)
        const [totalSales] = await db.execute('SELECT SUM(total_amount) AS total FROM orders');
        const [customerCount] = await db.execute('SELECT COUNT(*) AS count FROM users WHERE role = "user"');
        const [orderCount] = await db.execute('SELECT COUNT(*) AS count FROM orders');
        const [productCount] = await db.execute('SELECT COUNT(*) AS count FROM products');

        // Product Sales Report (as before)
        const [productSalesReport] = await db.execute(`
            SELECT p.name, SUM(oi.quantity * oi.price) AS sales
            FROM products p
            JOIN order_items oi ON p.product_id = oi.product_id
            GROUP BY p.product_id
        `);

        // Sales Over Time Report (Monthly sales)
        const [salesOverTime] = await db.execute(`
            SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(total_amount) AS monthly_sales
            FROM orders
            GROUP BY month
            ORDER BY month
        `);

        // Visits (Unique sessions in the last 7 days)
        const [visits] = await db.execute(`
            SELECT COUNT(DISTINCT session_id) AS unique_visits
            FROM sessions
            WHERE start_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        `);

        // Product Management Data (for the table)
        const [products] = await db.execute('SELECT * FROM products');

        res.status(200).json({
            // Reports
            totalSales: totalSales[0].total || 0,
            customerCount: customerCount[0].count,
            orderCount: orderCount[0].count,
            productCount: productCount[0].count,
            productSalesReport,
            salesOverTime,
            visits: visits[0].unique_visits,
            // Product Data
            products,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Add Product
exports.addProduct = async (req, res) => {
    try {
        const { name, artist_id, album_id, genre_id, release_date, price, cover_image_url } = req.body;
        await db.execute(
            'INSERT INTO products (name, artist_id, album_id, genre_id, release_date, price, cover_image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, artist_id, album_id, genre_id, release_date, price, cover_image_url]
        );
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, artist_id, album_id, genre_id, release_date, price, cover_image_url } = req.body;
        await db.execute(
            'UPDATE products SET name = ?, artist_id = ?, album_id = ?, genre_id = ?, release_date = ?, price = ?, cover_image_url = ? WHERE product_id = ?',
            [name, artist_id, album_id, genre_id, release_date, price, cover_image_url, id]
        );
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute('DELETE FROM products WHERE product_id = ?', [id]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};