// // Code  for mongoose config in backend
// // Filename - backend/index.js

// // To connect with your mongoDB database
// const mongoose = require('mongoose');

// async function connectDB() {
//     try {
//         await mongoose.connect('mongodb://jordanlevy:blahblahpassword@localhost:27017/yourDB-name'); // No need for deprecated options
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Database connection error:', error);
//         process.exit(1);
//     }
// }

// connectDB();

// // mongoose.connect('mongodb://localhost:27017/flashcards_db', {
// //     useNewUrlParser: true, // These attributes are apparently depracated and idek if this is diff from below
// //     useUnifiedTopology: true
// // })
// // .then(() => console.log('Connected to yourDB-name database'))
// // .catch(err => console.error("Database connection error:", err));

// // This apparently uses a callback function that is now depracated
// // mongoose.connect('mongodb://localhost:27017/', { 
// //     dbName: 'flashcards_db',
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // }, err => err ? console.log(err) : 
// //     console.log('Connected to flashcards_db database'));

// // Schema for users of app
// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
// });
// const User = mongoose.model('users', UserSchema);
// User.createIndexes();

// // For backend and express
// const express = require('express');
// const app = express();
// const cors = require("cors");
// console.log("App listen at port 5000");
// app.use(express.json());
// app.use(cors());
// app.get("/", (req, resp) => {

//     resp.send("App is Working");
//     // You can check backend is working or not by 
//     // entering http://loacalhost:5000
    
//     // If you see App is working means
//     // backend working properly
// });

// app.post("/login", async (req, resp) => { // actually register but lets see if it works
//     try {
//         const user = new User(req.body);
//         let result = await user.save();
//         result = result.toObject();
//         if (result) {
//             delete result.password;
//             resp.send(req.body);
//             console.log(result);
//         } else {
//             console.log("User already register");
//         }

//     } catch (e) {
//         resp.send("Something Went Wrong");
//     }
// });

// // // Login API
// // app.post("/login", async (req, res) => {
// //     try {
// //         const { email, password } = req.body;
// //         const user = await User.findOne({ email });

// //         if (!user) {
// //             return res.status(400).json({ message: "User not found" });
// //         }

// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(400).json({ message: "Invalid credentials" });
// //         }

// //         const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
// //         res.json({ token, message: "Login successful" });

// //     } catch (e) {
// //         res.status(500).json({ message: "Error logging in" });
// //     }
// // });
// app.listen(5000);
// end of what i had

// Code  for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://jordanlevy:blahblahpassword@cluster0.ieq1i.mongodb.net/flashcards_db?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true, // These attributes are apparently depracated and idek if this is diff from below
    useUnifiedTopology: true
})
.then(() => console.log('Connected to yourDB-name database'))
.catch(err => console.error("Database connection error:", err));

// // Schema for users of app
// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
// }, { autoIndex: false });  // Disable automatic index creation

const UserSchema = new mongoose.Schema({
    _id: {
        type: String, // username as _id, so it's a string
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
}, { autoIndex: false });  // Disable automatic index creation

const User = mongoose.model('users', UserSchema);
//User.createIndexes(); // it was messing it up for reason 

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
    // entering http://loacalhost:5000
    
    // If you see App is working means
    // backend working properly
});

// app.post("/register", async (req, resp) => {
//     try {
//         const user = new User(req.body);
//         let result = await user.save();
//         result = result.toObject();
//         if (result) {
//             delete result.password;
//             resp.send(req.body);
//             console.log(result);
//         } else {
//             console.log("User already register");
//         }

//     } catch (e) {
//         resp.send("Something Went Wrong");
//     }
// });

app.post("/register", async (req, resp) => {
    console.log("Received registration request:", req.body);
    try {
        const { user, pass, email } = req.body.form_Data || req.body; // Handles both cases;
        
        if (!user || !pass || !email) {
            return resp.status(400).json({ error: "Missing email, username, or password" });
        }

        const newUser = new User({
            _id: user, // Assign username as _id
            pass: pass,
            email: email,
        });
        let result = await newUser.save();
        result = result.toObject();
        resp.send(result);
        console.log(result);
    } catch (e) {
        console.error(e);
        resp.status(400).send("Something Went Wrong");
    }
});

// for password validation
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login API
app.post("/login", async (req, res) => {
    try {
        console.log("Received Login request:", req.body);
        //console.log(await User.find()); // shows all entries in the collection
        const { user, pass } = req.body;
        const foundUser = await User.findOne({ _id: user });

        if (!foundUser) {
            console.log("User Not Found!");
            return res.status(400).json({ message: "User not found" });
        }

        console.log("found user");

        console.log("Stored password:", foundUser.pass);
        console.log("Entered password:", pass);

        // We will use this once we start hashing passwords (bcrypt expects the DB pass to be hashed and fails otherwise)
        // const isMatch = await bcrypt.compare(pass, foundUser.pass);
        // if (!isMatch) {
        //     console.log("Invalid Credentials!");
        //     return res.status(400).json({ message: "Invalid credentials" });
        // }

        if (pass !== foundUser.pass) {
            console.log("Invalid Credentials!");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("correct password");

        const token = jwt.sign({ userId: foundUser._id }, "your_secret_key", { expiresIn: "1h" });
        res.json({ token, message: "Login successful" });

        console.log("Login Successful");

    } catch (e) {
        console.error("Error Logging In:", e);
        res.status(500).json({ message: "Error logging in" });
    }
});

app.listen(5000);