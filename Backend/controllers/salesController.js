const db = require('../db');
const formatCurrency = require('../helpers/currencyFormatter');

exports.getSalesProducts = async (req, res) => {
  db.execute(`
    SELECT p.product_id, p.name, p.artist_id, p.album_id, p.genre_id, p.price, p.cover_image_url, 
           a.name AS artist_name, al.title AS album_title
    FROM products p
    JOIN artists a ON p.artist_id = a.artist_id
    JOIN albums al ON p.album_id = al.album_id
    JOIN genres g ON p.genre_id = g.genre_id
    WHERE p.on_sale = 1
  `)
  .then(([results]) => {
    results.forEach(product => {
      product.price = formatCurrency(product.price);
    });
    res.status(200).json(results);
  })
  .catch((err) => {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  });
};

// UNIT TESTS
if (process.env.NODE_ENV === 'test') {
  const { getSalesProducts } = module.exports;

  const mockRes = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  });

  describe('Sales Controller', () => {
    afterEach(() => jest.clearAllMocks());

    test('getSalesProducts - returns on-sale products', async () => {
      const req = {};
      const res = mockRes();

      db.execute = jest.fn().mockResolvedValueOnce([[{ product_id: 1, name: 'Sale Product', price: 10 }]]);

      await getSalesProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });

    test('getSalesProducts - handles db error', async () => {
      const req = {};
      const res = mockRes();

      db.execute = jest.fn().mockRejectedValueOnce(new Error('DB error'));

      await getSalesProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });
  });
}