const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    console.log("Received registration request:", req.body);
    try {
        const { user, pass, email } = req.body.form_Data || req.body; // Handles both cases

        if (!user || !pass || !email) {
            return res.status(400).json({ error: "Missing email, username, or password" });
        }

        // Hash the password before saving
        //const hashedPass = await bcrypt.hash(pass, 10);

        const newUser = new User({
            _id: user,
            email: email,
            pass: pass,
        });

        let result = await newUser.save();
        res.json({ message: "User registered successfully", user: result });
    } catch (e) {
        console.error(e);
        res.status(400).send("Something Went Wrong");
    }
});

// Login Route
router.post("/login", async (req, res) => {
    console.log("Login Request Body:", req.body);
    try {
        //console.log("Received Login request:", req.body);
        const { user, pass } = req.body;
        const foundUser = await User.findOne({ _id: user });
        if (!foundUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare entered password with hashed password
        /*const isMatch = await bcrypt.compare(pass, foundUser.pass);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
            */

        // Generate JWT token
        const token = jwt.sign({ userId: foundUser._id }, "your_secret_key", { expiresIn: "1h" });
        res.json({ token, message: "Login successful" });
    } catch (e) {
        console.error("Error Logging In:", e);
        res.status(500).json({ message: "Error logging in" });
    }
});

module.exports = router;
