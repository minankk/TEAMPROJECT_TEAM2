const { addProduct, deleteProduct, updateProduct, cancelOrder } = require('../../controllers/adminDashboardController');
const db = require('../../db');

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

jest.mock('../../db', () => ({
  execute: jest.fn()
}));

describe('Admin Dashboard - Product Management', () => {
  afterEach(() => jest.clearAllMocks());

  test('addProduct should insert product successfully', async () => {
    const req = {
      body: {
        name: 'Test Product',
        artist_id: 1,
        album_id: 1,
        genre_id: 1,
        release_date: '2024-01-01',
        price: 20,
        cover_image_url: 'test.jpg'
      }
    };
    const res = mockRes();

    db.execute.mockResolvedValueOnce();

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product added successfully' });
  });

  test('deleteProduct should delete product by ID', async () => {
    const req = { params: { id: 1 } };
    const res = mockRes();

    db.execute.mockResolvedValueOnce();

    await deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
  });

  test('updateProduct should update product details', async () => {
    const req = {
      params: { id: 1 },
      body: {
        name: 'Updated Name',
        artist_id: 1,
        album_id: 1,
        genre_id: 1,
        release_date: '2025-01-01',
        price: 25,
        cover_image_url: 'updated.jpg'
      }
    };
    const res = mockRes();

    db.execute.mockResolvedValueOnce();

    await updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product updated successfully' });
  });

  test('cancelOrder should cancel eligible order', async () => {
    const req = { params: { orderId: 123 } };
    const res = mockRes();

    db.execute
      .mockResolvedValueOnce([[{ status: 'Pending' }]]) // Order check
      .mockResolvedValueOnce();                         // Cancel order update

    await cancelOrder(req, res);

    expect(db.execute).toHaveBeenCalledWith('UPDATE orders SET status = ? WHERE order_id = ?', ['Cancelled', 123]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Order cancelled successfully' });
  });

  test('cancelOrder should not cancel if already shipped/completed', async () => {
    const req = { params: { orderId: 124 } };
    const res = mockRes();

    db.execute.mockResolvedValueOnce([[{ status: 'Shipped' }]]);

    await cancelOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Cannot cancel an order with status: Shipped' });
  });
});
