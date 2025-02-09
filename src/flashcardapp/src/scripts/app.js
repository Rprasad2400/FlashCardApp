const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rprasad:45r81wQE@cluster0.ieq1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbName = "flashcards_db";  // Change this from "local" to a meaningful name
const collectionName = "flashcards";

async function setupDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Check if the collection is empty
        const count = await collection.countDocuments();
        if (count === 0) {
            console.log("Collection is empty. Inserting a sample document...");
            await collection.insertOne({ question: "What is MongoDB?", answer: "A NoSQL database." });
        }

        // Fetch and print data
        const jsonData = await collection.find({}).toArray();
        console.log("Fetched JSON Data:", jsonData);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB.");
    }
}

// Call the function
setupDatabase();
