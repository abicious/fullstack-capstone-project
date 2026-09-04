const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');

// Login endpoint using findOne to locate the user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await connectToDatabase();
        const collection = db.collection('users');
        
        // Locate current user in the database
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        
        if (password !== user.password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        res.json({ success: true, email: user.email });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
