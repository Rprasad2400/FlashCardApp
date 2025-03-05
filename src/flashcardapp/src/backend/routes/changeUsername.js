const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import the model

router.post('/update-username', async (req, res) => {
    const { oldUsername, newUsername } = req.body;

    try {
        const result = await User.updateOne(
            { user: oldUsername }, // find user by username
            { $set: { username: newUsername } }
        );

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: 'Username updated!' });
        } else {
            res.json({ success: false, message: 'User not found or username unchanged.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating username.' });
    }
});

module.exports = router;