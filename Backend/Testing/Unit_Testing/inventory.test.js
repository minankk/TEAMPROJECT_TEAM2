const db = require('../../db');
const { getProductReport } = require('../../controllers/adminDashboardController');

jest.mock('../../db');

describe('Inventory Management - getProductReport', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return stock levels and most sold items', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        db.execute
            .mockResolvedValueOnce([[{ product_id: 1, name: 'Album A', stock_quantity: 10 }]]) // stockLevels
            .mockResolvedValueOnce([[{ name: 'Album A', total_sold: 100 }]]); // mostSoldItems

        await getProductReport(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            stockLevels: [{ product_id: 1, name: 'Album A', stock_quantity: 10 }],
            mostSoldItems: [{ name: 'Album A', total_sold: 100 }],
        });
    });

    test('should handle errors', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        db.execute.mockRejectedValue(new Error('Database error'));

        await getProductReport(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal server error',
            error: 'Database error',
        });
    });
});