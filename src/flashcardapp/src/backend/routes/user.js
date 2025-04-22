const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/User"); // Import the User model
const Course = require("../models/Course");
const Set = require('../models/Set'); 
const router = express.Router();

// API route to fetch user data by ID
router.get('/get-courses/:userID', async (req, res) => {
    //console.log("I am trying!");
    //console.log("usrdID: ", req.params.userID);
    try {
        const user = await User.findById(req.params.userID, 'courses tasksCompleted badges date_joined total_pnts recent_sets last_active'); // Select specific fields
        //const user = await User.findById(req.params.userID).lean();
        if (!user) {
            console.log("user not found!");
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log(Object.keys(user));
        res.json({ success: true, user });
        console.log("user found!");
        console.log("username:", user._id)
        console.log("total_pnts: ", user.total_pnts);
        console.log("date_joined: ", user.date_joined);
        console.log("badges", user.badges);
        console.log("recent_sets", user.recent_sets);
        console.log("last_active: ", user.last_active);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/get-course-info/:userID', async (req, res) => {
    //console.log("I am trying!");
    //console.log("usrdID: ", req.params.userID);
    try {
        const user = await User.findById(req.params.userID, 'courses'); // Select specific fields
        //const user = await User.findById(req.params.userID).lean();
        if (!user) {
            console.log("user not found!");
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const courses = await Course.find({ name: { $in: user.courses } });
        console.log("courses: ", courses)
        res.json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/get-recent-sets/:userID', async (req, res) => {
    //console.log("I am trying!");
    //console.log("usrdID: ", req.params.userID);
    const recentSets = req.query.recent_sets ? req.query.recent_sets.split(',') : []; // turns query into an array

    try {
        const sets = await Set.find({ _id: { $in: recentSets } });

        res.json({ success: true, sets });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;