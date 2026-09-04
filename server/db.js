const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string if needed
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);

let db;

async function connectToDatabase() {
    if (!db) {
        await client.connect();
        db = client.db("giftlink"); // Your database name
        console.log("Connected successfully to MongoDB");
    }
    return db;
}

module.exports = { connectToDatabase };
