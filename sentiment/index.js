const express = require('express');
const router = express.Router();
const natural = require('natural');

router.get('/:text', (req, res) => {
    try {
        const { text } = req.params;
        const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
        const score = analyzer.getSentiment(text.split(' '));
        res.json({ sentiment: score });
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
