const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://jordanlevy:blahblahpassword@cluster0.ieq1i.mongodb.net/flashcards_db?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true, // These attributes are apparently depracated and idek if this is diff from below
    useUnifiedTopology: true
})
.then(() => console.log('Connected to yourDB-name database'))
.catch(err => console.error("Database connection error:", err));

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {

    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://localhost:5000
    
    // If you see App is working means
    // backend working properly
});
//console.log("Card Route Import:", require("./routes/card"));
// API Routes
app.use("/api/auth", require("./routes/auth"));


app.use("/api/card", require("./routes/card"));

// app.use((req, res, next) => {
//     console.log(`Received request: ${req.method} ${req.url}`); // Log all incoming requests
//     next(); // Continue to the next middleware or route
// });

app.use("/api/changeUsername", require("./routes/changeUsername"));

app.use("/api/set", require("./routes/set"));
app.use("/api/course", require("./routes/course"));
// Start Server
app.listen(5000);