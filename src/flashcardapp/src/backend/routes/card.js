const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {FlashCard} = require('../models/FlashCard'); 

const router = express.Router();

// Create FlashCard Route

router.post("/create", async (req, res) => {
    console.log("Received create request:", req.body);
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ error: "Missing question or answer" });
        }

        const newFlashcard = new FlashCard({
            question,
            answer,
        });

        let result = await newFlashcard.save();
        res.json({ message: "Flashcard created successfully", flashcard: result });
    } catch (e) {
        console.error(e);
        res.status(400).send("Something Went Wrong");
    }
});

// Get All FlashCards based on question
// TODO: Change it to set ID

router.get("/get", async (req, res) => {
    console.log("Received get request:", req.body);
    try {
        const { question } = req.body;
        const foundFlashcard = await FlashCard.findOne({ question: question });
        if (!foundFlashcard) {
            return res.status(400).json({ message: "Flashcard not found" });
        }
        res.json({ message: "Flashcard found", flashcard: foundFlashcard });
    } catch (e) {
        console.error("Error getting Flashcard:", e);
        res.status(500).json({ message: "Error getting Flashcard" });
    }
});

// Get all FlashCards
router.get("/getAll", async (req, res) => {
    console.log("Received get all request:", req.body);
    try {
        const allFlashcards = await FlashCard.find({});
        if (!allFlashcards) {
            return res.status(400).json({ message: "Flashcards not found" });
        }
        res.json({ message: "Flashcards found", flashcards: allFlashcards });
    } catch (e) {
        console.error("Error getting Flashcards:", e);
        res.status(500).json({ message: "Error getting Flashcards" });
    }
});

// Update FlashCard Route

router.put("/update", async (req, res) => {
    console.log("Received update request:", req.body);
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ error: "Missing question or answer" });
        }
        const updatedFlashcard = await FlashCard.findOneAndUpdate({ question: question }, { answer: answer }, { new: true });
        if (!updatedFlashcard) {
            return res.status(400).json({ message: "Flashcard not found" });
        }
        res.json({ message: "Flashcard updated successfully", flashcard: updatedFlashcard });
    } catch (e) {
        console.error(e);
        res.status(400).send("Something Went Wrong");
    }
});

// Delete FlashCard Route

router.delete("/delete", async (req, res) => {
    console.log("Received delete request:", req.body);
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "Missing question" });
        }
        const deletedFlashcard = await FlashCard.findOneAndDelete({ question: question });
        if (!deletedFlashcard) {
            return res.status(400).json({ message: "Flashcard not found" });
        }
        res.json({ message: "Flashcard deleted successfully", flashcard: deletedFlashcard });
    } catch (e) {
        console.error(e);
        res.status(400).send("Something Went Wrong");
    }
}
);

module.exports = router;

