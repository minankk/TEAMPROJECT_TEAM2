const orderController = require('../../controllers/orderController');
const db = require('../../db');

// Mock dashboardController
jest.mock('../../controllers/dashboardController', () => ({
    genBenefitsDiscount: jest.fn().mockReturnValue({ tier: "VIP", discount: 0.1 }),
}));
const dashboardController = require('../../controllers/dashboardController');

// Mock db module
jest.mock('../../db', () => ({
    getConnection: jest.fn(),
    execute: jest.fn(),
}));

describe('Order Controller', () => {
    let req, res;
    let mockConnection;

    beforeEach(() => {
        mockConnection = {
            query: jest.fn(),
            execute: jest.fn(), 
            beginTransaction: jest.fn(),
            commit: jest.fn(),
            rollback: jest.fn(),
            release: jest.fn(),
        };

        db.getConnection.mockResolvedValue(mockConnection);

        req = {
            user: { user_id: 1 },
            body: {
                items: [{ product_id: 1, quantity: 2, price: 10 }],
                shippingAddress: '123 Main St',
                totalAmount: 20
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('checkoutAndCreateOrder', () => {
        it('should create an order successfully', async () => {
            mockConnection.execute
                .mockResolvedValueOnce([[{ membership_status: 'vip', total_spent: 1000 }]]) // user info
                .mockResolvedValueOnce([[{ cart_total: 20 }]]) // cart total
                .mockResolvedValueOnce([{ insertId: 1 }]) // order insert
                .mockResolvedValueOnce([[{ stock_quantity: 10 }]]) // stock check
                .mockResolvedValueOnce([{ insertId: 1 }]) // order_items insert
                .mockResolvedValueOnce([{ insertId: 1 }]) // inventory update
                .mockResolvedValueOnce([{ insertId: 1 }]) // tracking insert
                .mockResolvedValueOnce([{ insertId: 1 }]); // cart delete

            await orderController.checkoutAndCreateOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Order created successfully',
                membershipTier: 'VIP',
                originalTotal: 20,
                discountApplied: 10,
                finalTotalAmount: 18,
                orderId: 1,
                tracking_number: expect.any(String)
            });
        });

        it('should return 400 if items are missing or empty', async () => {
            req.body.items = [];

            await orderController.checkoutAndCreateOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Order must have at least one item.' });
        });

        it('should return 400 if shippingAddress is missing or invalid', async () => {
            req.body.shippingAddress = {};

            await orderController.checkoutAndCreateOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Shipping address is required and must be a valid string.' });
        });

        it('should return 404 if user is not found', async () => {
            mockConnection.execute.mockResolvedValueOnce([[]]); // user not found

            await orderController.checkoutAndCreateOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should return 400 if item is missing product_id, quantity or price', async () => {
            req.body.items = [{ quantity: 2, price: 10 }];
        
            mockConnection.execute
                .mockResolvedValueOnce([[{ membership_status: 'vip', total_spent: 1000 }]]) // user info
                .mockResolvedValueOnce([[{ cart_total: 20 }]]) // cart total
                .mockResolvedValue([{ insertId: 1 }]);
        
            await orderController.checkoutAndCreateOrder(req, res);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Each item must have product_id, quantity, and price.' });
        });

        it('should return 400 if stock is insufficient', async () => {
            mockConnection.execute
                .mockResolvedValueOnce([[{ membership_status: 'vip', total_spent: 1000 }]]) // user info
                .mockResolvedValueOnce([[{ cart_total: 20 }]]) // cart total
                .mockResolvedValueOnce([{ insertId: 1 }]) // order insert
                .mockResolvedValueOnce([[{ stock_quantity: 1 }]]); // insufficient stock

            await orderController.checkoutAndCreateOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Insufficient stock for product ID: 1' });
        });

        it('should return 500 on database error', async () => {
            mockConnection.execute.mockRejectedValueOnce(new Error('Database error'));

            await orderController.checkoutAndCreateOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error', error: 'Database error' });
        });
    });

    describe('updateOrderStatus', () => {
        it('should return 404 if order is not found', async () => {
            req.body = { orderId: 1, status: 'shipped' };
            db.execute.mockResolvedValueOnce([{ affectedRows: 0 }]);

            await orderController.updateOrderStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' });
        });

        it('should return 500 on database error', async () => {
            req.body = { orderId: 1, status: 'shipped' };
            db.execute.mockRejectedValueOnce(new Error('Database error'));

            await orderController.updateOrderStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error', error: 'Database error' });
        });
    });
});