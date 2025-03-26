const db = require('../db');

exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user?.user_id;
        const productId = req.params.productId;
        const [existingWishlistItem] = await db.execute(
            'SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );

        if (existingWishlistItem.length > 0) {
            await db.execute(
                'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
                [userId, productId]
            );
            return res.status(200).json({ message: "Product removed from wishlist", action: "removed" }); // Added action field
        }

        await db.execute(
            'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
            [userId, productId]
        );

        res.status(200).json({ message: "Product added to wishlist", action: "added" }); // Added action field
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



exports.removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user?.user_id; 
        const productId = req.params.productId;

        console.log("User ID:", userId);  
        console.log("Product ID:", productId);

        if (!userId || !productId) {
            return res.status(400).json({ message: "User ID and Product ID are required" });
        }

        await db.execute(
            'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );
        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        console.error('removeFromWishlist: Error removing from wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


// Function to get the user's wishlist

exports.getWishlist = async (req, res) => {
    try {
        const { user_id } = req.params;
        const tokenUserId = req.user?.user_id;

        console.log("Received request for wishlist. URL User ID:", user_id);
        console.log("Token User ID:", tokenUserId);

        if (!tokenUserId) {
            return res.status(401).json({ error: 'Unauthorized: No user token provided' });
        }

        if (Number(user_id) !== Number(tokenUserId)) {
            return res.status(403).json({ error: 'Forbidden: User IDs do not match' });
        }

        const [wishlistItems] = await db.execute(
            `SELECT w.wishlist_id, p.product_id, a.album_id, a.title, a.artist_id, a.release_date, 
                    p.price, p.cover_image_url
             FROM wishlist w
             JOIN products p ON w.product_id = p.product_id
             JOIN albums a ON p.album_id = a.album_id
             WHERE w.user_id = ?`,
            [user_id]
        );

        console.log("Fetched Wishlist Items:", wishlistItems);

        if (wishlistItems.length === 0) {
            return res.status(404).json({ message: "No items in wishlist" });
        }

        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error("Error fetching wishlist:", error.stack);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
