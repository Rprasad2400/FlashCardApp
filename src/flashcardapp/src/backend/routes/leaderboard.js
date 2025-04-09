const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');


// Get leaderboard for a specific set
router.get('/:setId', async (req, res) => {
    try {
        const setId = req.params.setId;
        const leaderboard = await Leaderboard.findById(setId);
        if (!leaderboard) {
            return res.json({ message: 'Leaderboard not found' });
            
        }
        return res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving leaderboard', error });
    }
});

// Add a new score to the leaderboard
router.post('/:setId', async (req, res) => {
    try {
        const setId = req.params.setId;
        const { userId, name, score } = req.body;
    
        // Check if the user already exists in the leaderboard
        console.log("UserID:", userId);
        let leaderboardEntry = await Leaderboard.findOne({ _id: setId });
    
        if (leaderboardEntry) {
            const existingUser = leaderboardEntry.rankings.find(r => r._id === userId);
            
    
            if (existingUser) {
                console.log("Existing User:", userId);
                // Update existing user's score if it's higher
                if (existingUser.score < score) {
                    console.log("Updating existing user's score:", userId);
                    existingUser.score = score;
                }
            } else {
                // Add a new user if they don't exist in the rankings
                console.log("Not Existing User:", userId);
                 console.log("Adding new user to leaderboard:", userId);
                leaderboardEntry.rankings.push({ _id: userId, name, score });
            }
    
            // Sort the rankings after adding the new score
            leaderboardEntry.rankings.sort((a, b) => b.score - a.score);
    
            // Save the updated leaderboard
            await leaderboardEntry.save();
    
            res.status(201).json(leaderboardEntry);
        } else {
            // Create a new leaderboard entry if it doesn't exist
            console.log("Creating new leaderboard entry");
            const newLeaderboard = new Leaderboard({
                _id: setId,
                rankings: [{ _id: userId, name, score }]
            });
            await newLeaderboard.save();
            res.status(201).json(newLeaderboard);
        }
    
    } catch (error) {
        res.status(500).json({ message: 'Error adding score to leaderboard', error });
    }
}
);    
module.exports = router;