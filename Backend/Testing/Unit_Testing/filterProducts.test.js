
const db = require('../../db');
const {
  filterByGenre,
  filterByPrice,
  filterByArtist,
  filterBestSellers,
  filterOnSale,
  multipleFliteredProducts,
  filterByDecade
} = require('../../controllers/productController');

jest.mock('../../db');

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

describe('Product Filter Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('filterByGenre - returns products for a genre', async () => {
    const req = { params: { genre: 'Rock' } };
    const res = mockRes();
    db.execute.mockResolvedValueOnce([[{ product_id: 1, name: 'Test Album', genre: 'Rock', price: 20, cover_image_url: 'url' }]]);
    await filterByGenre(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('filterByPrice - returns products for a given price', async () => {
    const req = { params: { price: '25' } };
    const res = mockRes();
    db.execute.mockResolvedValueOnce([[{ product_id: 2, name: 'Cheap Album', price: 25, genre: 'Jazz', cover_image_url: 'img' }]]);
    await filterByPrice(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('filterByArtist - returns products for a specific artist', async () => {
    const req = { params: { artist: 'Queen' } };
    const res = mockRes();
    db.execute.mockResolvedValueOnce([[{ product_id: 3, name: 'Greatest Hits', artist_name: 'Queen', price: 30 }]]);
    await filterByArtist(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('filterBestSellers - returns best-selling products', async () => {
    const req = {};
    const res = mockRes();
    db.execute.mockResolvedValueOnce([[{ product_id: 4, name: 'Hot Seller', best_sellers: 1 }]]);
    await filterBestSellers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('filterOnSale - returns on-sale products', async () => {
    const req = {};
    const res = mockRes();
    db.execute.mockResolvedValueOnce([[{ product_id: 5, name: 'Discounted Album', on_sale: 1 }]]);
    await filterOnSale(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('multipleFliteredProducts - returns products filtered by multiple criteria', async () => {
    const req = { query: { genre: 'Pop', artist: 'Adele', decade: '2010' } };
    const res = mockRes();
    db.execute.mockResolvedValueOnce([[{ product_id: 6, name: '21', artist_name: 'Adele', genre: 'Pop' }]]);
    await multipleFliteredProducts(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('filterByDecade - returns products for a specific decade', async () => {
    const req = { params: { decade: '1990' }, query: { genre: 'all' } };
    const res = mockRes();
    db.execute.mockResolvedValueOnce([[{ product_id: 7, name: 'Classic 90s', release_date: '1994-05-23', price: 22 }]]);
    await filterByDecade(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
