const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import the model

router.post('/update-username', async (req, res) => {
    const { oldUsername, newUsername } = req.body;

    console.log("In update-username");
    console.log("Old Username", oldUsername);
    console.log("New Username", newUsername);

    try {
        // Step 1: Find the existing user
        const existingUser = await User.findById(oldUsername);

        if (!existingUser) {
            return res.json({ success: false, message: "User not found." });
        }

        // Step 2: Create a new user document with the same data but new `_id`
        const newUser = new User({
            _id: newUsername, // Assign the new username as `_id`
            email: existingUser.email,
            pass: existingUser.pass, // Copy other fields
        });

        // Step 3: Save the new user to the database
        await newUser.save();

        // Step 4: Delete the old user
        await User.deleteOne({ _id: oldUsername });

        res.json({ success: true, message: "Username updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating username." });
    }
});

module.exports = router;