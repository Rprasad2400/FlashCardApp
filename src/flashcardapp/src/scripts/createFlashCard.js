const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rprasad:45r81wQE@cluster0.ieq1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbName = "flashcards_db";  // Change this from "local" to a meaningful name
const collectionName = "flashcards";



async function addFlashCard(flashcard_data) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.insertMany(flashcard_data);
        console.log("Document inserted:", result);

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
addFlashCard(
    [{ question: "I am below the sun above the the sky yet no one can truly see me what am I? ", answer: "horizon"}, 
        { question: "What is the best way to keep a skunk from smelling?", answer: "Hold its nose" }]

);

