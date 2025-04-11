const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/User"); // Import the User model

const router = express.Router();

// API route to fetch user data by ID
router.get('/get-courses/:userID', async (req, res) => {
    //console.log("I am trying!");
    //console.log("usrdID: ", req.params.userID);
    try {
        const user = await User.findById(req.params.userID, 'courses tasksCompleted badges'); // Select specific fields
        if (!user) {
            console.log("user not found!");
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
        console.log("user found!");
        //console.log("Courses: ", user.courses);
        //console.log("badges: ", user.badges);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;