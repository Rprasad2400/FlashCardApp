const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rprasad:45r81wQE@cluster0.ieq1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbName = "flashcards_db";  // Change this from "local" to a meaningful name
const collectionName = "flashcards";



async function updateFlashCard(filter_data, new_data) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect(filter_data, new_data);
        console.log("Connected to MongoDB!");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        //Edit the given flashcard based on the given ObjectId
        const result = await collection.updateOne(filter_data, new_data);

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
