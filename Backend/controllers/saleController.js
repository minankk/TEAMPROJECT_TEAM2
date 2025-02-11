const db = require('../models'); // Import models like Sequelize
 
// Get records by genre
const getRecordsByGenre = async (req, res) => {
    const { genreId } = req.params;
 
    try {
        const records = await db.Record.findAll({
            where: { genre_id: genreId },
            limit: 25, // Get 25 records
            order: [['release_date', 'DESC']], // Sort by release date
        });
        res.json(records); // Return records data to frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving records');
    }
};
 
// Get details of a specific record
const getRecordById = async (req, res) => {
    const { id } = req.params;
 
    try {
        const record = await db.Record.findOne({
            where: { record_id: id }
        });
        if (!record) {
            return res.status(404).send('Record not found');
        }
        res.json(record); // Return the record details to frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving record');
    }
};
 
module.exports = {
    getRecordsByGenre,
    getRecordById
};