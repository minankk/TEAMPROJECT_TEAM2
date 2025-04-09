const cartController = require('../../controllers/cartController');
const db = require('../../db');

jest.mock('../../db', () => ({
    execute: jest.fn(),
}));

describe('Cart Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            user: { userId: 1, user_id: 1 },
            body: {},
            params: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        console.error = jest.fn();
    });

    describe('addToCart', () => {
        it('should add item to cart successfully', async () => {
            req.body = { product_id: 1, quantity: 2 };
            db.execute.mockResolvedValueOnce([[{ stock_quantity: 5 }]]).mockResolvedValueOnce([[]]);

            await cartController.addToCart(req, res);

            expect(db.execute).toHaveBeenCalledWith(
                `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`,
                [1, 1, 2]
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Item added to cart successfully' });
        });

        it('should update cart item quantity if item already exists', async () => {
            req.body = { product_id: 1, quantity: 2 };
            db.execute
                .mockResolvedValueOnce([[{ stock_quantity: 5 }]])
                .mockResolvedValueOnce([[{ cart_id: 10, quantity: 1 }]])
                .mockResolvedValueOnce([]);

            await cartController.addToCart(req, res);

            expect(db.execute).toHaveBeenCalledWith(
                `UPDATE cart SET quantity = ? WHERE cart_id = ?`,
                [3, 10]
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Cart item quantity updated successfully' });
        });

        it('should return 401 if user_id is missing', async () => {
            req.user = {};
            req.body = { product_id: 1, quantity: 2 };

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized: user_id missing' });
        });

        it('should return 400 if product_id or quantity is missing', async () => {
            req.body = { product_id: 1 };

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields: product_id, or quantity' });
        });

        it('should return 400 if quantity is not greater than 0', async () => {
            req.body = { product_id: 1, quantity: 0 };

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Quantity must be greater than 0' });
        });

        it('should return 404 if product not found in inventory', async () => {
            req.body = { product_id: 1, quantity: 2 };
            db.execute.mockResolvedValueOnce([[]]);

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Product not found in inventory' });
        });

        it('should return 400 if quantity exceeds available stock', async () => {
            req.body = { product_id: 1, quantity: 10 };
            db.execute.mockResolvedValueOnce([[{ stock_quantity: 5 }]]);

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Insufficient stock' });
        });

        it('should return 400 if updated quantity exceeds available stock', async () => {
            req.body = { product_id: 1, quantity: 10 };
            db.execute
                .mockResolvedValueOnce([[{ stock_quantity: 15 }]])
                .mockResolvedValueOnce([[{ cart_id: 10, quantity: 6 }]])
                .mockResolvedValueOnce([]);

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Insufficient stock for updated quantity' });
        });

        it('should return 500 on database error', async () => {
            req.body = { product_id: 1, quantity: 2 };
            db.execute.mockRejectedValue(new Error('Database error'));

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to add item to cart', details: undefined });
        });
    });

    describe('getCartItems', () => {
        it('should fetch cart items successfully', async () => {
            req.params.user_id = 1;
            db.execute.mockResolvedValue([[{ cart_id: 1, product_name: 'Product 1', artist_name: 'Artist 1', price: 10, quantity: 2, cover_image_url: 'url' }]]);

            await cartController.getCartItems(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ cartItems: [{ cart_id: 1, product_name: 'Product 1', artist_name: 'Artist 1', price: 10, quantity: 2, cover_image_url: 'url' }] });
        });

        it('should return 404 if cart is empty', async () => {
            req.params.user_id = 1;
            db.execute.mockResolvedValue([[]]);

            await cartController.getCartItems(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'No items found in the cart' });
        });

        it('should return 401 if user token is missing', async () => {
            req.user = {};
            req.params.user_id = 1;

            await cartController.getCartItems(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized: No user token provided' });
        });

        it('should return 403 if user IDs do not match', async () => {
            req.params.user_id = 2;

            await cartController.getCartItems(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden: User IDs do not match' });
        });

        it('should return 500 on database error', async () => {
            req.params.user_id = 1;
            db.execute.mockRejectedValue(new Error('Database error'));

            await cartController.getCartItems(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch cart items', details: 'Database error' });
        });
    });

    describe('removeFromCart', () => {
        it('should remove item from cart successfully', async () => {
            req.params.cart_id = 1;
            db.execute.mockResolvedValueOnce([[{ user_id: 1 }]]).mockResolvedValueOnce([]);

            await cartController.removeFromCart(req, res);

            expect(db.execute).toHaveBeenCalledWith(`DELETE FROM cart WHERE cart_id = ?`, [1]);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Item removed from cart' });
        });

        it('should return 404 if cart item not found', async () => {
            req.params.cart_id = 1;
            db.execute.mockResolvedValueOnce([[]]);

            await cartController.removeFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Cart item not found' });
        });

        it('should return 401 if user token is missing', async () => {
            req.user = {};
            req.params.cart_id = 1;

            await cartController.removeFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized: No user token provided' });
        });

        it('should return 403 if user does not own cart item', async () => {
            req.params.cart_id = 1;
            db.execute.mockResolvedValueOnce([[{ user_id: 2 }]]);

            await cartController.removeFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden: You do not own this cart item' });
        });

        it('should return 500 on database error', async () => {
            req.params.cart_id = 1;
            db.execute.mockRejectedValue(new Error('Database error'));

            await cartController.removeFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to remove item from cart' });
        });
    });

    describe('placeOrder', () => {
        it('should place order successfully', async () => {
            db.execute
                .mockResolvedValueOnce([[{ product_id: 1, quantity: 2 }]]) // get cart items
                .mockResolvedValueOnce([[{ stock_quantity: 3 }]]) // check stock
                .mockResolvedValueOnce([{ insertId: 100 }]) // insert order
                .mockResolvedValueOnce([[{ price: 50 }]]) // get product price
                .mockResolvedValueOnce([]) // insert order_items
                .mockResolvedValueOnce([]) // update inventory
                .mockResolvedValueOnce([]) // update order total
                .mockResolvedValueOnce([]); // clear cart

            req.user = { userId: 1, user_id: 1 };

            await cartController.placeOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Order placed successfully' });
        });

        it('should return 400 if cart is empty', async () => {
            db.execute.mockResolvedValueOnce([[]]);

            await cartController.placeOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Cart is empty' });
        });

        it('should return 400 if insufficient stock', async () => {
            db.execute
                .mockResolvedValueOnce([[{ product_id: 1, quantity: 2 }]])
                .mockResolvedValueOnce([[{ stock_quantity: 1 }]]);

            await cartController.placeOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Insufficient stock for product 1' });
        });

        it('should return 500 on database error', async () => {
            db.execute.mockRejectedValue(new Error('Database error'));

            await cartController.placeOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to place order' });
        });
    });

    describe('cartCount', () => {
        it('should return cart count successfully', async () => {
            db.execute.mockResolvedValueOnce([[{ count: 5 }]]);

            await cartController.cartCount(req, res);

            expect(res.json).toHaveBeenCalledWith({ count: 5 });
        });

        it('should return 0 if cart is empty', async () => {
            db.execute.mockResolvedValueOnce([[{ count: null }]]);

            await cartController.cartCount(req, res);

            expect(res.json).toHaveBeenCalledWith({ count: 0 });
        });

        it('should return 500 on database error', async () => {
            db.execute.mockRejectedValue(new Error('Database error'));

            await cartController.cartCount(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
});