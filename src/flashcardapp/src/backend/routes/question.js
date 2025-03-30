const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();


// Get a single course by ID
pp.post("/get-next-question", (req, res) => {
    // Simulate fetching user-specific data (later replace with real DB query)
    questions.forEach(q => {
        q.weight = calculateWeight(q.difficulty, q.wrong, q.correct, q.totalAttempts, q.lastAnswered);
    });

    // Pick the question with the highest weight
    const nextQuestion = questions.reduce((prev, current) => (prev.weight > current.weight ? prev : current));

    res.json({ question: nextQuestion });
});

// API route to update question stats (when user answers a question)
app.post("/submit-answer", (req, res) => {
    const { questionId, isCorrect } = req.body;

    let question = questions.find(q => q.id === questionId);
    if (question) {
        question.totalAttempts += 1;
        question.lastAnswered = 0; // Reset last answered since it's just answered
        if (isCorrect) {
            question.correct += 1;
        } else {
            question.wrong += 1;
        }
    }

    res.json({ success: true, updatedQuestion: question });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));