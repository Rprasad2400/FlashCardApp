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

router.get('/get-recent-sets', async (req, res) => {
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


router.get('/get-personal-sets/:userID', async (req, res) => {
    const { userID } = req.params;
    const { course_id, module_name } = req.query;
    //console.log("get personal set: ", req.body);
  
    try {
      const user = await User.findById(userID);
      //console.log("user: ", user);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const personalSet = user.personal_sets.find(
        set => set.course_id.toString() === course_id && set.module_name === module_name
      );
  
  
      if (!personalSet) return res.json({ personal_set: [] });

       // Now manually query the Set documents matching the set_ids
     const populatedSets = await Set.find({
        _id: { $in: personalSet.set_ids }
      });
      //console.log("Should succesfully return personal set: ", populatedSets);
      res.json({ personal_set: populatedSets});
    } catch (error) {
      //console.log("Error fetching personal set: ", error);
      res.status(500).json({ message: 'Error fetching personal set', error });
    }
  });



  router.post('/create-personal-set/:userID', async (req, res) => {
    const { userID } = req.params;
    const { course_id, module_name, set_id } = req.body;
    console.log("create personal set: ", req.body);
  
    try {
      const user = await User.findById(userID);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Find if personal_set exists for this course_id and module_name
      const existingSet = user.personal_sets.find(
        set => set.course_id.toString()=== course_id && set.module_name === module_name
      );
  
      if (existingSet) {
        // If exists, update its set_ids (replace or merge depending on preference)
        if (!existingSet.set_ids.includes(set_id)) {
          existingSet.set_ids.push(set_id); // Add new set_id if it doesn't exist
        }
      } else {
        // If not, add a new personal set
        user.personal_sets.push({
          course_id,
          module_name,
          set_ids: [set_id],
        });
      }
      console.log("Succesfully added personal set: ", user.personal_sets);
  
      await user.save();
  
      res.status(200).json({ message: 'Personal set created/updated', personal_sets: user.personal_sets });
    } catch (error) {
      res.status(500).json({ message: 'Error processing personal set', error });
    }
  });
  
  router.post('/update-daily-badges/:userID', async (req, res) => {
    const { userID } = req.params;
    const { incrementDailyLogin, incrementStreak } = req.body;
    console.log("update badges: ", req.body);
  
    try {
      const user = await User.findById(userID);
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      // update the first in the badges array (always do this)
      user.badges[0] += 1;
      //update the last elemt in the badges array
      if(incrementStreak){
        user.badges[user.badges.length - 1] += 1;
      }
      console.log("Succesfully updated badges: ", user.badges);
  
      await user.save();
  
      res.status(200).json({ success: true, message: 'Badges updated', updatedBadges: user.badges});
    } catch (error) {
      res.status(500).json({ message: 'Error updating badges', error });
    }
  });
  
  


module.exports = router;