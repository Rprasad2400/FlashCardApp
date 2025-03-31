const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require("../models/User"); // Import the User model
const Set = require('../models/Set'); // Assuming you have a Set model

const router = express.Router();

// In your backend, create an endpoint to get the user's completed tasks
router.get("/:userId/completed-tasks", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate("tasksCompleted.task_id"); // Populate task details

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract only completed tasks
        const completedTasks = user.tasksCompleted;
        if (completedTasks && completedTasks.length > 0) {
            console.log("Completed tasks are available:", completedTasks);
        } else {
            console.log("No completed tasks available.");
        }
        res.json(completedTasks); // Return only the completed tasks
    } catch (error) {
        console.error("Error fetching completed tasks:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get("/tasks/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findOne({ task_id: taskId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task); // Send task details back to the frontend
    } catch (error) {
        console.error("Error fetching task details:", error);
        res.status(500).json({ message: error.message });
    }
});

// Add a completed task for a user
router.post("/:userId/complete-task", async (req, res) => {
    console.log("Inside complete-task");

    const { task_id, set_id } = req.body; // Get task_id and set_id from request body
    console.log("Request Body:", req.body);
    console.log("Params:", req.params);

    const userId = req.params.userId;

    // Check if task_id and set_id are valid
    if (!task_id || !set_id) {
        return res.status(400).json({ message: "task_id and set_id are required." });
    }

    try {
        // Find the user by userId
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.json({ success: false, message: "User not found." });
        }

        // Only update tasksCompleted array
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, // Find the user by userId
            { $push: { tasksCompleted: { task_id, set_id } } }, // Push task into tasksCompleted
            { new: true, fields: { email: 1, tasksCompleted: 1, sets: 1, courses: 1 } } // Don't touch required fields
        );

        console.log("Task added successfully:", updatedUser);

        res.json({ success: true, message: "Task marked as completed!", user: updatedUser });
    } catch (error) {
        console.error("Error in backend:", error);
        res.status(500).json({ message: error.message });
    }
});



router.get("/tasks", async (req, res) => {
    //console.log("inside tasks");
    try {
        const tasks = await Task.find();
        res.json(tasks);
        //console.log("Tasks: ", tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API route to fetch tasks based on user's courses
router.get('/get-tasks/:userID', async (req, res) => {
    console.log("I am trying again!");
    try {
        // Fetch the user by ID and get the courses
        const user = await User.findById(req.params.userID, 'courses');
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log("User Found! User: ", user);

        // Step 1: Search for sets belonging to the user's courses
        const sets = await Set.find({ course: { $in: user.courses } }); // Match sets whose 'course' field is in the user's courses
        const setIds = sets.map(set => set._id.toString()); // Convert the ObjectId to string

        console.log("Sets: ", setIds);

        // Step 2: Fetch tasks that belong to those sets
        const tasks = await Task.find({ set_id: { $in: setIds } }); // Match tasks whose 'setId' is in the setIds array

        console.log("Tasks: ", tasks);
        // Return the tasks
        res.json({ success: true, tasks });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;