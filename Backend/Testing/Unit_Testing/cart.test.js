const cartController = require('../cartController'); // adjust path as necessary
const db = require('../db'); // assuming your db connection module
const { mockRequest, mockResponse } = require('./mocks'); // Helper mocks

jest.mock('../db'); // Mock your db module

describe('Cart Controller Tests', () => {

    let req, res;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        db.execute.mockReset(); // Clear mock calls before each test
    });

    describe('addToCart', () => {
        it('should add a new item to the cart', async () => {
            req.user = { user_id: 1 };
            req.body = { product_id: 101, quantity: 2 };
            db.execute.mockResolvedValueOnce([{ stock_quantity: 5 }]); // Simulate inventory check
            db.execute.mockResolvedValueOnce([[]]); // Simulate no existing cart item
            db.execute.mockResolvedValueOnce([]); // Simulate insert

            await cartController.addToCart(req, res);

            expect(db.execute).toHaveBeenCalledWith(
                `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`,
                [1, 101, 2]
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Item added to cart successfully' });
        });

        it('should update quantity if item already exists in cart', async () => {
            req.user = { user_id: 1 };
            req.body = { product_id: 101, quantity: 2 };
            db.execute.mockResolvedValueOnce([{ stock_quantity: 5 }]); // Simulate inventory check
            db.execute.mockResolvedValueOnce([[{ cart_id: 5, quantity: 1 }]]); // Simulate existing cart item
            db.execute.mockResolvedValueOnce([]); // Simulate update

            await cartController.addToCart(req, res);

            expect(db.execute).toHaveBeenCalledWith(
                `UPDATE cart SET quantity = ? WHERE cart_id = ?`,
                [3, 5]
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Cart item quantity updated successfully' });
        });

        it('should handle insufficient stock', async () => {
            req.user = { user_id: 1 };
            req.body = { product_id: 101, quantity: 10 };
            db.execute.mockResolvedValueOnce([{ stock_quantity: 5 }]); // Simulate inventory check

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Insufficient stock' });
        });

        it('should handle insufficient stock when updating existing item', async () => {
            req.user = { user_id: 1 };
            req.body = { product_id: 101, quantity: 5 };
            db.execute.mockResolvedValueOnce([{ stock_quantity: 5 }]); // Simulate inventory check
            db.execute.mockResolvedValueOnce([[{ cart_id: 5, quantity: 1 }]]); // Simulate existing cart item

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Insufficient stock for updated quantity' });

        });

        it('should handle product not found in inventory', async () => {
            req.user = { user_id: 1 };
            req.body = { product_id: 101, quantity: 2 };
            db.execute.mockResolvedValueOnce([[]]);

            await cartController.addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Product not found in inventory' });
        });

        it('should handle quantity less than or equal to 0', async () => {
            req.user = { user_id: 1 };
            req.body = { product_id: 101, quantity: 0 };
            await cartController.addToCart(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Quantity must be greater than 0' });
        });

        it('should handle missing user_id', async () => {
            req.user = null;
            req.body = { product_id: 101, quantity: 2 };
            await cartController.addToCart(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized: user_id missing' });
        });
        it('should handle missing product_id or quantity', async () => {
            req.user = { user_id: 1 };
            req.body = { product_id: 101 };
            await cartController.addToCart(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields: product_id, or quantity' });
        });
    });

    describe('getCartItems', () => {
        it('should return cart items for a user', async () => {
            req.user = { user_id: 1 };
            req.params = { user_id: '1' };
            db.execute.mockResolvedValueOnce([[{ cart_id: 1, product_name: 'Test Product', artist_name: 'Test Artist', price: 10, quantity: 2, cover_image_url: 'test.jpg' }]]);

            await cartController.getCartItems(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ cartItems: [{ cart_id: 1, product_name: 'Test Product', artist_name: 'Test Artist', price: 10, quantity: 2, cover_image_url: 'test.jpg' }] });
        });

        it('should return 404 if no items found', async () => {
            req.user = { user_id: 1 };
            req.params = { user_id: '1' };
            db.execute.mockResolvedValueOnce([[]]);
            await cartController.getCartItems(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'No items found in the cart' });
        });

        it('should return 403 if user ids do not match', async () => {
            req.user = { user_id: 1 };
            req.params = { user_id: '2' };
            await cartController.getCartItems(req, res);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden: User IDs do not match' });
        });
        it('should return 401 if token is missing', async () => {
            req.user = null;
            req.params = { user_id: '1' };
            await cartController.getCartItems(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized: No user token provided' });
        });
    });

    describe('removeFromCart', () => {
        it('should remove an item from the cart', async () => {
            req.user = { user_id: 1 };
            req.params = { cart_id: 10 };
            db.execute.mockResolvedValueOnce([{ user_id: 1 }]);
            db.execute.mockResolvedValueOnce([]);

            await cartController.removeFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Item removed from cart' });
        });

        it('should return 404 if cart item not found', async () => {
            req.user = { user_id: 1 };
            req.params = { cart_id: 10 };
            db.execute.mockResolvedValueOnce([]);

            await cartController.removeFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Cart item not found' });
        });

        it('should return 403 if user does not own the cart item', async () => {
            req.user = { user_id: 1 };
            req.params = { cart_id: 10 };
            db.execute.mockResolvedValueOnce([{ user_id: 2 }]);
            await cartController.removeFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden: You do not own this cart item' });
        });
        it('should return 401 if no token provided', async () => {
            req.user = null;
            req.params = { cart_id: 10 };
            await cartController.removeFromCart(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized: No user token provided' });
        });
    });

    //placeOrder and cartCount testing would be implemented in similar fashion.
});