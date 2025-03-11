const db = require('../db');

exports.getProductsByDecade = async (req, res) => {
    try {
        const decades = [
            { decade: '1960s', startYear: '1960-01-01', endYear: '1969-12-31' },
            { decade: '1970s', startYear: '1970-01-01', endYear: '1979-12-31' },
            { decade: '1980s', startYear: '1980-01-01', endYear: '1989-12-31' },
            { decade: '1990s', startYear: '1990-01-01', endYear: '1999-12-31' },
            { decade: '2000s', startYear: '2000-01-01', endYear: '2009-12-31' },
            { decade: '2010s', startYear: '2010-01-01', endYear: '2019-12-31' },
            { decade: '2020s', startYear: '2020-01-01', endYear: '2029-12-31' },
        ];

        const decadesProducts = await Promise.all(decades.map(async (decadeData) => {
            const [products] = await db.execute(
                `SELECT p.*, a.name AS artist_name FROM products p JOIN artists a ON p.artist_id = a.artist_id WHERE p.release_date BETWEEN ? AND ?`,
                [decadeData.startYear, decadeData.endYear]
            );
            return {
                decade: decadeData.decade,
                products: products,
            };
        }));

        res.status(200).json(decadesProducts);
    } catch (error) {
        console.error('Error fetching products by decade:', error);
        res.status(500).json({ error: 'Failed to fetch products by decade' });
    }
};