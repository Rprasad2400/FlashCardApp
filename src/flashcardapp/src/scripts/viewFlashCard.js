const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rprasad:45r81wQE@cluster0.ieq1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "flashcards_db";  // Your database name
const collectionName = "flashcards";  // Your collection name

async function viewFlashCard(filter_data) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Find flashcards based on the filter_data
        const flashcards = await collection.find(filter_data).toArray();

        if (flashcards.length > 0) {
            console.log("Found Flashcards:", flashcards);
        } else {
            console.log("No flashcards found with the given criteria.");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB.");
    }
}

// Call the function with the filter for "doughnut" or "piano" in the answer
viewFlashCard({ answer: { $in: ["A doughnut", "keyboard"] } });
