const db = require('../db');

exports.getSalesReport = async (req, res) => {
    try {
        const { reportType } = req.query;
        let sql, format;
        switch (reportType) {
            case 'daily': format = '%Y-%m-%d'; break;
            case 'weekly': format = '%Y-W%u'; break;
            case 'monthly': format = '%Y-%m'; break;
            default: return res.status(400).json({ message: 'Invalid report type' });
        }

        sql = `SELECT DATE_FORMAT(order_date, ?) AS period, SUM(total_amount) AS sales FROM orders GROUP BY period ORDER BY period`;
        const [salesData] = await db.execute(sql, [format]);
        res.status(200).json(salesData);
    } catch (error) {
        console.error('Error fetching sales report:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getUserActivityReport = async (req, res) => {
    try {
        // Get users who signed up in the last 30 days
        const [newSignups] = await db.execute(
            `SELECT user_id, user_name, email, created_at 
             FROM users 
             WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) 
             ORDER BY created_at DESC`
        );

        // Get users who logged in in the last 30 days
        const [activeUsers] = await db.execute(
            `SELECT user_id, user_name, email, last_login 
             FROM users 
             WHERE last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY) 
             ORDER BY last_login DESC`
        );

        res.status(200).json({ newSignups, activeUsers });
    } catch (error) {
        console.error('Error fetching user activity report:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


exports.getProductReport = async (req, res) => {
    try {
        const [stockLevels] = await db.execute('SELECT product_id, name, stock_quantity FROM products');
        const [mostSoldItems] = await db.execute(`
            SELECT p.name, SUM(oi.quantity) AS total_sold
            FROM products p
            JOIN order_items oi ON p.product_id = oi.product_id
            GROUP BY p.product_id
            ORDER BY total_sold DESC
            LIMIT 10
        `);

        res.status(200).json({ stockLevels, mostSoldItems });
    } catch (error) {
        console.error('Error fetching product report:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getOrderReport = async (req, res) => {
    try {
        const [orders] = await db.execute(`
            SELECT o.order_id, o.user_id, o.order_date, o.status, o.total_amount, o.shipping_address,
                   oi.product_id, oi.quantity, oi.price, p.name AS product_name, i.stock_quantity
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            JOIN products p ON oi.product_id = p.product_id
            LEFT JOIN inventory i ON p.product_id = i.product_id
            ORDER BY o.order_date DESC
        `);

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching order report details:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const [orderCheck] = await db.execute('SELECT status FROM orders WHERE order_id = ?', [orderId]);

        if (orderCheck.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const status = orderCheck[0].status;
        if (["Shipped", "Cancelled", "Completed"].includes(status)) {
            return res.status(400).json({ message: `Cannot cancel an order with status: ${status}` });
        }

        await db.execute('UPDATE orders SET status = ? WHERE order_id = ?', ['Cancelled', orderId]);
        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

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

exports.getAllProducts = async (req, res) => {
    try {
      const [products] = await db.execute('SELECT * FROM products');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
  };
  

exports.getDashboardData = async (req, res) => {
    try {
        const [totalSales] = await db.execute('SELECT SUM(total_amount) AS total_sales FROM orders');
        const [totalUsers] = await db.execute('SELECT COUNT(*) AS total_users FROM users');
        const [totalProducts] = await db.execute('SELECT COUNT(*) AS total_products FROM products');

        res.status(200).json({
            sales: totalSales[0].total_sales,
            users: totalUsers[0].total_users,
            products: totalProducts[0].total_products
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

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
