const express = require('express');
const cors = require('cors');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Mount the routes including /api/search
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

module.exports = app;
