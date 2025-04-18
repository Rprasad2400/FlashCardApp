const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require("../models/User"); // Import the User model
const Set = require('../models/Set'); // Assuming you have a Set model

const router = express.Router();

router.post('/add-personal-task/:userID', async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { name, date, amount, setId } = req.body;

        const newTask = {
            task_id: "0", // personal
            set_id: setId || "0",
            name,
            due_date: date,
            progress: "0",
            goal: amount
        };

        user.tasksCompleted.push(newTask);
        await user.save();

        res.json({ success: true, user });
    } catch (error) {
        console.error("Error in backend:", error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/get-user-sets/:userId', async (req, res) => {
    console.log("Inside user-sets");
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const sets = await Set.find({ course: { $in: user.courses } });
        res.json({ success: true, sets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.post('/update-tasks/:userID/:setID', async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        const score = req.body.score;
        console.log("Score: ", score);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { setID } = req.params;

        const isSameOrAfterToday = (dateString) => {
            //extract the year day and month and turn into int
            [year, month, day] = dateString.split('-').map(Number);
            if(!year || !month || !day) {
                [year, month, day] = dateString.split('/').map(Number);
            }
            const today = new Date();
            const [todayYear, todayMonth, todayDay] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];

            console.log("Year: ", year, "Month: ", month, "Day: ", day);
            console.log("Today Year: ", todayYear, "Today Month: ", todayMonth, "Today Day: ", todayDay);
            // Check if the date is the same or after today 
            return (year > todayYear) || 
                   (year === todayYear && month > todayMonth) || 
                   (year === todayYear && month === todayMonth && day >= todayDay);
            
        };
        
        const tasks = user.tasksCompleted.filter(task =>
            task.set_id === setID && isSameOrAfterToday(task.due_date)
        );
        console.log("Entered update-tasks route");
        console.log(setID);
        console.log("User Tasks: ", user.tasksCompleted);
        console.log("Tasks: ", tasks);
        if (tasks.length === 0) {
            return res.status(404).json({ success: false, message: 'No tasks found for this set' });
        }
        for (let task of tasks) {
            task.progress = score.toString();
        }
        //get all tasks  in tasks that's progress is equal to or greater than the goal
        const completedTasks = tasks.filter(task => parseInt(task.progress) >= parseInt(task.goal));
        console.log("Completed Tasks: ", completedTasks);
        res.json({ success: true, completedTasks });
        //await user.save();



    } catch (error) {
        console.error("Error in backend:", error);
        res.status(500).json({ message: error.message });
    }
}
);


// API route to fetch tasks based on user's courses
router.get('/get-tasks/:userID', async (req, res) => {
    console.log("I am trying again!");
    try {
        // Fetch the user by ID and get the courses
        const user = await User.findById(req.params.userID, 'courses tasksCompleted');
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log("User Found! User: ", user);

          // ✅ If user already has tasks, return them to prevent resetting progress
        if (user.tasksCompleted && user.tasksCompleted.length > 0) {
            console.log("User already has tasks, returning existing tasks.");
            return res.json({ success: true, tasks: user.tasksCompleted });
        }
        else{
            console.log("NOTHING IN TASKS COMPLETED");
        }

        // Step 1: Search for sets belonging to the user's courses
        const sets = await Set.find({ course: { $in: user.courses } }); // Match sets whose 'course' field is in the user's courses
        const setIds = sets.map(set => set._id.toString()); // Convert the ObjectId to string

        console.log("Sets: ", setIds);

        // Step 2: Fetch tasks that belong to those sets
        let tasks = await Task.find({ set_id: { $in: setIds } }); // Match tasks whose 'setId' is in the setIds array

        tasks = tasks.map(task => ({
            ...task.toObject(), // Convert Mongoose object to plain JSON
            task_id: task._id,  // change it to the object Id so user can reference it
            progress: "0",
            goal: "5"
        }));

        user.tasksCompleted = tasks; // Store modified tasks directly in the user's document
        await user.save();  // Save changes

        console.log("Updated user with modified tasks:", user);

        console.log("Tasks: ", tasks);
        console.log("END OF STUFF");
        // Return the tasks
        res.json({ success: true, tasks });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;