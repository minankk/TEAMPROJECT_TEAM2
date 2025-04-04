jest.mock("../../db", () => ({
    execute: jest.fn(),
}));

const { searchProducts } = require("../../controllers/searchController");
const db = require("../../db");
const formatCurrency = require('../../helpers/currencyFormatter');
const stringSimilarity = require('string-similarity');

jest.mock('../../helpers/currencyFormatter');
jest.mock('string-similarity');

describe('Search Logic', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = { query: {} };
        mockRes = {
            status: jest.fn(),
            json: jest.fn()
        };
        mockRes.status = jest.fn().mockReturnValue(mockRes);
        jest.clearAllMocks();
    });

    //return the products to match the search query
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

   //return the suggested product if no exact match is found
    test('Returns suggestions when no exact match is found', async () => {
        mockReq.query.query = "Die";
        db.execute
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[{ album_name: "The Masterplan" }, { album_name: "Pulp Fiction" }]]);
        stringSimilarity.findBestMatch.mockReturnValue({
            ratings: [
                { target: "The Masterplan", rating: 0.8 },
                { target: "Pulp Fiction", rating: 0.7 },
            ],
        });

        await searchProducts(mockReq, mockRes);

        console.log("MockRes Status Calls:", mockRes.status.mock.calls); 

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: `No exact matches found for "Die". Did you mean one of these?`,
            suggestions: expect.arrayContaining(["The Masterplan", "Pulp Fiction"])
        });
    });

    //return no product found
    test('Returns message when no products are found', async () => {
        mockReq.query.query = "UnknownAlbum";
        db.execute
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]]); 
        stringSimilarity.findBestMatch.mockReturnValue({ ratings: [] });
    
        await searchProducts(mockReq, mockRes);
    
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: `No items found for "UnknownAlbum". Please try a different product.`
        });
    });

    //if query parameter is missing
    test('Returns 400 error when query parameter is missing', async () => {
        await searchProducts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Search is required" });
    });

    //database query fails
    test('Returns 500 error when database query fails', async () => {
        mockReq.query.query = "Thriller";
        db.execute.mockRejectedValue(new Error("Database error"));

        await searchProducts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to search products" });
    });
});