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
        const [newSignups] = await db.execute('SELECT DATE_FORMAT(created_at, "%Y-%m-%d") AS date, COUNT(*) AS count FROM users GROUP BY date ORDER BY date');
        const [activeUsers] = await db.execute('SELECT DATE_FORMAT(last_login, "%Y-%m-%d") AS date, COUNT(*) AS count FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY date ORDER BY date');

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
        if (['Shipped', 'Cancelled', 'Completed'].includes(status)) {
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

if (process.env.NODE_ENV === 'test') {
    const { addProduct, deleteProduct } = module.exports;
    const db = require('../db');
    const mockRes = () => ({ status: jest.fn().mockReturnThis(), json: jest.fn() });

    describe('Admin Dashboard Controller', () => {
        afterEach(() => jest.clearAllMocks());

        test('addProduct - inserts new product', async () => {
            const req = {
                body: {
                    name: 'Sample Product',
                    artist_id: 1,
                    album_id: 1,
                    genre_id: 1,
                    release_date: '2024-01-01',
                    price: 19.99,
                    cover_image_url: 'test.jpg'
                }
            };
            const res = mockRes();
            db.execute = jest.fn().mockResolvedValueOnce();
            await addProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        test('deleteProduct - deletes product', async () => {
            const req = { params: { id: 1 } };
            const res = mockRes();
            db.execute = jest.fn().mockResolvedValueOnce();
            await deleteProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
}

// UNIT TESTS (for development only — remove before production)
if (process.env.NODE_ENV === 'test') {
    const { addProduct, deleteProduct, cancelOrder, updateProduct } = module.exports;
    const db = require('../db');

    const mockRes = () => ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    });

    describe('Admin Dashboard Controller', () => {
        afterEach(() => jest.clearAllMocks());

        test('addProduct - inserts new product', async () => {
            const req = {
                body: {
                    name: 'Sample Product',
                    artist_id: 1,
                    album_id: 1,
                    genre_id: 1,
                    release_date: '2024-01-01',
                    price: 19.99,
                    cover_image_url: 'test.jpg'
                }
            };
            const res = mockRes();
            db.execute = jest.fn().mockResolvedValueOnce();
            await addProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        test('deleteProduct - deletes product', async () => {
            const req = { params: { id: 1 } };
            const res = mockRes();
            db.execute = jest.fn().mockResolvedValueOnce();
            await deleteProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('cancelOrder - cancels valid order', async () => {
            const req = { params: { orderId: 123 } };
            const res = mockRes();
            db.execute = jest.fn()
                .mockResolvedValueOnce([[{ status: 'Pending' }]]) // SELECT
                .mockResolvedValueOnce(); // UPDATE

            await cancelOrder(req, res);
            expect(db.execute).toHaveBeenCalledWith('UPDATE orders SET status = ? WHERE order_id = ?', ['Cancelled', 123]);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('cancelOrder - cannot cancel shipped/completed/cancelled order', async () => {
            const req = { params: { orderId: 456 } };
            const res = mockRes();
            db.execute = jest.fn().mockResolvedValueOnce([[{ status: 'Shipped' }]]); // SELECT only

            await cancelOrder(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('updateProduct - updates existing product', async () => {
            const req = {
                params: { id: 1 },
                body: {
                    name: 'Updated Product',
                    artist_id: 2,
                    album_id: 3,
                    genre_id: 4,
                    release_date: '2025-01-01',
                    price: 25.99,
                    cover_image_url: 'updated.jpg'
                }
            };
            const res = mockRes();
            db.execute = jest.fn().mockResolvedValueOnce();

            await updateProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
}
