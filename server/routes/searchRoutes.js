const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');

// Search gifts endpoint with category filtering
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        
        // Build query object
        const query = {};
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.condition) {
            query.condition = req.query.condition;
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (error) {
        console.error('Error searching gifts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
