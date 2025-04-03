const searchController = require('../../controllers/searchController');
const db = require('../../db');
const formatCurrency = require('../../helpers/currencyFormatter');

jest.mock('../../db');
jest.mock('../../helpers/currencyFormatter');

describe('Product Search Logic', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = { query: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    test('Returns products that match the search query', async () => {
        mockReq.query.query = "Thriller";
        db.execute.mockResolvedValue([[{
            product_id: 1,
            album_name: "Thriller",
            artist_name: "Michael Jackson",
            genre_name: "Pop",
            price: 10.99,
            cover_image_url: "image_url"
        }]]);
        formatCurrency.mockReturnValue("$10.99");

        await searchProducts(mockReq, mockRes);

        expect(db.execute).toHaveBeenCalledWith(expect.any(String), ["%Thriller%", "%Thriller%", "%Thriller%"]);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            products: [{
                product_id: 1,
                album_name: "Thriller",
                artist_name: "Michael Jackson",
                genre_name: "Pop",
                price: "$10.99",
                cover_image_url: "image_url"
            }]
        });
    });

    test('Returns suggestions when no exact match is found', async () => {
        mockReq.query.query = "Thrill";
        db.execute
            .mockResolvedValueOnce([[]]) // No matches
            .mockResolvedValueOnce([[{ album_name: "Beat It" }, { album_name: "Billie Jean" }]]); // Suggestions

        await searchProducts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: `No exact matches found for "Thrill". Did you mean one of these?`,
            suggestions: expect.arrayContaining(["Beat It", "Billie Jean"])
        });
    });

    test('Returns message when no products are found', async () => {
        mockReq.query.query = "UnknownAlbum";
        db.execute
            .mockResolvedValueOnce([[]]) // No match
            .mockResolvedValueOnce([[]]); // No suggestions

        await searchProducts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: `No items found for "UnknownAlbum". Please try a different product.`
        });
    });

    test('Returns 400 error when query parameter is missing', async () => {
        await searchProducts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Search is required" });
    });

    test('Returns 500 error when database query fails', async () => {
        mockReq.query.query = "Thriller";
        db.execute.mockRejectedValue(new Error("Database error"));

        await searchProducts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to search products" });
    });
});